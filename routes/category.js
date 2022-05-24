import express from 'express';
import { create, list, read, categoryByid, update, remove } from '../controllers/category';

const router = express.Router();
router.post('/category', create)
router.get('/category', list)
router.get('/category/:id', read)
router.put('/category/:id', update)
router.delete('/category/:id', remove)


router.param("id", categoryByid)
module.exports = router