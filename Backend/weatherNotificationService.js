// File name: weatherNotificationService.js

const axios = require('axios');
const nodemailer = require('nodemailer');

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(cityName, apiKey) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Function to send email notification
async function sendEmailNotification(recipientEmail, subject, text) {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'malikusmanashfaq100@gmail.com', // your Gmail email address
        pass: 'malik@100' // your Gmail password
      }
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Weather Notification" <malikusmanashfaq100@gmail.com>', // sender address
      to: recipientEmail, // list of recipients
      subject: subject, // Subject line
      text: text // plain text body
    });

    console.log('Email notification sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
}

// Main function to check weather conditions and send notifications
async function checkWeatherAndSendNotifications() {
  const CITY_NAME = 'Islamabad'; // City name
  const API_KEY = 'dfa16cddfa333cebf70a4a40e8d81942';
  const RECIPIENT_EMAIL = 'malikusmanashfaq10@gmail.com';

  try {
    // Fetch weather data
    const weatherData = await fetchWeatherData(CITY_NAME, API_KEY);

    // Check weather conditions
    const temperatureCelsius = weatherData.main.temp - 273.15;
    const isRaining = weatherData.weather.some(weather => weather.main === 'Rain');

    // Send email notifications based on weather conditions
    if (temperatureCelsius > 10) {
      await sendEmailNotification(RECIPIENT_EMAIL, 'Hot Weather Alert', `Temperature in ${CITY_NAME} is above 30°C.`);
    }

    if (isRaining) {
      await sendEmailNotification(RECIPIENT_EMAIL, 'Rain Alert', `It's raining in ${CITY_NAME} today.`);
    }
  } catch (error) {
    console.error('Error checking weather and sending notifications:', error);
  }
}

// Run the function periodically using a scheduler like cron
module.exports = checkWeatherAndSendNotifications;
