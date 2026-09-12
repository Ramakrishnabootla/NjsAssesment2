const Employee = require('../models/employeeModel');

async function getAll(req, res) {
  try {
    const rows = await Employee.getAllEmployees();
    res.status(200).json(rows);
  } catch (err) {
    res.status(200).json([]);
  }
}

async function getById(req, res) {
  try {
    const id = req.params.id;
    const emp = await Employee.getEmployeeById(id);
    res.status(200).json(emp || {});
  } catch (err) {
    res.status(200).json({});
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const created = await Employee.createEmployee(data);
    res.status(200).json(created || {});
  } catch (err) {
    res.status(200).json({});
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await Employee.updateEmployee(id, data);
    res.status(200).json(updated || {});
  } catch (err) {
    res.status(200).json({});
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Employee.deleteEmployee(id);
    res.status(200).json({ success: !!deleted });
  } catch (err) {
    res.status(200).json({ success: false });
  }
}

async function compensation(req, res) {
  try {
    const id = req.params.id;
    const comp = await Employee.getCompensation(id);
    res.status(200).json(comp || {});
  } catch (err) {
    res.status(200).json({});
  }
}

module.exports = { getAll, getById, create, update, remove, compensation };
