const addNote = document.getElementById("add-note");
const displayNotes = document.getElementsByClassName("display-notes")[0];
let content = document.querySelector(".content");
let notes = Array.from(document.getElementsByClassName("note"));
let sidebar = document.querySelector(".sidebar"); 

let noteMessage = document.querySelector(".content h1");

let contentTitle = document.getElementById("title");
let contentBody = document.getElementById("body");

const daysOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "Sepetember",
  9: "October",
  10: "November",
  11: "December",
};

addNote.addEventListener("click", createNote);

onload = () => {
  let myarray = JSON.parse(localStorage.getItem("mynotesapp"));

  if (myarray) {
    let newArr = myarray.filter((note) => note.title != "" || note.body != "");
    myarray = newArr;
    saveNote(myarray);

    for (let note of myarray) {
      noteOnLoad(note.title, note.body, note.date);
      contentTitle.innerText = note.title;
      contentBody.innerText = note.body;
    }

    let lastNote = displayNotes.lastElementChild;
    if (lastNote) {
      if (lastNote.classList.contains("selected")) {
        lastNote.classList.remove("selected");
        displayNotes.firstElementChild.classList.add("selected");
      }
    }
    noteSelect();
  } else console.log("empty");
};

function createNote(mytitle = "Title", mybody = "This is the body") {
  let now = new Date();
  let year = now.getFullYear();
  let date = now.getDate();
  let day = daysOfWeek[now.getDay()];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours < 10 ? (hours = "0" + hours) : hours;
  minutes < 10 ? (minutes = "0" + minutes) : minutes;

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours != 0 ? hours : 12;

  let newNote = document.createElement("div");
  let newH3 = document.createElement("H3");
  let newPara = document.createElement("p");
  let newH4 = document.createElement("h4");
  newNote.classList.add("note");
  displayNotes.insertBefore(newNote, displayNotes.firstChild);
  newNote.appendChild(newH3);
  newNote.appendChild(newPara);
  newNote.appendChild(newH4);
  newH3.innerText = typeof mytitle === "string" ? mytitle : "Title";
  newPara.innerText = mybody;
  newH4.innerText = `${day}, ${date} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

  notes.unshift(newNote);

  noteMessage.style.display = "none";
  contentTitle.style.display = "block";
  contentBody.style.display = "block";

  if (!notes.some((notes) => notes.classList.contains("selected"))) {
    newNote.classList.add("selected");
  } else {
    let deselectNote = notes.filter((note) =>
      note.classList.contains("selected")
    )[0];
    deselectNote.classList.remove("selected");
    newNote.classList.add("selected");
  }

  noteSelect();

  let randomID = Math.floor(Math.random() * 100000);
  let localNote = {
    date: now,
    id: randomID,
    title: "",
    body: "",
  };

  allNotes.unshift(localNote);

  allNotes.sort((a, b) => {
    return a.date > b.date ? -1 : 1;
  });

  saveNote(allNotes);

  if (sidebar.clientHeight < sidebar.scrollHeight) {
    sidebar.style.width = "310px";
    addNote.style.transform = "translateX(-2px)"
  }
}

function noteSelect() {
  notes.forEach((note) => {
    note.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const alreadySelected = e.target.parentElement.classList.contains("selected");
      let deselectNote = notes.filter((note) =>
        note.classList.contains("selected")
      )[0];

      if (deselectNote) {
        deselectNote.classList.remove("selected");
        e.currentTarget.classList.add("selected");
      }
      
      let myarray = JSON.parse(localStorage.getItem("mynotesapp"));
      let noteIndex = notes.indexOf(note);
      let noteObject = myarray[noteIndex];

      let refreshedNote = content.cloneNode(true);
      let fillTitle = refreshedNote.querySelector("#title");
      let fillBody = refreshedNote.querySelector("#body");

      fillTitle.value = noteObject.title;
      fillBody.value = noteObject.body;

      fillBody.innerHTML = noteObject.body.replace(/\n/g, "\n");

      if(!alreadySelected){
        content.replaceWith(refreshedNote);
        content = refreshedNote;
      }
      document.addEventListener("keydown", (e) => {
        if (e.key == "Alt") {
          let selectedNote = notes.filter((note) =>
            note.classList.contains("selected")
          )[0];
          let noteIndex = notes.indexOf(selectedNote);

          let title = selectedNote.getElementsByTagName("h3")[0];
          let body = selectedNote.getElementsByTagName("p")[0];
          let titleText = fillTitle.value.trim();
          let bodyText = fillBody.value.trim();
          title.innerText = titleText;
          body.innerHTML = bodyText.replace(/\n/g, "\n");
          body.innerText = bodyText;

          let myarray = JSON.parse(localStorage.getItem("mynotesapp"));
          let noteObject = myarray[noteIndex];

          noteObject.title = fillTitle.value.trim();
          noteObject.body = fillBody.value.trim();

          saveNote(myarray);
          location.reload();
        }
      });
    });
  });
}

function getNote() {
  const notes = JSON.parse(localStorage.getItem("mynotesapp")) || [];
  return notes;
}

let allNotes = getNote();

function saveNote(allNotes) {
  const notesJSON = JSON.stringify(allNotes);
  localStorage.setItem("mynotesapp", notesJSON);
}

function noteOnLoad(
  mytitle = "Title",
  mybody = "This is the body",
  dateString
) {
  let creationDate = new Date(`${dateString}`);
  let year = creationDate.getFullYear();
  let date = creationDate.getDate();
  let day = daysOfWeek[creationDate.getDay()];
  let month = months[creationDate.getMonth()];
  let hours = creationDate.getHours();
  let minutes = creationDate.getMinutes();

  hours < 10 ? (hours = "0" + hours) : hours;
  minutes < 10 ? (minutes = "0" + minutes) : minutes;

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours != 0 ? hours : 12;

  let newNote = document.createElement("div");
  let newH3 = document.createElement("H3");
  let newPara = document.createElement("p");
  let newH4 = document.createElement("h4");
  newNote.classList.add("note");
  displayNotes.appendChild(newNote);
  newNote.appendChild(newH3);
  newNote.appendChild(newPara);
  newNote.appendChild(newH4);
  newH3.innerText = typeof mytitle === "string" ? mytitle : "Title";
  newPara.innerText = mybody;
  newH4.innerText = `${day}, ${date} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

  notes.push(newNote);

  noteMessage.style.display = "none";
  contentTitle.style.display = "block";
  contentBody.style.display = "block";

  if (!notes.some((notes) => notes.classList.contains("selected"))) {
    newNote.classList.add("selected");
  } else {
    let deselectNote = notes.filter((note) =>
      note.classList.contains("selected")
    )[0];
    deselectNote.classList.remove("selected");
    newNote.classList.add("selected");
  }
  
  if (sidebar.clientHeight < sidebar.scrollHeight) {
    sidebar.style.width = "310px";
    addNote.style.transform = "translateX(-2px)"
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "Delete") {
    console.log(contentTitle)
    console.log(contentBody)
    let textActive =
      document.activeElement === document.querySelector("#title") ||
      document.activeElement === document.querySelector("#body");
    if (!textActive) {
      let response = confirm(
        "Are you sure you want to delete the selected note?"
      );
      if (response) {
        let deleteNote = notes.filter((note) =>
          note.classList.contains("selected")
        )[0];
        let noteIndex = notes.findIndex((note) =>
          note.classList.contains("selected")
        );
        notes.splice(noteIndex, 1);
        displayNotes.removeChild(deleteNote);
        let myarray = JSON.parse(localStorage.getItem("mynotesapp"));
        myarray.splice(noteIndex, 1);
        localStorage.setItem("mynotesapp", JSON.stringify(myarray));
        let firstNote = displayNotes.firstElementChild;
        if (firstNote) {
          firstNote.classList.add("selected");
        } else {
          content.innerHTML = `<h1>Create a new note</h1>`;
        }
        location.reload();
      }
    }
  }
});
