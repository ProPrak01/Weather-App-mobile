# React Native Weather App

This is a weather app built made for intern assignment with React Native using Expo. It fetches weather data from the [WeatherAPI](https://www.weatherapi.com/) to provide current weather information for a given location.

## Features

- Display current location weather conditions when pressed on home button or when starting.
- Get detailed weather forecast for the next few days
- Supports searching for weather by city name
- Beautiful UI design for better user experience

## Installation

To run this app on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ProPrak01/Weather-App-mobile
   ```
2.Navigate into the project directory:
   ```bash
cd Weather-App-mobile
   ```
3.Install dependencies using npm 
```bash
npm install
```
4.Set up your WeatherAPI key:

    Sign up for a free account on WeatherAPI to get an API key.
    goto constants/index.js and write your api key in the variable -> apiKey
5.Start the Expo development server:
  ```bash
npx expo start
```
## Preview->
1.Home:
<br><img src="images/home.PNG" alt="Search Image" width="400"><br>
2.Loader:
<br><img src="images/loader.PNG" alt="Search Image" width="400"><br>
3.Search:
<br><img src="images/search.PNG" alt="Search Image" width="400"><br>
