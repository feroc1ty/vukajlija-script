// TODO:
//   1. Organize code
//   2. Fetch page id and put it in `pageid`
//	 3. Check if we are on right page, and then execute script		
//	 4. Make and publish extension
pageid = 2;
loading = false;
var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
$paginations = $(".pagination-container");
$paginations.filter(":last").before('<div id="loader"></div>');

$loader = $("#loader").css({height: "60px" , 
			background: "url(http://i.imgur.com/NzNhB.gif) no-repeat 50% 50%", 
			marginBottom: "20px", 
			display: "none" });
			
function loadContent(finish) {
	$loader.fadeIn();
	loading = true;
	$.get("http://vukajlija.com/zabava/posteri?strana="+pageid++,function(response) { 
			var html = "",
			$res = $("<div>")
				.append(response.replace(rscript, ""));
			$res.find(".post-container").each(function() { 
							html += $("<div>").append(this).html();
						});
			$paginations.html($res.find(".pagination-container:first").html());
		$loader.before(html);
		loading = false;
		$loader.fadeOut();
	});
}

function checkTop() {
	var bottom = $(document).height() - $(window).scrollTop();
	if( bottom < 800) return true;
	return false;
}
var updater = function() {
	if(loading === false && checkTop()) {
		loadContent();
	}
	setTimeout( updater, 500);
}
updater();