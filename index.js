import { songData } from "./data.js";
console.log("SONGDATA LENGTH"+songData.length)
// document.getElementById("heading").textContent = songData.length
let sum = 0
let currArray = new Array(32).fill(0).map(function(){
    return sum++
})
let roundOf = 32
let nextArray =[]
let ranking = [1,2,3,4,5,6,7,8]
let currFirst = 0;
let currSecond = 0;
let isClickable = true;
function arrayRemove(value) {
    return currArray.filter(function(ele){ 
        return ele != value; 
    });
}
function getRandomIndex(len){
    return Math.floor(Math.random()*len)
}
function arrayOperation(len){
    let ans = getRandomIndex(len)
    ans = currArray[ans]
    console.log("currIndex = "+ans)
    currArray = arrayRemove(ans)
    console.log(currArray)
    return ans
}
function renderEnd(){
    let str = ``
    str += `<div class = "endMain">`
    str += `<h2 class = "endTop" >👑 1. ${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endMid" >2. ${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endMid" >3. ${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endLower" >${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endLower" >${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endLower" >${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endEnd" >${songData[ranking.pop()].title}</h2>`
    str += `<h2 class = "endEnd" >${songData[ranking.pop()].title}</h2>`
    str += `</div>`
    document.getElementById("main-el").innerHTML= str

    console.log("THIS IS THE END")
}
function render(){
    if(currArray.length==0){
        console.log("array reassign")
        currArray=nextArray
        if(currArray.length==1){
            ranking.push(currArray[0])
            renderEnd()
            return
        }
        nextArray=[]
        console.log("array after reassign = "+currArray)
        roundOf = currArray.length
    }
    console.log(currArray)
    console.log("nextArray = "+nextArray)
    currFirst = arrayOperation(currArray.length)
    currSecond = arrayOperation(currArray.length)
    document.getElementById("main-el").innerHTML=
        `
        <div id = "heading">
        <p>Round of ${roundOf}</p>
        </div>
        <div id = "cols">
            <div id = "first">
                <h2 id="song-name">${songData[currFirst].title}</h2>
                <iframe src="${songData[currFirst].embed}?autoplay=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                <button class="firstBtn">This</button>
            </div>
            <div id = "second">
                <h2 id="song-name">${songData[currSecond].title}</h2>
                <iframe src="${songData[currSecond].embed}?autoplay=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <button class="secondBtn">This</button>
            </div> 
        </div>
        `
}
render()
document.addEventListener('click',function(e){
    if(e.target.classList.contains("firstBtn")||e.target.classList.contains("secondBtn")){
        if(!isClickable)return
        if(e.target.classList.contains("firstBtn")){
            
            nextArray.push(currFirst)
            ranking.push(currSecond)
            e.target.disabled = true
        }
        else{
            nextArray.push(currSecond)
            ranking.push(currFirst)
            e.target.disabled = true
            
        }
        // isClickable = false;
        // setTimeout(() => {
        //     isClickable = true
        // }, 1500);
        render()
    }
})
// renderEnd()
// const firstBtnEl = document.getElementById("firstBtn");
// const secondBtnEl = document.getElementById("secondBtn");
// firstBtnEl.addEventListener('click',clicked(1))
// secondBtnEl.addEventListener('click',clicked(2))
// function clicked(clickedBtn){
//     console.log(clickedBtn)
//     render()
// }
// array = arrayRemove(array, 6);
// console.log(array)