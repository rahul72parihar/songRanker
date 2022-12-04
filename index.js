import { songData } from "./data.js";
// console.log("SONGDATA LENGTH"+songData.length)
// document.getElementById("heading").textContent = songData.length
let sum = 0
let currArray = new Array(32).fill(0).map(function(){
    return sum++
})

let done = 0
let roundOf = 32
let nextArray =[]
let ranking = [29,17,27,20,22,5,31,2]
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
    // console.log("currIndex = "+ans)
    currArray = arrayRemove(ans)
    // console.log(currArray)
    return ans
}
function renderEnd(){
    let str = `<div id = "endSpace"></div>`
    str += `<div class = "endMain">`
    if (forceEnd && forceEnd==3)
        str += `<h2 class = "endMid" >Developer's List</h2>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endTop" >👑 1. ${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endMid" >2. ${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endMid" >3. ${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endLower" >${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endLower" >${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endLower" >${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target = "_blank"><h2 class = "endEnd" >${songData[ranking.pop()].title}</h2></a>`
    str += `<a href = "${songData[ranking[ranking.length-1]].embed}" target ="_blank"><h2 class = "endEnd" >${songData[ranking.pop()].title}</h2></a>`
    str += `</div><div id = "endSpace"></div>`
    document.getElementById("main-el").innerHTML= str

    // console.log("THIS IS THE END")
}
function render(){
    if(currArray.length==0){
        // console.log("array reassign")
        currArray=nextArray
        if(currArray.length==1){
            ranking.push(currArray[0])
            renderEnd()
            return
        }
        nextArray=[]
        // console.log("array after reassign = "+currArray)
        roundOf = currArray.length
        done = 0
    }
    let headingText =  ``
    if(roundOf==32)headingText = `Qualification Round || Match ${done/2}/ ${roundOf/2}`
    else if(roundOf==16)headingText = `PlayOffs || Match ${done/2}/ ${roundOf/2}`
    else if(roundOf==8)headingText = `Quater Finals 🔥 || ${done/2}/ ${roundOf/2}`
    else if(roundOf==4)headingText = `😲 Semi-Finale 😲 || ${done/2}/ ${roundOf/2}`
    else if(roundOf==2)headingText = `👑👑👑  Finals  👑👑👑`
    // console.log(currArray)
    // console.log("nextArray = "+nextArray)
    currFirst = arrayOperation(currArray.length)
    currSecond = arrayOperation(currArray.length)
    document.getElementById("main-el").innerHTML=
        `
        <div id = "progress" style = "width:${done*100/roundOf}vw">
            <div id = "heading">
            <p>${headingText}</p>
            </div>
        </div>
        <div id = "cols">
            <div id = "first">
                <h2 id="song-name">${songData[currFirst].title}</h2>
                <iframe src="${songData[currFirst].embed}?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                <button class="firstBtn">This is Better</button>
            </div>
            <div id = "second">
                <h2 id="song-name">${songData[currSecond].title}</h2>
                <iframe src="${songData[currSecond].embed}?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <button class="secondBtn">This is Better</button>
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
        isClickable = false;
        setTimeout(() => {
            isClickable = true
        }, 1500);
        done+=2
        render()
    }
})

// CODE FOR FORCE ENDING 

let forceEnd = 0
const forceEndEl = document.getElementById("heading")
forceEndEl.addEventListener('click',function(){
    console.log("clicked")
    forceEnd++;
    if(forceEnd>=3){
        renderEnd()
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
setTimeout(function(){
    console.log("CLICK ON HEADING 3 TIMES FOR FINAL RENDER")
},3500)

