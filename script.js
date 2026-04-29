let current = 0;
let score = 0;
let xp = localStorage.getItem("xp") || 0;

const questions = [
  {
    q: "Что такое атом?",
    a: ["Молекула", "Частица вещества", "Элемент", "Газ"],
    correct: 1
  },
  {
    q: "H2O это?",
    a: ["Кислород", "Вода", "Водород", "Соль"],
    correct: 1
  }
];

function showSection(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function openTopic(topic) {
  let text = "";
  if(topic === "atom") text = "Атом — мельчайшая частица вещества.";
  if(topic === "valence") text = "Валентность — способность атома соединяться.";
  if(topic === "reaction") text = "Реакция — превращение веществ.";

  document.getElementById("topicContent").innerText = text;
}

function loadQuestion() {
  let q = questions[current];
  let html = `<h3>${q.q}</h3>`;
  q.a.forEach((ans, i) => {
    html += `<button onclick="answer(${i})">${ans}</button><br>`;
  });
  document.getElementById("quiz").innerHTML = html;
}

function answer(i) {
  if(i === questions[current].correct) {
    alert("✔ Правильно");
    score++;
    xp++;
  } else {
    alert("❌ Неправильно");
  }
}

function nextQuestion() {
  current++;
  if(current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("result").innerText =
      `Результат: ${score}/${questions.length}`;
    localStorage.setItem("xp", xp);
  }
}

loadQuestion();

let formula = "";

function addSymbol(s) {
  formula += s;
  document.getElementById("formula").innerText = formula;
}

function checkFormula() {
  if(formula === "H2O") {
    alert("Правильно!");
    xp += 2;
  } else {
    alert("Неправильно");
  }
  formula = "";
}

function showElement(el) {
  let info = {
    H: "Водород, 1",
    O: "Кислород, 8",
    Na: "Натрий, 11"
  };
  document.getElementById("elementInfo").innerText = info[el];
}

document.getElementById("xp").innerText = xp;
document.getElementById("level").innerText = Math.floor(xp / 10) + 1;

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
};

function answer(i) {
  let correct = questions[current].correct;

  if(i === correct) {
    playSound("correct");
    alert("✔ Правильно");
    score++;
    xp += 2;
  } else {
    playSound("wrong");
    alert("❌ Неправильно");
  }
}

function nextQuestion() {
  current++;

  let progress = (current / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  if(current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("result").innerText =
      `Результат: ${score}/${questions.length}`;
    localStorage.setItem("xp", xp);
  }
}

/* SOUND */
function playSound(type) {
  let audio = new Audio(
    type === "correct"
      ? "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
      : "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3"
  );
  audio.play();
}

function openQuiz(){
  document.getElementById("quizModal").style.display="flex";
  i=0;
  score=0;
  load();
}

function closeQuiz(){
  document.getElementById("quizModal").style.display="none";
}