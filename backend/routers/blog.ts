import { BlogPageModel, BlogPage } from '../models/blogpage';
import * as express from 'express';
import { authenticateByToken } from './user';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

const upload = multer({ dest: 'uploads/' });


export const blogPageRouter = express.Router();

blogPageRouter.get('/blog/page', async (req, res, next) => {
  let author = req.query['author'];
  let title = req.query['title'];
  try {
    let document = await BlogPageModel.findOne({author, title});
    if (document)
      res.send(document);
    else {
      res.status(404).send("Blog page does not exist");
    }
  }
  catch (err) {
    res.status(404).send("Blog page access failed");
  }
})

const defaultBlogPageBody =`
# New Post
There are nothing here yet.
`

async function createNewBlogPage(author, title, description) {
  let page = await BlogPageModel.findOne({title, author});
  if (page) throw {status: 400, message: 'blog page exists'};

  try {
    let newBlogPage = new BlogPageModel() as BlogPage;
    newBlogPage.description = description;
    newBlogPage.author = author;
    newBlogPage.title = title;
    newBlogPage.body = defaultBlogPageBody;
    return await newBlogPage.save();
  }
  catch (err) {
    console.log('[create blog page]', err);
    throw {status: 400, message: 'cannot create page'};
  }
}

blogPageRouter.post('/blog/page/add', authenticateByToken, async (req, res, next) => {
  let author = req.body['author'];
  let title = req.body['title'];
  let description = req.body['description'];

  try {
    await createNewBlogPage(author, title, description);
    res.send('success');
  }
  catch (err) {
    console.log('[/blog/page/add]', err);
    res.status(err.status).send(err.message);
  }
})

blogPageRouter.post('/blog/page/delete', authenticateByToken, async (req, res, next) => {
  let author = req.body['author'];
  let title = req.body['title'];

  try {
    await BlogPageModel.findOneAndRemove({title, author});
    res.send('success');
  }
  catch (err) {
    res.status(400).send('removing failed');
  }
})

blogPageRouter.post('/blog/page/edit', authenticateByToken, async(req, res, next) => {
  let author = req.body['author'];
  let title = req.body['title'];
  let body = req.body['body'];
  try {
    let document = <BlogPage>await BlogPageModel.findOne({title, author});
    if (!document) {
      return res.status(400).send('page does not exist');
    }
    document.body = body;
    console.log(body);
    await document.save()
    res.send('success');
  }
  catch(err) {
    res.status(400).send('editing failed');
  }
})

blogPageRouter.get('/blog/latest', async (req, res, next) => {
  let documents = await BlogPageModel.find().sort({date: -1}).limit(10);
  res.send(documents);
})

blogPageRouter.get('/blog/all', async (req, res, next) => {
  let documents = await BlogPageModel.find().sort({date: -1}).select('title author date');
  res.send(documents);
})

blogPageRouter.get('/blog/search', async (req, res, next) => {
  let text = req.query['s'];
  if (! text) return res.send([]);
  let documents = await BlogPageModel.find({$text: {$search: text}});
  res.send(documents);
})

blogPageRouter.post('/blog/image/upload', authenticateByToken, upload.single('image'), async (req, res, next) => {
  if (!req.body.path || !req.file || !req.file.originalname) {
    return res.status(400).send('File is missing');
  }

  // FIXME: Check filename is desired
  const filepath = path.join(__dirname, '../static/blog/page', req.body.path);

  mkdirp(filepath, err => {
    let filename = req.file.originalname;
    if (!filename.endsWith('.png'))
      filename += '.png';
    let newFile = path.join(filepath, filename);

    fs.exists(newFile, exists => {
      if (exists)
        res.status(400).send('File already exists');
      else {
        fs.rename(req.file.path, newFile);
        res.send({
          url: path.join('/api/blog/page', req.body.path, filename)
        });
      }
    })
  })
})
