# Defects management web application - using plain Javascript

---

Access it here --> [Defects application](https://defects-app.netlify.app/)

### Project Overview

This web application seeks to make the management of defects during the defect liability period, mainly for construction projects, simple and efficient. It helps to track the status of all defects and provides an overview of key metrics. Users can add and manage different projects at the same time.

### Technologies

HTML, CSS and JavaScript was used for the main web page and front-end. Firebase was used to store and retrieve data collected from the user. It was also used to authenticate users, who have to sign in to access the application.
**Languanges used:**

- HTML
- CSS
- Javascript

**Database used:**

- [Firebase](https://firebase.google.com/)  
  Cloud Firestore and Authentication from firebase was used to store data and authenticate user login respectively.

**Hosting:**

- [Netlify](https://www.netlify.com/) was used as the hosting server, for building and deploying of the website.

### Wireframe

**Login page**
This is where the user will be directed to, for them to input their login credentials. Using firebase authentication, if user input is valid, they will be redirected to the dashboard home page. Users can also click on the sign up link to sign up for an account.
![login](/images/login-page.jpg)

**Sign up page**
Users can input their sign up details here which will be added to firebase.
![signup](/images/signup-page.jpg)

**Dashboard**
The dashboard will show a couple of metrics for monitoring purposes. These are the sum total across all projects. Users can also create and add projects here.
![dashboard](/images/dashboard.jpg)

**Projects page**
After creating a project, a link will be created that directs the user to a project page. The user can create and add defects on this page.
![project](/images/project.jpg)

### Dashboard page

![Dashboard](/images/dashboard-image.jpg)

### Project page

![Project](/images/project-image.jpg)

### Further improvements/features to implement

- Allowing the user to upload an image and display it on the project page.
- Creating teams and allowing a user to assign issues to different teamates.
