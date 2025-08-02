import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [300, "Summary cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    categories: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug before saving
postSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Virtual populate comments
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

// Enable virtuals in JSON responses
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

export default mongoose.model("Post", postSchema);
