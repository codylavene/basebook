# Basebook

Basebook is a clone based on Facebook, where users can post thoughts, and comment and like others posts. My goal was a 'pixel perfect' clone, however there are currently only a select few 'Facebook' features implemented: Posts, Comments, Likes and Friends. I would like to add more as time progresses.

- [Live Site](https://base-book.herokuapp.com)
- [MVP Feature List](https://github.com/codylavene/basebook/wiki/MVP-Feature-List)
- [Database Schema](https://github.com/codylavene/basebook/wiki/Database-Schema)
- [User Stories](https://github.com/codylavene/basebook/wiki/User-Stories)

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

# Getting started

1. Clone this repository

   ```git clone git@github.com:codylavene/basebook.git```

2. CD into the root directory of the project and install dependencies

    ```pipenv install```

3. CD into the /react-app directory and install dependencies

    ```npm install```

4.  Create a .env file based on the .env.example given

5.  Create a user in psql based on your .env DATABASE_URL app_name

    ```psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"```

6.  Create a databse in psql based on your.env DATABASE_URL app_db_name

7. Start your shell, migrate your database, seed your database, and run the flask app

   ```pipenv shell```

   ```flask db upgrade```

    ```flask seed all```

    ```flask run```

8. Open another terminal and change directory into /react-app and run the React app

	```npm start```


# Features

## Splash Page & User Authentication

Users can log into an existing account or sign up and create a new account. Alternatively, users can test the site with the Demo Login feature.



## User Home Feed

The logged in user's dashboard displays all posts, with each posting users name being a link to their profile.



## User Profile

Clicking on your name in the nav bar will direct you to your profile. 


On another users profile, you will see the option to send a friend request, unless you are friends already, in which case you will see 'Friends' displayed.


## Comments

The user can add comments on a post, and clicking the comment button within the post card will apply focus to the comment input field. If you would like to edit / delete a comment you have made, simply hover over the comment and you will see an ellipses icon appear, and upon clicking this icon you will see the options to edit or delete.

Clicking edit will open up an input field in place, and you may press the escape key, or hit the cancel button to exit the edit form and discard any changes.

Clicking delete will open a modal asking for comfirmation before it is deleted.


## Posts

On any post owned by you, you will see an ellipses icon in the top right corner of the post card. Upon click, you will again have the options to edit or delete.

Clicking edit will open a modal with your current post displayed in the input field, allowing you to edit the contents.

Clicking delete will open a modal asking for comfirmation before it is deleted.


## Likes 

On any post, you will see a 'thumbs up' button, and clicking this will add a like to that post. Clicking again will remove the like from that post.

