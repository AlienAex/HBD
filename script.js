function playAudio() {
  var audio = document.getElementById('birthdayAudio');
  audio.play();
}

var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass= [];

var colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];

window.onresize = function() { reset(); }
reset();
function reset() {

  cwidth = window.innerWidth;
	cheight = window.innerHeight;
	c.width = cwidth;
	c.height = cheight;
}

function newShell() {

  var left = (Math.random() > 0.5);
  var shell = {};
  shell.x = (1*left);
  shell.y = 1;
  shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {

  var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (i = 0; i < pasCount; i++) {

    var pas = {};
    pas.x = shell.x * cwidth;
    pas.y = shell.y * cheight;

    var a = Math.random() * 4;
    var s = Math.random() * 10;

		pas.xoff = s *  Math.sin((5 - a) * (Math.PI / 2));
  	pas.yoff = s *  Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) { pass.push(pas); }
  }
}

var lastRun = 0;
Run();
function Run() {

  var dt = 1;
  if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
	lastRun = performance.now();

  //ctx.clearRect(0, 0, cwidth, cheight);
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.fillRect(0, 0, cwidth, cheight);

  if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }

  for (let ix in shells) {

    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= (shell.xoff * dt * 0.001);
    shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

    if (shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {

    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= (pas.xoff * dt * 0.001);
    pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
    pas.size -= (dt * 0.002 * Math.random())

    if ((pas.y > cheight)  || (pas.y < -50) || (pas.size <= 0)) {
        pass.splice(ix, 1);
    }
  }
  requestAnimationFrame(Run);
}



const bdayBallons = (function(){
    const density = 7; // concurrent balloon count
    const balloons = []; 
    const colors = ['yellow', 'green', 'blue', 'red'];

    const stringElement = document.createElement("div");
    stringElement.classList.add("string");

    for (let i = 0; i < density; i++) {
        const element = document.createElement("div");
        element.classList.add("balloon");
        element.classList.add(randomColor());

        element.append(stringElement.cloneNode());
        document.body.append(element);
        
        setTimeout(() => {
            releaseBalloon(element);
        }, (i * 2000) + random(500, 1000));
    }


    function randomColor() {
        return colors[ random(0, colors.length) ];
    }

    function random (min, max){
        return Math.floor(Math.random() * (max-min)) + min;
    }

    function releaseBalloon(balloon) {
        const delay = random(100, 1000);
        const x = random(-99, -30); // random x value to fly
        const y = random(-99, -30); // random y value to fly

        const sequence = [{
            offset: 0,
            transform: `rotateZ(45deg) translate(0, 0)`
        }];


        // random fly direction
        if(random(0,2) === 0) {
            // first fly up to top left

            // left distance to keep balloon in view
            balloon.style.left = `${-1*x}vw`;

            sequence.push({
                offset: x/-200,
                transform: `rotateZ(45deg) translate(${x}vw, 0)`
            });
            sequence.push({
                offset: (x+y)/-200,
                transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
            });
            sequence.push({
                offset: (-100+y)/-200,
                transform: `rotateZ(45deg) translate(-100vw, ${y}vh)`
            });
        } else {
            // fist fly up to right top

            sequence.push({
                offset: y/-200,
                transform: `rotateZ(45deg) translate(0, ${y}vh)`
            });
            sequence.push({
                offset: (x+y)/-200,
                transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
            });
            sequence.push({
                offset: (-100+x)/-200,
                transform: `rotateZ(45deg) translate(${x}vw, -100vh)`
            });
        }

        // last move is common
        sequence.push({
            offset: 1,
            transform: `rotateZ(45deg) translate(-100vw, -100vh)`
        });

        const balloonAnimation = balloon.animate(sequence, {
            duration: 15000,
            delay: delay
        });


        balloonAnimation.onfinish = () => { releaseBalloon(balloon) }
    }
})();



















document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.querySelector('.card-container');
    const card = document.querySelector('.card');
    const cardTitle = document.querySelector('.card-title');
    const cardText = document.querySelector('.card-text');

    cardContainer.addEventListener('animationend', function () {
        card.style.opacity = 1; // Set card opacity to 1 after container fade-in
    });

    card.addEventListener('animationend', function () {
        cardTitle.style.opacity = 1; // Set title opacity to 1 after card fade-in
        cardText.style.opacity = 1;  // Set text opacity to 1 after card fade-in
    });
});
