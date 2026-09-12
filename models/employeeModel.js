const db = require('./db');

async function getAllEmployees() {
  return await db.all('SELECT * FROM employees ORDER BY id');
}

async function getEmployeeById(id) {
  return await db.get('SELECT * FROM employees WHERE id = ?', [id]);
}

async function createEmployee(data) {
  const { name, age, mobile, city, department, salary } = data;
  const result = await db.run(
    `INSERT INTO employees (name, age, mobile, city, department, salary) VALUES (?,?,?,?,?,?)`,
    [name, age, mobile, city, department, salary]
  );
  const insertId = result.insertId;
  return await getEmployeeById(insertId);
}

async function updateEmployee(id, data) {
  const { name, age, mobile, city, department, salary } = data;
  await db.run(
    `UPDATE employees SET name = ?, age = ?, mobile = ?, city = ?, department = ?, salary = ? WHERE id = ?`,
    [name, age, mobile, city, department, salary, id]
  );
  return await getEmployeeById(id);
}

async function deleteEmployee(id) {
  const result = await db.run('DELETE FROM employees WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function getCompensation(id) {
  return await db.get('SELECT department, salary FROM employees WHERE id = ?', [id]);
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getCompensation,
};
