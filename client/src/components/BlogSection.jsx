import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  ChevronDown,
  CheckCircle,
  Link,
  Linkedin,
  Twitter,
  Facebook,
  ArrowLeft,
  Send,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

// Sample data for the blog posts.
// This data would eventually be fetched from a database.
const postsData = [
  {
    id: 1,
    category: "Technology",
    image: "https://placehold.co/600x400/94a3b8/ffffff?text=AI+and+Tech",
    authorAvatar: "JD",
    authorName: "John Doe",
    published: "2 hours ago",
    readTime: "5 min read",
    title:
      "The Future of Artificial Intelligence: Transforming Industries and Reshaping Our World",
    description:
      "Explore how AI is revolutionizing various sectors from healthcare to finance, and discover the potential...",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 127,
    comments: 23,
    isBookmarked: false,
  },
  {
    id: 2,
    category: "Design",
    image: "https://placehold.co/600x400/64748b/ffffff?text=UX+Design",
    authorAvatar: "SW",
    authorName: "Sarah Wilson",
    published: "4 hours ago",
    readTime: "3 min read",
    title:
      "Modern UI/UX Design Principles: Creating Intuitive Digital Experiences",
    description:
      "Discover the essential principles of modern interface design that create seamless user experiences...",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 89,
    comments: 15,
    isBookmarked: false,
  },
  {
    id: 3,
    category: "Business",
    image: "https://placehold.co/600x400/475569/ffffff?text=Remote+Work",
    authorAvatar: "MC",
    authorName: "Michael Chen",
    published: "6 hours ago",
    readTime: "7 min read",
    title:
      "Remote Work Revolution: Building Successful Distributed Teams in 2024",
    description:
      "The landscape of work has fundamentally changed. Learn strategies for managing remote teams...",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 203,
    comments: 31,
    isBookmarked: false,
  },
  {
    id: 4,
    category: "Marketing",
    image: "https://placehold.co/600x400/94a3b8/ffffff?text=Digital+Marketing",
    authorAvatar: "AS",
    authorName: "Anna Smith",
    published: "1 day ago",
    readTime: "4 min read",
    title: "The Power of Content Marketing: Driving Engagement and Growth",
    description:
      "Learn how to craft a winning content strategy that captivates your audience and builds brand loyalty...",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 98,
    comments: 12,
    isBookmarked: false,
  },
  {
    id: 5,
    category: "Lifestyle",
    image: "https://placehold.co/600x400/64748b/ffffff?text=Healthy+Habits",
    authorAvatar: "TJ",
    authorName: "Tom Jackson",
    published: "2 days ago",
    readTime: "6 min read",
    title: "Unlocking Your Potential: Simple Habits for a More Productive Life",
    description:
      "Small changes can lead to big results. Explore daily habits that can boost your productivity and well-being...",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 154,
    comments: 28,
    isBookmarked: false,
  },
  {
    id: 6,
    category: "Finance",
    image: "https://placehold.co/600x400/475569/ffffff?text=Financial+Planning",
    authorAvatar: "LM",
    authorName: "Lisa Miller",
    published: "3 days ago",
    readTime: "8 min read",
    title:
      "Smart Investing Strategies for Beginners: Building a Strong Financial Future",
    description:
      "Starting your investment journey? This guide covers the basics of smart investing and long-term financial planning...",
    fullContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likes: 76,
    comments: 9,
    isBookmarked: false,
  },
];

// Sample comments data
const sampleComments = [
  {
    id: 1,
    author: "Alice",
    avatar: "A",
    timestamp: "1 hour ago",
    text: "Great article! The insights on AI are really valuable. Looking forward to more content on this topic.",
    likes: 5,
    dislikes: 0,
  },
  {
    id: 2,
    author: "Bob",
    avatar: "B",
    timestamp: "2 hours ago",
    text: "This is a fantastic read. I appreciate the detailed examples and clear explanations.",
    likes: 12,
    dislikes: 2,
  },
];

const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed z-50 flex items-center p-4 space-x-2 text-white -translate-x-1/2 bg-green-500 shadow-lg bottom-8 left-1/2 rounded-xl animate-fade-in-up">
      <CheckCircle size={20} />
      <span>{message}</span>
    </div>
  );
};

// Reusable component for an individual blog post card.
const PostCard = ({ post, onBookmarkToggle, onReadMoreClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    onBookmarkToggle(post.id, newBookmarkedState);
  };

  return (
    <div className="overflow-hidden transition-transform transform bg-white shadow-xl dark:bg-gray-800 rounded-2xl hover:scale-105">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-48"
        />
        <span
          className={`absolute top-4 left-4 rounded-full px-4 py-1 text-sm font-semibold text-white 
          ${post.category === "Technology" && "bg-blue-600"}
          ${post.category === "Design" && "bg-purple-600"}
          ${post.category === "Business" && "bg-teal-600"}
          ${post.category === "Marketing" && "bg-orange-600"}
          ${post.category === "Lifestyle" && "bg-green-600"}
          ${post.category === "Finance" && "bg-indigo-600"}
        `}
        >
          {post.category}
        </span>
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-4 right-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors
          ${isBookmarked ? "text-blue-400" : "hover:text-blue-400"}
          `}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              {post.authorAvatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {post.authorName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.published}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.readTime}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400 line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={handleLikeClick}
            >
              <Heart
                size={18}
                fill={isLiked ? "red" : "none"}
                color={isLiked ? "red" : "currentColor"}
              />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </div>
          </div>
          <button
            onClick={() => onReadMoreClick(post)}
            className="px-6 py-2 font-semibold text-white transition-colors bg-black rounded-full dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for the header section
const Header = () => {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
        Latest Articles
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
        Discover insights, trends, and expert perspectives across technology,
        design, business, and more
      </p>
    </div>
  );
};

// Component for the filter and sort bar
const FilterBar = ({
  posts,
  sortOrder,
  handleSortClick,
  showCategoryFilter,
  setShowCategoryFilter,
  categories,
  handleCategoryFilter,
}) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 mb-8 bg-white shadow-sm sm:flex-row dark:bg-gray-800 rounded-xl">
      <div className="flex items-center mb-4 space-x-4 sm:mb-0">
        <div className="relative">
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <span className="font-semibold">All</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                showCategoryFilter ? "rotate-180" : ""
              }`}
            />
          </button>
          {showCategoryFilter && (
            <div className="absolute left-0 z-10 w-48 py-2 mt-2 bg-white rounded-lg shadow-lg top-full dark:bg-gray-700">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className="w-full px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="font-semibold text-gray-500 dark:text-gray-400">
          Sort by:
        </span>
        <button
          onClick={() => handleSortClick("Recent")}
          className={`px-4 py-2 font-semibold rounded-full transition-colors ${
            sortOrder === "Recent"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => handleSortClick("Popular")}
          className={`px-4 py-2 font-semibold rounded-full transition-colors ${
            sortOrder === "Popular"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          Popular
        </button>
      </div>
      <p className="mt-4 text-gray-500 dark:text-gray-400 sm:mt-0">
        Showing 1-{posts.length} of {postsData.length} articles
      </p>
    </div>
  );
};

// New component for a single comment with hover reactions
const CommentItem = ({ comment }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike', or null

  const handleLike = () => {
    if (userReaction === "like") {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === "dislike") {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === "like") {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserReaction("dislike");
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
      <div className="flex items-start mb-2 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-600 dark:text-gray-300">
          {comment.avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {comment.author}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {comment.timestamp}
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 ml-11">{comment.text}</p>

      {/* Reaction buttons that are always visible */}
      <div className="flex items-center mt-2 space-x-2 text-gray-500 ml-11 dark:text-gray-400">
        <button
          onClick={handleLike}
          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
            userReaction === "like"
              ? "text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <ThumbsUp size={16} />
        </button>
        <span className="text-xs">{likes}</span>
        <button
          onClick={handleDislike}
          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
            userReaction === "dislike"
              ? "text-red-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <ThumbsDown size={16} />
        </button>
        <span className="text-xs">{dislikes}</span>
      </div>
    </div>
  );
};

const PostDetail = ({ post, onBackClick }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(sampleComments);

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "User", // Placeholder, would be the logged-in user
        avatar: "U",
        timestamp: "Just now",
        text: commentText,
        likes: 0,
        dislikes: 0,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  return (
    <div className="p-6 mb-8 overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-2xl md:p-12">
      {/* Back button */}
      <button
        onClick={onBackClick}
        className="flex items-center mb-8 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft size={24} className="mr-2" /> Back to articles
      </button>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center mb-4 space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center w-10 h-10 mr-2 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              {post.authorAvatar}
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {post.authorName}
            </p>
            <span>•</span>
            <p>{post.published}</p>
            <span>•</span>
            <p>{post.readTime}</p>
          </div>

          {/* Social Sharing Icons */}
          <div className="flex items-center mb-6 space-x-4 text-gray-500 dark:text-gray-400">
            <Link
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
            <Linkedin
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
            <Twitter
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
            <Facebook
              size={20}
              className="cursor-pointer hover:text-black dark:hover:text-white"
            />
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full mb-8 rounded-xl"
          />
          <div className="prose text-gray-700 dark:prose-invert max-w-none dark:text-gray-300">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              Introduction
            </p>
            <p className="italic">{post.description}</p>
            <p>{post.fullContent}</p>
            {/* You can add more fullContent here for a longer article */}
          </div>
        </div>

        {/* Comment Section Area, moved to below the main content */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>

          {/* Modern Comment Submission Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center mb-8 space-x-4"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              U {/* Placeholder for user avatar */}
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="w-full py-3 pl-4 pr-12 text-gray-900 transition-colors border border-gray-300 rounded-full dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="submit"
                className="absolute p-2 text-white transition-colors -translate-y-1/2 bg-blue-500 rounded-full right-2 top-1/2 hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          {/* List of comments */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main BlogSection component
export default function BlogSection() {
  const [posts, setPosts] = useState(postsData);
  const [sortOrder, setSortOrder] = useState("Recent");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const [selectedPost, setSelectedPost] = useState(null);

  // A list of categories for filtering
  const categories = [
    "All",
    "Technology",
    "Design",
    "Business",
    "Marketing",
    "Lifestyle",
    "Finance",
  ];

  const handleSortClick = (order) => {
    setSortOrder(order);
    if (order === "Popular") {
      const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
      setPosts(sortedPosts);
    } else {
      const sortedPosts = [...posts].sort((a, b) => a.id - b.id);
      setPosts(sortedPosts);
    }
  };

  const handleCategoryFilter = (category) => {
    if (category === "All") {
      setPosts(postsData);
    } else {
      const filteredPosts = postsData.filter(
        (post) => post.category === category
      );
      setPosts(filteredPosts);
    }
    setShowCategoryFilter(false);
  };

  const handleBookmarkToggle = (id, isBookmarked) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, isBookmarked } : post
    );
    setPosts(updatedPosts);

    setToast({
      isVisible: true,
      message: isBookmarked
        ? "Added to favourites!"
        : "Removed from favourites!",
    });

    setTimeout(() => {
      setToast({ isVisible: false, message: "" });
    }, 3000);
  };

  const handleReadMoreClick = (post) => {
    setSelectedPost(post);
  };

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBackClick={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-900 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <style jsx="true">{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
      <div className="container p-4 mx-auto sm:p-8">
        <Header />
        <FilterBar
          posts={posts}
          sortOrder={sortOrder}
          handleSortClick={handleSortClick}
          showCategoryFilter={showCategoryFilter}
          setShowCategoryFilter={setShowCategoryFilter}
          categories={categories}
          handleCategoryFilter={handleCategoryFilter}
        />

        {/* Grid of post cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onBookmarkToggle={handleBookmarkToggle}
              onReadMoreClick={handleReadMoreClick}
            />
          ))}
        </div>
      </div>
      <Toast isVisible={toast.isVisible} message={toast.message} />
    </div>
  );
}
