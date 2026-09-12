const express = require('express');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
