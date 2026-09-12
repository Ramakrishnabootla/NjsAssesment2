# Employee Management API

Simple Node.js + Express API using SQLite. Endpoints are under `/api/employees`.


Run:

```bash
npm install
# If you changed package.json dependencies, reinstall to get mysql2 and dotenv
npm install
npm run start
```

Open http://localhost:3000 in browser to view the landing page.

MySQL setup
1. Create the database and table in your local MySQL instance. Run these queries in a MySQL client (for example `mysql -u root -p`):

```sql
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	age INT,
	mobile VARCHAR(50),
	city VARCHAR(100),
	department VARCHAR(100),
	salary DECIMAL(10,2)
);

INSERT INTO employees (name, age, mobile, city, department, salary) VALUES
('Vishnu', 29, '912345678', 'Chennai', 'Engineering', 45000),
('Rajesh', 30, '9412345678', 'Bangalore', 'Sales', 40000),
('Saravanan', 31, '6812345678', 'Hyderabad', 'HR', 38000);
```

2. Update the `.env` file (already created) if your MySQL user or password differ. Current `.env` defaults:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=employee_db
DB_USER=root
DB_PASSWORD=123456
```

Notes:
- The project now uses MySQL via `mysql2` and reads credentials from `.env`.
- If you previously had a local `employees.db` SQLite file, you can delete it; the project no longer uses SQLite.

