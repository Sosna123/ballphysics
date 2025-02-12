// consts
const gravity = 9.8;
const friction = 1.5;

// box
const borderY = document.body.offsetHeight;
const borderX = document.body.offsetWidth;

// circle
const mainCircle = document.querySelector("#mainCircle");
const circleHeight = mainCircle.offsetHeight;
const circleWidth = mainCircle.offsetWidth;
const circleMovXLimit = 4;
let circleX = borderX / 2 - circleWidth / 2;
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
    // console.log(`Acceleration => Y: ${circleAccY} X: ${circleAccX}`);
    // console.log(`Location => Y: ${circleY} X: ${circleX}`);

    mainCircle.style.top = `${circleY}px`;
    mainCircle.style.left = `${circleX}px`;

    // acceleration
    if (circleMovY == 0 || circleMovY == -1) {
        circleAccY += gravity / 10;
        circleMovY = -1;
    } else if (circleMovY == 1) {
        circleAccY -= gravity / 10;
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
        if (!circleGrounded) {
            circleMovY = 1;
        }
        circleAccY == 0 ? 0 : (circleAccY -= friction);
        circleY = borderY - circleHeight;
        // stop when speed is too slow to bounce
        if (circleAccY < 0.6) {
            circleAccY = 0;
            circleY = borderY - circleHeight;
            circleGrounded = true;
        }
    }

    // move the circle X
    circleX += circleAccX;
}, 10);

// menu
const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
    circleX = borderX / 2 - circleWidth / 2;
    circleY = 0;
    circleAccY = 0;
    circleAccX = 0;
    circleMovY = 0;
    circleMovX = 0;
    circleGrounded = false;
});
