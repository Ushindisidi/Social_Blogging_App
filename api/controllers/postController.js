import Post from "../models/Post.js";
import Comment from "../models/Comments.js";
import slugify from "slugify";
import { promises as fs } from "fs";
export const createPost = async (req, res) => {
  try {
    const { title, summary, content, categories, tags } = req.body;
    const author = req.user.id; // From authMiddleware

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Handle image path (if uploaded)
    const coverImage = req.file ? `/uploads/${req.file.filename}` : "";

    // Create post
    const post = new Post({
      title,
      summary,
      content,
      author,
      coverImage,
      categories: categories ? categories.split(",") : [], // Convert CSV to array
      tags: tags ? tags.split(",") : [],
    });
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
};
// controllers/postController.js
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, categories, tags, author } = req.body;
    const userId = author;

    // 1. Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // 2. Verify ownership
    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this post" });
    }

    // 3. Handle image update (if new file uploaded)
    const coverImage = req.file
      ? `/uploads/${req.file.filename}`
      : post.coverImage; // Keep existing if no new file

    // 4. Update fields
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title || post.title,
        summary: summary || post.summary,
        content: content || post.content,
        coverImage,
        categories: categories ? categories.split(",") : post.categories,
        tags: tags ? tags.split(",") : post.tags,
        // Regenerate slug if title changed
        ...(title && { slug: slugify(title, { lower: true, strict: true }) }),
      },
      { new: true } // Return updated document
    );

    res.json({ success: true, data: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
};
// controllers/postController.js
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    //const userId = req.user.id; // From auth middleware
    const userId = "688c86091a7edd88e5be5a31";
    // 1. Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // 2. Verify ownership
    if (post.author.toString() !== userId) {
      return res.status(403).json({
        error: "Unauthorized: You can only delete your own posts",
      });
    }

    // 3. Delete associated comments first (optional)
    await Comment.deleteMany({ post: id });

    // 4. Delete the post
    await Post.findByIdAndDelete(id);

    // 5. Clean up uploaded files (optional)
    if (post.coverImage) {
      await fs.unlink(`public${post.coverImage}`).catch(console.error);
    }

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
// controllers/postController.js
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post and increment views
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment view count
      { new: true } // Return updated document
    )
      .populate({
        path: "author",
        select: "username profilePic", // Only include necessary fields
      })
      .populate({
        path: "comments",
        populate: {
          // Nested populate for comment authors
          path: "author",
          select: "username profilePic",
        },
      });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ success: true, data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    // Parse query parameters with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional filters
    const filter = {};
    if (req.query.author) filter.author = req.query.author;
    if (req.query.category) filter.categories = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;

    // Get posts with author population
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        select: "username profilePic", // Only include necessary fields
      })
      .populate({
        path: "comments",
        options: { limit: 5 }, // Only get first 5 comments
      });

    // Get total count for pagination metadata
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        postsPerPage: limit,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
