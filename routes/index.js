import express from 'express';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();

// App routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// User routes
router.post('/users', UsersController.postNew);
router.get('/users/me', UsersController.getMe);

export default router;

