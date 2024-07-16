const weatherApi = "/weather";

const weatherForm = $("form");
const search = $("input");
const weatherIcon = $(".weatherIcon i");
const weatherCondition = $(".weatherCondition");
const tempElement = $(".temperature span");
const locationElement = $(".place");
const dateElement = $(".date");

dateElement.text(
  new Date().toLocaleDateString("en-US", { day: "numeric", month: "long" })
);

weatherForm.submit((e) => {
  e.preventDefault();

  locationElement.text("Loading...");
  weatherIcon.removeClass();
  tempElement.text("");
  weatherCondition.text("");

  getWeatherData(search.val());
});

const getWeatherData = async (city) => {
  const response = await fetch(`${weatherApi}?address=${city}`);
  const result = await response.json();

  if (result.cod === 200) {
    if (
      result.weather[0].desctription == "rain" ||
      result.weather[0].desctription == "fog"
    ) {
      weatherIcon.addClass("wi wi-day-" + result.desctription);
    } else {
      weatherIcon.addClass("wi wi-day-cloudy");
    }
    locationElement.text(result.name);
    tempElement.text(result.main.temp);
    weatherCondition.text(result.weather[0].desctription.toUpperCase());
  } else {
    locationElement.text("Error fetching data;");
  }
};

getWeatherData("Baku");
