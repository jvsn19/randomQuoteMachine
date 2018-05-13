var color = "", quoteText, quoteAuthor;
var colors = ['#71E9F6', '#8571F6', '#F59D9D', '#D71C1C', '#411CD7', '#1CD7C8', '#079A3B', '#65A77C', '#6A60B8'];
function getRandomColor() {
	var colorAux;
	//Never repeat the same color
	do {
		colorAux = colors[Math.floor((Math.random()*colors.length))];
	} while (colorAux === color);
	return colorAux;	
}

function setTwitterBtn() {
	var twitterLink = 'https://twitter.com/intent/tweet?hashtag=quotes&text="' + quoteText + '" by ' + quoteAuthor;
	$('a.twitter-share').attr('href', twitterLink);
}

function getQuoteProperties() {
	$.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(quote) {
		quoteText = quote.quoteText;
		quoteAuthor = (quote.quoteAuthor != "") ? quote.quoteAuthor : "Unknown";
		$('p.text-quote').html(quoteText);
		$('footer.author-quote').html(quoteAuthor);
		setTwitterBtn();
	});
}

$(document).ready(function(){
	getQuoteProperties();
	$('.btn-quote').on('click', function(){
		color = getRandomColor();
		$('.blockquote').children().hide(1000, function(){
			getQuoteProperties();
			setTwitterBtn();
		});
		$('.blockquote').animate({
			borderLeftColor: color
		}, 1000);
		$('body').animate({
			backgroundColor: color,
			color: color
		}, 1000);
		$('.btn-custom').animate({
			backgroundColor: color,
			color : '#FFF'
		}, 1000);
		$('.blockquote').children().show(1000);
	});
});