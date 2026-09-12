const apiBase = '/api/employees';

const $ = sel => document.querySelector(sel);
const tbody = document.querySelector('#employeesTable tbody');
const loading = $('#loading');

function showLoading() { loading.hidden = false }
function hideLoading() { loading.hidden = true }

async function request(url, options = {}) {
  try {
    showLoading();
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } finally {
    hideLoading();
  }
}

async function loadEmployees() {
  const list = await request(apiBase);
  renderTable(Array.isArray(list) ? list : []);
}

function renderTable(rows) {
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id ?? ''}</td>
      <td>${r.name ?? ''}</td>
      <td>${r.age ?? ''}</td>
      <td>${r.mobile ?? ''}</td>
      <td>${r.city ?? ''}</td>
      <td>${r.department ?? ''}</td>
      <td>${r.salary ?? ''}</td>
      <td>
        <button class="action-btn edit" data-id="${r.id}">Edit</button>
        <button class="action-btn delete" data-id="${r.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('employeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = $('#empId').value;
  const payload = {
    name: $('#name').value,
    age: Number($('#age').value) || null,
    mobile: $('#mobile').value,
    city: $('#city').value,
    department: $('#department').value,
    salary: Number($('#salary').value) || null,
  };

  if (id) {
    await request(`${apiBase}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } else {
    await request(apiBase, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  }
  resetForm();
  loadEmployees();
});

function resetForm() {
  $('#empId').value = '';
  $('#name').value = '';
  $('#age').value = '';
  $('#mobile').value = '';
  $('#city').value = '';
  $('#department').value = '';
  $('#salary').value = '';
}

tbody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.classList.contains('edit')) {
    const emp = await request(`${apiBase}/${id}`);
    $('#empId').value = emp.id || '';
    $('#name').value = emp.name || '';
    $('#age').value = emp.age || '';
    $('#mobile').value = emp.mobile || '';
    $('#city').value = emp.city || '';
    $('#department').value = emp.department || '';
    $('#salary').value = emp.salary || '';
  } else if (btn.classList.contains('delete')) {
    if (!confirm('Delete this employee?')) return;
    await request(`${apiBase}/${id}`, { method: 'DELETE' });
    loadEmployees();
  }
});

// Initial load
loadEmployees();
