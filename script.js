const yourShip = document.getElementById("hero");
const playArea = document.getElementById("main-play-area");

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
function shoot() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

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
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);

    if (xPosition === 500) {
      laser.remove();
    } else {
      laser.style.left = xPosition + 8 + "px";
    }
  }, 10);
}

//Actions
function flyAirship(event) {
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

window.addEventListener("keydown", flyAirship);
