$(document).ready(function () {

  // click function for getting gifs and appending them to the DOM from clicking on buttons in the top of the page.
  $(".top-box").on("click", ".search-button", function () {
    $(".content-container").empty();
    var search = $(this).attr("data-text");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      search +
      "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=20";
    var moreButton = $("<button>");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      for (var i = 0; i < 10; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");
        gifDiv.attr("class", "thumbnail");
        p.attr("class", "rating");
        gifImage.attr("src", results[i].images.fixed_height_small_still.url);
        gifImage.attr(
          "data-still",
          results[i].images.fixed_height_small_still.url
        );
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.append(gifImage);
        gifDiv.append(p);
        $(".content-container").append(gifDiv);
      };
      moreButton.attr("class", "more-button");
      moreButton.attr("data-query", queryURL);
      moreButton.text("Want 10 more?");
      $(".content-container").append(moreButton);
    });
  });

  // Click function for creating a new button with the user's entry and append to the top button container.
  $(".create").on("click", function () {
    var buttonElement = $("<button>");
    var dataText = document.getElementById("input").value.trim();
    // var dataText = $("#input").value;   **not sure why this doesn't work**
    buttonElement.attr("class", "search-button");
    buttonElement.attr("data-text", dataText);
    buttonElement.html(dataText);
    $(".top-box").append(buttonElement);
  });

  // Click function on images to animate and stop gifs.
  $(".content-container").on("click", "img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  });

  // Click funtion for the more button to append 10 more gifs to the DOM.
  $(".content-container").on("click", ".more-button", function () {
    var queryURL = $(this).attr("data-query");
    // set css to remove the "more button".
    $(".more-button").css({
      "display": "none",
    });

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      for (var i = 10; i < 20; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        p.attr("class", "rating");
        var gifImage = $("<img>");
        gifDiv.attr("class", "thumbnail");
        gifImage.attr("src", results[i].images.fixed_height_small_still.url);
        gifImage.attr(
          "data-still",
          results[i].images.fixed_height_small_still.url
        );
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.append(gifImage);
        gifDiv.append(p);
        $(".content-container").append(gifDiv);
      };
    });
  });
});