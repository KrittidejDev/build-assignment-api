import connectionPool from "../db/db.mjs";

// ดึง assignments ทั้งหมด
export const getAllAssignments = async () => {
  const result = await connectionPool.query("SELECT * FROM assignments ");
  return result.rows;
};

// ดึง assignment ตาม id
export const getAssignmentById = async (id) => {
  const result = await connectionPool.query(
    "SELECT * FROM assignments WHERE assignment_id = $1",
    [id]
  );
  return result.rows[0];
};

// สร้าง assignment
export const createAssignment = async (data) => {
  const dataTemp = {
    ...data,
    created_at: new Date(),
    updated_at: new Date(),
    published_at: new Date(),
  };

  const result = await connectionPool.query(
    "INSERT INTO assignments (title, content, category,created_at,updated_at,published_at) VALUES ($1, $2, $3, $4, $5, $6) ",
    [
      dataTemp.title,
      dataTemp.content,
      dataTemp.category,
      dataTemp.created_at,
      dataTemp.updated_at,
      dataTemp.published_at,
    ]
  );
  return result.rows[0];
};

// แก้ไข assignment
export const updateAssignment = async (id, data) => {
  const { title, content, category } = data;
  await connectionPool.query(
    "UPDATE assignments SET title = $1, content = $2, category = $3 WHERE assignment_id = $4",
    [title, content, category, id]
  );
};

// ลบ assignment
export const deleteAssignment = async (id) => {
  await connectionPool.query(
    "DELETE FROM assignments WHERE assignment_id = $1",
    [id]
  );
};
