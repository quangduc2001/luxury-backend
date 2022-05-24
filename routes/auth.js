import express from 'express';
import { signup, signin, listuser, remove, userById } from '../controllers/auth';
const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/listuser', listuser)
router.delete('/deleteuser/:id', remove)
router.param('id', userById);

module.exports = router