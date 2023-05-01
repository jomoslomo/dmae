let currentPage = 'menu';
let tutorialButton;
let mainCourseButton;
let lessonOneButton;
let jozzButton;
let homeButton; // new button for going back to menu page
let scalesButton; // new button for scales page
let previousPage = null;

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
  mainCourseButton = createButton('Main Course');
  mainCourseButton.position(buttonX, buttonY);
  mainCourseButton.size(buttonWidth, buttonHeight);
  mainCourseButton.mousePressed(() => changePage('mainCourse'));

  buttonY += 50;
  lessonOneButton = createButton('Lesson One');
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
  homeButton.position(width/10, height/7 - 5);
  homeButton.size(buttonWidth, buttonHeight);
  homeButton.mousePressed(() => changePage('menu'));
  
  
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
  } else {
    tutorialButton.hide();
    mainCourseButton.hide();
    lessonOneButton.hide();
    jozzButton.hide();
    scalesButton.hide(); // hide the scales button on other pages
    homeButton.show(); // show home button on other pages
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
