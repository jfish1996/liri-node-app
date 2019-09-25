require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');

//   https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"


var userInput = process.argv.slice(3).join(" ");
var userCommand =  process.argv[2];

function movieThis (movieName){
    var axios = require("axios");

axios.get("http://www.omdbapi.com/?t="  + movieName + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    
    console.log("The movie's title is: " + response.data.Title);
    console.log("The movie's actors are: " + response.data.Actors);
    console.log("The movies plot is: " + response.data.Plot);
    console.log("Year of release: " + response.data.Year);
    console.log("Language Spoken: " + response.data.Language);
    console.log("Country Filmed in: " + response.data.Country);
    console.log("The movies imdb rating is: " + response.data.imdbRating);
    console.log("The movies rotten tomatos rating is: " + response.data.Ratings[1].Value);
  })
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}


function concertThis (artistsName){
  var axios = require("axios");

axios.get("https://rest.bandsintown.com/artists/" + artistsName + "/events?app_id=codingbootcamp").then(
function(response) {
  var data = response.data
  for(i=0; i < data.length; i++ ){
  console.log("Venue name:" + data[i].venue.name);
  console.log("venue location: " + data[i].venue.region);
  var date = data[i].datetime;
  var rightTime = moment(date).format('MM/DD/YYYY');
  console.log("Venue Date: " + rightTime);
  console.log("-------------------------------------------------")

}
})
.catch(function(error) {
  if (error.response) {
    console.log("---------------Data---------------");
    console.log(error.response.data);
    console.log("---------------Status---------------");
    console.log(error.response.status);
    console.log("---------------Status---------------");
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
});

}

function spotify(songName){
console.log(keys)
    var spotify = new Spotify(keys.spotify);

       
      spotify.search({ type: 'track', query: songName }, function(err, data) {
          

        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0]); 
      });



}

function nodeInput(userCommand){
    if(userCommand ==="spotify-this-song"){
        spotify(userInput);
    }else if(userCommand==="movie-this"){
        movieThis(userInput);
    }else if(userCommand==="concert-this"){
        concertThis(userInput);

    }else{
        doWhatItSays()
    }


}

function doWhatItSays(){
    var fs = require("fs");


fs.readFile("../../random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  var songtitle = dataArr[1];


  // We will then re-display the content as an array for later use.
  console.log(dataArr[1]);
spotify(songtitle);
});
}

nodeInput(userCommand);

