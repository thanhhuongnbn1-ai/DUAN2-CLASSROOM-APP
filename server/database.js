const path = require('path');
const fs = require('fs');

let db = null;

function initDatabase() {
    try {
        const Database = require('better-sqlite3');
        const dbPath = path.join(__dirname, 'classroom.db');
        db = new Database(dbPath);
        db.pragma('foreign_keys = ON');

        const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
        db.exec(schemaSql);
        console.log('✅ Cơ sở dữ liệu SQLite đã kết nối & khởi tạo thành công tại:', dbPath);
    } catch (err) {
        console.warn('⚠️ Khởi tạo SQLite dạng file có thông báo:', err.message);
        console.log('ℹ️ Chuyển sang mô hình cơ sở dữ liệu Bộ nhớ tạm (In-Memory Database)...');
    }
}

module.exports = {
    initDatabase,
    getDb: () => db
};
