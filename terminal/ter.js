// ==============================
// Terminal Elements & State
// ==============================
const terminal = document.querySelector(".terminal");
const inputTextarea = document.querySelector("#text");

let isAnimation = false;
let currentCommandBlock = {};

let isQuizMode = false;
let quizIndex = 0;
let quizScore = 0;

// ==============================
// Terminal Initialization
// ==============================
window.addEventListener(
  "keydown",
  (e) => {
    window.scrollTo(0, document.body.offsetHeight);
    inputTextarea.focus();
  },
  { passive: true },
);

// Add initial command block and banner
(async () => {
  addNewCommandBlock(false);
  await animateParagraph(banner);
  addNewCommandBlock();
})();
// ==============================
// COMMAND EXECUTION LOGIC
// ==============================
function inputPrompt(textarea, e) {
  if (isAnimation) return;

  const basePrompt = `<div class="prompt_hit">visitor@stupienius.Web:~$ </div>`;
  const cursor = `<div class="cursor"></div>`;

  // Show typed letter immediately for alphabet keys
  if (/^[a-zA-Z]$/.test(e.key)) {
    currentCommandBlock.input.innerHTML = `${basePrompt}
      <div class="prompt_input">${textarea.value}${e.key}</div>${cursor}`;
  } else if (e.key == "") {
    currentCommandBlock.input.innerHTML = `${basePrompt}
      <div class="prompt_input">${textarea.value} </div>${cursor}`;
  } else {
    setTimeout(() => {
      currentCommandBlock.input.innerHTML = `${basePrompt}
        <div class="prompt_input">${textarea.value}</div>${cursor}`;
    }, 20);
  }
}

async function executeCommand(textarea, e) {
  if (isAnimation || e.key !== "Enter") return;

  if (isQuizMode && e.key === "Enter") {
    const answer = textarea.value.trim().toUpperCase();
    checkQuizAnswer(answer);
    return;
  }

  const command = textarea.value.trim().split(" ")[0];
  commandHistory.push(command);

  const commandActions = {
    whoami: () => animateParagraph(whoami),
    help: () => animateParagraph(help),
    who: () => animateParagraph(who),
    project: () => animateParagraph(project),
    song: () => {
      openNewTab(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb29s",
      );
      return animateParagraph(song);
    },
    contact: () => animateParagraph(contact),
    banner: () => animateParagraph(banner),
    history: () => animateParagraph(commandHistory),
    favs: () => animateParagraph(favorites),
    funtools: () => animateParagraph(funtools),
    about: () => animateParagraph(about),
    singer: () => {
      openNewTab("https://www.jojimusic.com/");
      return animateParagraph(["Must be Joji!!!!"]);
    },
    github: () => {
      openNewTab("https://github.com/stupienius");
      return animateParagraph(["opening github..."]);
    },
    facebook: () => {
      openNewTab("https://www.facebook.com/profile.php?id=100053935834116");
      return animateParagraph(["opening facebook..."]);
    },
    instagram: () => {
      openNewTab("https://www.instagram.com/stupienius/");
      return animateParagraph(["opening instagram..."]);
    },
    x: () => {
      openNewTab("https://twitter.com/stupienius");
      return animateParagraph(["opening x..."]);
    },
    clear: () => {
      terminal.innerHTML = "";
      return addNewCommandBlock();
    },
    echo: () => {
      const text = inputTextarea.value.slice(5).trim(); // get everything after "echo "
      return animateParagraph([text || ""]);
    },
    coin: () => {
      const result = Math.random() < 0.5 ? "Heads 🪙" : "Tails 🪙";
      return animateParagraph([`You flipped a coin: ${result}`]);
    },
    hack: () => animateParagraph(hackSequence),
    matrix: () => animateMatrix(),
    roll: () => {
      const sides = 6;
      const result = Math.floor(Math.random() * sides) + 1;
      return animateParagraph([`🎲 You rolled a ${result}`]);
    },

    quiz: () => {
      startQuiz();
    },
    // coffee: () => {
    //   animateParagraph(coffee);
    // },
  };

  // Execute command or fallback
  if (commandActions[command]) {
    await commandActions[command]();
  } else {
    await animateParagraph(["command not found"]);
  }

  if (command != "quiz" && command != "clear") {
    addNewCommandBlock();
  }
}

// ==============================
// COMMAND BLOCK MANAGEMENT
// ==============================
function addNewCommandBlock(input_hint = true) {
  currentCommandBlock = {
    container: document.createElement("div"),
    input: document.createElement("div"),
    output: document.createElement("div"),
  };

  terminal.appendChild(currentCommandBlock.container);
  currentCommandBlock.container.classList.add("container");

  currentCommandBlock.container.appendChild(currentCommandBlock.input);
  currentCommandBlock.input.classList.add("input");

  currentCommandBlock.container.appendChild(currentCommandBlock.output);
  currentCommandBlock.output.classList.add("output");

  if (input_hint) {
    currentCommandBlock.input.innerHTML = `
    <div class="prompt_hit">visitor@stupienius.Web:~$ </div>
    <div class="cursor"></div>`;
  }

  inputTextarea.value = "";
  window.scrollTo(0, document.body.offsetHeight);
  inputTextarea.style.top = `${document.body.offsetHeight}px`;
}

function removeCursor() {
  document
    .querySelectorAll(".cursor")
    .forEach((el) => (el.style.display = "none"));
}

// ==============================
// ANIMATION UTILS
// ==============================
async function animateParagraph(lines) {
  removeCursor();
  isAnimation = true;
  for (const line of lines) await animateLine(line);
  isAnimation = false;
}

async function animateLine(text) {
  const p = document.createElement("p");
  currentCommandBlock.output.appendChild(p);

  let link = "",
    color = "",
    inLabel = false;
  const a = document.createElement("a");

  for (let i = 0; i < text.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1));

    if (text[i] === " " && text[i + 1] === " ") {
      p.innerHTML += "&nbsp;&nbsp;";
      i++;
      continue;
    }

    // Parse color/link syntax: (class,link)<content>
    if (text[i] === "(") {
      i++;
      while (text[i] !== ",") color += text[i++];
      i++;
      while (text[i] !== ")") link += text[i++];
      i++;
      p.appendChild(a);
      if (link) {
        a.href = link;
        a.target = "_blank";
      }
      a.classList.add(color);
      color = link = "";
    }

    if (text[i] === "<" || text[i] === ">") {
      inLabel = !inLabel;
      i++;
    }

    if (inLabel) a.innerHTML += text[i];
    else p.innerHTML += text[i];

    window.scrollTo(0, document.body.offsetHeight);
  }

  p.innerHTML += "<br>";
}

async function animateMatrix() {
  removeCursor();
  isAnimation = true;

  const cols = 130; // number of columns
  const rows = 20; // number of lines on screen
  const chars = "01"; // characters to display
  const speed = 50; // ms per frame

  // initialize columns with random positions
  const columnDrops = Array(cols);

  for (let i = 0; i < cols; i++) {
    columnDrops[i] = Math.floor(Math.random() * rows);
  }

  // create a container div for the matrix
  const matrixContainer = document.createElement("div");
  matrixContainer.style.fontFamily = "monospace";
  matrixContainer.style.whiteSpace = "pre";
  matrixContainer.style.color = "#ee4a9f"; // green text
  currentCommandBlock.output.appendChild(matrixContainer);

  // animate the matrix
  for (let i = 0; i < 50; i++) {
    // number of frames
    let frame = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // decide if we print a char based on column drop
        if (y === columnDrops[x]) {
          frame += chars[Math.floor(Math.random() * chars.length)];
        } else {
          frame += " ";
        }
      }
      frame += "\n";
    }

    matrixContainer.textContent = frame;

    // move each column down
    for (let x = 0; x < cols; x++) {
      if (Math.random() > 0.9)
        columnDrops[x] = 0; // reset randomly
      else columnDrops[x] = (columnDrops[x] + 1) % rows;
    }

    await new Promise((resolve) => setTimeout(resolve, speed));
  }

  isAnimation = false;
}

// ==============================
// QUIZ MODE
// ==============================

async function startQuiz() {
  isQuizMode = true;
  quizIndex = 0;
  quizScore = 0;

  await animateParagraph([
    "🎮 Welcome to the Terminal Quiz!",
    "Type A, B, C, or D and press Enter.",
    "",
  ]);

  await showNextQuestion();
}

async function showNextQuestion() {
  if (quizIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }

  const q = quizQuestions[quizIndex];

  await animateParagraph([
    `-- Question ${quizIndex + 1}:`,
    q.question,
    "",
    ...q.options,
    "",
  ]);

  addNewCommandBlock();
}

async function checkQuizAnswer(answer) {
  const correct = quizQuestions[quizIndex].answer;

  if (answer === correct) {
    quizScore++;
    await animateParagraph(["✅ Correct!", ""]);
  } else {
    await animateParagraph([`❌ Wrong! Correct answer was ${correct}`, ""]);
  }

  quizIndex++;
  showNextQuestion();
}

async function endQuiz() {
  isQuizMode = false;

  await animateParagraph([
    "🏁 Quiz Finished!",
    `Your score: ${quizScore}/${quizQuestions.length}`,
    "",
    quizScore === quizQuestions.length
      ? "You got A, Average, let me see A++ next time"
      : quizScore > 1
        ? "F, failure"
        : "You are suck!",
  ]);

  addNewCommandBlock();
}

function openNewTab(link) {
  setTimeout(() => window.open(link, "_blank"), 1500);
}
