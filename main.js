$(document).ready(function geoFindMe() {
  var output = document.getElementById("out");
  var temperature = document.getElementById("temp");
  var wicon = document.getElementById("weather_icon");
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
		var api = "https://api.apixu.com/v1/current.json?key=173a89c25a5d4abc9ca123138171606&q=" + latitude + "," + longitude;
		console.log(api);
		
		$.getJSON(api, function(data) {
						var cond = data;
            var icon = cond.current.condition.icon;
            var temp_C = cond.current.temp_c;
            var temp_F = cond.current.temp_f;
						var oggle = true;
      
            output.innerHTML = cond.location.name + ", " + cond.location.country;
            temperature.innerHTML = temp_F + " &#176;F<br> " + cond.current.condition.text;
            wicon.innerHTML = "<img src=\"https:" + icon + "\">";
      
              $("button").on("click", function() {
                if (oggle === true) {
                  oggle = false;
                  $("#temp").html(temp_C + " &#176;C<br> " + cond.current.condition.text);
                } else if (oggle === false) {
                  oggle = true;
                  $("#temp").html(temp_F + " &#176;F<br> " + cond.current.condition.text);
                }
              });
					});
  }
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }
  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
});