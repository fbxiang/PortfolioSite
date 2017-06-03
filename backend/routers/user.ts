import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export const userRouter = express.Router();
import { UserModel, User } from '../models/user';

import { secret } from '../config';

function getTokenIdentity(user: User) {
  let {username, state} = user;
  let token = jwt.sign({username, state}, secret, {
    expiresIn: 14400
  });
  return token;
}

async function validateTokenIdentity(token) {
  try {
    let {username, state} = jwt.verify(token, secret);
    let user = <User> await UserModel.findOne({username});
    if (!user || user.state != state) {
      throw {status: 401, message: 'invalid token'}
    }
    return user;
  }
  catch (err) {
    throw { status: 401, message: 'invalid token'}
  }
}

async function authenticateByUsername(username: string, password: string) {
  if (!username || !password) throw { status: 401, message: 'invalid information'}
  try {
    const user = <User> await UserModel.findOne({username})
    if (!user)
      throw { status: 400, message: 'invalid username'}
    if (!user.validPassword(password))
      throw { status: 400, message: 'invalid password' };
    return user;
  }
  catch (err) {
    throw err;
  }
}

export function authenticateByToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  validateTokenIdentity(req.headers.token).then(user => {
    res.locals.user = user;
    next();
  }).catch(err => {
    res.status(err.status).send(err.message);
  })
}

userRouter.post('/setup', (req, res, next) => {
  let newUser = <User> new UserModel();
  newUser.username = 'fxiang';
  newUser.setPassword('123456');
  newUser.save().then(() => {
    res.send('success')
  }).catch((err) => {
    console.log(err);
    res.send('fail');
  })
})

userRouter.post('/login', async (req, res, next) => {
  let {username, password} = req.body;
  try {
    const user = await authenticateByUsername(username, password);
    res.send(getTokenIdentity(user));
  }
  catch (err) {
    res.status(err.status).send(err.message);
  }
})

userRouter.post('/refresh', authenticateByToken, (req, res) => {
  res.locals.user.refreshState()
    .then(user => res.send(getTokenIdentity(res.locals.user)))
    .catch(err => console.log(err));
})
