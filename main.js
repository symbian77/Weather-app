$(document).ready(function geoFindMe() {
  var output = document.getElementById("location");
	var main = document.getElementById("main");
	
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

	function success(position) {
		$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
			var latitude  = position.coords.latitude;
			var longitude = position.coords.longitude;
			var api = "http://api.apixu.com/v1/current.json?key=173a89c25a5d4abc9ca123138171606&q=" + latitude + "," + longitude;
			console.log(data);
			var cond = "";
			
				$.getJSON("conditions.json", function(condition) {
						var cond = JSON.stringify(condition);
						console.log(cond);
					});
			
			output.innerHTML = data.city + ", " + data.country;
			
				$.getJSON(api, function(weather) {
				console.log(weather);
					var tempC = weather.current.temp_c;
					var tempF = weather.current.temp_f;
					var tekst = weather.current.condition.text;
					var icondiv = weather.current.condition.icon;
					var iconname = icondiv.substr(icondiv.length - 7);
					var daytime = weather.current.is_day;
					var daynight = "";
					var toggle = false;
					main.innerHTML = tempC + " &#176;C, " + " " + tekst;
					
					$("button").on("click", function() {
						if (toggle == true) {
							toggle = false;
							main.innerHTML = tempC + " &#176;C, " + " " + tekst;
						} else if (toggle == false) {
							toggle = true;
							main.innerHTML = tempF + " &#176;F, " + " " + tekst;
						}
					});
					
					if (daytime == 0) {
						daynight = "night";
					} else {
						daynight = "day";
					};
					
					iconpanel.innerHTML = "<img src=\"weather/64x64/" + daynight + "\/" + iconname + "\">";
				});
			
		});
	}
	
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
	}
);
