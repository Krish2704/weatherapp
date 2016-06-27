var latitude;
var longitude;
var check="celsius";
$(document).ready(function()
{ 
  if(navigator.geolocation)
  {
    var obj={};  navigator.geolocation.getCurrentPosition(function(position)
    {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      var apiKey = "bb0723185d6fd5480082fe51a35d76c1";
      var link = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
      $.getJSON(link, function(json){
        obj=JSON.stringify(json);
        obj=JSON.parse(obj);
        $("#place").html(obj.name+" , "+obj.sys.country);
        $("#position").html(obj.weather[0].description);
        var celsius= Math.round((obj.main.temp-273.15)*10)/10;
        $("#temp").html(celsius);
        var fahrenheit=parseInt(celsius*9/5 +32);
        //console.log(fahrenheit);
        $("button").click(function(){
          if(check==="celsius"){
            $("#temp").html(fahrenheit);
            $("#scale").html("&nbspºF");
            check="fahrenheit";
          }
          else if(check==="fahrenheit"){
            $("#temp").html(celsius);
            $("#scale").html("&nbspºC");
            check="celsius";
          }
        });
           $("#icon").attr("src",'http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png');
        var background;
        var weatherId=obj.weather[0].id;
        console.log(weatherId);
          if(weatherId>200&&weatherId<=300)
            background="http://hmp.me/urp";
          else if(weatherId>300&&weatherId<=450)
            background="http://hmp.me/uro";
          else if(weatherId>450&&weatherId<=600)
            background="http://hmp.me/urn";
          else if(weatherId>600&&weatherId<=700)
            background="http://hmp.me/urm";
          else if(weatherId>700&&weatherId<=800)
            background="http://www.dept.aoe.vt.edu/~lscharf/flying/2005-01-16-15%20Mountains%20with%20Blue%20Haze.jpg";
          else if(weatherId>800&&weatherId<=900)
            background="http://hmp.me/urq";
       $("body").css("background-image", "url(\"" + background + "\")");
        if(weatherId>800 &&weatherId<=900)
          {
            $('#temp').css('color','black');
            $('#myname').css('color','black');
          }
      });
    });
  }
});