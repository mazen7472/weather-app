//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    //Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),
  currentCity = "Cairo",
  apiResponse,
  responseData,
  months = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'],
   days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

async function getweather(){
  apiResponse =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=91ca01abf1de44b0822123204231508&q=${currentCity}&days=3`)
  responseData =await apiResponse.json()
  console.log(responseData);
  displaytodayweather()
  displaynextweather()
}
getweather()

function displaytodayweather(){

  let date = new Date()
  today.innerHTML=days[date.getDay()];
  todayDate.innerHTML=`${date.getDate()} ${months[date.getMonth()]}`
  cityLocation.innerHTML = responseData.location.name
  todayDegree.innerHTML = responseData.current.temp_c
  todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`)
  description.innerHTML = responseData.current.condition.text;
  humidty.innerHTML=responseData.current.humidity;
  wind.innerHTML=responseData.current.wind_kph;
  compass.innerHTML=responseData.current.wind_dir;

}
function displaynextweather(){
  for(let i=0;i<nextDay.length;i++){
    nextDay[i].innerHTML=days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
    nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c
    minDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c
    nextDayDescription[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text
  }
}
searchBar.addEventListener("keyup",function(){
  currentCity =searchBar.value;
  console.log(currentCity);
  getweather()
})