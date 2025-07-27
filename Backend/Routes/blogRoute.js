import express from 'express';
import * as blogController from "../Controllers/blogController.js";

const router = express.Router();

router.post('/create', blogController.create);
router.get('/', blogController.getAll);
router.get('/:id', blogController.getById);
router.put('/update/:id', blogController.update);
router.delete('/delete/:id', blogController.remove);
router.get('/user/:userId', blogController.getByUserId); // ✅ Correct
 
router.get("/user/:userId", blogController.getUserBlogs);


export default router;
