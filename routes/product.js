import express from 'express';
import { create, limitHome, list, listLimit, productById, read, remove, update } from '../controllers/product';
const router = express.Router();
router.get('/product', list);
router.post('/product', create)
router.get('/product/:id', read)
router.get('/limit', listLimit)
router.get('/limithome', limitHome)
router.delete('/product/:id', remove);
router.put('/product/:id', update);
router.param('id', productById)


module.exports = router