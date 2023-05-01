// menu.js
function Menu() {
  // Define any variables or properties for the menu component here
  this.osc = new p5.Oscillator("sine");
    this.osc2 = new p5.Oscillator("sine");
}
Menu.prototype.reset = function() {
  // Reset the state or properties of this object as needed
  this.osc.stop();
  this.osc2.stop();
background(255);
};
let currentColor, targetColor;
let lerpAmount = 0;
let noiseOffset = 0;

Menu.prototype.render = function() {
  //tutorial.reset();
   //background(255);
  drawCirclesAndLines(width / 10);
  
};



function generateEllipses() {
  // Stop all audio output

  // generate a random color for the ellipses
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b);

  // generate random positions and sizes for the ellipses
  let ellipseX = random(width);
  let ellipseY = random(height);
  let ellipseSize = random(10, 50);

  // draw the ellipse
  ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);
}
let shapeDelay = 200; // number of frames between generating new shapes
let lastShapeFrame = 0; // keep track of the last frame when a shape was generated

function drawCirclesAndLines() {
  
  this.colors = [
      color(163, 0, 0), // unison
      color(242, 0, 0), // min 2nd
      color(255, 0, 0), // maj 2nd
      color(255, 79, 0), // min 3rd
      color(255, 207, 0), // maj 3rd
      color(198, 255, 0), // perfect 4th
      color(94, 255, 0), // tritone
      color(0, 255, 146), // perfect 5th
      color(0, 178, 255), // min 6th
      color(0, 40, 255), // maj 6th
      color(102, 0, 255), // min 7th
      color(129, 0, 169), // maj 7th
    ];
  // Set up the parameters for the circles
  
  translate(width/2, height/2);
  const rotationAngle = radians(frameCount/2); // change the rotation speed by adjusting the division factor
  rotate(rotationAngle);
  translate(-width/2, -height/2)
  
  const numPoints = 50;
  const angleIncrement = TWO_PI / numPoints;
  const centerX = (width / 2);
  const centerY = (height / 2);
  

  const radius = 400 ;

  // Initialize the circles array
  const circles = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = angleIncrement * i - HALF_PI;
    const x = centerX + cos(angle) * radius;
    const y = centerY + sin(angle) * radius;
    const colorIndex = i % this.colors.length;
    const circleColor = this.colors[colorIndex];
    circles.push({ x: x, y: y, size: 10, color: circleColor });
  }

  // Draw the circles
  circles.forEach((circle) => {
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
  });

  // Draw lines between every neighboring circle
  const randomIndex = Math.floor(random(0, numPoints));
  for (let i = 0; i < circles.length; i += 1) {
    const circle1 = circles[i];
    const circle2 = circles[(i + randomIndex) % circles.length];
    const lineColorIndex = (i + randomIndex) % this.colors.length;
    const lineColor = this.colors[lineColorIndex];
    stroke(lineColor);
    line(circle1.x, circle1.y, circle2.x, circle2.y);
  }
}
