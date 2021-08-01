# Appointment-Booking-App

An application which allows the user to select date and available appointment time slots. User can book the available time by simply entering First Name, Last Name and Mobile Number.

## How to run

You will need to have Node **10.16.0** or later on your local development machine. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.
Clone this repository in your Local machine or download the Zip file and then execute the below mentioned steps

### First install all dependencies

#### npm

```sh
cd appointment-booking-app && npm install
```

### To start the local server

#### npm

```sh
 npm start
```

### Open app in browser

Once the app is compiled and bundled successfully you should see the screen in your browser. This would be your final view of the project.

### Specification

#### 1. Build a screen which shows a list of hour long slots from 9am to 5pm.

#### 2. When one time slot is clicked, load details screen (another page/screen) which asks for first name, last name and phone number. Screen will have 2 options - Cancel and Save.

#### 3. When the name and phone number is submitted/saved, the app should be redirected back to the main screen and the selected time slot should change to red, indicating the time slot is no longer available.

#### 4. If the red time slot is clicked on again, redirect again to the details screen with the name and phone number for that appointment pre-populated. Users will be able to edit the name and phone number to change the user for the appointment.

### Implementation

The app is implemented using ReactJS. The application also uses Redux for state management and uses Material UI and ustom CSS for styling. Material Icons are used for displaying the icons in the application. The app is not completely responsive but should look good on all screen sizes.

### Deployment

The application is deployed on Netlify. You can view the view app on - https://book-appointment.netlify.app/
