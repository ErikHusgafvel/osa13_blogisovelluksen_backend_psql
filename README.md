# 🥇 PostgreSQL backend for Blog-app 🥇

Postgres database with Fly.io and Sequelize. The app utilizes server-side session management (with express-session and connect-session-sequelize libraries). Changes to the database have been introduced through migrations. The app handles errors quite extensively and uses express-async-errors under the hood.

The app supports
- Creating a User, logging in and logging out. User's status may be set to "disabled" after which no actions are allowed for the User as long as the "disabled"-switch is true. Logging in creates a session, which outdates in two days. Actions with outdated session key are not allowed. Logging out destroys all sessions from the database for the user in question
- Querying either all Blogs or specific Blogs based on titles and/or authors that match a query parameter
- Creating, altering or deleting Blogs from the database (existing session and permission required)
- Querying a specific user based on id. Response returns the user information including a reading-list of blogs (ManyToMany-relationship between Users and Blogs)
- Querying all users. Response returns the user with all the Blogs that the user has created (OneToMany-relationship between a User and Blogs)
- Changing username information (existing session and permission required)
- Querying all Authors, which returns Authors and the titles of all the Blogs that belong to the Author. Authors are returned in the order of likes their Blogs have received (sums the likes of Blogs belonging to Author)
- Creating a reading list, which is a ManyToMany-relationship table between Users and Blogs. Reading list enables User to save interesting Blogs to a list. By default the Blog is set to "unread", but user can change the status to "read" later.

#### 🔖 Key-words: postgres, sequelize, express, bcrypt, express-session, connect-session-sequelize, cross-env, umzug, uuid, nodemon

<img src="https://github.com/ErikHusgafvel/HY-MOOC-Full-stack-development/blob/master/certificate-psql.png" alt="Postgres certificate"/>
