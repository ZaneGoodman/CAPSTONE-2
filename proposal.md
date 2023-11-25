1. What tech stack will you use for your final project? We recommend that you use
React and Node for this project, however if you are extremely interested in
becoming a Python developer you are welcome to use Python/Flask for this
project.
    - I will be using React & Node for this project. 


2. Is the front-end UI or the back-end going to be the focus of your project? Or are
you going to make an evenly focused full-stack application?
    - This will be a fairly well balanced project. Though it will lean more toward a front-end focused project. There might be a lot of back-end data, but all in an effort to allocate
        the needed data to show to the user on the front-end. 


3. Will this be a website? A mobile app? Something else?
    - This will be a website. Though, forming this into a mobile app afterwards would work well. 


4. What goal will your project be designed to achieve?
    - Problem: In the Catholic Church there is a historic and common prayer called the rosary. The prayer is seperated into daily prayers. Each day is a different prayer and the season according to the Catholic calender dictates which prayer lands on which day. It can be confusing, so it would be nice to have an app that brings all of this together easily for a user. 
    - Solution: I would like to create an app that will use external API's to provide the correct Rosary prayer for the day based on the users current time. Also based on what time of year it is for the user to match with the season of the Church. Additionally, I would like to add the feature of adding notes for the user to save to their profile. Anything that comes to mind can be written down and looked at later. The user will also have the option to keep track of how often they pray the rosary. By doing this the user will have the ability to look back on there previos notes, and how they've imporved their own devotion time over x amount of time. 

5. What kind of users will visit your app? In other words, what is the demographic of
your users?
    - 13-65 year olds


6. What data do you plan on using? How are you planning on collecting your data?
You may have not picked your actual API yet, which is fine, just outline what kind
of data you would like it to contain. You are welcome to create your own API and
populate it with data. If you are using a Python/Flask stack are required to create
your own API.
    - I'll be using atleast one rosary data API. I might need to use a Catholic liturgical Calender API as well in order to match which prayer to show on which day, based off of the season. 


1. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later). Answer
questions like the ones below, but feel free to add more information:

a. What does your database schema look like?
 - Tables: Users(username, password), PrayerTracker(username, notes, hasRead, season, date), 

b. What kinds of issues might you run into with your API? This is especially
important if you are creating your own API, web scraping produces
notoriously messy data.
   - The main issue I'll run into is handling dates. Not only the different formats of dates, which shouldn't be too difficult to figure out. But also handling the feature of moving through a month and showing the correct prayer for each day, while at the same time updating the calender properly, all the while making the correct API call for each one of those days. 

c. Is there any sensitive information you need to secure?
  - No, though I will use JWT

d. What functionality will your app include?
   - Showing the user the correct prayer based on the date they log in at
   - Including what season of the Church it is
   - Ability to move easily through each day, seperate from the current day, and see the correct prayer for those days.
   - A drop down calender to pick any day to look at
   - A notes section for the user to jot down any thoughts they had while praying that will be saved to their profile
   - A checkbox to mark if they prayed that day, which will also be added to their profile
   - A page that will show the different notes they have for any given day
   - That same page will show the user if they prayed that day or not
   - This together will give the user the option to see how they've improved over any given amount of time, also the ability to read their past notes and compare to current ones

e. What will the user flow look like?
   - LogIn/SignUp -> rosary page -> Show current day rosary -> clicking a date on drop down calender OR click the next/back arrows -> show rosary for selected day -> If user is on current day rosary, at bottom of page will be a text area for notes and a check box to mark if they've prayed the rosary that day -> Navbar button will take user to list of their notes -> user can see the notes and if they've prayed the rosary on that day. 

f. What features make your site more than a CRUD app? What are your
stretch goals?
   - Providing the correct prayer for any selected day, along with a personalized profile that will help the user to see where they are at, how they've grown, and anything they need to improve on in their personal life. 
   - Stretch goals include: Adding other sets of prayers into the app, to make the app more robust if time permits. 