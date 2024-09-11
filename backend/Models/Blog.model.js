const mongoose = require("mongoose");

const Joi = require("joi");

// blog schema
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 5, maxLength: 100 },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

// validate Blog
function validateBlog(blog) {
  const JoiSchema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string(),
    category: Joi.string().required(),
    status: Joi.string()
      .allow("Approved", "Pending", "Rejected")
      .default("Pending")
      .required(),
      slug:Joi.string()
  });

  return JoiSchema.validateAsync(blog);
}

// Auto Generate Slug Before saving the blog
BlogSchema.pre('save',async ()=>{
    this.slug = `${this.title}_${this.category}`;
})


//model
const Blog = mongoose.model("blog", BlogSchema);

module.exports = { Blog, validateBlog };
