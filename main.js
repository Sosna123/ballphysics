// consts
const gravity = 0.2;
const friction = 1.5;

// box
const borderY = document.body.offsetHeight;
const borderX = document.body.offsetWidth;

// circle
const mainCircle = document.querySelector("#mainCircle");
const circleHeight = mainCircle.offsetHeight;
const circleWidth = mainCircle.offsetWidth;
const circleMovXLimit = 4;
let circleX = 200;
let circleY = 0;
let circleAccY = 0;
let circleAccX = 0;
let circleMovY = 0;
let circleMovX = 0;
let circleGrounded = false;

document.body.addEventListener("keydown", (event) => {
    if (event.key == "a") {
        circleAccX -= 0.5;
        if (Math.abs(circleAccX) >= circleMovXLimit) {
            circleAccX = -circleMovXLimit;
        }
    }
    if (event.key == "d") {
        circleAccX += 0.5;
        if (Math.abs(circleAccX) >= circleMovXLimit) {
            circleAccX = circleMovXLimit;
        }
    }
    if (event.code == "Space" && circleGrounded) {
        circleMovY = 1;
        circleAccY = 15;
        circleGrounded = false;
    }
});

setInterval(() => {
    // logs
    // console.log(`Acceleration => Y: ${circleAccY} X: ${circleAccX}`)
    // console.log(`Location => Y: ${circleY} X: ${circleX}`)

    mainCircle.style.top = `${circleY}px`;
    mainCircle.style.left = `${circleX}px`;

    // acceleration
    if (circleMovY == 0 || circleMovY == -1) {
        circleAccY += gravity;
        circleMovY = -1;
    } else if (circleMovY == 1) {
        circleAccY -= gravity;
        if (circleAccY <= 0) {
            circleMovY = -1;
        }
    }

    // move the circle Y
    if (circleMovY == -1) {
        circleY += circleAccY;
        circleMovY = -1;
    } else if (circleMovY == 1) {
        circleY -= circleAccY;
        circleMovY = 1;
    }

    // collsion
    if (circleY + circleHeight >= borderY) {
        circleMovY = 1;
        circleAccY -= friction;
        // stop when speed is too slow to bounce
        if (circleAccY < 0.1) {
            circleAccY = 0;
            circleGrounded = true;
        }
    }

    // move the circle X
    circleX += circleAccX;
}, 10);
