// mainCourse.js



class MainCourse {
  constructor() {
  
  this.osc = new p5.Oscillator("sine");
  this.osc2 = new p5.Oscillator("sine");
    this.circles = [];
    this.selectedCircle = null;
    this.intervalNames = ["unison", "min 2nd", "maj 2nd", "min 3rd", "maj 3rd", "perfect 4th", "tritone", "perfect 5th", "min 6th", "maj 6th", "min 7th", "maj 7th"];
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = 150;
    this.numPoints = 12;
    this.angleIncrement = TWO_PI / this.numPoints;
    this.rootNote = 440;
    this.rootNoteIndex = 0;
    // Createote an array of circle objects
    for (let i = 0; i < this.numPoints; i++) {
      const angle = this.angleIncrement * i - HALF_PI; // Subtract HALF_PI to start at the top
      const x = this.centerX + cos(angle) * this.radius;
      const y = this.centerY + sin(angle) * this.radius;
      this.circles.push({ x: x, y: y, size: 10, color: color(200) });
    }
  }

  
  
  
 render() {
  background(220);

  // Calculate the rotation angle based on the current frame count
  push();
  const rotationAngle = frameCount / 100;

  // Translate to the center of the canvas
  translate(width / 2, height / 2);

  //rotate(frameCount / 100);

  // Translate back to the original position
  translate(-width / 2, -height / 2);

  // Draw the circles and lines
  this.drawCirclesAndLines();
  pop();

  // Display the name of the selected interval
  textAlign(CENTER);
  textSize(16);
  noStroke();
  fill(0);
  text(this.intervalNames[this.selectedCircle], width / 2, height / 12);
}


  handleInput() {
    // Check which key was pressed
    if (key === "1") {
      this.selectCircle(0, color(163, 0, 0)); // unison
    } else if (key === "2") {
      this.selectCircle(1, color(242, 0, 0)); // min 2nd
    } else if (key === "3") {
      this.selectCircle(2, color(255, 0, 0)); // maj 2nd
    } else if (key === "4") {
      this.selectCircle(3, color(255, 79, 0)); // min 3rd
    } else if (key === "5") {
      this.selectCircle(4, color(255, 207, 0)); // maj 3rd
    }else if (key === "6") {
     this.selectCircle(5, color(198, 255, 0)); // perfect 4th
  } else if (key === "7") {
     this.selectCircle(6, color(94, 255, 0)); // tritone
  } else if (key === "8") {
     this.selectCircle(7, color(0, 255, 146)); // perfect 5th
  } else if (key === "9") {
     this.selectCircle(8, color(0, 178, 255)); // min 6th
  } else if (key === "0") {
    this.selectCircle(9, color(0, 40, 255)); // maj 6th
  } else if (key === "-") {
    this.selectCircle(10, color(102, 0, 255)); // min 7th
  } else if (key === "=") {
    this.selectCircle(11, color(129, 0, 169)); // maj 7th
  }  
}
drawAllCirclesAndLines() {
  // Draw the circles and lines on top of each other
  for (let i = 0; i < this.circles.length; i++) {
    const circle = this.circles[i];
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
    stroke(circle.color);
    for (let j = 0; j < this.circles.length; j++) {
      const neighbor = this.circles[(j + i) % this.circles.length];
      line(circle.x, circle.y, neighbor.x, neighbor.y);
    }
  }
}

drawCirclesAndLines() {
  // Draw the circles
  this.circles.forEach((circle) => {
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.size);
  });

  // Draw lines between every neighboring circle if the selected circle is index 1
  if (this.selectedCircle !== null) {
    for (let i = 0; i < this.circles.length; i += 1) {
      const circle1 = this.circles[i];
      const circle2 = this.circles[(i + this.selectedCircle) % this.circles.length];
      stroke(this.circles[this.selectedCircle].color);
      line(circle1.x, circle1.y, circle2.x, circle2.y);
    }
  }
}


selectCircle(index, circleColor) {
  // Deselect the previously selected circle
  if (this.selectedCircle !== null) {
    this.circles[this.selectedCircle].color = color(200);
  }

  // Select the new circle
  this.circles[index].color = circleColor;
  this.selectedCircle = index;

  // Play sound for the selected interval
  switch (index) {
    case 0:
      this.playSound(0);
      break;
    case 1:
      this.playSound(1);
      break;
    case 2:
      this.playSound(2);
      break;
    case 3:
      this.playSound(3);
      break;
    case 4:
      this.playSound(4);
      break;
    case 5:
      this.playSound(5);
      break;
    case 6:
      this.playSound(6);
      break;
    case 7:
      this.playSound(7);
      break;
    case 8:
      this.playSound(8);
      break;
    case 9:
      this.playSound(9);
      break;
    case 10:
      this.playSound(10);
      break;
    case 11:
      this.playSound(11);
      break;
  }
}

 playSound(intervalIndex) {
  let ratio = this.getIntervalRatio(intervalIndex);
  userStartAudio();
  this.osc.freq(this.rootNote, 0.1);
  this.osc2.freq(this.rootNote * ratio, 0.1);
  this.osc.amp(0.2,0.1);
  this.osc2.amp(0.2, 0.1);
  this.osc2.start();
  this.osc.start();
}


 getIntervalRatio(intervalIndex) {
  return Math.pow(2, intervalIndex / 12);
}
  
  
 reset() {
  this.selectedCircle = null;
  this.centerX = width / 2;
  this.centerY = height / 2;
  this.radius = 150;
  this.numPoints = 12;
  this.angleIncrement = TWO_PI / this.numPoints;
  this.rootNote = 440;
  this.rootNoteIndex = 0;
  this.circles = [];
  for (let i = 0; i < this.numPoints; i++) {
    const angle = this.angleIncrement * i - HALF_PI;
    const x = this.centerX + cos(angle) * this.radius;
    const y = this.centerY + sin(angle) * this.radius;
    this.circles.push({ x: x, y: y, size: 10, color: color(200) });
  }
  this.osc.stop();
  this.osc2.stop();
  this.osc.amp(0);
  this.osc2.amp(0);
}

}
