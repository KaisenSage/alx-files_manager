import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import { dbClient } from '../utils/db.js';
import { redisClient } from '../utils/redis.js';
import { Auth } from '../utils/auth.js';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const existingUser = await dbClient.getUser({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const user = { email, password: hashedPassword, _id: uuidv4() };

    const newUser = await dbClient.addUser(user);
    return res.status(201).json({ id: newUser._id, email: newUser.email });
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await Auth.getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(200).json({ id: user._id, email: user.email });
  }
}

export default UsersController;

