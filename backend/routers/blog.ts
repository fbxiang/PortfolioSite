import { BlogPageModel, BlogPage } from '../models/blogpage';
import * as express from 'express';

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

blogPageRouter.post('/blog/page/add', async (req, res, next) => {
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

blogPageRouter.post('/blog/page/delete', async (req, res, next) => {
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

blogPageRouter.post('/blog/page/edit', async(req, res, next) => {
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
