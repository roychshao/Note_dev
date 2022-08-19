import express from 'express';
import auth from './../middleware/auth.js';
import { get_items, get_done_items, get_collected_items, search_items, insert_item, mark_item, delete_item } from './../controller/item.js';

const router = express.Router();

router.get('/', auth, get_items);
router.get('/done', auth, get_done_items);
router.get('/collected', auth, get_collected_items);
router.get('/search', auth, search_items);
router.post('/create', auth, insert_item);
router.post('/mark', auth, mark_item);
router.post('/delete', auth, delete_item);

export default router;
