
let currentSong = new Audio(); 

let songs; //create a global variable


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(){
    let x = await fetch("http://127.0.0.1:3000/songs/")
    let response = await x.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
     songs = []   //songs golbal variable
    for (let index = 0; index < as.length; index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]) //`` called as backtick
        }
    }
    //show all the songs with name 
        return songs
}
//create function of play music
const playMusic =(track,pause=false)=>{
    currentSong.src = "/songs/" + track
    // let audio = new Audio("/songs/" + track)
    if(!pause){
        currentSong.play()
        play.src = "pause.svg" 
    }
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}
 async function main(){

    //get all the songs
  
 songs = await getSongs()  //global variable
    playMusic(songs[0],true)

    //display all the albums on the page

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div> ${song.replaceAll("%20"," ")} </div>
            <div> Dona </div>
        </div>                                            
        <div class="playnow">
            <span>PLay Now</span>
            <img class="invert" src="play.svg" alt="">
        </div></li>`; //this is called template literales
    }
        //use the eventlistener for each songs
        Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
            e.addEventListener("click",element=>{

                console.log(e.querySelector(".info").firstElementChild.innerHTML)
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })
        })

        //attach an eventlistener to play the music by using previous , play , and next..

        play.addEventListener("click",(e)=>{
            if(currentSong.paused){
                currentSong.play()
                play.src = "pause.svg"
            }
            else{
                currentSong.pause()
                play.src = "play.svg"
            }
        })

        //timeupdate event according to the music play

        currentSong.addEventListener("timeupdate",()=>{
            console.log(currentSong.currentTime , currentSong.duration);
            document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + "%"; //the circle is moving through the seekbar
        })

        //add eventlistener to the seekbar

        document.querySelector(".seekbar").addEventListener("click",(e)=>{
            //add client x or client y to element "e" to move through the seekbar
                // console.log(e.target , e.offsetX)
                document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width)*100 + "%"; //width r upor depend kore x offset wise circle ta change hobe....

                currentSong.currentTime = ((currentSong.duration)*((e.offsetX / e.target.getBoundingClientRect().width)*100))/100 //when the circle will move through the seekbar the song's time duration will be changed according to it.....
        }) //jotodur play korbo toto durer offset pabo 

        
        //add eventlistener to the hamburgericons
        document.querySelector(".hamburgericons").addEventListener("click",()=>{
            document.querySelector(".left").style.left = "0";
        }) 

        //add eventlistener to the close icons

        document.querySelector(".close").addEventListener("click",()=>{
            document.querySelector(".left").style.left = "-120%";
        })

        //add addEventListener to the previous and next button 

        previous.addEventListener("click",()=>{
            currentSong.pause()
            console.log("Previous Clicked")
            console.log(currentSong)
            let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]) //add the particular song only show the song's name rather than it;s url.....
            if((index - 1) >= 0){
                playMusic(songs[index-1])
            }
        })

        
        next.addEventListener("click",()=>{
            currentSong.pause()
            console.log("Next Clicked")
            let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]) //add the particular song only show the song's name rather than it;s url.....
            if((index + 1) < songs.length){
                playMusic(songs[index+1])
            }
        })

        //add eventlistener to the volumn

        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",()=>{
            console.log("setting volum to" ,e,e.target,e.target.value , "/ 100")
            currentSong.volume = parseInt(e.target.value)/100;
        })
        
        //load the playlist when the card is clicked

        //data - attribut  is : we can create a custom attribute where the data can be stored for programmers to use and there have some property which can be used and that is called as data set....
        
//         Array.from(document.getElementsByClassName("card")).forEach(e=>{
//             console.log(e)
//             e.addEventListener("click",async item =>{
//                 songs = await getSongs(`songs/${item.target.dataset.folder}`)
//             })
//         })
//  } 
    }
 main()




 // currentSong function er modhe gaan re list ache..tai "currentSong" r modhe eventlistener use kora ho66e.. 