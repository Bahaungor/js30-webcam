const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snapSound = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => console.log("Cannot get video due to: ",err));
}

function videoToCanvas(){
    [video.videoWidth, video.videoHeight] = [canvas.width, canvas.height];
    ctx.drawImage(video, 0, 0);
}


getVideo();