# TaskCash

## Elevator pitch
“How to make money fast?” -Everyone’s google search bar once a month. 
Don't worry, we’ve all been there; Where we are looking for a quick way to make an extra buck, but don’t want to pick up another job… Whether it be trying to make an extra $100 for a concert or just want some extra spending cash, we've got your back. Introducing TaskCash - the ultimate platform for fast cash. You can be either a seller or a buyer. Sellers post their tasks needing to be done, and buyers complete the task and go home with cash. As a seller, you would post your task, set your price, and watch as a community of eager helpers jumps in to assist. It’s a win-win for everyone. Sellers get tasks completed and buyers get quick cash. 



## Design
![CS260 WEB.pdf](https://github.com/anyssakayla/startup-example/files/13405992/CS260.WEB.pdf)

Here is a sequence diagram that shows how to people would interact with the backend to vote.

![sequenceD.pdf](https://github.com/anyssakayla/startup-example/files/13405996/sequenceD.pdf)

##Key features
Secure login over HTTPS
Ability to select a buyer's or seller's page
Ability to select location range
Display of choices
Ability to select and filter choices
Displays choices available in in realtime
Ability for a user to favorite/save jobs/tasks to come back to
Ability for user to create/advertise and delete jobs/tasks they have listed
Ability for users to report scammers

## Technologies
I am going to use the following technologies

### Authentication: 
Users will have an input to create and log into their account. 
Their information is saved in the database and confirmation is needed from the db everytime they attempt to login
If a user has not signed up first, they cannot login


### Database data: 
I am using mongodb to store data
The application's database will store each the following:
- Task information: This includes an image, title, description, address, and multiple checkbox for describing the task
- Seller and buyer's information
- Data from the database will be used to show the user what tasks are available (teh server must be running)

### Startup Service: 
I have edited the startup to save information from the task form a user fills out to list a task
The task form includes an image, text boxes such as a title, description, addresses, date, time, and checkboxes to further describe the task they are listing
The data will be sent and saved to mongodb
Next, tasks will be displayed to the user:
- to do this, the data will be taken from mongodb and used to create a container that displayes the available tasks on the database


### WebSocket data: 
Users will be able to view jobs that are listed in real time
Users will also be abel to sell in real time and list a job as completed
Users will be able to message other users through the app

To complete these tasks, the application will use the following:
- HTML
- CSS
- JavaScript
- Service
- Login
- React

## HTML:
- 8 HTML pages for each component of TaskCash implemented
### Links between pages
- The pages are acceseible through each other by clicking the links at the top of the page
- These links will turn into a menu bar once CSS is implemented

  
- implements textual content
- implements 3rd party service calls
- users will save information to the server for other people to see real-time
- Image/Logo created for TaskCash
- User Login placeholder created for user's information to be stored within the database
- Information from the user's tasks/services they list on the website will go to the server
- real time communication will go through the user's task/services and messages

