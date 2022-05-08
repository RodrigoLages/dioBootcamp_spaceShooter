const yourShip = document.getElementById("hero");
const playArea = document.getElementById("main-play-area");
const aliensImg = [
  "img/monster-1.png",
  "img/monster-2.png",
  "img/monster-3.png",
];
const instructionsText = document.getElementById("game-instructions");
const startButton = document.getElementById("start-button");
const playerScore = document.getElementById("score");
var alienInterval;
var score = 0;

//Movement
function moveUp() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "0px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 60;
    yourShip.style.top = position + "px";
  }
}

function moveDown() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "540px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 60;
    yourShip.style.top = position + "px";
  }
}

//Shooting
function createLaserElement() {
  let xPosition = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("top")
  );
  let newLaser = document.createElement("img");

  newLaser.src = "img/shoot.png";
  newLaser.classList.add("laser");
  newLaser.style.left = xPosition + "px";
  newLaser.style.top = yPosition - 15 + "px";
  return newLaser;
}

function moveLaser(laser) {
  laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    let aliens = document.querySelectorAll(".alien");

    aliens.forEach((alien) => {
      if (checkLaserCollision(laser, alien)) {
        alien.src = "img/explosion.png";
        alien.classList.remove("alien");
        alien.classList.add("dead-alien");
        laser.remove();
        score++;
        playerScore.innerHTML = `Score: ${score}00`;
        clearInterval(laserInterval);
        //add a score
      }
    });

    if (xPosition >= 420) {
      laser.remove();
      clearInterval(laserInterval);
    } else {
      laser.style.left = xPosition + 8 + "px";
    }
  }, 10);
}

function shoot() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

//Actions
function flyShip(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    shoot();
  }
}

//Enemies
function createAliens() {
  let newAlien = document.createElement("img");
  newAlien.src = aliensImg[Math.trunc(Math.random() * aliensImg.length)];
  newAlien.classList.add("alien");
  newAlien.classList.add("alien-transition");
  newAlien.style.left = "370px";
  newAlien.style.top = `${Math.trunc(Math.random() * 10) * 60}px`;
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
}

function moveAlien(alien) {
  setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(alien).getPropertyValue("left")
    );
    if (xPosition <= 50) {
      if (Array.from(alien.classList).includes("dead-alien")) {
        alien.remove();
      } else {
        gameOver();
      }
    } else {
      alien.style.left = xPosition - 4 + "px";
    }
  }, 30);
}

function checkLaserCollision(laser, alien) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);

  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);

  if (laserLeft != 340 && laserLeft >= alienLeft) {
    return laserTop + 15 == alienTop;
  } else {
    return false;
  }
}

//Game begin/end
function startGame() {
  startButton.style.display = "none";
  instructionsText.style.display = "none";
  window.addEventListener("keydown", flyShip);
  alienInterval = setInterval(() => {
    createAliens();
  }, 2000);
}

startButton.addEventListener("click", startGame);

function gameOver() {
  window.removeEventListener("keydown", flyShip);
  clearInterval(alienInterval);

  let aliens = document.querySelectorAll(".alien");
  aliens.forEach((alien) => alien.remove());
  let lasers = document.querySelectorAll(".laser");
  lasers.forEach((laser) => laser.remove());

  setTimeout(() => {
    alert(`Game Over!\nYour score: ${score}00`);
    yourShip.style.top = "240px";
    startButton.style.display = "block";
    instructionsText.style.display = "block";
    score = 0;
    playerScore.innerHTML = "Score: 0";
  });
}
