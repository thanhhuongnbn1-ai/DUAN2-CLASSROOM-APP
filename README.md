# 🎓 EdTech Classroom App - Hệ Thống Bài Tập & Học Liệu Cô Thanh Hương

Hệ thống ứng dụng Quản lý Lớp học, Bài tập Tương tác & Chấm điểm AI thông minh dành cho **Cô Thanh Hương**, được xây dựng chuẩn 100% theo **Sơ đồ Kiến trúc Hệ thống (Hình 1)** và **Bố cục Giao diện UI Educational Theme (Hình 2)**.

---

## 🌟 1. Cấu Trúc Hệ Thống (Architecture & File Tree)

```
d:\WEB\DUAN2/
├── index.html                   # Giao diện chính (Top Header, Hero Banner, 6 Activities, Search Bar, 4 Exercise Cards, Dual Portals)
├── css/
│   └── styles.css               # Hệ thống CSS Design System (Tông màu Cyan, Yellow, Coral, Emerald, Slate chuẩn Ảnh 2)
├── js/
│   ├── mockData.js              # Dữ liệu khởi tạo 14 môn học, bài tập, danh sách học sinh & bảng xếp hạng
│   └── app.js                   # Logic ứng dụng, chuyển đổi Dual Portal, làm bài tập AI & chấm điểm tự động
├── server/
│   ├── index.js                 # Express Backend Server (API Gateway, WAF & 9 Backend Services theo Sơ đồ)
│   ├── database.js              # Kết nối & Khởi tạo cơ sở dữ liệu SQLite / Memory Database
│   └── schema.sql               # Toàn bộ câu lệnh SQL DDL khởi tạo 8 bảng Database & Seed data
├── package.json                 # Cấu hình dự án Node.js & Dependencies
└── README.md                    # Hướng dẫn chi tiết & cài đặt
```

---

## 🚀 2. Hướng Dẫn Chạy & Kiểm Thử Cục Bộ (Local Run & Test)

1. **Khởi chạy Backend Server API**:
   ```bash
   npm install
   npm start
   ```
   *Server backend sẽ khởi chạy tại port 3001 và sẵn sàng phục vụ toàn bộ 9 Backend API Services.*

2. **Truy cập Giao diện Web (Frontend)**:
   Mở trực tiếp file `index.html` bằng trình duyệt web bất kỳ (Chrome, Edge, Firefox) hoặc truy cập `http://localhost:3001`.

---

## 🗄️ 3. Tầng Cơ Sở Dữ Liệu SQL (Database DDL Queries)

File `server/schema.sql` chứa toàn bộ câu lệnh khởi tạo 8 bảng chuẩn PostgreSQL / SQLite:
- `classes`: Quản lý danh sách lớp học
- `users`: Quản lý học sinh & tài khoản Admin Cô Thanh Hương
- `subjects`: Cấu trúc danh mục 14 môn học Bộ GD&ĐT
- `materials`: Kho học liệu số (PDF, Slide, Video)
- `quizzes`: Bài tập AI sinh tự động & bài tập tương tác
- `quiz_questions`: Danh sách câu hỏi trắc nghiệm & tự luận
- `submissions`: Lưu vết làm bài, AI Auto-Grader & nhận xét giọng nói Audio
- `notifications`: Hệ thống đẩy thông báo Realtime

---

## 📤 4. Danh Sách File Cần Upload Lên Hosting / Deploy

Khi đưa hệ thống lên Server Production / Hosting (Hostinger, VPS, Vercel), Cô/thầy chỉ cần upload toàn bộ danh sách các file sau:
1. `index.html`
2. `css/styles.css`
3. `js/mockData.js`
4. `js/app.js`
5. `server/index.js`
6. `server/database.js`
7. `server/schema.sql`
8. `package.json`
