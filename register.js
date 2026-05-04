// Cultural Day registration form logic
const guests = [];
const guestList = document.getElementById('guestList');

function renderGuests() {
  guestList.innerHTML = '';
  if (!guests.length) {
    guestList.innerHTML = '<li style="justify-content:center;color:#998">No guests added yet.</li>';
    return;
  }
  guests.forEach((g, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${g.name}</strong> — <em>${g.relation}</em></span>
                    <button data-i="${i}" title="Remove">✕</button>`;
    guestList.appendChild(li);
  });
  guestList.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    guests.splice(+b.dataset.i, 1); renderGuests();
  }));
}
renderGuests();

document.getElementById('addGuestBtn').addEventListener('click', () => {
  const name = document.getElementById('guestName').value.trim();
  const relation = document.getElementById('guestRelation').value;
  if (!name) { alert('Enter the guest\'s full name.'); return; }
  guests.push({ name, relation });
  document.getElementById('guestName').value = '';
  renderGuests();
});

document.getElementById('regForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    user: Auth.current(),
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    grade: grade.value.trim(),
    country: country.value.trim(),
    performance: performance.value.trim(),
    guests: [...guests],
    submittedAt: new Date().toISOString()
  };

  const all = JSON.parse(localStorage.getItem('wm_registrations') || '[]');
  all.push(data);
  localStorage.setItem('wm_registrations', JSON.stringify(all));

  document.getElementById('successText').textContent =
    `Thank you ${data.fullName}! You have successfully registered for World Mission Cultural Day with ${data.guests.length} guest(s). A confirmation has been sent to ${data.email}.`;
  document.getElementById('successModal').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('successModal').classList.add('hidden');
  document.getElementById('regForm').reset();
  guests.length = 0; renderGuests();
});
