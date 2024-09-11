const router = require('express').Router();

const BlogController = require('../Controllers/Blog.controller');

const AuthMiddleware = require('../MiddleWares/auth.middleware');

router.use(AuthMiddleware.checkForAuthentication);


router.post('/',BlogController.CreateBlog);

router.put('/',BlogController.UpdateBlog)

router.get('/:id',BlogController.GetDetailofBlog);

router.get('/',BlogController.GetBlogList);

router.delete('/:id',BlogController.DeleteBlog);

module.exports = router;