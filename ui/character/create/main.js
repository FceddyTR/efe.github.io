const genderButtons = Array.from(document.querySelectorAll('.segment'));
const continueSkillBtn = document.getElementById('continue-skill');
const backGenderBtn = document.getElementById('back-gender');
const confirmBtn = document.getElementById('confirm-selection');
const startBtn = document.getElementById('start-button');
const editGenderBtn = document.getElementById('edit-gender');
const editSkillBtn = document.getElementById('edit-skill');
const startMessage = document.getElementById('start-message');
const summaryGender = document.getElementById('summary-gender');
const summarySkillName = document.getElementById('summary-skill-name');
const summarySkillDesc = document.getElementById('summary-skill-desc');

const steps = {
  gender: document.getElementById('step-gender'),
  skills: document.getElementById('step-skills'),
  summary: document.getElementById('step-summary'),
};

const state = {
  gender: null,
  skillSets: [],
  selectedSkill: null,
};

function showStep(key) {
  Object.values(steps).forEach((section) => section.classList.remove('active'));
  steps[key].classList.add('active');
}

function updateGenderSelection(value) {
  state.gender = value;
  genderButtons.forEach((btn) => {
    const active = btn.dataset.gender === value;
    btn.setAttribute('aria-pressed', active);
    btn.classList.toggle('selected', active);
  });
  continueSkillBtn.disabled = !value;
}

function renderSkillCards() {
  const grid = document.getElementById('skill-card-grid');
  grid.innerHTML = '';

  state.skillSets.forEach((skill) => {
    const card = document.createElement('article');
    card.tabIndex = 0;
    card.className = 'card';
    card.dataset.skillId = skill.id;
    card.innerHTML = `
      <div>
        <h3>${skill.name}</h3>
        <p class="summary-text">${skill.summary}</p>
      </div>
      <div>
        <p class="muted strong">Yetenekler</p>
        <ul>
          ${skill.abilities.map((a) => `<li><strong>${a.name}:</strong> ${a.description ?? ''}</li>`).join('')}
        </ul>
      </div>
    `;

    const selectCard = () => {
      state.selectedSkill = skill;
      document.querySelectorAll('.card').forEach((el) => el.classList.remove('selected'));
      card.classList.add('selected');
      confirmBtn.disabled = false;
    };

    card.addEventListener('click', selectCard);
    card.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectCard();
      }
    });

    grid.appendChild(card);
  });
}

async function loadSkillSets() {
  try {
    const res = await fetch('../../../data/skill_sets.json');
    state.skillSets = await res.json();
    renderSkillCards();
  } catch (error) {
    const grid = document.getElementById('skill-card-grid');
    grid.innerHTML = '<p class="muted">Yetenek setleri yüklenemedi.</p>';
    console.error('Skill set load failed', error);
  }
}

function populateSummary() {
  const genderLabels = {
    female: 'Kadın',
    male: 'Erkek',
    nonbinary: 'Diğer',
  };
  summaryGender.textContent = genderLabels[state.gender] ?? '-';
  summarySkillName.textContent = state.selectedSkill?.name ?? '-';
  summarySkillDesc.textContent = state.selectedSkill?.summary ?? '';
}

function handleStart() {
  const request = {
    gender: state.gender,
    skillSetId: state.selectedSkill?.id,
  };
  startMessage.textContent = `Gönderildi: ${JSON.stringify(request, null, 0)}`;
}

// event bindings

genderButtons.forEach((btn) => {
  btn.addEventListener('click', () => updateGenderSelection(btn.dataset.gender));
});

continueSkillBtn.addEventListener('click', () => {
  showStep('skills');
});

backGenderBtn.addEventListener('click', () => {
  showStep('gender');
});

confirmBtn.addEventListener('click', () => {
  if (!state.selectedSkill) return;
  populateSummary();
  showStep('summary');
});

startBtn.addEventListener('click', () => {
  if (!state.selectedSkill) return;
  handleStart();
});

editGenderBtn.addEventListener('click', () => {
  showStep('gender');
});

editSkillBtn.addEventListener('click', () => {
  showStep('skills');
});

loadSkillSets();
