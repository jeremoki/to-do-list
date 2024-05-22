import { gapi } from 'gapi-script';
import React, { useEffect, useState } from 'react';

const CLIENT_ID = '473238647874-8gh32j1ut1m1bb2ul2u7d4gcdvb008il.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDiHfk7aRWRadBnLarFPWVR1WPOyjGuvbo';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function GoogleCalendarIntegration() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        // Specify the redirect URI here, if needed
        redirect_uri: 'http://localhost:3000',
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
      }).catch((error) => {
        console.error("Error initializing Google API client", error);
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const addEvent = (todo) => {
    if (!isSignedIn) {
      console.log("User is not signed in");
      return;
    }

    const event = {
      'summary': todo.text,
      'start': {
        'dateTime': new Date().toISOString(),
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        'timeZone': 'America/Los_Angeles',
      },
    };

    gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
    }).then((response) => {
      console.log('Event created: ', response);
    }).catch((error) => {
      console.error("Error creating event", error);
    });
  };

  const handleSignInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      {!isSignedIn ? (
        <button onClick={handleSignInClick}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={() => addEvent({ text: "New Todo Task" })}>Add to Google Calendar</button>
          <button onClick={handleSignOutClick}>Sign out</button>
        </>
      )}
    </div>
  );
}

export default GoogleCalendarIntegration;
