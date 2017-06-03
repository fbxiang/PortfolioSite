import { BlogPageModel, BlogPage } from '../models/blogpage';
import * as express from 'express';
import { authenticateByToken } from './user';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

const upload = multer({ dest: 'uploads/' });

// Router for the blog page
export const blogPageRouter = express.Router();

// We only allow numbers, letters, underscore, dot, and space in file name
function isValidFileName(name) {
  return name && /^[0-9a-zA-Z_. ]+$/.test(name);
}

// Get a page with author and title
blogPageRouter.get('/blog/page', async (req, res, next) => {
  let author = req.query['author'];
  let title = req.query['title'];

  if (!author && !title) {
    res.status(400).send("Invalid title or author");
  }

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

// Create a new blog page with author, title, and description
async function createNewBlogPage(author, title, description) {
  let page = await BlogPageModel.findOne({title, author});
  if (page) throw {status: 400, message: 'blog page exists'};
  if (isValidFileName(title))

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

// POST
// body: {author, title, description}
blogPageRouter.post('/blog/page/add', authenticateByToken, async (req, res, next) => {
  let author = req.body['author'];
  let title = req.body['title'];
  let description = req.body['description'];

  // Names are not valid
  if (!isValidFileName(title) || !isValidFileName(author))
    res.status(400).send('Invalid author or page title');

  try {
    await createNewBlogPage(author, title, description);
    res.send('success');
  }
  catch (err) {
    console.log('[/blog/page/add]', err);
    res.status(err.status).send(err.message);
  }
})

// POST
// delete with author and title
blogPageRouter.post('/blog/page/delete', authenticateByToken, async (req, res, next) => {
  let author = req.body['author'];
  let title = req.body['title'];

  if (!isValidFileName(author) || isValidFileName(title))
    res.status(400).send('Invalid author or page title');

  try {
    await BlogPageModel.findOneAndRemove({title, author});
    res.send('success');
  }
  catch (err) {
    res.status(400).send('removing failed');
  }
})

// POST
// body: {title, author, body}
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

// Get latest 10 blog pages
blogPageRouter.get('/blog/latest', async (req, res, next) => {
  let documents = await BlogPageModel.find().sort({date: -1}).limit(10);
  res.send(documents);
})

// Get all pages sorted by date
blogPageRouter.get('/blog/all', async (req, res, next) => {
  let documents = await BlogPageModel.find().sort({date: -1}).select('title author date');
  res.send(documents);
})

// Get
// query: {s: keyword}
// Search with keyword
blogPageRouter.get('/blog/search', async (req, res, next) => {
  let text = req.query['s'];
  if (! text) return res.send([]);
  let documents = await BlogPageModel.find({$text: {$search: text}});
  res.send(documents);
})

blogPageRouter.post('/blog/image/upload', authenticateByToken, upload.single('image'), async (req, res, next) => {
  const author = req.body.author;
  const title = req.body.title;

  // check image is there
  if (!req.file || !req.file.originalname) {
    return res.status(400).send('Image or its name is missing');
  }

  console.log('debug', isValidFileName(req.file.originalname));
  //check the path will be valid for the image
  if (!isValidFileName(author) || !isValidFileName(title) || !isValidFileName(req.file.originalname))
    return res.status(400).send('Image name is not valid');

  const filepath = path.join(__dirname, '../static/blog/page', author, title);

  let fileTypeArray = req.file.mimetype.toLowerCase().split('/');
  if (fileTypeArray.length != 2) {
    return res.status(400).send('File format can not be recognized');
  }
  const format = fileTypeArray[1];

  // make directories recursively
  mkdirp(filepath, err => {
    let filename = req.file.originalname;
    if (!filename.toLowerCase().endsWith(`.${format}`))
      filename += `.${format}`;
    let newFile = path.join(filepath, filename);

    fs.exists(newFile, exists => {
      if (exists)
        res.status(400).send('File already exists');
      else {
        fs.rename(req.file.path, newFile);
        res.send({
          url: path.join('/api/blog/page', author, title, filename)
        });
      }
    })
  })
})
