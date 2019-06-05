var names = ["Mickey Mouse", "Minnie Mouse", "Donald Duck", "Daisy Duck",
"Tinker Bell", "Peter Pan", "Snow White", "Robin Hood",
"Cinderella", "Merida", "Rapunzel", "Winnie the Pooh", "Mulan",
"Aladdin", "Simba", "Ariel"];
var numberOfGIFs = 10;
var cutOffRating = "PG";

function renderButtons(){
	for(var i = 0; i < names.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("character-button");
		newButton.text(names[i]);
		$("#button-container").append(newButton);
	}
	$(".character-button").unbind("click");

	$(".character-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("border");
		populateGIFContainer($(this).text());
	});

}

function addButton(show){
	if(names.indexOf(show) === -1) {
		names.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#characters").val().trim());
		$("#characters").val("");
	});
});