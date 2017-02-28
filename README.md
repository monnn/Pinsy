# Pinsy
Web app for pining
<br />

## Description
Web application, giving the opportunity for users to pin something they saw and liked on specific place and share it with others.
<br />
E.g.: When walking on the street, the user see an old, vintage house. In their mind, the vintige house represents a creepy
and interesting place. Why not tell a ghost story? And take a picture of that creepy, old house? And make people tremble with fear!

## Functional requirements
* User can register and login
<br />
* User can view other user's profile
<br />
* User can create a pin
<br />
* User can view a pin
<br />
* User can like a pin
<br />
* User can comment a pin
<br />
* User can view statistics about pins, users, comments and likes

## Used technologies

### Client side
* Package Manager - bower
<br />
* Framework - Angular JS, v1.5.7
<br />
* View Engine - jade, v1.11.0
<br />
* ngMap, v1.17.3 - Angular directive for Google Map
<br />
* dropbox, v2 - library for uploading files into Dropbox server,
<br />
* d3, v3.5.17 - library for creating SVG graphics,
<br />
* moment-js, v2.17.1, library for better displaying of time

### Server side
* Package Manager - npm
<br />
* Framework - Express JS, v4.13.4,
<br />
* mongoose, v4.4.19 - ODM for MongoDB,
<br />
* passport, v0.3.2 - library for authentication
<br />

## Project structure

### public
#### ______app
##### _______________account
________________________auth.js
<br />
________________________identity.js
<br />
________________________login.jade
<br />
________________________loginController.js
<br />
________________________signup.jade
<br />
________________________signupController.js
<br />
________________________userResource.js
##### _______________admin
________________________userListController.js
<br />
________________________users-list.jade
#####  _______________comments
________________________commentsResource.js
<br />
________________________comments-section.html
<br />
________________________commentsSection.js

#####  _______________common
________________________notifier.js
#####  _______________graphics
________________________bar-chart-view.html
<br />
________________________barChart.js
<br />
________________________bubble-chart-view.html
<br />
________________________bubbleChart.js
<br />
________________________graphicsController.js
<br />
________________________pie.js
<br />
________________________statistics-page.jade
<br />
________________________word-cloud-view.jade
<br />
________________________wordCloud.js
<br />
________________________wordCloudController.js
#####  _______________main
________________________home.jade
<br />
________________________mainController.js
<br />
________________________recent-activity.jade
<br />
________________________recentController.js
#####  _______________pins
________________________all-pins.jade
<br />
________________________info-window.html
<br />
________________________likeResource.js
<br />
________________________new-pin.jade
<br />
________________________pinController.js
<br />
________________________pinResource.js
<br />
________________________pinService.js
<br />
________________________whole-pin-dialog.html
<br />
________________________wholePinDialog.js
#####  _______________users
________________________user-profile-page.jade
<br />
________________________user-profile.html
<br />
________________________userProfile.js

#### ______css
_____________comment-section.css
<br />
_____________graphics.css
<br />
_____________loading-indicator.css
<br />
_____________main.css
<br />
_____________map.css
<br />
_____________recent-activity.css
<br />
_____________splash.css
<br />
_____________user-profile.css
<br />
_____________whole-pin-dialog.css
app.js
### Server
#### ______config
_____________auth.js
<br />
_____________config.js
<br />
_____________express.js
<br />
_____________mongoose.js
<br />
_____________passport.js
<br />
_____________routes.js
#### ______controllers
_____________commentController.js
<br />
_____________likeController.js
<br />
_____________pinController.js
<br />
_____________userController.js
#### ______models
_____________Comments.js
<br />
_____________Like.js
<br />
_____________Pin.js
<br />
_____________User.js
#### ______utilities
_____________encryption.js
#### ______views
_____________index.js
#####  _______________include
________________________currentUser.jade
<br />
________________________layout.jade
<br />
________________________scripts.jade

