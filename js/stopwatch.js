const mins = document.getElementById("minutes");
const secs = document.getElementById("seconds");
const milli = document.getElementById("milliseconds");
const start = document.getElementById("start");

let counter=0;

function timer() {
  let go = setInterval(timer, 0);
  counter=counter+1;
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");
  let minutes = counter>60000 ? (Math.floor((counter/60000)) % 60) : 0 ;
  let seconds = counter>1000 ? (Math.floor((counter/1000)) % 60) : 0 ;
  let milliseconds = counter%1000;

  mins.innerText = minutes;
  secs.innerText = seconds;
  milli.innerText = milliseconds;


  stop.addEventListener("click", () => {
    clearInterval(go);
    stop.style.backgroundColor = "red";
  });

  reset.addEventListener("click", () => {
    clearInterval(go);
    counter=0;
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
    go = setInterval(timer, 0);
  });
}

start.addEventListener("click", () => {
  timer();
});

 


