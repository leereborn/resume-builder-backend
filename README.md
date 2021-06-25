# Application Server of Resume Builder Web App

## Functional Requirements
### Users
- Support creation of new users
- Users are able to login and logout (JWT based authentication)
- A user only have access to his own profile and resumes (authorization)
- A user can delete his own account, meanwhile corresponding resumes will also be deleted
- A user can update his own password
### Resumes
- A user can create a resume that belongs to himself
- A user can delete a resume that belongs to himself
- A user can modify a resume that belongs to himself
- A user can retrieve a single resume, or all resumes that belong to himself

## System APIs
### createUser(email, password)
parameters:\
email(string): required\
password(string): required
### login(email, password)
parameters:\
email(string): required\
password(string): required
### logout()
### updateUser(emial, password)
parameters:\
email(string): required\
password(string): required
### deleteUser(email)
parameters:\
email(string): required
### getUser(email)
parameters:\
email(string): required
### createResume(email, name, content)
parameters:\
email(string): required\
name(string): required\
content(JSON): required
### updateResume(email, name, content)
Update the content of a resume.\
parameters:\
email(string): required\
name(string): required\
content(JSON): required
### findResume(email, name)
Find resumes by email or by both email and name.\
parameters:\
email(string): required\
name(string): optional
### deleteResume(email, name)
parameters:\
email(string): required\
name(string): required

### Returns of all APIs:
A JSON object provides whether request is successful and corresponding information. (e.g. { success: true, data} or { success: false, err})

## End Points
getUser: GET /users/:email\
createUser: POST /users/\
updateUser: PUT /users/\
deleteUser: DELETE /users/\
findResume: GET /resumes?email&name\
createResume: POST /resumes\
updateResume: PUT /resumes\
deleteResume: DELETE /resumes/?email&name
login: POST /session\
logout: DELETE /ssesion

## Deployment Instruction
### Local
- Install node
- [Setup and start dynamodb local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
- Add .env file to inclue: DB_REGION, DB_ENDPOINT, JWT_SECRET_KEY, JWT_EXPIRES_SECONDS, DB_LOCAL=true.
### Production on AWS
- Setup and start dynamodb
- Setup ec2 instance
- Add .env file to inclue: JWT_SECRET_KEY, JWT_EXPIRES_SECONDS, DB_LOCAL=false, DB_REGION, DB_KEY_ID, DB_KEY.
- Install node and pm2
- sudo pm2 start app.js

