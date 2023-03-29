const countbutton = document.getElementsByTagName("button");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function buttonClick () {
    countbutton[0].addEventListener("click", (e) => {
        const calendar = document.getElementsByTagName("input");
        const time = document.getElementById("time")
        let date = calendar[0].value.split("-");
        let timeVal = time.value.split(":")
        let target;
    
        if (timeVal.length !== 1) {
          target = new Date(date[0], date[1] - 1, date[2], timeVal[0], timeVal[1]);
        }
        else {
          target = new Date(date[0], date[1] -1, date[2])
        }

        if (date.length == 1) return; 
        
        function count() {
          let now = new Date();
          let inSeconds = (target - now) / 1000;
          const daysLeft = Math.floor(inSeconds / (24 * 3600));
          const hoursLeft = Math.floor(inSeconds / 3600) % 24;
          const minutesLeft = Math.floor(inSeconds / 60) % 60;
          const secondsLeft = Math.floor(inSeconds) % 60;
          days.innerText = daysLeft;
          hours.innerText = hoursLeft;
          minutes.innerText = minutesLeft;
          seconds.innerText = secondsLeft;

          if (inSeconds == 0) {
            clearInterval(go)
          }
        }
      
        const go = setInterval(count, 1000)

        countbutton[0].style.backgroundColor = "rgb(161, 216, 79)"
        countbutton[1].style.display = "inline"
        countbutton[1].style.backgroundColor = "transparent"

        countbutton[1].addEventListener("click", () => {
            clearInterval(go)
            countbutton[1].style.backgroundColor = "rgb(237, 30, 30)"
            countbutton[0].style.backgroundColor = "transparent"    
        })
            
        countbutton[0].addEventListener("click", () => {
            clearInterval(go)
            buttonClick()
        })
      });
}

buttonClick()
