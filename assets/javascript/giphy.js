var carArr = ["wrx", "porsche", "ferrari", "370z", "supra",
                  "lamborghini", "evo x", "shelby cobra", "dodge viper"];


function renderButtons() {
 
  $("#buttonPanel").empty();

 
  for (var i = 0; i < carArr.length; i++) {
  
    var button = $("<button>");
    button.addClass("carButton");
    button.attr("data-car", carArr[i]);
    button.text(carArr[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}



// An event handler for the user form to add additional animals to the array
$("#add-car").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var car = $("#car-input").val().trim();

  // The car from the textbox is then added to our carArr array
  carArr.push(car);
  $("#car-input").val("");


  renderButtons();
});

// fethcarGifs will fetch car Gifs with the Giphy API
function fetchCarGifs() {
 
  var carName = $(this).attr("data-car");
  var carStr = carName.split(" ").join("+");

  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carStr + 
                 "&rating=pg-13&limit=20&api_key=TNtbfnZfJqhDpFfKDbdnu8PoE1M4of9T";

  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("carGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}


function animateCarGif() {
  
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}


$(document).ready(function() {
  renderButtons();
});


$(document).on("click", ".carButton", fetchCarGifs);


$(document).on("click", ".carGif", animateCarGif);

