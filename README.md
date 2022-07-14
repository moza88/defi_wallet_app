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

We are deploying our docker images to Google Cloud's Container Registry.

To re-deploy the image to the registry, run the following command:
1. Tag the image with the tag you want to use.
```aidl
docker tag backend us-central1-docker.pkg.dev/wallet-app-54dff/defi-wallet-app/backend:tag1
 ```
2. Push the image to the registry.

```aidl
docker push us-central1-docker.pkg.dev/wallet-app-54dff/defi-wallet-app/backend:tag1
```

3. Verify that the image is now available in the registry. By visiting the following page in the console:
   https://console.cloud.google.com/artifacts/docker/wallet-app-54dff/us-central1/defi-wallet-app?project=wallet-app-54dff

