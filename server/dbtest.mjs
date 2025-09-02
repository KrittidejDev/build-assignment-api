import connectionPool from "./db/db.mjs"; // path ต้องถูกต้อง

const pool = connectionPool;

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB Connected:", res.rows[0]);
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  } finally {
    await pool.end(); // ปิด connection
  }
};

testConnection(); // เรียก function จริง ๆ
