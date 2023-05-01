class Jozz {
  constructor() {
    this.osc = new p5.Oscillator("sine");
    this.osc2 = new p5.Oscillator("sine");

    // Initialize variables for the main course component
    this.intervals = [
      "unison",
      "min 2nd",
      "maj 2nd",
      "min 3rd",
      "maj 3rd",
      "perfect 4th",
      "tritone",
      "perfect 5th",
      "min 6th",
      "maj 6th",
      "min 7th",
      "maj 7th",
    ];
    this.currentIntervalIndex = 0;
    this.currentInterval = this.intervals[this.currentIntervalIndex];
    this.currentIntervalColor = getIntervalColor(this.currentInterval);
    
      this.lines = [];
      this.intervalPositions= [];
  this.previousInterval = null;
    this.ellipses= [];

     this.previousEllipse = null;

  }

 
   render() {
    background(255);
    this.drawEllipses();
     this.drawLines();
  }
drawCirclesAndLines() {
    // Draw the circles
    this.intervals.forEach((interval, index) => {
      const x = width / 2 + 150 * cos(TWO_PI * (index / this.intervals.length) - HALF_PI);
      const y = height / 2 + 150 * sin(TWO_PI * (index / this.intervals.length) - HALF_PI);
      fill(getIntervalColor(interval));
      ellipse(x, y, 50, 50);

      // Draw lines between every neighboring circle if the selected circle is index 1
      if (this.currentIntervalIndex === index) {
        const currentColor = getIntervalColor(interval);
        stroke(currentColor);
        for (let i = 0; i < this.intervals.length; i += 1) {
          const circle1 = { x, y };
          const circle2 = {
            x: width / 2 + 150 * cos(TWO_PI * (i / this.intervals.length) - HALF_PI),
            y: height / 2 + 150 * sin(TWO_PI * (i / this.intervals.length) - HALF_PI),
          };
          line(circle1.x, circle1.y, circle2.x, circle2.y);
        }
      }
    });
  }
  drawEllipses() {
    for (let i = 0; i < this.ellipses.length; i++) {
      const currentEllipse = this.ellipses[i];
      if (i === this.ellipses.length - 1) {
        fill(currentEllipse.color);
      } else {
        noFill();
      }
      ellipse(currentEllipse.x, currentEllipse.y, 50, 50);
    }
  }
  
drawLines() {
  for (const currentLine of this.lines) {
    stroke(currentLine.color);
    strokeWeight(2);
    line(currentLine.x1, currentLine.y1, currentLine.x2, currentLine.y2);
  }
}


  handleInput() {
    let centerX = width / 2;
    let centerY = height / 2;
    let radius = 150;
    let distance = dist(mouseX, mouseY, centerX, centerY);

    if (distance <= radius) {
      let angle = atan2(mouseY - centerY, mouseX - centerX);
      if (angle < 0) {
        angle += TWO_PI;
      }
      this.currentIntervalIndex = floor(
        angle / (TWO_PI / this.intervals.length)
      );
      this.currentInterval = this.intervals[this.currentIntervalIndex];
      this.currentIntervalColor = getIntervalColor(this.currentInterval);
      this.playSound();
      //this.addLine();
    //this.addEllipse();
    }
  }
  


addLine() {
  // const currentLine = {
  //   x1: random(width),
  //   y1: random(height),
  //   x2: random(width),
  //   y2: random(height),
  //   color: this.currentIntervalColor,
  // };
  this.lines.push(currentLine);
}

  
addEllipse() {
  // Define the position of the ellipse based on its index in the intervals array
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 150;
  const angle = TWO_PI / this.intervals.length;
  const index = this.intervals.indexOf(this.currentInterval);
  const x = centerX + cos(index * angle - HALF_PI) * radius;
  const y = centerY + sin(index * angle - HALF_PI) * radius;

  const currentEllipse = {
    x,
    y,
    color: this.currentIntervalColor,
  };
  this.ellipses.push(currentEllipse);

  if (this.previousEllipse !== null) {
    const intervalIndex = this.intervals.indexOf(this.currentInterval);
    const prevIndex = this.intervals.indexOf(this.previousInterval);
    const distance = Math.abs(intervalIndex - prevIndex);
    const maxDistance = this.intervals.length / 2;
    const numLines = Math.round(map(distance, 0, maxDistance, 1, 5));
    for (let i = 0; i < numLines; i++) {
      const currentLine = {
        x1: this.previousEllipse.x,
        y1: this.previousEllipse.y,
        x2: currentEllipse.x,
        y2: currentEllipse.y,
        color: this.currentIntervalColor,
      };
      this.lines.push(currentLine);
    }
  }

  this.previousEllipse = currentEllipse;
}



playSound() {
  let ratio = getIntervalRatio(this.currentInterval);
  userStartAudio();
  this.osc2.start();
  this.osc2.freq(440 * ratio, 0.005);
  this.osc2.amp(0.2, 1);
  setTimeout(() => {
    this.osc2.stop();
  }, 750);
}

   reset() {
    this.lines = [];
    this.intervalPositions = [];
    this.previousInterval = null;
    this.ellipses = [];
    this.previousEllipse = null;
    this.currentIntervalIndex = 0;
    this.currentInterval = this.intervals[this.currentIntervalIndex];
    this.currentIntervalColor = getIntervalColor(this.currentInterval);
    this.osc.stop();
    this.osc2.stop();
  }
  
}


function keyTyped() {
  if (currentPage === "jozz") {
    let keyPressedIndex = "1234567890-=".indexOf(key);
    if (keyPressedIndex >= 0 && keyPressedIndex < jozz.intervals.length) {
      jozz.previousInterval = jozz.currentInterval; // store previous interval
      jozz.currentIntervalIndex = keyPressedIndex;
      jozz.currentInterval = jozz.intervals[jozz.currentIntervalIndex];
      jozz.currentIntervalColor = getIntervalColor(jozz.currentInterval);

      jozz.playSound();
      jozz.addEllipse();
      loop();
    } else if (key === 'j' || key === 'J') {
      jozz.previousInterval = jozz.currentInterval; // store previous interval
      jozz.currentInterval = getRandomInterval();
      jozz.currentIntervalIndex = jozz.intervals.indexOf(jozz.currentInterval);
      jozz.currentIntervalColor = getIntervalColor(jozz.currentInterval);

      jozz.playSound();
      jozz.addEllipse();
      loop();
    }
  }
}





function getIntervalColor(interval) {
  // Return the corresponding color for the given interval
  // You can define your own color scheme here
  switch (interval) {
    case "unison":
      return color(163, 0, 0); //
    case "min 2nd":
      return color(242, 0, 0); //
    case "maj 2nd":
      return color(255, 0, 0); //
    case "min 3rd":
      return color(255, 79, 0); //
    case "maj 3rd":
      return color(255, 207, 0); //
    case "perfect 4th":
      return color(198, 255, 0); //
    case "tritone":
      return color (94, 255, 0);
    case "perfect 5th":
      return color(0, 255, 146); //
    case "min 6th":
      return color(0, 178, 255); //
    case "maj 6th":
      return color(0, 40, 255); //
    case "min 7th":
      return color(102, 0, 255); //
    case "maj 7th":
      return color(129, 0, 169); //
    case "octave":
      return color(0, 0, 0); //
    default:
      return color(0); // black (default color)
  }
}
function getIntervalRatio(interval) {
  // Return the corresponding color for the given interval
  // You can define your own color scheme here
  switch (interval) {
    case "unison":
      return (ratio = 1.0); //
    case "min 2nd":
      return (ratio = 1.06); //
    case "maj 2nd":
      return (ratio = 1.12); //
    case "min 3rd":
      return (ratio = 1.19); //
    case "maj 3rd":
      return (ratio = 1.26); //
    case "perfect 4th":
      return (ratio = 1.33); //
    case "tritone":
      return (ratio = 1.41);
    case "perfect 5th":
      return (ratio = 1.5); //
    case "min 6th":
      return (ratio = 1.59); //
    case "maj 6th":
      return (ratio = 1.68); //
    case "min 7th":
      return (ratio = 1.78); //
    case "maj 7th":
      return (ratio = 1.89); //

  }
}


function getRandomInterval() {
  const intervals = [
    "unison",
    "min 2nd",
    "maj 2nd",
    "min 3rd",
    "maj 3rd",
    "perfect 4th",
    "tritone",
    "perfect 5th",
    "min 6th",
    "maj 6th",
    "min 7th",
    "maj 7th",
  ];

  const randomIndex = Math.floor(Math.random() * intervals.length);
    noLoop();
  return intervals[randomIndex];
}

