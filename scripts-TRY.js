const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snapSound = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
        .then(userMediaStream => {
            console.log(userMediaStream);
            video.srcObject = userMediaStream;
            video.play();
        });
}

getVideo();