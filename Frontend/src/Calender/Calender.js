import React, { useState, useEffect } from 'react';
import './calender.css';
import ManagerPanel from '../Manager/ManagerPanel';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const CLIENT_ID = '63213342722-eo5uo93vkqvemvefoctiq827cpjc8je9.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD5nJwrgYRDIdNPavC3CuE-uSik9eggdJ4';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';


function App() {
  const [tokenClient, setTokenClient] = useState(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [eventSummary, setEventSummary] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventsList, setEventsList] = useState([]);
  const [newEventsCount, setNewEventsCount] = useState(0);
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;
    script1.onload = gapiLoaded;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;
    script2.onload = gisLoaded;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const gapiLoaded = () => {
    window.gapi.load('client', initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
    maybeEnableButtons();
  };

  const gisLoaded = () => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    });
    setTokenClient(tokenClient);
    setGisInited(true);
    maybeEnableButtons();
  };

  const maybeEnableButtons = () => {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
    }
  };

  const handleAuthClick = () => {
    if (!tokenClient) return;

    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      document.getElementById('signout_button').style.visibility = 'visible';
      document.getElementById('authorize_button').innerText = 'Refresh';
      await listUpcomingEvents();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
      document.getElementById('content').innerText = '';
      document.getElementById('authorize_button').innerText = 'Authorize';
      document.getElementById('signout_button').style.visibility = 'hidden';
    }
  };

  const listUpcomingEvents = async () => {
    let response;
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      response = await window.gapi.client.calendar.events.list(request);
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      document.getElementById('content').innerText = 'No events found.';
      return;
    }

    setEventsList(events);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const eventDateTime = new Date(`${eventDate}T${eventTime}:00`);
    const event = {
      summary: eventSummary,
      start: {
        dateTime: eventDateTime.toISOString(),
        timeZone: '	UTC+05:00 (PKT)', // Replace with appropriate time zone
      },
      end: {
        dateTime: eventDateTime.toISOString(),
        timeZone: '	UTC+05:00 (PKT)', // Replace with appropriate time zone
      },
    };

    try {
      await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      setNewEventsCount(prevCount => prevCount + 1); 
      alert('Event created successfully!');
    } catch (err) {
      alert('Failed to create event. Please try again.');
      console.error('Error creating event:', err);
    }
  };

  return (
<div>
    <ManagerPanel />
    <div className="container-google-create">
    <div className="notification-bell">
          {newEventsCount > 0 && <FontAwesomeIcon icon={faBell} className="bell-icon" />}
          <span className="new-events-count">{newEventsCount}</span>
        </div>
    {/* Container for Google Calendar API Quickstart */}
    <div className="container-google">
      <h1 className="title-google">Events Alert Through Google Calendar API </h1>
      <button className="button" id="authorize_button" onClick={handleAuthClick}>Authorize</button>
      <button className="button" id="signout_button" onClick={handleSignoutClick}>Sign Out</button>
    </div>

    {/* Container for Create Event */}
    <div className="container-create">
      <div className="write-form-control ">
        <h2 className="title-create">Create Event</h2>
        <form onSubmit={handleCreateEvent}>
          <div className="write-form-control ">
            <label className="form-label">Summary:</label>
            <input className="form-input" type="text" value={eventSummary} onChange={(e) => setEventSummary(e.target.value)} required />
          </div>
          <div className="write-form-control ">
            <label className="form-label">Date:</label>
            <input className="form-input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          </div>
          <div className="write-form-control ">
            <label className="form-label">Time:</label>
            <input className="form-input" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
          </div>
          <button className="button" type="submit">Create Event</button>
        </form>
      </div>
    </div>

    
      {/* Container for Events List */}
      <div className="container-events">
        <div className="form-group">
          <h2 className="title-events">Events List</h2>
          <table className="event-table">
            <thead>
              <tr>
                <th>Summary</th>
                <th>Start Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {eventsList.map((event, index) => (
                <tr key={index}>
                  <td>{event.summary}</td>
                  <td>{event.start.dateTime || event.start.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
