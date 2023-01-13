console.log("Welcome to spotify");


//Intialize the variables
let songIndex=0;
let audioelement=new Audio(`song/${songIndex+1}.mp3`);
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let mastersongname=document.getElementById('mastersongname');
let menuplay=Array.from(document.getElementsByClassName('songItemplay'));


let songs=[
   
    {songName:"Powerfull Beats",filePath:"song/1.mp3" ,coverPath:"cover/1.jpg"},
    {songName:"INspiring -Cinematic-Ambient",filePath:"song/2.mp3" ,coverPath:"cover/2.jpg"},
    {songName:"Lionel casino",filePath:"song/3.mp3" ,coverPath:"cover/3.jpg"},
    {songName:"Goldn",filePath:"song/4.mp3" ,coverPath:"cover/4.jpg"},
    {songName:"Weekends",filePath:"song/5.mp3" ,coverPath:"cover/5.jpg"},
    {songName:"Happy Day",filePath:"song/6.mp3" ,coverPath:"cover/6.jpg"},
   

]

//to change song name cover photo duration etc
songItem.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
});


//LIsten to events
//Handle play/pause
masterplay.addEventListener('click',()=>
{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
       audioelement.play();
       masterplay.classList.remove('fa-play-circle');
       masterplay.classList.add('fa-pause-circle');
       menuplay[songIndex-1].classList.remove('fa-play-circle');
       menuplay[songIndex-1].classList.add('fa-pause-circle');
       gif.style.opacity=1;
    }
    else{
        audioelement.pause();
       masterplay.classList.remove('fa-pause-circle');
       masterplay.classList.add('fa-play-circle');
       menuplay[songIndex-1].classList.remove('fa-pause-circle');
       menuplay[songIndex-1].classList.add('fa-play-circle');
       gif.style.opacity=0;
    }
})

//update seekbar
audioelement.addEventListener('timeupdate',()=>{
    
    
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100);//progress is in percentage
  
    myprogressbar.value=progress;
    
})

myprogressbar.addEventListener('change',()=>
{
    audioelement.currentTime=myprogressbar.value*audioelement.duration/100;
})


const makeallplays=()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle')
})
}



menuplay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
       songIndex=parseInt(e.target.id);
       audioelement.src=`song/${songIndex}.mp3`;//to update audio element src
        console.log(audioelement.paused);
       if(audioelement.paused)
       {
        console.log("hi");
        makeallplays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioelement.currentTime=0;
        audioelement.play();
        mastersongname.innerText=songs[songIndex-1].songName;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
       }
       else{
        console.log("hello");
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        audioelement.pause();
       }
        

    })
}
)


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6)
    {
        songIndex=1;
        
        menuplay[5].classList.remove('fa-pause-circle');
       menuplay[5].classList.add('fa-play-circle');
       menuplay[songIndex-1].classList.remove('fa-play-circle');
       menuplay[songIndex-1].classList.add('fa-pause-circle');
    }
    else{
     
      songIndex+=1;
       menuplay[songIndex-2].classList.remove('fa-pause-circle');
       menuplay[songIndex-2].classList.add('fa-play-circle');
       menuplay[songIndex-1].classList.remove('fa-play-circle');
       menuplay[songIndex-1].classList.add('fa-pause-circle');
    }
       mastersongname.innerText=songs[songIndex-1].songName;
        audioelement.src=`song/${songIndex}.mp3`;//to update audio element src
        audioelement.currentTime=0;
        audioelement.play();

        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
}
)

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==1)
    {
        menuplay[0].classList.remove('fa-pause-circle');
       menuplay[0].classList.add('fa-play-circle');
        songIndex=6;
        menuplay[songIndex-1].classList.remove('fa-play-circle');
       menuplay[songIndex-1].classList.add('fa-pause-circle');
    }
    else{
      songIndex-=1;
       menuplay[songIndex].classList.remove('fa-pause-circle');
       menuplay[songIndex].classList.add('fa-play-circle');
       menuplay[songIndex-1].classList.remove('fa-play-circle');
       menuplay[songIndex-1].classList.add('fa-pause-circle');


    }
        mastersongname.innerText=songs[songIndex-1].songName;
        audioelement.src=`song/${songIndex}.mp3`;//to update audio element src
        audioelement.currentTime=0;
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
}
)


