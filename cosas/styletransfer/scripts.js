console.log("Hola soy una web app y me llamo pasticheme");

const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const stylized = document.querySelector(".stylized")
const contentImg = document.getElementById("contentImg");
const st = document.getElementById("st");

const model = new mi.ArbitraryStyleTransferNetwork();

const styleImg = document.getElementById("st");
// const stylizedCanvas = document.getElementById("stylized");



function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error("oh no", err);
    });
}
// function paintToCanvas() {
//   const width = video.videoWidth;
//   const height = video.videoHeight;
//   console.log(width, height);
//   canvas.width = width;
//   canvas.height = height;
// }
// const width = video.videoWidth;
// const height = video.videoHeight;

// console.log(video)

getVideo();

video.addEventListener('click', function () {
  ctx.drawImage(video, 0, 0, 300, 225)
  const dataURI = canvas.toDataURL("image/jpeg")
  contentImg.src = dataURI
  console.log(contentImg)

  magenta()

})

// -------------------------------------------------------------------
// Magenta stuff
function magenta() {
  function stylize() {
    model
      .stylize(contentImg, styleImg)
      .then(imageData => {
        stylized
          .getContext("2d")
          .putImageData(imageData, 0, 0);
      });
  }

  model.initialize().then(stylize);
}

function scheduleA(event) {
  // alert(this.options[this.selectedIndex].text);

  if ((this.options[this.selectedIndex].text) === 'ARTE BIZANTINO (1400)') {
    st.src = "/cosas/styletransfer/img/05artebisantino.jpg";
    magenta()
  }
  if ((this.options[this.selectedIndex].text) === 'IMPRESIONISMO') {
    st.src = "/cosas/styletransfer/img/02impresionismo.jpg";
    magenta()
  }
  if ((this.options[this.selectedIndex].text) === 'TONALISMO') {
    st.src = "/cosas/styletransfer/img/03tonalism.jpg"
    magenta()
  }
  if ((this.options[this.selectedIndex].text) === 'CUBISMO (1907-1914)') {
    st.src = "/cosas/styletransfer/img/03cubismy.jpg"
    magenta()
  }
}



