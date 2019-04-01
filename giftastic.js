
$(document).ready(function() {
    readyCheck();
    makeButtons();

})

function readyCheck() {
    console.log('ready');
    $("#button-display").text('button display working');
    $("#gif-display").text('gif display working');
}

//array
var fighters = ["St. Pierre", "Lomachenko", "Tyson", "Canelo", "Golovkin","Mayweather", "Askren", "Rocky"];


// Function for displaying buttons
function makeButtons() {
    // Deleting the buttons prior to adding new buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#button-display").empty();
    // Looping through the array
    for (var i = 0; i < fighters.length; i++) {
        // Then dynamicaly generating buttons for each item in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("fighter");
        // Adding a data-attribute with a value of the fighter at index i
        a.attr("fighter-name", fighters[i]);
        // Providing the button's text with a value of the fighter at index i
        a.text(fighters[i]);
        //binds data attribute to the corresponding button
        a.attr('fighter-name', fighters[i]);
        // Adding the button to the HTML
        $("#button-display").append(a);
    }
}

//function for getting gif
//get fighter name from button
// delegate() will attach a handler now , and in the future - (each click)
$("#button-display").delegate(".fighter","click", function() {
    //clear old gifs for new gifs
    $("#gif-display").empty();
    
    var fighterName = $(this).attr('fighter-name');
    //console.log(fighterName);   
    //console.log("The fighters name is : "+ fighterName);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ fighterName + "&api_key=dc6zaTOxFJmzC&limit=10";
// ajax calls to the URL to GET the gifs
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        
        var results = response.data;

        for( var i = 0; i < results.length; i++){
            
            //putting url into dynamically created image tag
            var imageTag = $("<img>");
            //injecting the course url into the 'src' attribute of the above created img tag
            imageTag.attr('src', results[i].images.fixed_height.url);
            //injecting 'alt' attribute info
            imageTag.attr('alt', 'gif');
            //appending to the DOM
            $("#gif-display").prepend(imageTag);
        }
    });
});

//search box button function
$("#submit").on("click", function(event) {
    //prevent form from submitting itself
    event.preventDefault();

    //get text from search box
    var gifSearch = $("#searchBox").val().trim();
    
    fighters.push(gifSearch);

    makeButtons();

});

