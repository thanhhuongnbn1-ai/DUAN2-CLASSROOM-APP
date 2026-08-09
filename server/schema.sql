-- ===================================================================
-- HỆ THỐNG CLASSROOM APP CÔ THANH HƯƠNG - HE CHUAN DATABASE POSTGRESQL / SQLITE
-- Tầng Cơ sở dữ liệu theo Sơ đồ kiến trúc & Bố cục UI Ảnh 2
-- ===================================================================

-- 1. Bảng Lớp học (classes)
CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_name VARCHAR(50) NOT NULL,
    grade_level INTEGER NOT NULL,
    school_year VARCHAR(20) DEFAULT '2025-2026',
    teacher_name VARCHAR(100) DEFAULT 'Cô Thanh Hương',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Người dùng (users: Học sinh & Admin Cô Thanh Hương)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK(role IN ('STUDENT', 'TEACHER_ADMIN')) NOT NULL,
    class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    avatar_url VARCHAR(255),
    total_points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng 14 Môn học (subjects - Grade & 14-Subject Directory Engine)
CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    color_code VARCHAR(20) NOT NULL,
    description TEXT
);

-- 4. Bảng Kho học liệu (materials - Digital Library & Material Engine)
CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) CHECK(file_type IN ('PDF', 'VIDEO', 'SLIDE', 'AUDIO')),
    file_url TEXT NOT NULL,
    file_size VARCHAR(20),
    download_count INTEGER DEFAULT 0,
    created_by INTEGER REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng Đề thi & Bài tập (quizzes - AI Auto-Generator & Interactive Quiz)
CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    quiz_type VARCHAR(30) CHECK(quiz_type IN ('MULTIPLE_CHOICE', 'ESSAY', 'INTERACTIVE')),
    created_by_ai BOOLEAN DEFAULT FALSE,
    ai_prompt_used TEXT,
    time_limit_mins INTEGER DEFAULT 15,
    max_score INTEGER DEFAULT 10,
    due_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bảng Câu hỏi (quiz_questions)
CREATE TABLE IF NOT EXISTS quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options_json TEXT, -- JSON Array các lựa chọn A, B, C, D
    correct_answer TEXT NOT NULL,
    explanation TEXT
);

-- 7. Bảng Nộp bài & AI Chấm điểm (submissions - AI Auto-Grader & Multimedia Reflection Engine)
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    answers_json TEXT NOT NULL,
    score NUMERIC(4,2),
    ai_feedback TEXT,
    teacher_audio_url TEXT,
    teacher_comment TEXT,
    status VARCHAR(30) CHECK(status IN ('SUBMITTED', 'GRADED_BY_AI', 'REVIEWED_BY_TEACHER')) DEFAULT 'SUBMITTED',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Bảng Thông báo Realtime (notifications - Realtime Push Notification Worker)
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(30) DEFAULT 'GENERAL',
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================================
-- DỮ LIỆU MẪU BAN ĐẦU (SEED DATA FOR 14 SUBJECTS & DEMO USERS)
-- ===================================================================

INSERT INTO classes (class_name, grade_level, teacher_name) VALUES 
('Lớp 10A1 (Chuyên Toán-Tin)', 10, 'Cô Thanh Hương'),
('Lớp 10A2 (Chuyên Văn-Anh)', 10, 'Cô Thanh Hương');

INSERT INTO users (username, password_hash, full_name, role, class_id, avatar_url, total_points) VALUES 
('cothanhhuong', 'admin123', 'Cô Thanh Hương (Giáo viên / Admin)', 'TEACHER_ADMIN', 1, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 9999),
('nguyenvana', 'student123', 'Nguyễn Văn An', 'STUDENT', 1, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 850),
('tranthib', 'student123', 'Trần Thị Bích', 'STUDENT', 1, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 920),
('lequangc', 'student123', 'Lê Quang Cường', 'STUDENT', 2, 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', 780);

-- Khởi tạo danh mục 14 Môn học chuẩn Bộ GD&ĐT
INSERT INTO subjects (subject_code, subject_name, icon_name, color_code, description) VALUES
('MATH', 'Toán Học', 'calculator', '#00BCD4', 'Đại số, Hình học & Giải tích 10-12'),
('LIT', 'Ngữ Văn', 'book-open', '#FFC107', 'Văn học Việt Nam & Nghị luận xã hội'),
('ENG', 'Tiếng Anh', 'globe', '#4CAF50', 'Ngữ pháp, Từ vựng & Giao tiếp IELTS/THPT'),
('PHYS', 'Vật Lý', 'zap', '#FF5722', 'Cơ học, Điện học & Quang học'),
('CHEM', 'Hóa Học', 'flask-conical', '#9C27B0', 'Hóa vô cơ & Hóa hữu cơ ứng dụng'),
('BIO', 'Sinh Học', 'dna', '#8BC34A', 'Di truyền học & Sinh thái học'),
('HIST', 'Lịch Sử', 'landmark', '#E91E63', 'Lịch sử Việt Nam & Thế giới hiện đại'),
('GEO', 'Địa Lý', 'map-pin', '#009688', 'Địa lý tự nhiên & Kinh tế xã hội'),
('GDCD', 'GD Kinh Tế & Pháp Luật', 'shield-check', '#3F51B5', 'Kiến thức Pháp luật & Kinh tế nhập môn'),
('CS', 'Tin Học', 'cpu', '#2196F3', 'Lập trình Python, C++ & AI căn bản'),
('TECH', 'Công Nghệ', 'wrench', '#795548', 'Công nghệ Công nghiệp & Nông nghiệp 4.0'),
('PE', 'Giáo Dục Thể Chất', 'trophy', '#FF9800', 'Rèn luyện thể lực & Thể thao học đường'),
('DEF', 'GD Quốc Phòng - An Ninh', 'award', '#607D8B', 'Kiến thức an ninh quốc phòng học sinh'),
('ART', 'Âm Nhạc & Mỹ Thuật', 'palette', '#EC407A', 'Cảm thụ nghệ thuật & Thiết kế sáng tạo');
