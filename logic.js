
// Shorthand function operator => arrow.
const  btn = document.getElementById("btn");
const prescript = document.getElementById("prescript");
const prescriptSound = new Audio('assets/sound/prescript.mp3');
const callIndex = document.getElementById("callIndex");
const musicStatus = document.getElementById("audbtn");
var taskProgress = false;

function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
//We have to make it synchronous so when we are displaying the correct
//message it does not get messed up and we have its length

async function text_scrambly(){

    if(taskProgress) return;

    // The command randomly selected from the txt file.
    var command;
    var count = 0;
    var amountCorrect = 0;

    fetch("RandomCommands.txt")
        .then(response => response.text())
        .then(async data => {
            let lines = data.split("\n")
            command = lines[Math.floor(Math.random() * lines.length)];
    
            prescriptSound.currentTime = 0.3;
            prescriptSound.play();

            taskProgress = true;

            while (true){
                if (count < 10){
                    let placeholder = "";
                    for(i = 0; i < command.length; i++){
                        placeholder += String.fromCharCode(Math.floor(Math.random() * 128) + 33);
                
                    }
                    prescript.textContent = placeholder; 
                    count += 1;
                    await sleep(35);
                }
                else{
                    let correctText = "";
                    let placeholder = "";
            
                    for(i = 0; i < command.slice(0, amountCorrect+1).length; i++){
                        correctText += command[i];
                    }
                    for(i = 0; i < command.length-amountCorrect; i++){
                        placeholder += String.fromCharCode(Math.floor(Math.random() * 128) + 33);
                    }
                    correctText += placeholder;
                    prescript.textContent = correctText;
                    if(amountCorrect == command.length){
                        break;
                    }
                    else{
                        amountCorrect += 1;
                    }
                    await sleep(15);
                }
            }   taskProgress = false;

    })
    .catch(error => console.error("Error trying to fetch file", error));
    
}
function onOffMusic(){
    if(musicStatus.textContent == "Music: Off"){
        musicStatus.textContent = "Music: On";
        callIndex.volume = 0.5;
        callIndex.currentTime = 0;
    }
    else{
        musicStatus.textContent = "Music: Off";
        callIndex.volume = 0;
    }
}

callIndex.volume = 0.5;

btn.addEventListener("click", text_scrambly);
musicStatus.addEventListener("click", onOffMusic);
