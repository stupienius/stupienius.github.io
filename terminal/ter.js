const terminl = document.querySelector('.terminal');
let inputTextarea = document.querySelector("#text");


let isAnimation = false;
let newCommand,newInput,newOutput,container;

window.addEventListener("keydown",(e) => {
    window.scrollTo(0, document.body.offsetHeight);
    inputTextarea.focus();
    inputTextarea.addEventListener('input', function () {
    });
},{passive:true});

addNewCommandBlock();
addParagraphAnimation(banner);


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
    history.push(command);
    switch (command.trim()){
        case 'whoami':
            addParagraphAnimation(whoami);
            break;
        case 'help':
            addParagraphAnimation(help);
            break;
        case 'who':
            addParagraphAnimation(who);
            break;
        case 'project':
            addParagraphAnimation(project);
            break;
        case 'song':
            addParagraphAnimation(song);
            newTab("https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb29s")
            break;
        case 'contact':
            addParagraphAnimation(contact);
            break;
        case 'banner':
            addParagraphAnimation(banner);
            break;
        case 'game':
            addParagraphAnimation(game);
            break;
        case 'history':
            addParagraphAnimation(history);
            break;
        case 'singer':
            addParagraphAnimation(["Must be Post Malone!!!!"]);
            newTab("https://www.postmalone.com/")
            break;
        case 'github':
            addParagraphAnimation(["opening github..."]);
            newTab("https://github.com/stupienius");
            break;
        case 'facebook':
            addParagraphAnimation(["opening facebook..."]);
            newTab("https://www.facebook.com/profile.php?id=100053935834116");
            break;
        case 'instagram':
            addParagraphAnimation(["opening instagram..."]);
            newTab("https://www.instagram.com/stupienius/");
            break;
        case 'x':
            addParagraphAnimation(["opening x..."]);
            newTab("https://twitter.com/stupienius");
            break;
        default:
            addParagraphAnimation(["command not find"]);
    }
}

function toNextCommand(){
    inputTextarea.value = "";
    addNewCommandBlock();
}

function createOutputLine(text){
    const outputLine = document.createElement('div');
    outputLine.textContent = text;
    return outputLine;
}

async function addParagraphAnimation(text) {
    removeCursor();
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
    let link = "";
    let inLabel = false;
    const a = document.createElement("a");
    for (let i=0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        if(text.charAt(i) === " " && text.charAt(i + 1) === " "){
            p.innerHTML += "&nbsp;&nbsp;";
            i++;
        }else{
            if(text.charAt(i) === "("){                                //(class,href)<content>
                i++;
                for(;text.charAt(i) !== ",";i++){
                    color += text.charAt(i);
                }
                i++;
                for(;text.charAt(i) !== ")";i++){
                    link += text.charAt(i);
                }
                i++;
                p.appendChild(a);
                a.classList.add(color);
                if(link.length > 0){
                    a.href = link;
                    a.target = '_blank'
                }
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

function newTab(link){
    setTimeout(function() {
      window.open(link, "_blank");
    }, 500);
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
    inputTextarea.style.top = `${document.body.offsetHeight}px`
    console.log(inputTextarea.style.top)
}

function removeCursor(){
    const cursor = document.querySelectorAll(".cursor");
    cursor.forEach(e => {e.style.display = "none";});
}
