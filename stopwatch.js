const st=document.querySelector('#start')
st.classList.add('touch')
const btn=document.querySelector('#btn')
const reset=document.createElement('button')
reset.textContent='Reset'
const pause=document.createElement('button')
pause.textContent='Pause'
const lap=document.createElement('button')
lap.textContent='Lap'
let resume=document.createElement('button')
resume.innerText='Resume'
resume.classList.add('resume','touch')
const h1=document.querySelector('h1')
const h3=document.querySelector('h3')
const split=document.querySelector('#split')
split.classList.add('showlap')
const circle=document.querySelector('.inner')
let id=null
let colorId=null;
let milliseconds=0;
function changeColor(){
    let r=Math.floor(Math.random()*180)+1
    let g=Math.floor(Math.random()*180)+1
    let b=Math.floor(Math.random()*180)+1
    if(r<50) r+=100
    if(g<50) g+=100
    if(b<50) b+=100
    circle.style.borderColor=`rgb(${r},${g},${b})`
    lap.style.borderColor=`rgb(${r},${g},${b})`
    return circle.style.borderColor
}
function timeUpdate(){
    milliseconds++
    let milli=milliseconds%10
    let sec=Math.floor((milliseconds/10)%60)
    let min=Math.floor((milliseconds/600)%60)
    let hr=Math.floor(milliseconds/36000)
    if(milli<10) milli='0'+milli
    if(sec<10) sec='0'+sec
    if(min<10) min='0'+min
    if(hr<10) hr='0'+hr
    h1.innerText=`${hr}:${min}:${sec}`
    h3.innerText=`:${milli}`
}
st.addEventListener('click',()=>{
    reset.classList.add('reset','touch')
    pause.classList.add('pause','touch')
    lap.classList.add('lap','touch')
    btn.appendChild(reset)
    btn.appendChild(lap)
    btn.appendChild(pause)
    st.parentElement.removeChild(st)
    btn.classList.add('afterStart')
    milliseconds=0;
    id=setInterval(timeUpdate,100)
    colorId=setInterval(changeColor,2000)
})
pause.addEventListener('click',()=>{
    clearInterval(id);
    clearInterval(colorId)
    btn.removeChild(pause)
    lap.disabled=true
    lap.classList.remove('touch')
    btn.appendChild(resume)
})
reset.addEventListener('click',()=>{
    clearInterval(id)
    clearInterval(colorId)
    h1.innerText=`00:00:00`
    h3.innerText=''
    btn.removeChild(reset)
    btn.removeChild(lap)
    lap.disabled=false
    split.innerText=''
    if (btn.children[0].innerText=="Resume"){
        btn.removeChild(resume)
    }
    else{
        btn.removeChild(pause)
    }
    btn.append(st)
    btn.classList.remove('afterStart')
})
lap.addEventListener('click',()=>{
    const li=document.createElement('li')
    li.innerText=`#`+' '+h1.innerText+h3.innerText
    li.classList.add('liproperty')
    li.style.borderColor=changeColor();
    split.prepend(li)
    if (split.children.length>5){
        split.children[split.childElementCount-1].remove()
    }
})
resume.addEventListener('click',()=>{
    lap.disabled=false;
    lap.classList.add('touch')
    btn.removeChild(resume)
    btn.appendChild(pause)
    id=setInterval(timeUpdate,100)
    colorId=setInterval(changeColor,2000)
})


