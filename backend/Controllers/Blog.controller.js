const { validateBlog } = require("../Models/Blog.model");
const { Create, GetDetail, Update, Delete, GetList } = require("../Services/Blog.service");

exports.CreateBlog = async (req, res) => {
  validateBlog
    .then(async (value) => {
      try {
        const blog = await Create(value);
        res.status(200).json({
          success: 1,
          message: "Blog Created Sucessfully.",
          blog: blog,
        });
      } catch (e) {
        res.status(400).json({
          success: 0,
          message: e.message,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        success: 0,
        message: e.message,
      });
    });
};

exports.GetDetailofBlog = async (req, res) => {
  try {
    const blog = await GetDetail(req.params.id);
    res.status(200).json({
      success: 1,
      message: "",
      blog: blog,
    });
  } catch (e) {
    res.status(400).json({
      success: 0,
      message: e.message,
    });
  }
};

exports.UpdateBlog = async (req, res) => {
  validateBlog
    .then(async (value) => {
      try {
        let blog = await GetDetail(req.params.id);
        if (blog) {
          blog = await Update(req.params.id, value);
          res.status(200).json({
            success: 1,
            message: "",
            blog: blog,
          });
        } else {
          res.status(200).json({
            success: 0,
            message: "Blog Post Not Found.",
          });
        }
      } catch (e) {
        res.status(400).json({
          success: 0,
          message: e.message,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        success: 0,
        message: e.message,
      });
    });
};

exports.DeleteBlog = async (req, res) => {
  try {
    let blog = await GetDetail(req.params.id);
    if(blog){
        blog = await Delete(req.params.id);
        res.status(200).json({
            success:1,
            message:'blog deleted successfully.',
            blog:blog
        })
    }else{
        res.status(200).json({
            success:0,
            message:'Blog Post not Found.'
        })
    }
  } catch (e) {
    res.status(400).json({
      success: 0,
      message: e.message,
    });
  }
};


exports.GetBlogList = async(req,res)=>{
    try{
       const  {query,page_limit,page_no} = req.query;
       const findQuery = query ||'';
       const limit = page_limit || 10;
       const offset = page_no ? parseInt(page_no) - 1 : 0;
        const blogList = await GetList([
            {$match:{title:findQuery}},
            {$limit:limit},
            {$skip:offset}
        ])
        res.status(200).json({
            data:blogList,
            success:1,
            message:''
        })

    }catch(e){
        res.status(400).json({
            success: 0,
            message: e.message,
          });
    }
}
