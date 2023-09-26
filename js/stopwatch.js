const mins = document.getElementById("minutes");
const secs = document.getElementById("seconds");
const milli = document.getElementById("milliseconds");
const start = document.getElementById("start");

let now=new Date(),newNow=new Date();

function timer() {
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");
  newNow++;
  let inSeconds = (newNow - now) / 1000;
  let minutes = Math.floor(inSeconds / 60) % 60;
  let seconds = Math.floor(inSeconds) % 60;
  let milliseconds = String(inSeconds).split(".")[1];

  mins.innerText = minutes;
  secs.innerText = seconds;
  milli.innerText = milliseconds;

  let go = setInterval(timer, 0);

  stop.addEventListener("click", () => {
    clearInterval(go);
    stop.style.backgroundColor = "red";
  });

  reset.addEventListener("click", () => {
    clearInterval(go);
    mins.innerText = "0";
    secs.innerText = "0";
    milli.innerText = "0";

    stop.style.display = "none";
    reset.style.display = "none";
  });

  reset.addEventListener("mouseenter", () => {
    reset.style.backgroundColor = "lightblue";
  });
  reset.addEventListener("mouseleave", () => {
    reset.style.backgroundColor = "transparent";
  });

  stop.style.display = "inline";
  reset.style.display = "inline";

  start.addEventListener("click", () => {
    stop.style.backgroundColor = "transparent";
  });
}

start.addEventListener("click", () => {
  timer();
});

 


