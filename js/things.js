var Pics = {};
var request;

Pics.init = function(done) {
	request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status = 200 || request.status == 0) {
				Pics.collections = JSON.parse(request.responseText);
				
				request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (request.readyState === 4) {
						if (request.status = 200 || request.status == 0) {
							var pictures = JSON.parse(request.responseText);
							for (var i = 0; i < pictures.length; i++) {
								var categories = pictures[i].collections.split(",");
								for (var i2 = 0; i2 < Pics.collections.length; i2++) {
									if (categories.includes(Pics.collections[i2].id)) {
										if (!Pics.collections[i2].pics)
											Pics.collections[i2].pics = [];
											
										Pics.collections[i2].pics.push(pictures[i]);
									}
								}
							}

							done();
						}
					}
				};
				request.open("GET", "./pictures.json", true);
				request.send();
			}
		}
	};
	request.open("GET", "./collections.json", true);
	request.send();
}