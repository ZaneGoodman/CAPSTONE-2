# Prayer Room

Prayer Room is a React application that displays the correct rosary to pray for the users current day. A user can also look at the correct rosary to pray for any date that they pick from the provided calendar. For each day that passes a user can add any thoughts they had while praying the rosary that day, keep track of if they prayed the rosary for each day, and look back on all of this information for their own personal purposes. 

## Features
- Display Current day Rosary
   - The rosary prayer is broken up into four mysteries. Each day of the week a different mystery is prayed. This feature displays the correct rosary mystery for the current day of the logged in user. The prayer is broken up into its proper pieces for easy reading. 
- Journaling 
  - This feature enables a user to write down any thoughts they had while praying. The user is only able to write down notes for the current day that they are in. Once the users notes have been summited the user will be unable to update or change their notes for that day. This is on purpose and explained in more detail in the following feature details.
- Prayed
  - This is a simple addition that gives the user the opportunity to mark that they've prayed the rosary for the day.
- Calendar
  - On the home page of the application there is a button that will display a calendar. The purpose of the calendar is to allow the user to look at past and future mysteries for any day that they pick. This enables the user to catch up on any prayer that they missed, as well as look ahead to know what to expect. The user is unable to add any notes for any day that they pick that is not their current day. 
- Tacker 
  - This feature combines the journaling and prayed feature into its own by displaying the day by day status of the users activity on the site. On a day by day basis, the users journaling and prayed information will be displayed in a chronological list. This gives the user access to see their old and new notes, to see what they've learned and how they've grown. This also shows the user their prayer data, allowing said user to also look back on how often they've prayed. It is up to the user how they would like to use this data. 

## Starting the application
Once downloaded:
 - This app used Node v 16
1. Start postgresql and create Database

     - ``` bash
        psql 
        someuser=# \i prayer_room.sql
        ```
     - This will prompt you to create the database/test database

2. Enter into the 'authorization_and_db' File and download back-end dependencies

      - ``` bash 
        /authorization_and_db# npm i
        ```

2. Once database is up and running go back to the 'CAPSTONE_2' File
     - ```bash
        /CAPSTONE_2# npm i
        /CAPSTONE_2# npm start
       ```
     - npm start is configured to start the back-end server at the same time as the application
3. App started!


## Test
Inside the main 'CAPSTONE_2' File
 - This will run all test for the front-end
```bash
/CAPSTONE_2# npm test
```
Inside the 'authorization_and_db' File
 - This will run all test for the back-end
```bash
/authorization_and_db# npm test
```
## User Flow
- Start
  - The user is met with a welcoming log in page, for a new user they will click 'sign up' and create a new account. 
- Home Page 
  - The home page will automatically display the itemized rosary to be prayed for the users current day. 
  - At the bottom of the prayer there is a form that the user can add in their notes for the day and mark if they've prayed the rosary for the day. 
- Home Page - Calendar
  - At the top of the page once the use clicks the 'pick date' button a calendar will be displayed. Once the user clicks a new date the page will be re-rendered with the correct rosary information for that new date. On clicking the same 'pick date' button the calendar will be hidden. 
- Journal
  - In the navbar the user can click on 'Journal'. This will render all of their personal prayer notes. Initially they will be shown a list of dates along side the Church season. For each date listed their will be 🙏🏽📿 emojis attached if they prayed on that day and a 👎🏽 if not. On clicking one of these dates the notes the user wrote for that date will drop down for viewing.
- Logout
  - When the user wants to log out they can click the 'logout' button in the navbar  

## API's
   - "https://the-rosary-api.vercel.app"
     - This API returns rosary data based on the passed in day of the week. 
   - "http://calapi.inadiutorium.cz/api/v0/en/calendars/default"
     - This API returns Catholic Church data based on a passed in date 
   - "http://localhost:3001" 
     - This is a very simple API I created for authentication purposes and for handling adding and retrieving data to and from my database. Outside of authentication the API adds prayer tracking data into the database that is tied with a users information. This can be found in "authorization_and_db".
## Technology Used
 This App was built using: React.v18, Node.v16, Express, Postgresql, JavaScript, RESTful API's, HTML/JSX, CSS, bootstrap, and Formik.  
