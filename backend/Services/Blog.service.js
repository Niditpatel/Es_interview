const { Blog } = require("../Models/Blog.model");

exports.Create = async (blog) => {
  const newBlog = await new Blog({ ...blog }).save();
  return newBlog;
};

exports.GetDetail = async (id) => {
  const blog = await Blog.findById(id);
  return blog;
};

exports.Update = async (id, updatedData) => {
  const blog = await Blog.findByIdAndUpdate(
    id,
    { ...updatedData },
    { new: true }
  );
  return blog;
};

exports.GetList = async (query) => {
  const blogList = await Blog.aggregate([...query]);
  return blogList;
};

exports.Delete = async (id)=>{
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}
