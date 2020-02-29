$(".top-box").on("click", ".search-button", function() {
  $(".content-container").empty();
  var search = $(this).attr("data-text");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    search +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var gifImage = $("<img>");
      gifDiv.attr("class", "thumbnail");
      gifImage.attr("src", results[i].images.fixed_height_small_still.url);
      gifImage.attr(
        "data-still",
        results[i].images.fixed_height_small_still.url
      );
      gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
      gifImage.attr("data-state", "still");
      gifDiv.append(gifImage);
      gifDiv.append(p);
      $(".content-container").append(gifDiv);
    }
  });
});

$(".create").on("click", function() {
  var buttonElement = $("<button>");
  var dataText = document.getElementById("input").value;
  // var dataText = $("#input").value;   **not sure why this doesn't work**
  buttonElement.attr("class", "search-button");
  buttonElement.attr("data-text", dataText);
  buttonElement.html(dataText);
  $(".top-box").append(buttonElement);
});

$(".content-container").on("click", "img", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
