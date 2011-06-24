/*!
 *
 * Vukajlija Poster Loader 0.1
 * Goran Gajic
 * http://design4q.com
 * 
 */
	

var loader = {
		loc : window.location.href,
		rscript : /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		init : function() {
		// provera da li smo na stranici posteri
		var vukajlijaIndex = this.loc.indexOf("vukajlija.com/zabava/posteri");
		if(vukajlijaIndex > 0) {
				var index = this.loc.indexOf('strana='),id=1,run=true;
				// ako nismo na stranici http://vukajlija.com/zabava/posteri
				if(this.loc.length !== vukajlijaIndex+28) {
					if(index > 0) {
						id = this.loc.substr(index+7,this.loc.length-index+7);
					} else {
						run = false;
					}
				}
				if(run === true) {
					this.pageid = parseInt(id,10)+1;
					this.loading = false;
					this.$paginations = $(".pagination-container");
					
					this.$paginations.filter(":last").before('<div id="loader"></div>');

					this.$loader = $("#loader").css({height: "60px" , 
								background: "url(http://i.imgur.com/NzNhB.gif) no-repeat 50% 50%", 
								marginBottom: "20px", 
								display: "none" });
					setInterval(this.updater,500);
				}
			}
		},
		loadContent : function(finish) {
			this.$loader.fadeIn();
			this.loading = true;
			var self = this;
			$.get("http://vukajlija.com/zabava/posteri?strana="+self.pageid++,function(response) { 
				var html = "", 
					$res = $("<div>")
					.append(response.replace(self.rscript, ""));
				
				$res.find(".post-container").each(function() { 
					html += $("<div>").append(this).html();
				});
				self.$paginations.html($res.find(".pagination-container:first").html());
				self.$loader.before(html);
				self.loading = false;
				self.$loader.fadeOut();
			});
		},
		checkTop : function() {
			var bottom = $(document).height() - $(window).scrollTop();
			if( bottom < 1440) { return true; }
			return false;
		},
		updater : function() {
			if(loader.loading === false && loader.checkTop()) {
				loader.loadContent();
			}
		}
	};
	
	loader.init();