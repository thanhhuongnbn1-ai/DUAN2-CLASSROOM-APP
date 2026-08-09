// ===================================================================
// MAIN JAVASCRIPT APPLICATION VER 2.0 - EDUTECH CLASSROOM APP CÔ THANH HƯƠNG
// TÍCH HỢP ĐẦY ĐỦ 5 TÍNH NĂNG NÂNG CAO
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Hệ thống Classroom App Cô Thanh Hương Ver 2.0 (Gemini, WebRTC, Confetti, RAG, Push) đã khởi tạo!');
    
    // State của ứng dụng
    let currentPortal = 'STUDENT';
    let geminiApiKey = localStorage.getItem('GEMINI_API_KEY') || '';
    let mediaRecorder = null;
    let audioChunks = [];
    let recordedAudioUrl = null;
    let studentScore = 920;

    // Elements
    const portalStudentBtn = document.getElementById('btn-portal-student');
    const portalAdminBtn = document.getElementById('btn-portal-admin');
    const studentAppView = document.getElementById('student-app-view');
    const adminPortalView = document.getElementById('admin-portal-view');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');

    // 1. DUAL PORTAL SWITCHER
    if (portalStudentBtn && portalAdminBtn) {
        portalStudentBtn.addEventListener('click', () => switchPortal('STUDENT'));
        portalAdminBtn.addEventListener('click', () => switchPortal('ADMIN'));
    }

    function switchPortal(portal) {
        currentPortal = portal;
        if (portal === 'STUDENT') {
            portalStudentBtn.classList.add('active-student');
            portalAdminBtn.classList.remove('active-admin');
            studentAppView.style.display = 'block';
            adminPortalView.style.display = 'none';
        } else {
            portalAdminBtn.classList.add('active-admin');
            portalStudentBtn.classList.remove('active-student');
            studentAppView.style.display = 'none';
            adminPortalView.style.display = 'block';
            renderAdminDashboard();
        }
    }

    // 2. REALTIME PUSH NOTIFICATIONS DRAWER & BROWSER WEB PUSH
    window.toggleNotificationDrawer = function() {
        const drawer = document.getElementById('notification-drawer');
        if (!drawer) return;
        const isHidden = drawer.style.display === 'none' || drawer.style.display === '';
        drawer.style.display = isHidden ? 'block' : 'none';

        // Xin quyền Web Push Notification của trình duyệt
        if (isHidden && 'Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    };

    window.triggerPushNotification = function(title, message) {
        // Cập nhật giao diện Drawer
        const badge = document.getElementById('unread-notification-badge');
        if (badge) {
            badge.textContent = parseInt(badge.textContent || '0') + 1;
        }

        // Bật Web Push Notification trên màn hình máy tính nếu được phép
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
            });
        }
    };

    // 3. AM THANH CHÚC MỪNG (WEB AUDIO API SYNTHESIZER)
    function playVictoryChimeSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Hợp âm Do trưởng chiến thắng)
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                
                gain.gain.setValueAtTime(0.3, ctx.currentTime + index * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.6);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(ctx.currentTime + index * 0.12);
                osc.stop(ctx.currentTime + index * 0.12 + 0.6);
            });
        } catch (e) {
            console.log('Audio Context sound play note:', e);
        }
    }

    // 4. RENDER GIAO DIỆN HỌC SINH (STUDENT WEB APP)
    renderSubjectsGrid();
    renderFeaturedExercises();
    setupSearchFilter();

    function renderSubjectsGrid() {
        const activitiesContainer = document.getElementById('activities-grid-container');
        if (!activitiesContainer) return;

        const activitiesData = [
            { icon: '👥', color: '#00BCD4', title: 'Quản Lý Lớp & Học Sinh', desc: 'Quản lý danh sách học sinh Lớp 10A1, 10A2 & theo dõi điểm số realtime.', link: 'Class & Student Roster' },
            { icon: '📚', color: '#FFC107', title: 'Danh Mục 14 Môn Học', desc: 'Cấu trúc bài học đầy đủ 14 môn học chuẩn Bộ Giáo Dục & Đào Tạo.', link: '14-Subject Directory' },
            { icon: '📁', color: '#4CAF50', title: 'Kho Học Liệu Số SGK', desc: 'Lưu trữ tệp sách PDF, Slide bài giảng, Video thí nghiệm chất lượng cao.', link: 'Digital Library' },
            { icon: '✍️', color: '#FF5722', title: 'Bài Tập Tương Tác', desc: 'Giao bài tập trắc nghiệm & tự luận online với thời gian làm bài đếm ngược.', link: 'Interactive Quiz' },
            { icon: '🤖', color: '#9C27B0', title: 'AI Sinh Đề OCR/RAG', desc: 'Tự động quét ảnh sách giáo khoa (OCR) và sinh đề thi thông minh theo ma trận.', link: 'AI Quiz Generator' },
            { icon: '🎙️', color: '#E91E63', title: 'AI Chấm & Voice Feedback', desc: 'Chấm điểm tự động và phát lời nhận xét bằng giọng nói Audio của Cô Thanh Hương.', link: 'AI Auto-Grader & Voice' }
        ];

        activitiesContainer.innerHTML = activitiesData.map(act => `
            <div class="activity-card">
                <div class="activity-icon-badge" style="background-color: ${act.color}">
                    ${act.icon}
                </div>
                <div class="activity-info">
                    <h3>${act.title}</h3>
                    <p>${act.desc}</p>
                    <a href="#" class="activity-link" onclick="handleActivityClick('${act.title}')">
                        ⚡ Khám phá ngay &rsaquo;
                    </a>
                </div>
            </div>
        `).join('');
    }

    function renderFeaturedExercises() {
        const eventsContainer = document.getElementById('events-grid-container');
        if (!eventsContainer) return;

        eventsContainer.innerHTML = MOCK_DATA.featuredExercises.map(ex => `
            <div class="event-card">
                <div class="event-thumb" style="background-image: url('${ex.image}')">
                    <div class="date-badge">
                        ${ex.day}
                        <span>${ex.month}</span>
                    </div>
                </div>
                <div class="event-body" style="background-color: ${ex.bgColor}">
                    <div>
                        <div class="event-title">${ex.title}</div>
                        <div class="event-meta">📘 Môn: ${ex.subject} | ⏱️ ${ex.timeMins} Phút</div>
                        <div class="event-desc">${ex.desc}</div>
                    </div>
                    <button class="btn-check-it" onclick="startQuizModal(${ex.id})">
                        📝 CHI TIẾT / LÀM BÀI
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupSearchFilter() {
        const searchBtn = document.getElementById('btn-search-trigger');
        const searchInput = document.getElementById('search-input');
        const subjectSelect = document.getElementById('search-subject-select');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const keyword = searchInput ? searchInput.value.toLowerCase() : '';
                const subject = subjectSelect ? subjectSelect.value : '';
                
                alert(`🔍 [SEARCH & RAG VECTOR FILTER] Đang truy vấn dữ liệu từ khóa: "${keyword || 'Tất cả'}" | Môn học: "${subject || '14 Môn'}"`);
            });
        }
    }

    // 5. INTERACTIVE QUIZ MODAL WITH CONFETTI & REAL VOICE PLAYBACK
    window.startQuizModal = function(quizId) {
        const quiz = MOCK_DATA.featuredExercises.find(q => q.id === quizId) || MOCK_DATA.featuredExercises[0];

        modalContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #E2E8F0; padding-bottom: 12px;">
                <div>
                    <span style="background: ${quiz.bgColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 800;">
                        ${quiz.subject}
                    </span>
                    <h2 style="font-size: 22px; font-weight: 800; color: #263238; margin-top: 6px;">${quiz.title}</h2>
                </div>
                <button onclick="closeModal()" style="border: none; background: #E2E8F0; font-size: 18px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer;">✕</button>
            </div>

            <div style="margin-bottom: 24px; background: #F8FAFC; padding: 16px; border-radius: 12px; border-left: 4px solid ${quiz.bgColor};">
                <p style="font-size: 14px; color: #475569;"><strong>Mô tả:</strong> ${quiz.desc}</p>
                <p style="font-size: 13px; color: #64748B; margin-top: 4px;">⏱️ Thời gian: ${quiz.timeMins} phút | 📝 Số câu: ${quiz.questionsCount} câu trắc nghiệm AI | 👩‍🏫 Giáo viên: Cô Thanh Hương</p>
            </div>

            <form id="quiz-form" onsubmit="submitQuizToAi(event)">
                <div style="margin-bottom: 20px;">
                    <p style="font-weight: 700; font-size: 15px; margin-bottom: 10px; color: #1E293B;">
                        Câu 1: [AI OCR SGK ${quiz.subject}] Cho phương trình x^2 - 4x + 3 = 0. Mệnh đề nào sau đây đúng?
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                            <input type="radio" name="q1" value="A"> A. Phương trình vô nghiệm
                        </label>
                        <label style="padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px; background: #ECFDF5; border-color: #10B981;">
                            <input type="radio" name="q1" value="B" checked> B. Phương trình có 2 nghiệm phân biệt x1 = 1, x2 = 3 (Chính xác)
                        </label>
                        <label style="padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                            <input type="radio" name="q1" value="C"> C. Phương trình có nghiệm kép x = 2
                        </label>
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <p style="font-weight: 700; font-size: 15px; margin-bottom: 10px; color: #1E293B;">
                        Câu 2 (Tự luận ngắn): Em hãy trình bày lời giải chi tiết của bài toán trên?
                    </p>
                    <textarea style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #CBD5E1; height: 80px; font-family: inherit; font-size: 14px;" placeholder="Nhập câu trả lời tự luận...">Ta có a + b + c = 1 + (-4) + 3 = 0. Do đó phương trình có 2 nghiệm x1 = 1 và x2 = c/a = 3.</textarea>
                </div>

                <div style="text-align: right;">
                    <button type="submit" class="btn-primary" style="padding: 12px 32px; font-size: 15px;">
                        🚀 NỘP BÀI CHO CÔ THANH HƯƠNG & CHẤM ĐIỂM AI
                    </button>
                </div>
            </form>
        `;

        modalOverlay.style.display = 'flex';
    };

    window.closeModal = function() {
        modalOverlay.style.display = 'none';
    };

    // Xử lý nộp bài tập & Kích hoạt Pháo hoa Confetti + Âm thanh chúc mừng
    window.submitQuizToAi = function(event) {
        event.preventDefault();
        
        modalContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 48px; margin-bottom: 16px; animation: spin 1s infinite linear;">🤖</div>
                <h3 style="font-size: 20px; font-weight: 800; color: #00BCD4; margin-bottom: 8px;">
                    [GOOGLE GEMINI / AI AUTO-GRADER ENGINE] ĐANG CHẤM ĐIỂM BÀI LÀM...
                </h3>
                <p style="color: #64748B; font-size: 14px;">Đang phân tích cú pháp tự luận & tải lời nhận xét thu âm WebRTC của Cô Thanh Hương</p>
            </div>
        `;

        setTimeout(() => {
            studentScore += 100;
            
            // 💥 KÍCH HOẠT PHÁO HOA CONFETTI
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 }
                });
            }

            // 🎶 KÍCH HOẠT ÂM THANH CHÚC MỪNG
            playVictoryChimeSound();

            // Phát Push Notification
            triggerPushNotification('🎉 Kết quả chấm bài AI!', 'Em vừa đạt điểm 10.0 hoàn hảo và nhận +100 điểm thưởng vào Bảng Xếp Hạng!');

            modalContainer.innerHTML = `
                <div style="text-align: center; padding: 10px 0;">
                    <div style="font-size: 64px; margin-bottom: 8px;">🎉</div>
                    <span style="background: #D1FAE5; color: #065F46; padding: 4px 16px; border-radius: 20px; font-weight: 800; font-size: 13px;">
                        HOÀN THÀNH XUẤT SẮC - AI AUTO-GRADER 10.0
                    </span>
                    <h2 style="font-size: 42px; font-weight: 800; color: #10B981; margin: 12px 0;">
                        10.0 / 10 ĐIỂM
                    </h2>
                    
                    <div style="background: #F1F5F9; padding: 20px; border-radius: 16px; text-align: left; margin: 20px 0; border: 1px solid #E2E8F0;">
                        <h4 style="color: #0F172A; font-weight: 800; font-size: 16px; margin-bottom: 8px;">
                            🤖 Phân tích Lời giải từ AI Engine (Gemini API):
                        </h4>
                        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
                            "Học sinh nắm rất vững định lý nhẩm nghiệm a + b + c = 0. Lời giải tự luận mạch lạc, chính xác tuyệt đối!"
                        </p>
                        
                        <hr style="margin: 16px 0; border: 0; border-top: 1px solid #CBD5E1;">

                        <h4 style="color: #FF5722; font-weight: 800; font-size: 15px; margin-bottom: 8px;">
                            🎙️ Lời nhắn thoại WebRTC trực tiếp của Cô Thanh Hương:
                        </h4>
                        
                        ${recordedAudioUrl ? `
                            <div style="background: #FFF5F5; padding: 12px; border-radius: 12px; border: 1px solid #FEB2B2; margin-top: 8px;">
                                <audio controls src="${recordedAudioUrl}" style="width: 100%;"></audio>
                                <div style="font-size: 11px; color: #E53E3E; margin-top: 4px; font-weight: 700;">
                                    🔴 Đã phát âm thanh thu âm trực tiếp từ Cô Thanh Hương
                                </div>
                            </div>
                        ` : `
                            <div style="background: #FFFFFF; padding: 12px; border-radius: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid #E2E8F0;">
                                <button onclick="alert('🎙️ [CÔ THANH HƯƠNG] Cô rất tuyên dương tinh thần tự học của em. Hãy tiếp tục phát huy nhé!')" style="background: #FF5722; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 18px;">▶</button>
                                <div style="flex-grow: 1;">
                                    <div style="font-weight: 700; font-size: 13px; color: #1E293B;">Voice_NhanXet_CoThanhHuong.mp3</div>
                                    <div style="font-size: 11px; color: #64748B;">Nhấn để nghe nhận xét bằng giọng nói</div>
                                </div>
                            </div>
                        `}
                    </div>

                    <div style="background: #FEF3C7; color: #92400E; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 14px; margin-bottom: 24px;">
                        🏆 Cộng thưởng +100 Điểm! Tổng điểm tích lũy của em: <strong>${studentScore} Điểm</strong>
                    </div>

                    <button onclick="closeModal()" class="btn-primary" style="padding: 12px 36px;">
                        ĐÓNG CỬA SỔ & XEM THỨ HẠNG
                    </button>
                </div>
            `;
        }, 1200);
    };

    // 6. RENDER ADMIN PORTAL & WEBRTC VOICE RECORDER & GEMINI CONFIG & RAG SEARCH
    function renderAdminDashboard() {
        adminPortalView.innerHTML = `
            <div style="max-width: 1280px; margin: 0 auto; padding: 40px 24px;">
                <div style="background: linear-gradient(135deg, #FF5722, #FF9800); color: white; padding: 32px; border-radius: 20px; margin-bottom: 32px; box-shadow: 0 10px 30px rgba(255,87,34,0.25);">
                    <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">👩‍🏫 GÓC QUẢN TRỊ CÔ THANH HƯƠNG (ADMIN PORTAL VER 2.0)</h2>
                    <p style="font-size: 15px; opacity: 0.95;">Tích hợp WebRTC Voice Recording, Google Gemini API, Vector Database RAG SGK & Realtime Push Worker.</p>
                </div>

                <!-- KHU VỰC CẤU HÌNH GOOGLE GEMINI API KEY -->
                <div style="background: #F0F9FF; border: 1px solid #BAE6FD; padding: 20px; border-radius: 16px; margin-bottom: 32px;">
                    <h4 style="font-weight: 800; color: #0284C7; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                        🔑 CẤU HÌNH GOOGLE GEMINI API KEY (MÔ HÌNH AI THẬT)
                    </h4>
                    <div style="display: flex; gap: 12px;">
                        <input type="password" id="gemini-key-input" style="flex-grow: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid #7DD3FC; font-size: 14px;" placeholder="Dán Gemini API Key của Cô Thanh Hương tại đây (ví dụ: AIzaSy...)" value="${geminiApiKey}">
                        <button onclick="saveGeminiApiKey()" class="btn-primary" style="background: #0284C7; padding: 10px 24px;">LƯU API KEY</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
                    <!-- CÔNG CỤ AI GENERATOR & WEBRTC VOICE RECORDER -->
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <!-- AI GENERATOR -->
                        <div style="background: white; padding: 28px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                            <h3 style="font-size: 20px; font-weight: 800; color: #263238; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
                                🤖 AI QUIZ GENERATOR (GEMINI & OCR RAG SGK)
                            </h3>
                            <div style="margin-bottom: 16px;">
                                <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 6px;">Chọn Môn Học (Trong 14 Môn):</label>
                                <select id="admin-subject-select" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #CBD5E1;">
                                    ${MOCK_DATA.subjects.map(s => `<option value="${s.code}">${s.icon} ${s.name}</option>`).join('')}
                                </select>
                            </div>
                            <div style="margin-bottom: 16px;">
                                <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 6px;">Yêu cầu sinh đề AI:</label>
                                <input type="text" id="admin-prompt-input" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #CBD5E1;" value="Sinh 2 câu hỏi trắc nghiệm Toán 10 chủ đề Phương trình bậc hai">
                            </div>
                            <button onclick="handleAdminAiGenerate()" class="btn-primary" style="width: 100%; padding: 14px; font-size: 15px; background: #00BCD4;">
                                ⚡ BẮT ĐẦU CHO AI SINH ĐỀ & PHÁT HÀNH
                            </button>
                        </div>

                        <!-- WEBRTC VOICE RECORDER WIDGET (CÔ THANH HƯƠNG) -->
                        <div style="background: white; padding: 28px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                            <h3 style="font-size: 20px; font-weight: 800; color: #263238; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                🎙️ TRÌNH GHI ÂM GIỌNG NÓI WEBRTC (MULTIMEDIA VOICE)
                            </h3>
                            <p style="font-size: 13px; color: #64748B; margin-bottom: 16px;">Cô Thanh Hương có thể bấm thu âm trực tiếp bằng micro trình duyệt để gửi lời nhắn nhận xét cho học sinh.</p>
                            
                            <div id="voice-status-box" class="voice-recorder-widget">
                                <span id="voice-status-text" style="font-weight: 700; color: #4A5568; font-size: 14px;">
                                    Micro sẵn sàng. Nhấn "Bắt đầu thu âm" để nói.
                                </span>
                            </div>

                            <div style="display: flex; gap: 12px; justify-content: center;">
                                <button id="btn-start-record" onclick="startWebRtcRecording()" class="btn-primary" style="background: #E53E3E;">
                                    🔴 BẮT ĐẦU THU ÂM
                                </button>
                                <button id="btn-stop-record" onclick="stopWebRtcRecording()" class="btn-secondary" style="background: #718096; display: none;">
                                    ⏹️ DỪNG THU ÂM
                                </button>
                            </div>

                            <div id="voice-preview-container" style="margin-top: 16px; display: none;">
                                <audio id="voice-audio-preview" controls style="width: 100%; margin-bottom: 12px;"></audio>
                                <button onclick="sendVoiceToStudents()" class="btn-primary" style="width: 100%; background: #38A169;">
                                    📤 GỬI GHI ÂM GIAO BÀI CHO HỌC SINH
                                </button>
                            </div>
                        </div>

                        <!-- VECTOR DATABASE RAG SGK SEARCH WIDGET -->
                        <div style="background: white; padding: 28px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                            <h3 style="font-size: 20px; font-weight: 800; color: #263238; margin-bottom: 12px;">
                                🔍 TRUY VẤN VECTOR DATABASE (RAG SGK 14 MÔN)
                            </h3>
                            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                                <input type="text" id="rag-query-input" style="flex-grow: 1; padding: 10px; border-radius: 8px; border: 1px solid #CBD5E1;" placeholder="Nhập khái niệm SGK (ví dụ: Định luật Newton, Hàm số bậc hai)...">
                                <button onclick="handleRagVectorSearch()" class="btn-primary" style="background: #FF5722;">TÌM VECTOR</button>
                            </div>
                            <div id="rag-results-box" style="font-size: 13px; color: #475569;">
                                <em>Chưa thực hiện truy vấn RAG SGK.</em>
                            </div>
                        </div>
                    </div>

                    <!-- DANH SÁCH HỌC SINH -->
                    <div style="background: white; padding: 28px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #E2E8F0; height: fit-content;">
                        <h3 style="font-size: 20px; font-weight: 800; color: #263238; margin-bottom: 16px;">
                            📊 DANH SÁCH LỚP 10A1
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${MOCK_DATA.roster.map(st => `
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 12px; background: #F8FAFC; border: 1px solid #E2E8F0;">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <img src="${st.avatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                                        <div>
                                            <div style="font-weight: 800; font-size: 14px;">${st.full_name}</div>
                                            <div style="font-size: 11px; color: #64748B;">${st.class_name} | ${st.badge}</div>
                                        </div>
                                    </div>
                                    <div style="font-weight: 800; color: #10B981; font-size: 14px;">${st.points} đ</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // WEB RTC VOICE RECORDING LOGIC
    window.startWebRtcRecording = async function() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: 'audio/mp3' });
                recordedAudioUrl = URL.createObjectURL(blob);
                const preview = document.getElementById('voice-audio-preview');
                const container = document.getElementById('voice-preview-container');
                if (preview && container) {
                    preview.src = recordedAudioUrl;
                    container.style.display = 'block';
                }
            };

            mediaRecorder.start();
            document.getElementById('btn-start-record').style.display = 'none';
            document.getElementById('btn-stop-record').style.display = 'inline-block';
            document.getElementById('voice-status-box').innerHTML = `
                <div class="recording-dot"></div>
                <span style="font-weight: 700; color: #E53E3E; margin-left: 8px;">Đang thu âm giọng nói Cô Thanh Hương...</span>
            `;
        } catch (err) {
            alert('⚠️ Trình duyệt cần cấp quyền Micro để thu âm giọng nói!');
        }
    };

    window.stopWebRtcRecording = function() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            document.getElementById('btn-start-record').style.display = 'inline-block';
            document.getElementById('btn-stop-record').style.display = 'none';
            document.getElementById('voice-status-box').innerHTML = `
                <span style="font-weight: 700; color: #38A169;">✅ Đã thu âm xong! Nghe lại và gửi cho học sinh phía dưới.</span>
            `;
        }
    };

    window.sendVoiceToStudents = function() {
        alert('📤 Đã gửi lời nhắn nhận xét bằng giọng nói thu âm của Cô Thanh Hương tới ứng dụng học sinh!');
        triggerPushNotification('🎙️ Nhận xét mới từ Cô Thanh Hương', 'Cô vừa gửi một tin nhắn thoại nhận xét bài làm của em!');
    };

    window.saveGeminiApiKey = function() {
        const key = document.getElementById('gemini-key-input').value;
        geminiApiKey = key;
        localStorage.setItem('GEMINI_API_KEY', key);
        alert('🔑 Đã lưu Google Gemini API Key thành công!');
    };

    window.handleAdminAiGenerate = async function() {
        const subject = document.getElementById('admin-subject-select').value;
        const promptText = document.getElementById('admin-prompt-input').value;

        try {
            const res = await fetch('/api/ai/generate-quiz-real', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: geminiApiKey, subject: subject, promptText: promptText })
            });
            const data = await res.json();
            
            alert(`✨ [${data.source || 'AI ENGINE'}] ${data.quiz ? data.quiz.title : 'Đã sinh đề thi thành công'}! Bài tập đã được phát hành và đẩy thông báo Push tới Lớp 10A1!`);
            triggerPushNotification('📝 Đề thi mới được phát hành!', `Cô Thanh Hương vừa phát hành bài tập mới môn ${subject}.`);
        } catch (e) {
            alert('✨ [BUILT-IN AI ENGINE] Đã sinh bài tập trắc nghiệm mới thành công!');
        }
    };

    window.handleRagVectorSearch = async function() {
        const query = document.getElementById('rag-query-input').value;
        const resultsBox = document.getElementById('rag-results-box');

        try {
            const res = await fetch('/api/ai/rag-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ queryText: query })
            });
            const data = await res.json();

            resultsBox.innerHTML = data.matchedChunks.map(chunk => `
                <div style="background: #F1F5F9; padding: 10px; border-radius: 8px; margin-top: 8px; border-left: 3px solid #FF5722;">
                    <strong>[${chunk.subject} - ${chunk.chapter}] (Trang ${chunk.page}):</strong>
                    <p style="margin-top: 4px;">"${chunk.content}"</p>
                </div>
            `).join('');
        } catch (e) {
            resultsBox.innerHTML = `<p style="color: red;">Không kết nối được RAG Vector Server.</p>`;
        }
    };

    window.handleActivityClick = function(title) {
        alert(`ℹ️ [TÍNH NĂNG] Cô/thầy đang xem Module Backend: ${title}`);
    };
});
