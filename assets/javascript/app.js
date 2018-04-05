$(document).ready(function () {
  console.log('hi')

  // topics variable 
  var topics = ['jay z', 'kendrick lamar', 'nas', 'pusha t', 'kanye west', 'pharrell', 'biggie smalls', '2pac', 'eminem', 'wale', 'tyler the creator', 'quavo', 'childish gambino', 'lil uzi', 'drake', 'partynextdoor', 'travis scott', 'chance the rapper', 'future rapper'];
  console.log(topics);
  function getArtist() {
    // var artist = $(this).attr('data-name');

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
        console.log(response)
        var results = response.data;

        console.log(response.data.length)
        for (var j = 0; j < response.data.length; j++) {

          var rating = results[j].rating;
          var p = $('<p>').text('Rating: ' + rating);
          var artistImage = $('<img>');

          artistImage.attr('src', results[j].images.fixed_height_small_still.url);
          artistImage.attr('data-still', results[j].images.fixed_height_small_still.url);
          artistImage.attr('data-animate',results[j].images.fixed_height_small.url);
          artistImage.attr('data-state','still')
          artistImage.addClass('gif');
          $('#gifs').prepend(p);
          $('#gifs').prepend(artistImage);

        }
        renderButtons();

      })
  }


  function renderButtons() {

    $('#artist-buttons').empty();

    for (var i = 0; i < topics.length; i++) {


      var a = $('<button>');

      a.addClass('artist');

      a.attr('data-name', topics[i]);

      a.text(topics[i]);

      $('#artist-buttons').append(a);
    }
  }
  $(document).on("click", ".artist", getArtist);

  renderButtons();

  $('#add-artist').on('click', function(event){
    event.preventDefault();

  var newArtist = $('#artist-input').val().trim();
  console.log(topics)

  topics.push(newArtist);
  renderButtons();

  })
  
  //this handles the click function for each gif
  $(document).on('click', '.gif', function(){

    console.log('what up')
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  })
})

