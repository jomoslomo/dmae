
class Scales {
   constructor() {
    this.recordedSampleBuffer = null;
    this.mic = new p5.AudioIn();
    this.recorder = new p5.SoundRecorder();
    this.soundFile = new p5.SoundFile();
    this.isRecording = false;
    this.currentScaleIndex = 0;

    this.scales = [
      { name: 'Major Pentatonic', notes: [0, 2, 4, 7, 9] },
      { name: 'Minor Pentatonic', notes: [0, 3, 5, 7, 10] },
      { name: 'Blues', notes: [0, 3, 5, 6, 7, 10] },
      { name: 'Hungarian Minor', notes: [0, 2, 3, 6, 7, 8, 11] },
      { name: 'Japanese Hirajoshi', notes: [0, 2, 3, 7, 8] },
      { name: 'Indian Raga Bhairav', notes: [0, 1, 4, 5, 7, 8, 11] },
      // { name: 'Arabic Maqam Hijaz', notes: [0, 1, 4, 5, 7, 8, 11] },
      // { name: 'Spanish Gypsy', notes: [0, 1, 4, 5, 7, 8, 10] },
      { name: 'Altered Scale', notes: [0, 1, 3, 4, 6, 8, 10] },
      { name: 'Phrygian Dominant Scale', notes: [0, 1, 4, 5, 7, 8, 10] },
      { name: 'Whole Tone Scale', notes: [0, 2, 4, 6, 8, 10] },
      { name: 'Diminished Scale', notes: [0, 1, 3, 4, 6, 7, 9, 10] },
      { name: 'Chromatic Scale', notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
    ];
    
    this.mic.start();
    this.recorder.setInput(this.mic);
    this.showButtons();
  }
showButtons(){

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.style.display = 'flex';
    buttonsWrapper.style.flexWrap = 'wrap';
    document.body.appendChild(buttonsWrapper);

    const recordStopWrapper = document.createElement('div');
    recordStopWrapper.style.display = 'flex';
    recordStopWrapper.style.flexDirection = 'row';
    buttonsWrapper.appendChild(recordStopWrapper);

    const recordBtn = document.createElement('button');
    recordBtn.innerText = 'Record';
    recordBtn.addEventListener('click', () => {
      this.recordSample();
    });
    recordStopWrapper.appendChild(recordBtn);

    const stopBtn = document.createElement('button');
    stopBtn.innerText = 'Stop';
    stopBtn.addEventListener('click', () => {
      if (this.isRecording) {
        this.recordSample();
      }
    });
    recordStopWrapper.appendChild(stopBtn);


    const prevScaleBtn = document.createElement('button');
    prevScaleBtn.innerText = 'Prev Scale';
    prevScaleBtn.addEventListener('click', () => {
      this.currentScaleIndex = (this.currentScaleIndex - 1 + this.scales.length) % this.scales.length;
    });
    buttonsWrapper.appendChild(prevScaleBtn);

    const nextScaleBtn = document.createElement('button');
    nextScaleBtn.innerText = 'Next Scale';
    nextScaleBtn.addEventListener('click', () => {
      this.currentScaleIndex = (this.currentScaleIndex + 1) % this.scales.length;
    });
    buttonsWrapper.appendChild(nextScaleBtn);

    // this.scaleButtons = []; // Array to hold the scale buttons
    // for (let i = 0; i < this.scales.length; i++) {
    //   const scaleBtn = document.createElement('button');
    //   scaleBtn.innerText = this.scales[i].name;
    //   scaleBtn.addEventListener('click', () => {
    //     this.currentScaleIndex = i;
    //   });
    //   buttonsWrapper.appendChild(scaleBtn);
    //   this.scaleButtons.push(scaleBtn);
    // }

    const intervalBtnsWrapper = document.createElement('div');
    intervalBtnsWrapper.style.display = 'flex';
    intervalBtnsWrapper.style.justifyContent = 'center';
    intervalBtnsWrapper.style.alignItems = 'center';
    document.body.appendChild(intervalBtnsWrapper);
    
    for (let i = 0; i < 12; i++) {
      const intervalBtn = document.createElement('button');
      intervalBtn.innerText = i + 1;
      const noteIndex = (i + 3) % 12;
      let noteColor;
      switch (noteIndex) {
        case 0:
          noteColor = 'rgb(163, 0, 0)'; // unison
          break;
        case 1:
          noteColor = 'rgb(242, 0, 0)'; // min 2nd
          break;
        case 2:
          noteColor = 'rgb(255, 0, 0)'; // maj 2nd
          break;
        case 3:
          noteColor = 'rgb(255, 79, 0)'; // min 3rd
          break;
        case 4:
          noteColor = 'rgb(255, 207, 0)'; // maj 3rd
          break;
        case 5:
          noteColor = 'rgb(198, 255, 0)'; // perfect 4th
          break;
        case 6:
          noteColor = 'rgb(94, 255, 0)'; // tritone
          break;
        case 7:
          noteColor = 'rgb(0, 255, 146)'; // perfect 5th
          break;
        case 8:
          noteColor = 'rgb(0, 178, 255)'; // min 6th
          break;
        case 9:
          noteColor = 'rgb(0, 40, 255)'; // maj 6th
          break;
        case 10:
          noteColor = 'rgb(102, 0, 255)'; // min 7th
          break;
        case 11:
          noteColor = 'rgb(129, 0, 169)'; // maj 7th
          break;
        default:
          noteColor = 'rgb(0, 0, 0)';
      }
      intervalBtn.style.backgroundColor = noteColor;
      intervalBtn.style.justifyContent = 'center';
      intervalBtn.style.alignItems = 'center';
      intervalBtn.addEventListener('click', () => {
        this.playInterval(i);
      });
      intervalBtnsWrapper.appendChild(intervalBtn);
    }
    

    const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  buttonsWrapper.style.display = 'flex';
buttonsWrapper.style.justifyContent = 'center';
buttonsWrapper.style.alignItems = 'center';
  button.style.fontSize = '16px';
  button.style.padding = '10px';
});

  }
  

 render() {
  background(255);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  text(this.scales[this.currentScaleIndex].name, width/2, 30);
  push(); // Save the current transformation matrix
  translate(width/2, height/2);
  let scaleNotes = this.scales[this.currentScaleIndex].notes;
  let numEllipses = 12;
  let ellipseSize = 20;
  let radius = 100;
  let angleOffset = TWO_PI; // Change this to adjust the starting interval
  for (let i = 0; i < numEllipses; i++) {
    let angle = map(i, 0, numEllipses, angleOffset, TWO_PI + angleOffset);
    let noteIndex = (i + 3) % 12;
    let noteColor;
    switch (noteIndex) {
        case 0:
          noteColor = color(163, 0, 0); // unison
          break;
        case 1:
          noteColor = color(242, 0, 0); // min 2nd
          break;
        case 2:
          noteColor = color(255, 0, 0); // maj 2nd
          break;
        case 3:
          noteColor = color(255, 79, 0); // min 3rd
          break;
        case 4:
          noteColor = color(255, 207, 0); // maj 3rd
          break;
        case 5:
          noteColor = color(198, 255, 0); // perfect 4th
          break;
        case 6:
          noteColor = color(94, 255, 0); // tritone
          break;
        case 7:
          noteColor = color(0, 255, 146); // perfect 5th
          break;
        case 8:
          noteColor = color(0, 178, 255); // min 6th
          break;
        case 9:
          noteColor = color(0, 40, 255); // maj 6th
          break;
        case 10:
          noteColor = color(102, 0, 255); // min 7th
          break;
        case 11:
          noteColor = color(129, 0, 169); // maj 7th
          break;
        default:
          noteColor = color(0);
      }
    if (scaleNotes.includes(noteIndex)) {
      fill(noteColor);
      ellipse(cos(angle) * radius, sin(angle) * radius, ellipseSize, ellipseSize);
    } else {
      fill(0);
      ellipse(cos(angle) * radius, sin(angle) * radius, ellipseSize/2, ellipseSize/2);
    }
  
  }
  pop(); // Restore the previous transformation matrix
}



  handleInput() {
    const keyToIntervals = {
      '1': 0,
      '2': 1,
      '3': 2,
      '4': 3,
      '5': 4,
      '6': 5,
      '7': 6,
      '8': 7,
      '9': 8,
      '0': 9,
      '-': 10,
      '=': 11,
    };

    const interval = keyToIntervals[key];
    if (interval !== undefined) {
      this.playInterval(interval);
    } else if (key === 'r') {
      this.recordSample();
    } else if (key === 's') {
      if (this.isRecording) {
        this.recordSample();
      }
    }else if (keyIsDown(LEFT_ARROW)) {
      this.currentScaleIndex--;
      if (this.currentScaleIndex < 0) {
        this.currentScaleIndex = this.scales.length - 1;
      }
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.currentScaleIndex++;
      if (this.currentScaleIndex >= this.scales.length) {
        this.currentScaleIndex = 0;
      }
    }
  }

toggleScales() {
    this.currentScaleIndex = (this.currentScaleIndex + 1) % this.scales.length;
  }

  playInterval(interval) {
    if (this.soundFile.isLoaded()) {
      const scaleNotes = this.scales[this.currentScaleIndex].notes;
      const intervalNote = scaleNotes[interval];
      if (isNaN(intervalNote)) {
        console.error("Invalid intervalNote:", intervalNote);
        return;
      }
      const rate = Math.pow(2, intervalNote/12); // Calculate playback rate of the interval
      this.soundFile.rate(rate); // Set the playback rate to the calculated rate
      this.soundFile.play();
    } else {
      console.error('No recorded sample available.');
    }
  }

  recordSample() {
    if (this.isRecording) {
      console.log('Recording stopped.');
      this.recorder.stop();
      this.mic.stop();
      this.isRecording = false;
      this.mic.start();
    } else {
      console.log('Recording started.');
      this.recorder.record(this.soundFile);
      this.isRecording = true;
    }
  }
  reset(){
    
  }
}
