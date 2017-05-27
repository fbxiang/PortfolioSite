import { BlogPageModel, BlogPage } from '../models/blogpage';
import * as express from 'express';

export const blogPageRouter = express.Router();

blogPageRouter.get('/blog/page', async (req, res, next) => {
  let author = req.params['author'];
  let title = req.params['title'];
  try {
    let document = await BlogPageModel.findOne({author, title});
    res.send(document);
  }
  catch (err) {
    res.status(404).send("Blog page does not exist");
  }
})

async function createNewBlogPage(author, title, description) {
  let page = await BlogPageModel.findOne({title, author});
  if (page) throw {status: 400, message: 'blog page exists'};

  try {
    let newBlogPage = new BlogPageModel() as BlogPage;
    newBlogPage.description = description;
    newBlogPage.author = author;
    newBlogPage.title = title;
    return await newBlogPage.save();
  }
  catch (err) {
    throw {status: 400, message: 'cannot create page'};
  }
}

blogPageRouter.post('/blog/page/add', async (req, res, next) => {
  let author = req.body['author'];
  let title = req.body['title'];
  let description = req.body['description'];

  try {
    createNewBlogPage(author, title, description);
    res.send('success');
  }
  catch (err) {
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
