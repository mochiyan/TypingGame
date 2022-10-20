const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");

//非同期でランダムな文章を取得する
function GetRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function RenderNextSentence(){
    const sentence = await GetRandomSentence();
    console.log(sentence);

    typeDisplay.innerText =sentence;
    //文章を一文字ずつ分解してspanタグを生成する
    let onetext = sentence.split("");
   
    onetext.forEach((character)=> {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        console.log(characterSpan);
    });
}

RenderNextSentence();