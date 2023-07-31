/ Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


  // Display the current date in the header of the page
  var displayTime = document.querySelector("#currentDay");
  var currentTime = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
  displayTime.textContent = currentTime;

  // Add a listener for click events on the save button to save user input in local storage
  $(".saveBtn").on("click", function () {
    // Get the user input from the description field associated with the clicked save button
    var text = $(this).siblings(".description").val();
    // Get the id of the time-block containing the clicked save button
    var time = $(this).parent().attr("id");
    // Use the id as the key to save the user input in local storage
    localStorage.setItem(time, text);
  });

  // Apply the past, present, or future class to each time block based on the current hour
  function hourTracker() {
    // Get the current hour in 24-hour format using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time-block element
    $(".time-block").each(function () {
      // Get the hour from the id attribute of the time-block
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Compare the blockHour with the currentHour to determine its status
      if (blockHour < currentHour) {
        // If the blockHour is in the past, add the "past" class
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        // If the blockHour is the current hour, add the "present" class and remove "past" class
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        // If the blockHour is in the future, remove "past" and "present" classes and add "future" class
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  // Call the hourTracker function to apply the classes initially
  hourTracker();

  // Get any user input that was saved in localStorage and set the values of corresponding textarea elements
  function displayText() {
    // Loop through each time-block element
    $(".time-block").each(function () {
      // Get the id of the current time-block
      var blockHour = $(this).attr("id");

      // Set the value of the textarea to the corresponding saved text from localStorage
      $(this).children(".description").val(localStorage.getItem(blockHour));
    });
  }
  // Call the displayText function to populate textarea elements with saved data
  displayText();

});