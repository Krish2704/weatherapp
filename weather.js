$(document).ready(function(){
    var latitude;
    var longitude;
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position)
    {
      latitude=position.coords.latitude;
      longitude=position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
      var apiKey = "bb0723185d6fd5480082fe51a35d76c1";
      var link = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
      $.getJSON(link, function(json){
        obj=JSON.stringify(json);
        console.log(JSON.stringify(json));
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
            console.log(check);
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
          if(weatherId>200&&weatherId<300)
            background="thunderstorm.jpg";
          else if(weatherId>=300&&weatherId<=450)
            background="drizzle.jpeg";
          else if(weatherId>450&&weatherId<600)
            background="rain.jpg";
          else if(weatherId>=600&&weatherId<700)
            background="snow.jpg";
          else if(weatherId>=700&&weatherId<800)
            background="http://www.dept.aoe.vt.edu/~lscharf/flying/2005-01-16-15%20Mountains%20with%20Blue%20Haze.jpg";
          else if(weatherId>=800&&weatherId<=900)
            background="clear.jpg";
          else if(weatherId===905)
            background="sunny.jpeg";
       $("body").css("background-image", "url(\"" + background + "\")");
        if(weatherId>=300 &&weatherId<450)
          {
            $('#scale').css('color','#ffff77');
          }
        else if(weatherId>=600&&weatherId<700)
          {
            $('body').css('color','#222222');
          }
          else if(weatherId===905)
          {
            $('#myname').css('color','black');
          }
        });
      });
  }
});
