const terminl = document.querySelector('.terminal');
const inputTextarea = document.querySelector("#text");


let isAnimation = false;
let newCommand;
let newInput;
let newOutput;
let container;

window.addEventListener("keydown",function(){
    inputTextarea.focus();
    inputTextarea.addEventListener('input', function () {
    });
});

addNewCommandBlock();
addParagraphAnimation(asciiArt);


function inputPrompt(textarea ,e){
    if(isAnimation) return ;
    if(/^[a-zA-Z]$/.test(e.key)){
        newInput.innerHTML = 
        `<div class = "prompt_hit">visitor@stupienius.Web:~$ </div>
         <div class = "prompt_input">${textarea.value}${e.key}</div>
         <div class = "cursor"></div>`;
    }else{
        setTimeout(() => {
            newInput.innerHTML = 
            `<div class = "prompt_hit">visitor@stupienius.Web:~$ </div>
             <div class = "prompt_input">${textarea.value}</div>
             <div class = "cursor"></div>`;
        }, 20);
    }
}


function executeCommand(textarea,e){
    if(isAnimation) return ;
    if(e.key !== "Enter") return;
    const command = textarea.value;
    switch (command.trim()){
        case 'whoami':
            addParagraphAnimation(whoami);
            break;
        case 'help':
            addParagraphAnimation(help);
            break;
        case 'test':
            addParagraphAnimation(test);
            break;
        case 'about':
            newOutput.appendChild(createOutputLine('This is a terminal-like website example.'));
            break;
        case 'contact':
            newOutput.appendChild(createOutputLine('Contact us at example@example.com'));
            break;
        default:
            addParagraphAnimation(["command not find"]);
    }
}

function toNextCommand(){
    inputTextarea.value = "";
    removeCursor();
    addNewCommandBlock();
}

function createOutputLine(text){
    const outputLine = document.createElement('div');
    outputLine.textContent = text;
    return outputLine;
}

async function addParagraphAnimation(text) {
    isAnimation = true;
    for (const line of text) {
      await addLineAnimation(line);
    }
    isAnimation = false;
    toNextCommand();
}

async function addLineAnimation(text){
    const p = document.createElement("p");
    newOutput.appendChild(p);
    let color = "";
    let inLabel = false;
    const a = document.createElement("div");
    for (let i=0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 5));
        if(text.charAt(i) === " " && text.charAt(i + 1) === " "){
            p.innerHTML += "&nbsp;&nbsp;";
            i++;
        }else{
            if(text.charAt(i) === "("){
                i++;
                for(;text.charAt(i) !== ")";i++){
                    color += text.charAt(i);
                }
                i++;
                p.appendChild(a);
                a.classList.add(color);
            }
            if(text.charAt(i) === "<" || text.charAt(i) === ">"){
                inLabel = !inLabel;
                i++; 
            }
            if(inLabel){
                a.innerHTML += text.charAt(i);
            }else{
                p.innerHTML += text.charAt(i);
            }
        }
    }
    p.innerHTML += "<br>";
    window.scrollTo(0, document.body.offsetHeight);
}


function addNewCommandBlock(){
    newCommand = null;
    newInput = null;
    newOutput = null;
    container = null;

    newCommand = document.createElement('div');
    newInput = document.createElement('div');
    newOutput = document.createElement('div');

    container = terminl.appendChild(newCommand);
    newCommand.classList.add('container');
    
    container.appendChild(newInput);
    newInput.classList.add('input');
    
    container.appendChild(newOutput);
    newOutput.classList.add('output');

    newInput.innerHTML =
    `<div class = "prompt_hit">visitor@stupienius.Web:~$ </div>
     <div class = "cursor"></div>`
     
    window.scrollTo(0, document.body.offsetHeight);
}

function removeCursor(){
    const cursor = document.querySelectorAll(".cursor");
    cursor.forEach(e => {e.style.display = "none";});
}
