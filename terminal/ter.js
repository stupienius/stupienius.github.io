// ==============================
// Terminal Elements & State
// ==============================
const terminal = document.querySelector(".terminal");
const inputTextarea = document.querySelector("#text");

let isAnimation = false;
let currentCommandBlock = {};

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
addNewCommandBlock();
animateParagraph(banner);

// ==============================
// COMMAND EXECUTION LOGIC
// ==============================
function inputPrompt(textarea, e) {
  if (isAnimation) return;

  const basePrompt = `<div class="prompt_hit">visitor@stupienius.Web:~$ </div>`;
  const cursor = `<div class="cursor"></div>`;

  console.log(e.key);

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

function executeCommand(textarea, e) {
  if (isAnimation || e.key !== "Enter") return;

  const command = textarea.value.trim().split(" ")[0];
  commandHistory.push(command);

  const commandActions = {
    whoami: () => animateParagraph(whoami),
    help: () => animateParagraph(help),
    who: () => animateParagraph(who),
    project: () => animateParagraph(project),
    song: () => {
      animateParagraph(song);
      openNewTab(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb29s",
      );
    },
    contact: () => animateParagraph(contact),
    banner: () => animateParagraph(banner),
    history: () => animateParagraph(commandHistory),
    singer: () => {
      animateParagraph(["Must be Post Malone!!!!"]);
      openNewTab("https://www.postmalone.com/");
    },
    github: () => {
      animateParagraph(["opening github..."]);
      openNewTab("https://github.com/stupienius");
    },
    facebook: () => {
      animateParagraph(["opening facebook..."]);
      openNewTab("https://www.facebook.com/profile.php?id=100053935834116");
    },
    instagram: () => {
      animateParagraph(["opening instagram..."]);
      openNewTab("https://www.instagram.com/stupienius/");
    },
    x: () => {
      animateParagraph(["opening x..."]);
      openNewTab("https://twitter.com/stupienius");
    },
    clear: () => {
      terminal.innerHTML = "";
      addNewCommandBlock();
    },
    echo: () => {
      const text = inputTextarea.value.slice(5).trim(); // get everything after "echo "
      animateParagraph([text || ""]);
    },
    coin: () => {
      const result = Math.random() < 0.5 ? "Heads 🪙" : "Tails 🪙";
      animateParagraph([`You flipped a coin: ${result}`]);
    },
    hack: () => {
      animateParagraph(hackSequence);
    },
    matrix: () => {
      animateMatrix();
    },
    roll: () => {
      const sides = 6;
      const result = Math.floor(Math.random() * sides) + 1;
      animateParagraph([`🎲 You rolled a ${result}`]);
    },
    // coffee: () => {
    //   animateParagraph(coffee);
    // },
  };

  // Execute command or fallback
  if (commandActions[command]) {
    commandActions[command]();
  } else {
    animateParagraph(["command not found"]);
  }
}

// ==============================
// COMMAND BLOCK MANAGEMENT
// ==============================
function addNewCommandBlock() {
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

  currentCommandBlock.input.innerHTML = `
    <div class="prompt_hit">visitor@stupienius.Web:~$ </div>
    <div class="cursor"></div>`;

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
  addNewCommandBlock();
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
  addNewCommandBlock();
}

function openNewTab(link) {
  setTimeout(() => window.open(link, "_blank"), 1500);
}
