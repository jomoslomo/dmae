let currentPage = 'menu';
let tutorialButton;
let mainCourseButton;
let lessonOneButton;
let jozzButton;
let homeButton; // new button for going back to menu page
let scalesButton; // new button for scales page
let previousPage = null;
let infoButton;

function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
 tutorial = new Tutorial();
  mainCourse = new MainCourse();
  lessonOne = new LessonOne();
  jozz = new Jozz();
  scales = new Scales(); // new class for scales page
  menu = new Menu(); 
  
  let buttonWidth = 100;
  let buttonHeight = 25;
  let buttonX = width/2 - 45;
  let buttonY = height/ 2;

  
  // how to create a button
  tutorialButton = createButton('Tutorial');
  tutorialButton.position(buttonX, buttonY);
  tutorialButton.size(buttonWidth, buttonHeight);
  tutorialButton.mousePressed(() => changePage('tutorial'));

  buttonY += 50;
  mainCourseButton = createButton('Visualizer');
  mainCourseButton.position(buttonX, buttonY);
  mainCourseButton.size(buttonWidth, buttonHeight);
  mainCourseButton.mousePressed(() => changePage('mainCourse'));

  buttonY += 50;
  lessonOneButton = createButton('Course');
  lessonOneButton.position(buttonX, buttonY);
  lessonOneButton.size(buttonWidth, buttonHeight);
  lessonOneButton.mousePressed(() => changePage('lessonOne'));

  buttonY += 50;
  jozzButton = createButton('Jozz');
  jozzButton.position(buttonX, buttonY);
  jozzButton.size(buttonWidth, buttonHeight);
  jozzButton.mousePressed(() => changePage('jozz'));

  
  buttonY += 50;
  scalesButton = createButton('Scales');
  scalesButton.position(buttonX, buttonY);
  scalesButton.size(buttonWidth, buttonHeight);
  scalesButton.mousePressed(() => changePage('scales'));
  
  // set up the home button
  homeButton = createButton('Home');
  homeButton.position(width/10, height/10);
  homeButton.size(buttonWidth, buttonHeight);
  homeButton.mousePressed(() => changePage('menu'));

  infoButton = createButton('Info');
  infoButton.position(width/5,height/10 );
  infoButton.size(buttonWidth, buttonHeight);
  infoButton.mouseClicked(() => {
    if (currentPage === 'scales') {
      const infoText = 'To use scales:\n\n1. Press the left and right arrow keys to toggle through the available scales.\n2. Press the "1" to "=" keys to play the notes in the current scale.\n3. Press the "R" key to start recording a sample of your voice.\n4. Press the "S" key to stop recording the sample.\n5. Use the row "1-=" to play the intervals using your recording.';
      alert(infoText);

    } else if(currentPage === 'mainCourse'){
      const infoText = 'To use Visualizer:\n\n1.  Press the "1" to "=" keys to play the differnt visualizations of each interval.';
      alert(infoText);
    }else if(currentPage === 'lessonOne'){
      const infoText = 'To use Lesson One:\n\n1. Press the "1" to "=" keys to select the corresponding interval.\n2. After selecting an interval, listen to the sound played.\n3. If you think you know the interval, press the corresponding number key again to submit your answer.\n4. If your answer is correct, your score will increase by 1, and a "Good Job!" message will appear. If your answer is incorrect, your score will decrease by 1, and a "Try Again." message will appear.\n5. After submitting your answer, a new random interval will be played, and the process will repeat.\n\nControls:\n\n- Press "R" to replay the current interval.\n- Press "C" to hear the current interval played consecutively with the previous interval.\n- Use the row "1-=" to select the interval.\n- Your score is displayed in the top center of the screen.';
      alert(infoText);

    }else if(currentPage === 'jozz'){
      const infoText = 'To use jozz:\n\n1.  Press the "1" to "=" keys to play the interval.';
      alert(infoText);
    }else{}
  });

  
  
}

function draw() {
  if (currentPage === 'menu') {
    tutorialButton.show();
    mainCourseButton.show();
    lessonOneButton.show();
    jozzButton.show();
    scalesButton.show(); // show the scales button on menu page
    homeButton.hide(); // hide home button on menu page
    menu.render();
    infoButton.hide();
  } else {
    tutorialButton.hide();
    mainCourseButton.hide();
    lessonOneButton.hide();
    jozzButton.hide();
    scalesButton.hide(); // hide the scales button on other pages
    homeButton.show(); // show home button on other pages
    infoButton.show();

    if (currentPage === 'tutorial') {
      tutorial.render();
    } else if (currentPage === 'mainCourse') {
      mainCourse.render();
    } else if (currentPage === 'lessonOne') {
      lessonOne.render();
    } else if (currentPage === 'jozz') {
      jozz.render();
    } else if (currentPage === 'scales') {
      scales.render(); // render the scales page
    }
  }
}
function changePage(newPage) {
  if (currentPage !== newPage) {
    // Call reset function for the previous page
    if (previousPage === 'menu') {
      menu.reset();
      mainCourse.reset();
      jozz.reset();
      scales.reset();
    } else if (previousPage === 'tutorial') {
      tutorial.reset();
    } else if (previousPage === 'mainCourse') {
      mainCourse.reset();
    } else if (previousPage === 'lessonOne') {
      lessonOne.reset();
    } else if (previousPage === 'jozz') {
      jozz.reset();
    } else if (previousPage === 'scales') {
      scales.reset();
    }

    // Set previousPage to the current page
    previousPage = currentPage;

    // Set currentPage to the new page
    currentPage = newPage;
  }
}

function keyPressed() {
  if (currentPage === 'mainCourse') {
    mainCourse.handleInput();
  } else if (currentPage === 'lessonOne') {
    lessonOne.handleInput();
  } else if (currentPage === 'jozz') {
    jozz.handleInput();
  } else if (currentPage === 'scales') {
    scales.handleInput();
  }
}
