// Shared auth helpers (localStorage-based demo backend)
const Auth = {
  users: () => JSON.parse(localStorage.getItem('wm_users') || '[]'),
  saveUsers: (u) => localStorage.setItem('wm_users', JSON.stringify(u)),
  current: () => JSON.parse(localStorage.getItem('wm_current') || 'null'),
  setCurrent: (u) => localStorage.setItem('wm_current', JSON.stringify(u)),
  logout: () => { localStorage.removeItem('wm_current'); location.href = 'index.html'; }
};

// ---- Login page logic ----
const tabs = document.querySelectorAll('.tab');
if (tabs.length) {
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.tab + 'Form').classList.add('active');
  }));

  if (Auth.current()) location.href = 'register.html';

  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupName.value.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const password = signupPassword.value;
    const msg = document.getElementById('signupMsg');
    const users = Auth.users();
    if (users.find(u => u.email === email)) {
      msg.textContent = 'Email already registered. Please log in.';
      msg.className = 'msg error';
      return;
    }
    users.push({ name, email, password });
    Auth.saveUsers(users);
    msg.textContent = '✓ Account created! You can now log in.';
    msg.className = 'msg ok';
    setTimeout(() => document.querySelector('.tab[data-tab="login"]').click(), 800);
  });

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;
    const msg = document.getElementById('loginMsg');
    const user = Auth.users().find(u => u.email === email && u.password === password);
    if (!user) {
      msg.textContent = 'Invalid email or password.';
      msg.className = 'msg error';
      return;
    }
    Auth.setCurrent({ name: user.name, email: user.email });
    msg.textContent = '✓ Welcome ' + user.name + '!';
    msg.className = 'msg ok';
    setTimeout(() => location.href = 'register.html', 600);
  });
}

// ---- Top bar (register page) ----
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  const cur = Auth.current();
  if (!cur) { location.href = 'index.html'; }
  else document.getElementById('who').textContent = 'Hi, ' + cur.name;
  logoutBtn.addEventListener('click', Auth.logout);
}
