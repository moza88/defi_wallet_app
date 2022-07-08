### Getting Started

### Stack
Backend - NestJS

Frontend - NextJS

#### Crypto Libraries
Bitgo

Fireblocks

### Setting Up the Project
#### Backend
Copy the env.example file in the packages/backend folder and populate the variables.

You'll need an API token from BitGo and Fireblocks, check their website on how to procure one.

Fireblocks will also require a cert

#### Frontend
Copy the env.example file in the packages/frontend folder and populate the variables.

You'll need an API token from Firebase Google and a project ID

### Running this Project
#### Backend
Starting BitGo Express Server, go to the root directory of the project and start Bitgo-Express Docker image:
```bash
docker-compose up
```
Starting up the backend
```aidl
cd packages/backend
npm start
```
After everything is up and running go to the backend swagger docs
[http://localhost:9000/api-docs
](http://localhost:9000/api-docs)

#### Frontend
Starting up the frontend
```aidl
cd packages/frontend
npm run dev
```
After everything is up and running go to
[http://localhost:3000
](http://localhost:3000)



## Modifications

### Backend

##### Image Rebuild
After making changes re-build the image using the command below:

`docker-compose up -d --build backend`

Test your image locally using the command below:
`docker-compose up -d --build backend`

##### Deploying Image to Serverless Environment
