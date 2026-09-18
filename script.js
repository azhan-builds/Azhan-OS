function updateClock() {
  let now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  document.getElementById("date").textContent =
    now.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
}

updateClock();
setInterval(updateClock, 1000);


let topWindow = 10;

function openApp(name, icon) {
  let win = document.getElementById(name);

  document.querySelectorAll(".app-icon").forEach(function(item) {
    item.classList.remove("selected");
  });

  icon.classList.add("selected");

  win.style.display = "block";

  topWindow++;
  win.style.zIndex = topWindow;
}

function closeWindow(name) {
  document.getElementById(name).style.display = "none";

  document.querySelectorAll(".app-icon").forEach(function(item) {
    item.classList.remove("selected");
  });
}


let windows = document.querySelectorAll(".window");

windows.forEach(function(win) {

  win.addEventListener("mousedown", function() {
    topWindow++;

    win.style.zIndex = topWindow;
  });

  let header = win.querySelector(".window-header");

  header.addEventListener("mousedown", function(e) {

    let x = e.clientX - win.offsetLeft;
    let y = e.clientY - win.offsetTop;

    function moveWindow(e) {
      win.style.left = e.clientX - x + "px";
      win.style.top = e.clientY - y + "px";
    }

    function stopMoving() {
      document.removeEventListener("mousemove", moveWindow);
      document.removeEventListener("mouseup", stopMoving);
    }

    document.addEventListener("mousemove", moveWindow);
    document.addEventListener("mouseup", stopMoving);
  });

});


let musicFile = document.getElementById("musicFile");

musicFile.addEventListener("change", function() {

  let file = musicFile.files[0];

  if (!file) {
    return;
  }

  let player = document.getElementById("audioPlayer");

  player.src = URL.createObjectURL(file);

  document.getElementById("songName").textContent = file.name;
  document.getElementById("songStatus").textContent = "Playing";

  player.play();
});


function saveNotes() {
  let text = document.getElementById("notesText").value;

  localStorage.setItem("azhanNotes", text);

  document.getElementById("notesStatus").textContent = "Saved.";
}

let oldNotes = localStorage.getItem("azhanNotes");

if (oldNotes) {
  document.getElementById("notesText").value = oldNotes;
}


let calc = document.getElementById("calc");

function addCalc(value) {

  if (calc.value == "Error") {
    calc.value = "";
  }

  calc.value += value;
}

function clearCalc() {
  calc.value = "";
}

function calculate() {

  if (calc.value == "") {
    return;
  }

  try {
    calc.value = eval(calc.value);
  }

  catch {
    calc.value = "Error";
  }
}


let timer;
let seconds = 60;

function showTimer() {

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  document.getElementById("timerDisplay").textContent =
    minutes + ":" + remainingSeconds;
}

function startTimer() {

  if (timer) {
    return;
  }

  timer = setInterval(function() {

    if (seconds <= 0) {
      clearInterval(timer);
      timer = null;

      document.getElementById("timerDisplay").textContent = "00:00";

      return;
    }

    seconds--;
    showTimer();

  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {

  clearInterval(timer);
  timer = null;

  seconds =
    Number(document.getElementById("timerInput").value) || 60;

  showTimer();
}

document.getElementById("timerInput").addEventListener("change", function() {

  if (!timer) {
    seconds = Number(this.value) || 60;
    showTimer();
  }

});

showTimer();