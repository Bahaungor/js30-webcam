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
    const width = video.videoWidth;
    const height = video.videoHeight;
    [canvas.width, canvas.height] = [width,height];
    setInterval(() => {
        //put the video to canvas
        ctx.drawImage(video, 0, 0, width, height);
        //take the pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        //mess with pixels
        redEffect(pixels);
        //put pixels back
        ctx.putImageData(pixels, 0, 0)
    },10);
}

function takePhoto(){
    //play sound
    snapSound.currentTime = 0;
    snapSound.play();

    //take photo
    const imageData = canvas.toDataURL("image/jpeg");
    const stripImage = document.createElement("a");
    stripImage.href = imageData;
    stripImage.setAttribute("download", "handsome");
    stripImage.innerHTML = `<img src="${imageData}" alt="Handsome Man"/>`;
    strip.insertBefore(stripImage, strip.firstChild);
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i] += 100; //red
        pixels.data[i+1] -= 50; //green
        pixels.data[i+2] *= 0.5; //blue
    }
    return pixels;
}

getVideo();

video.addEventListener("canplay", videoToCanvas);
