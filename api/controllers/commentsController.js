import Comment from "../models/Comments.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const author = req.user.id; // From auth middleware

    // Validate input
    if (!content || content.trim() === "") {
      return next(errorHandler(400, "Comment content is required"));
    }

    const newComment = new Comment({
      content,
      post: postId,
      author,
    });

    await newComment.save();

    // Populate user details for response
    const populatedComment = await Comment.findById(newComment._id).populate(
      "author",
      "username profilePic"
    );

    res.status(201).json({
      success: true,
      comment: populatedComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic"); // Include user details

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();

    res.status(200).json({
      success: true,
      comment: await Comment.findById(commentId).populate(
        "userId",
        "username profilePic"
      ),
    });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === "") {
      return next(errorHandler(400, "Comment content is required"));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    // Check ownership
    if (comment.userId.toString() !== userId && !req.user.isAdmin) {
      return next(errorHandler(403, "Unauthorized to edit this comment"));
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    ).populate("userId", "username profilePic");

    res.status(200).json({
      success: true,
      comment: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    // Check ownership
    if (comment.author.toString() !== userId && !req.user.isAdmin) {
      return next(errorHandler(403, "Unauthorized to delete this comment"));
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Admin-only endpoint
// export const getAllComments = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, 'Unauthorized access'));
//   }

//   try {
//     const { startIndex = 0, limit = 9, sort = 'desc' } = req.query;

//     const comments = await Comment.find()
//       .sort({ createdAt: sort === 'desc' ? -1 : 1 })
//       .skip(parseInt(startIndex))
//       .limit(parseInt(limit))
//       .populate('userId', 'username profilePic')
//       .populate('postId', 'title');

//     const totalComments = await Comment.countDocuments();

//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//     const lastMonthComments = await Comment.countDocuments({
//       createdAt: { $gte: oneMonthAgo }
//     });

//     res.status(200).json({
//       success: true,
//       comments,
//       totalComments,
//       lastMonthComments
//     });
//   } catch (error) {
//     next(error);
//   }
// };
