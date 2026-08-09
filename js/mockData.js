// ===================================================================
// DỮ LIỆU KHỞI TẠO HỆ THỐNG - EDUTECH CLASSROOM APP CÔ THANH HƯƠNG
// ===================================================================

const MOCK_DATA = {
    // 14 Môn Học Chuẩn Sơ Đồ Kiến Trúc (Grade & 14-Subject Directory Engine)
    subjects: [
        { id: 1, code: 'MATH', name: 'Toán Học', icon: '🔢', color: '#00BCD4', count: 12, desc: 'Đại số, Hình học & Giải tích' },
        { id: 2, code: 'LIT', name: 'Ngữ Văn', icon: '📖', color: '#FFC107', count: 9, desc: 'Văn học Việt Nam & Nghị luận xã hội' },
        { id: 3, code: 'ENG', name: 'Tiếng Anh', icon: '🌐', color: '#4CAF50', count: 15, desc: 'Ngữ pháp, IELTS & Giao tiếp' },
        { id: 4, code: 'PHYS', name: 'Vật Lý', icon: '⚡', color: '#FF5722', count: 8, desc: 'Cơ học, Điện & Quang học' },
        { id: 5, code: 'CHEM', name: 'Hóa Học', icon: '🧪', color: '#9C27B0', count: 10, desc: 'Hóa vô cơ & Hóa hữu cơ' },
        { id: 6, code: 'BIO', name: 'Sinh Học', icon: '🧬', color: '#8BC34A', count: 7, desc: 'Di truyền & Sinh thái học' },
        { id: 7, code: 'HIST', name: 'Lịch Sử', icon: '🏛️', color: '#E91E63', count: 6, desc: 'Lịch sử Việt Nam & Thế giới' },
        { id: 8, code: 'GEO', name: 'Địa Lý', icon: '🗺️', color: '#009688', count: 5, desc: 'Địa lý Tự nhiên & Kinh tế' },
        { id: 9, code: 'GDCD', name: 'GD KT & Pháp Luật', icon: '⚖️', color: '#3F51B5', count: 4, desc: 'Pháp luật & Kinh tế nhập môn' },
        { id: 10, code: 'CS', name: 'Tin Học', icon: '💻', color: '#2196F3', count: 11, desc: 'Lập trình Python & Khái niệm AI' },
        { id: 11, code: 'TECH', name: 'Công Nghệ', icon: '⚙️', color: '#795548', count: 3, desc: 'Công nghệ Kỹ thuật & Nông nghiệp' },
        { id: 12, code: 'PE', name: 'GD Thể Chất', icon: '🏆', color: '#FF9800', count: 2, desc: 'Rèn luyện thể lực & Thể thao' },
        { id: 13, code: 'DEF', name: 'GD Quốc Phòng', icon: '🎖️', color: '#607D8B', count: 2, desc: 'An ninh Quốc phòng THPT' },
        { id: 14, code: 'ART', name: 'Âm Nhạc & Mỹ Thuật', icon: '🎨', color: '#EC407A', count: 4, desc: 'Nghệ thuật & Thiết kế sáng tạo' }
    ],

    // Kho Học Liệu Số SGK (Digital Library & Material Engine)
    materials: [
        { id: 101, title: 'SGK Toán 10 Tập 1 - Bộ Kết Nối Tri Thức (PDF)', subject: 'Toán Học', type: 'PDF', size: '14.5 MB', downloads: 1420 },
        { id: 102, title: 'Bài giảng Slide: Phân tích Tác phẩm Dân gian Việt Nam', subject: 'Ngữ Văn', type: 'SLIDE', size: '8.2 MB', downloads: 980 },
        { id: 103, title: 'Bộ 500 Từ vựng IELTS B2 Chuyên đề Học đường', subject: 'Tiếng Anh', type: 'PDF', size: '5.1 MB', downloads: 2150 },
        { id: 104, title: 'Video Thí nghiệm: Định luật Bảo toàn Động lượng', subject: 'Vật Lý', type: 'VIDEO', size: '45.0 MB', downloads: 670 }
    ],

    // Danh sách Học sinh Lớp Cô Thanh Hương (Class & Student Roster Service)
    roster: [
        { id: 1, full_name: 'Trần Thị Bích', username: 'tranthib', class_name: 'Lớp 10A1', points: 920, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', rank: 1, badge: '🥇 Thủ Khoa' },
        { id: 2, full_name: 'Nguyễn Văn An', username: 'nguyenvana', class_name: 'Lớp 10A1', points: 850, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', rank: 2, badge: '🥈 Á Khoa' },
        { id: 3, full_name: 'Lê Quang Cường', username: 'lequangc', class_name: 'Lớp 10A2', points: 780, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', rank: 3, badge: '🥉 Hạng 3' },
        { id: 4, full_name: 'Phạm Minh Đức', username: 'phamminhduc', class_name: 'Lớp 10A1', points: 740, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', rank: 4, badge: '⭐ Top 5' }
    ],

    // Danh sách 4 Bài tập / Đề thi hiển thị đúng Bố cục Ảnh 2 (Section OUR EVENTS)
    featuredExercises: [
        {
            id: 201,
            day: '15',
            month: 'Thg 8',
            title: 'BÀI KIỂM TRA TOÁN 10 - ĐỀ AI OCR/RAG',
            subject: 'Toán Học',
            bgColor: '#00BCD4',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',
            desc: 'Đề thi trắc nghiệm 100% sinh tự động từ SGK Toán 10. AI chấm điểm tức thì & giải chi tiết.',
            questionsCount: 5,
            timeMins: 15
        },
        {
            id: 202,
            day: '18',
            month: 'Thg 8',
            title: 'LUYỆN TẬP NGỮ VĂN - NGHỊ LUẬN XÃ HỘI',
            subject: 'Ngữ Văn',
            bgColor: '#FFC107',
            image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600',
            desc: 'Phân tích trích đoạn văn học. AI chấm điểm nhận xét và Cô Thanh Hương gửi voice audio.',
            questionsCount: 3,
            timeMins: 20
        },
        {
            id: 203,
            day: '20',
            month: 'Thg 8',
            title: 'THÍ NGHIỆM TIẾNG ANH - AUDIO FEEDBACK',
            subject: 'Tiếng Anh',
            bgColor: '#4CAF50',
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600',
            desc: 'Luyện kỹ năng Nghe & Đọc hiểu IELTS. Chấm điểm phát âm tự động qua AI Audio Engine.',
            questionsCount: 4,
            timeMins: 10
        },
        {
            id: 204,
            day: '25',
            month: 'Thg 8',
            title: 'THỬ THÁCH BẢNG XẾP HẠNG TUẦN',
            subject: 'Tin Học',
            bgColor: '#FF5722',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
            desc: 'Thi đấu trực tuyến toàn lớp 10A1 & 10A2. Tích điểm thưởng nhận huy hiệu Thủ Khoa!',
            questionsCount: 5,
            timeMins: 15
        }
    ]
};
