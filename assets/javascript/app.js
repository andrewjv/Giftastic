$(document).ready(function () {
  console.log('hi')

  // topics variable 
  var topics = ['jay z', 'kendrick lamar', 'nas', 'pusha t', 'kanye west', 'pharrell', 'biggie smalls', '2pac', 'eminem', 'wale', 'tyler the creator', 'quavo', 'childish gambino', 'lil uzi', 'drake', 'partynextdoor', 'travis scott', 'chance the rapper', 'future rapper'];
  function getArtist() {

    //Constructing a queryURL using the artist name
    var artist = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      artist + '&api_key=ZoDfU26X5nRZT59wRYkYeIGiMUzs6ZZz&limit=10';
    console.log(artist)

    //Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        // variable storing the data
        var results = response.data;

        //for loop looping through the array
        for (var j = 0; j < response.data.length; j++) {

          //variable that stores the rating
          var rating = results[j].rating;

          // variable storing the new p tag that contaings the rating
          var p = $('<p>').text('Rating: ' + rating);

          // variable storing new img tag
          var artistImage = $('<img>');

          // variable storing new div for the new images
          var artistDiv = $('<div>')

          // adding attribute source for the still gif
          artistImage.attr('src', results[j].images.fixed_width_small_still.url);

          // adding attribute for the still URL
          artistImage.attr('data-still', results[j].images.fixed_width_small_still.url);

          // adding the attribute for the animated gif URL
          artistImage.attr('data-animate', results[j].images.fixed_width_small.url);

          // setting the data state as still
          artistImage.attr('data-state', 'still')

          // adding class to the img
          artistImage.addClass('gif');

          // adding column class
          artistDiv.addClass('col-md-2', 'artist-div');

          // prepending the image and p tags to the new div
          artistDiv.prepend(artistImage).prepend(p);
          // prepending the image divs to the html
          $('#gifs').prepend(artistDiv);


        }
        // rendering the new buttons 
        renderButtons();

      })
  }

  // function that appends the new buttons
  function renderButtons() {

    // empties the data in the button div
    $('#artist-buttons').empty();

    // for loop that loops through the topics array
    for (var i = 0; i < topics.length; i++) {

      // variable storing the new button
      var a = $('<button>');

      // adding class to the new button
      a.addClass('artist');

      // adding attribute data name with the value of i 
      a.attr('data-name', topics[i]);

      // adding text to the button
      a.text(topics[i]);

      // appending the buttons to the HTML
      $('#artist-buttons').append(a);
    }
  }

  // click function for inputing a new artist in the form
  $(document).on("click", ".artist", getArtist);

  renderButtons();

  $('#add-artist').on('click', function (event) {
    event.preventDefault();

    // variable storing the input from the form
    var newArtist = $('#artist-input').val().trim();

    // pushing the new variable into the topics array
    topics.push(newArtist);
    renderButtons();

  })

  //this handles the click function for each gif
  $(document).on('click', '.gif', function () {

    // storing the state of this into a variable
    var state = $(this).attr('data-state');

    // if state of this si still it will change the gif to animate
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');

      // if the state is animate the gif will change to still
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  })
})

