const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput =document.getElementById("type-Input");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/audio_typing-sound.mp3");
const wrongSound = new Audio("./audio/audio_wrong.mp3");
const correctSound = new Audio("./audio/audio_correct.mp3");

//inputテキストを入力　合っているかどうかの判定
typeInput.addEventListener("input",() => {
//タイプオン
typeSound.play();
typeSound.currentTime = 0 ;


    const sentenceArray = typeDisplay.querySelectorAll("span");
    // console.log(sentenceArray);
    const arrayValue = typeInput.value.split("");
    // console.log(arrayValue);
    let correct = true;
    sentenceArray.forEach((characterSpan,index) => {
        if((arrayValue[index] == null )){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }else if (characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
            // console.log("correct");
        }else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
            // console.log("incorrect");
            wrongSound.volume = 0.1 ;
            wrongSound.play();
            wrongSound.currentTime = 0 ;
            correct = false ;
        }
    });

    if(correct == true){
        correctSound.play();
        correctSound.currentTime = 0 ;
        RenderNextSentence();
    }


});




//非同期でランダムな文章を取得する
function GetRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function RenderNextSentence(){
    const sentence = await GetRandomSentence();
    // console.log(sentence);

    typeDisplay.innerText ="";
    //文章を一文字ずつ分解してspanタグを生成する
    let onetext = sentence.split("");
   //characeterの変数
    onetext.forEach((character)=> {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        // console.log(characterSpan);
        typeDisplay.appendChild(characterSpan);
        // characterSpan.classList.add("correct");
    });

    //テキストボックスの内容を消去
    typeInput.value = "";
    StartTimer();
}
//グローバルで利用可
let startTime ;
let originTime = 30 ;
function StartTimer(){
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = originTime - getTimerTime(); 
        if (timer.innerText <= 0) TimeUp();
    },1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000 );
}
function TimeUp(){
    RenderNextSentence();
}

RenderNextSentence();