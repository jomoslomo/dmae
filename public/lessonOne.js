class LessonOne{
constructor() {
    this.osc = new p5.Oscillator("sine");
    this.osc2 = new p5.Oscillator("sine");
    this.circles = [];
    this.selectedCircle = null;
    this.answerFeedback = ""; // Initialize answer feedback message
    this.answerFeedbackColor = color(0); // Initialize answer feedback color

    this.intervalNames = [
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
    this.spacing = 80;

    this.x = width / 2 - (this.intervalNames.length - 1) * this.spacing / 2;
    this.y = height / 2;
    this.currentInterval = floor(random(this.intervalNames.length));
    this.score = 0;
    this.initialIntervalPlayed = false; // Add a flag to track the initial interval play

    // Create an array of circle objects
    for (let i = 0; i < this.intervalNames.length; i++) {
      this.circles.push({
        x: this.x + i * this.spacing,
        y: this.y,
        size: 10,
        color: this.colors[i],
      });
    }

    // Play the initial random interval
    this.playSound(this.currentInterval);
  }
  render() {
  background(220);
if (!this.initialIntervalPlayed) {
      // Play the initial random interval only once
      this.playSound(this.currentInterval);
      this.initialIntervalPlayed = true;
  
    }
  // Calculate the rotation angle based on the current frame count
  push();
  const rotationAngle = frameCount / 100;

  // Translate to the center of the canvas
  translate(width / 2, height / 2);

  //rotate(rotationAngle);

  // Translate back to the original position
  translate(-width / 2, -height / 2);

  // Draw the circles
  this.circles.forEach((circle, index) => {
  fill(circle.color);
  if (index === this.selectedCircle) {
    circle.size = 80; // increase the size of the selected circle
  } else {
    
    circle.size = 40;
  }
  ellipse(circle.x, circle.y, circle.size);
});


  // Draw lines between every neighboring circle if the selected circle is index 1
  if (this.selectedCircle !== null) {
  
  }

  pop();

  
        this.displayIntervalName();
        this.displayScore();
      this.displayAnswer();
    this.displayKeys(this.colors);
    // Create a string of all the keyboard keys associated with each interval
  


}
  
  
     displayIntervalName() {
    const intervalName = this.intervalNames[this.selectedCircle];
    const colorIndex = this.selectedCircle % this.colors.length;
    const textColor = this.colors[colorIndex];
    textAlign(CENTER);
    textSize(24);
    fill(textColor);
    text(intervalName, width / 2, height / 3.5);
  }
  
    displayKeys(colors) {
    let keyboardKeys = "";
    for (let i = 0; i < this.intervalNames.length; i++) {
      let key = "";
      if (i === 10) {
        key = "-";
      } else if (i === 11) {
        key = "=";
      } else {
        key = i + 1 < 10 ? i + 1 : 0;
      }
      fill(colors[i]); // use the corresponding color from the colors array
      textAlign(CENTER);
      textSize(12);
      noStroke();
      text(key, this.x + i * this.spacing, this.y + 40); // set the color of each key
    }
  }
  
  displayAnswer(){
  textAlign(CENTER);
    textSize(20);
    fill(this.answerFeedbackColor);
    text(this.answerFeedback, width / 2, height - 50);
}

 displayScore() {
    textAlign(CENTER);
    textSize(24);
    noStroke();
    fill(0);
    text("Score: " + this.score, width / 2, height / 6);
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
  }else if (key === "r") {
      this.playSound(this.currentInterval);
  }else if (key === "c"){
      this.playSoundCons(this.currentInterval);
  }
}


selectCircle(index, circleColor) {
    // Deselect the previously selected circle
    if (this.selectedCircle !== null) {
      // this.circles[this.selectedCircle].color = color(200);
    }

    // Select the new circle
    this.circles[index].color = circleColor;
    this.selectedCircle = index;

    // Check if the answer is correct and update the score
    this.checkAnswer(index);

    // Play sound for the selected interval
    this.playSound(index);
  }
  
  
   checkAnswer(index) {
    if (index === this.currentInterval) {
      this.score++; // Increase score if the answer is correct
      this.answerFeedback = "Good Job!"; // Set answer feedback message
      this.answerFeedbackColor = color(0, 100, 50); // Change color to green for correct answer

      // Generate a new random interval
      this.currentInterval = floor(random(this.intervalNames.length));
 setTimeout(() => {
       this.answerFeedback = "Next Interval"
   this.answerFeedbackColor = color('black');
      this.playSound(this.currentInterval);
    }, 2000);
    } else {
      this.score--; // Decrease score if the answer is incorrect
      this.answerFeedback = "Try Again."; // Set answer feedback message
      this.answerFeedbackColor = color(255, 0, 0); // Change color to red for incorrect answer
    }
  }
 playSound(intervalIndex, duration = 0.5) {
    let ratio = this.getIntervalRatio(intervalIndex);
    userStartAudio();
    this.osc.freq(440, 0.1);
    this.osc.amp(0.2,0.1);
    this.osc.start();
    this.osc2.freq(440 * ratio, 0.1);
    this.osc2.amp(0.2, 0.1);
    this.osc2.start();
  
    // Decrease amplitude after the specified duration
    this.osc2.amp(0, duration);
    this.osc.amp(0, duration);
    if (intervalIndex === this.currentInterval) {
      console.log("Current random interval: " + this.intervalNames[intervalIndex]);
    }
  }
  
  playSoundCons(intervalIndex, duration = 0.5) {
  let ratio = this.getIntervalRatio(intervalIndex);
  userStartAudio();
  
  // Play the first oscillator
  this.osc.freq(440, 0.1);
  this.osc.amp(0.2, 0.1);
  this.osc.start();

  // Schedule the start of the second oscillator after the duration of the first one
  setTimeout(() => {
    this.osc2.freq(440 * ratio, 0.1);
    this.osc2.amp(0.2, 0.1);
    this.osc2.start();

    // Decrease amplitude after the specified duration
    this.osc2.amp(0, duration);
    this.osc.amp(0, duration);

    if (intervalIndex === this.currentInterval) {
      console.log("Current random interval: " + this.intervalNames[intervalIndex]);
    }
  }, duration * 1000); // convert duration from seconds to milliseconds
}


playNextInterval() {
    this.currentInterval = floor(random(this.intervalNames.length));
    this.playSound(this.currentInterval);
  }
  
  
 getIntervalRatio(intervalIndex) {
  return Math.pow(2, intervalIndex / 12);
}
  
  
  reset() {
  this.score = 0;
  this.currentInterval = floor(random(this.intervalNames.length));
  this.selectedCircle = null;
  this.initialIntervalPlayed = false;
  // Reset the colors of all circles to default
  // for (let i = 0; i < this.circles.length; i++) {
  //   this.circles[i].color = color(200);
  // }

  // Play the initial random interval
  this.playSound(this.currentInterval);
  this.answerFeedback = " ";
}

}
