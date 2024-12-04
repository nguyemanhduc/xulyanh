const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình multer để lưu trữ ảnh tải lên trong thư mục uploads
const upload = multer({ dest: path.join(__dirname, "../public/uploads/") });

// Cấu hình Express để phục vụ các file tĩnh (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// API chính cho filter
app.post("/filter", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Ở đây bạn có thể xử lý filter cho ảnh
  console.log(`Processing filter for image: ${req.file.filename}`);
  // Trả về ảnh đã xử lý hoặc kết quả
  res.sendFile(path.join(__dirname, "../public/uploads", req.file.filename));
});

// API cho labeling
app.post("/labeling", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Ở đây bạn có thể xử lý labeling cho ảnh
  console.log(`Processing labeling for image: ${req.file.filename}`);
  // Trả về ảnh đã xử lý hoặc kết quả
  res.sendFile(path.join(__dirname, "../public/uploads", req.file.filename));
});

// API cho morphology
app.post("/morphology", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Ở đây bạn có thể xử lý morphology cho ảnh
  console.log(`Processing morphology for image: ${req.file.filename}`);
  // Trả về ảnh đã xử lý hoặc kết quả
  res.sendFile(path.join(__dirname, "../public/uploads", req.file.filename));
});

// API cho trang chủ (index)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
