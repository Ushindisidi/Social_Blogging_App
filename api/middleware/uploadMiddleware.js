import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Store images here
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `post-${uniqueSuffix}${ext}`); // e.g., post-1234567890.jpg
  },
});

// 👇 Modified to ensure proper form-data parsing
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, or WebP images are allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    fields: 10, // Allow up to 10 non-file fields
    parts: 20, // Allow up to 20 parts (files + fields)
  },
});

// 👇 Export both single-file and any-file handlers for flexibility
export const uploadCoverImage = upload.single("coverImage");
export const uploadAnyFiles = upload.any(); // Alternative for multiple files
