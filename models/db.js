const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

require('dotenv').config();

const dbFilePath = path.join(__dirname, '..', 'employees.db');
let sqlDb;

async function initDatabase() {
  const SQL = await initSqlJs({
    locateFile: file => path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file),
  });

  const fileExists = fs.existsSync(dbFilePath);
  const buffer = fileExists ? fs.readFileSync(dbFilePath) : Buffer.alloc(0);

  sqlDb = new SQL.Database(new Uint8Array(buffer));

  if (!fileExists) {
    sqlDb.run(`
      CREATE TABLE employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        mobile TEXT,
        city TEXT,
        department TEXT,
        salary REAL
      );
    `);
    persistDatabase();
  }
}

function persistDatabase() {
  if (!sqlDb) {
    return;
  }

  const binary = Buffer.from(sqlDb.export());
  fs.writeFileSync(dbFilePath, binary);
}

async function run(sql, params = []) {
  if (!sqlDb) {
    await initDatabase();
  }

  if (params && params.length) {
    sqlDb.run(sql, params);
  } else {
    sqlDb.run(sql);
  }

  const result = {
    insertId: sqlDb.exec('SELECT last_insert_rowid() AS insertId')[0]?.values?.[0]?.[0] ?? 0,
    affectedRows: sqlDb.exec('SELECT changes() AS affectedRows')[0]?.values?.[0]?.[0] ?? 0,
  };

  persistDatabase();
  return result;
}

async function get(sql, params = []) {
  if (!sqlDb) {
    await initDatabase();
  }

  const stmt = sqlDb.prepare(sql);
  if (params && params.length) {
    stmt.bind(params);
  }

  const result = stmt.step() ? stmt.getAsObject() : undefined;
  stmt.free();
  return result;
}

async function all(sql, params = []) {
  if (!sqlDb) {
    await initDatabase();
  }

  const stmt = sqlDb.prepare(sql);
  if (params && params.length) {
    stmt.bind(params);
  }

  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

module.exports = { initDatabase, run, get, all };
