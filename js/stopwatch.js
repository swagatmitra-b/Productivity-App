const mins = document.getElementById("minutes");
const secs = document.getElementById("seconds");
const milli = document.getElementById("milliseconds");
const start = document.getElementById("start");

let now,time1,time2,running=0,difference=0,run=1;

function timer() {
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");
  let newNow = new Date();
  let inSeconds = ((newNow - now)-difference) / 1000;
  let minutes = Math.floor(inSeconds / 60) % 60;
  let seconds = Math.floor(inSeconds) % 60;
  let milliseconds = String(inSeconds).split(".")[1];

  mins.innerText = minutes;
  secs.innerText = seconds;
  milli.innerText = milliseconds;

  let go = setInterval(timer, 0);

  start.addEventListener("mouseenter",() => {
    start.style.backgroundColor = "lightgreen";
  });
  start.addEventListener("mouseleave",() => {
    start.style.backgroundColor = "transparent";
  });

  stop.addEventListener("click", () => {
    clearInterval(go);
    stop.style.backgroundColor = "red";
    running=1;
    run=1;
    time1=new Date();
  });
  stop.addEventListener("mouseenter", () => {
    stop.style.backgroundColor = "rgba(255, 0, 0, 0.347)";
  });
  stop.addEventListener("mouseleave", () => {
    stop.style.backgroundColor = "transparent";
  });

  stop.addEventListener("mouseenter", () => {
    stop.style.backgroundColor = "rgba(255, 0, 0, 0.347)";
  });
  stop.addEventListener("mouseleave", () => {
    stop.style.backgroundColor = "transparent";
  });

  reset.addEventListener("click", () => {
    clearInterval(go);
    mins.innerText = "0";
    secs.innerText = "0";
    milli.innerText = "0";
    run=1;
    running=0;
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
  start.style.backgroundColor = "lime";
  if (!running && run) {
    now = new Date();
    difference = 0;
    run = 0;
    timer();
  } else if(running && run){
    time2=new Date();
    difference=difference+(time2-time1);
    time1=0;
    time2=0;
    run=0;
    timer();
  }
});