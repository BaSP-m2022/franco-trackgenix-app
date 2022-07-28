# BaSP - Trackgenix App codebase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Install dependencies

    npm install

### Setup environment file
create a file at root called `.env` and add this:

    REACT_APP_API=<server url>

### Run App
    npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.


### Check Lint errors
    npm run lint

### Fix Lint errors
    npm run lint:fix

<br>


<br>

# Automation tests for Franco TrackGenix App

Hi! This is the readme for automation test about the project for the bootcamp "Become a software professional".

We do test the backend and the fronted of the Franco TrackGenix. App you can see they deployments here:

[Click here to see the frontend](https://franco-trackgenix-app.vercel.app/home "Frontend" )


[Click here to see the backend](https://franco-trackgenix-server.vercel.app/ "Backend" )


------------

<br>

## Technologies used
<br>

### Frontend:


* [Web Driver IO](https://webdriver.io/docs/gettingstarted/ "Click here to see the documentation" )

<br>

* [Playwright](https://playwright.dev/docs/intro/ "Click here to see the documentation" )
<br>

<br>

### Backend:

* [Postman](https://www.postman.com/api-documentation-tool/ "Click here to see the documentation" )
<br>

### Performance:

* [JMeter](https://jmeter.apache.org/usermanual/get-started.html "Click here to see the documentation" )

<br>

-------------

<br>

## Web Driver IO

<br>

<img src="https://avatars.githubusercontent.com/u/6512473?s=200&v=4" height="200" width="200">

<br>


### What we test?

We test all core functionalities for the frontend:

* User login
* User signup
* Edit Profile
* General web buttons
* **Admin** Report Management
* **Admin** Project Management:
    * TimeSheets
    * Employees
    * Tasks
* **PM** Project Management:
    * TimeSheets
    * Employees
    * Tasks
* Upload Hours
* **SA** admins management
* Landing page

<br>

### First steps

In console, run this command for install wdio

```
npm init wdio .
```
Then, for run tests:
```
npm run test
```

------------

### Why Playwright?

<br>

<img src="https://playwright.dev/img/playwright-logo.svg" height="200" width="200" >

<br>

Playwright is a browser automation library for Node.js (similar to Selenium or Puppeteer) that enables reliable, fast and efficient browser automation with a few lines of code. Its simplicity and powerful automation capabilities make it an ideal tool for web scraping. We use it for testing non-core elements and interactions of the application. This tool allows us to spend more time on the e2e tests that evaluate the critical part of the application, thus achieving a deeper understanding of them.

<br>

### How to use it?


In console, run this command for install playwright

```
npm i -D @playwright/test

npx playwright install
```
Then, for run tests:
```
npx playwright test
```


<br>

------------

## Postman

<br>

<img src="https://dev.socialidnow.com/images/1/16/Postman.png" height="150" width="400" >

<br>


### What we test?

We test all the API's requests and responses, as the status code number, the response time or the body message response.

### Steps

1. Click on import

![image](https://user-images.githubusercontent.com/99680487/168315149-82421a4b-c99b-4747-bc94-5543f65386ce.png)

2. Click on Upload File

![image](https://user-images.githubusercontent.com/99680487/168315771-89fe3166-4bfb-464f-91b8-e880e20c887b.png)

3. Select franco-trackgenix-server.postman_collection.json

[franco-trackgenix-server](franco-trackgenix-server.postman_collection.json "Postman collection")

4.  Click on Import

![image](https://user-images.githubusercontent.com/99680487/168316746-12ffbe2a-8629-4809-93d8-a403e6aa158f.png)

5. Collection folders:

* Signup employee
* Login Superadmin
* Login Admin
* Login Employee
* Admins
* Admins BAD REQUESTS
* Superadmins
* Superadmins BAD REQUESTS
* Employees
* Employees BAD REQUESTS
* Projects
* Projects BAD REQUESTS
* Timesheets
* Timesheets BAD REQUESTS


-----------

## JMeter

<br>


<img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Apache_JMeter.png" height="150" width="400" >


<br>


### What we test?

This test is to analyze overall performance of the app under different load types.
We will simulate a heavy user load to check if requests fail and what the response time is.

<br>

### Download:

```
JAVA version 8 or later
```
<a href="https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html" target="_blank">Java SE 8 Archive Downloads (JDK 8u211 and later)</a>

```
JMeter
```
<a href="https://jmeter.apache.org/download_jmeter.cgi" target="_blank">Download Apache JMeter</a>

```
Firefox
```
<a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">Download Firefox Browser from Mozilla</a>

<br>

### Configure Firefox proxy

a. Menu

b. Settings

c. On the search bar we write proxy

d. Click on settings on network settings

e. Select "Manual proxy configuration".

f. HTTP Proxy: local host - Port: 8888 (Remember that the port number must be the same as the one we set in JMeter).

<br>

-----------

<br>

## Special Thanks

```
We would like to thank all the Radium Rocket staff for the support provided and the possibility of acquiring and being able to implement all this knowledge.
On the other hand, we wanted to make a special mention to our 3 tutors/professors assigned in the 3rd stage of QA: Paloma Quiroz, Rodrigo Sibrins, Agustin Cartery for giving us their best predisposition when helping us with all our problems and concerns throughout every week, in addition to teaching us all the tools that we implement in this automation plan. Without them this work would not have been possible.
```


<br>


-----------

<br>

------------

<br>

## Collaborators

|Photo | Name  | Mail | Github
| :-----: | :-----: | :-----: | :-----: |
<img src="https://avatars.githubusercontent.com/u/101294825?v=4" height="50" width="50">| María Higinia Médica | higiniamc@gmail.com | [@HiginiaMed](https://github.com/HiginiaMed)
<img src="https://avatars.githubusercontent.com/u/101281359?v=4" height="50" width="50">| Matías Daniel Vadala | vadalamati@gmail.com | [@vadalamati](https://github.com/vadalamati)
<img src="https://avatars.githubusercontent.com/u/101268743?v=4" height="50" width="50">| Tobías Pujol | tobipujol@gmail.com | [@tobiaspujol](https://github.com/tobiaspujol)

### License & Copyright

© Radium Rocket "Become a Software Professional 2022"