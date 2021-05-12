# Venue Booking Application

The application is designed to make it more convenient for event organizers to search and book venues for any events or parties. Create strong networks among event organizers and venues providers.

## General Project Structure

* venuebooking
  * backend
    * restaurant-service
    * user-service
  * frontend
  * docker-compose.yml (to connect backend and frontend and create PostGreSQL containers for each backend service)

## Running instructions

You just need to use `docker-compose up` command (providing that you must have Docker installed on your local machine). The command will set up all the containers for you. 

Follow the path: `localhost:3000` to access the frontend and interact with it.

Follow the path: `localhost:8080` to interact with the backend of restaurants.

Follow the path: `localhost:8081` to interact with the backend of users.

### Some check points for developers when compiling the whole project

* After any changes to the Java Springboot application (backend), call `mvn clean install`: to clean the target directory and create a new updated jar file for docker build.
* Call `docker-compose up --build` if any changes to the project happens. This will tell Docker Compose to rebuild all containers.
* Call `docker-compose down` to remove containers and networks created by Docker Compose.

## Application scope

### Available regions
* Ba Ria - Vung Tau
* Da Lat
* Da Nang
* Ha Long Bay
* Ha Noi
* Ho Chi Minh
* Hue
* Nha Trang
* Phu Quoc
