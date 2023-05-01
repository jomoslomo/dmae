// tutorial.js 

function Tutorial() {
  // Define any variables or properties needed for the tutorial component here
}
  Tutorial.prototype.reset = function(){}
Tutorial.prototype.render = function() {
  // Set the background color of the canvas
  background(255);
// Set the font properties for the text
  textSize(24);
  textAlign(CENTER, TOP);
  textFont('Tahoma');
  translate(width/2,0);
  // Display the title of the tutorial
  fill(0);
  text('Introduction to Intervals', 50, 50);

  // Display the text for the tutorial
  textSize(12);
  fill(50);
  text('In music theory, an interval is the distance between two pitches,', 50, 90);
  text('measured in semitones. A distance of one semitone is the equivalent', 50, 103);
  text('of two immediately adjacent notes on a piano.', 50, 116);
  text('Intervals can be described in two ways: Generic and Specific.', 50, 138);
  text('Generic intervals specify distance in terms of note names. For example,', 50, 151);
  text('if you were to count the letters between A and D inclusively, you get 4,', 50, 164);
  text('meaning the generic interval between and A and D is a fourth.', 50, 177);
  text('Specific intervals look at the actual number of semitones between pitches', 50, 200);
  text('and add a quality to the generic interval. These qualities are major, minor,', 50, 213);
  text('perfect, augmented, and diminished.', 50, 226);
  
  //Display the text for the color assignment
  textSize(24);
  fill(0);
  text('Assigning Colors to Intervals', 50, 270);
  textSize(12);
  fill(50);
  text('As an assistance to being able to both visually and aurally identify intervals,', 50, 310);
  text('we have created a color assigment method to both generic and specific intervals', 50, 323);
  text('The colors were carefully calculated so that the distance between the pitch frequencies', 50,     345);
  text('and the colors frequencies are related proportionally, allowing for a visual representation', 50, 358);
  text('of an interval. The specific intervals and their assigned colors are:', 50, 371);
  
  //Display the text for specific intervals
push();
translate(-100,0);
  textSize(15);
  fill(163, 0, 0);
  text('Unison, ', 50, 390);
  fill(242, 0, 0);
  text(' Minor 2nd,', 105, 390);
  fill(255, 0, 0);
  text('Major 2nd,', 180, 390);
  fill(255, 79, 0);
  text('Minor 3rd,', 50, 410);
  fill(255, 207, 0);
  text('Major 3rd,', 120, 410);
  fill(198, 255, 0);
  text('Perfect 4th,', 190, 410);
  fill(0, 255, 146);
  text('Perfect 5th,', 50, 430);
  fill(0, 178, 255);
  text('Minor 6th,', 130, 430);
  fill(0, 40, 255);
  text('Major 6th,', 200, 430);
  fill(106, 0, 255);
  text('Minor 7th,', 50, 450);
  fill(129, 0, 169);
  text('Major 7th,', 120, 450);
  fill(97, 0, 97);
  text('Octave', 190, 450);
  pop();
  //Display the text for Main Course
  textSize(24);
  fill(0);
  text('Main Course', 50, 490);
  textSize(12);
  text('Our main course displays interval distance in the form of musical geometry while using', 50, 530)
  text('our colors to help associate the shapes to the specific interval. This also assists in', 50, 543);
  text('differentiating between musical complements, which are interval distances that contain', 50, 556);
  text('the same number of semitones in opposite directions', 50, 569);
  text('Use the row "1-=" to cycle through every interval and display their interval geometry.', 50, 591)
  
  //Display the text for Lesson 1
  textSize(24);
  text('Lesson One', 50, 631);
  textSize(12);
  text('Lesson One plays an interval to which you respond with the corresponding key.', 50, 671);
  text('Use the row "1-=" as you did in the Main Course to identify the interval', 50, 684);
  text('Use "R" to replay the interval and "C" to hear the pitches seperately', 50, 697)

  //Display the text for Jozz
  textSize(24);
  text('Jozz', 50, 737);
  textSize(12);
  text('Jozz will allow you to freely play a melody while visuallizing the interval geometry', 50, 777);
  text('Use the row "1-=" as you did in the Main Course to compose a melody.', 50, 790);
  
  //Display the text for Scales
  textSize(24);
  text('Scales', 50, 830);
  textSize(12);
  text('Scales allows you to record yourself and implement your voice into a scale, which is a collection,', 50, 870);
  text('of specific intervals', 50, 883);
  text('Use the "R" key to begin recording, the "S" key to stop recording', 50, 896);
  text('Use the row "1-=" to play the intervals using your recording', 50, 909);
  
 
  
};
