## DeFi Wallet App
This is a web app to illustrate how we can integrate BitGo and Fireblocks into our UIs. This experimental app helped us better understand the features of each product and how each of these features worked. 

### Running this Project
#### Starting BitGo Express Server - Running Docker Image
Starting BitGo Express Server, go to the root directory of the project and start Bitgo-Express Docker image:
```bash
docker-compose up
```

#### Installing the Dependency Concurrently
In the root directory run the following command to install concurrently*:

*Concurrently builds both the backend and frontend in one command and starts both the backend and frontend in one command
```bash
npm run install
```

#### Installing the Dependencies for Frontend & Backend
In the root directory run the following command to install dependencies for the frontend and backend:
```aidl
npm run build
```

#### Running the Backend and Frontend Projects
In the root directory run the following command to start the frontend and backend:
```bash
npm run start
```
### URL for Backend
After everything is up and running go to the backend swagger docs

[http://localhost:9000/api-docs
](http://localhost:9000/api-docs)

You can also test the API's using the postman collection found in the folder [/packages/backend/postman ](https://github.com/wfblockchain/defi_wallet_app/tree/master/packages/backend/postman)
### URL for Frontend
After everything is up and running go to

[http://localhost:3000
](http://localhost:3000)


### Architecture (WIP)

![img_1.png](img_1.png)
https://lucid.app/lucidchart/17d6ec18-0a55-4525-879f-b62e62618ec7/edit?viewport_loc=-76%2C-120%2C2273%2C1233%2C0_0&invitationId=inv_c4e17f19-afbd-43c3-8227-595913ee0788#

### Stack
Backend - NestJS

Frontend - NextJS

#### Crypto Libraries
Bitgo

Fireblocks

#### Bitgo Signer
Currently for this POC we are using a docker instance of the signer

#### Fireblocks Signer
Azure Cloud to host both the API Callback Handler and API Co-Signe

API Co-Signer uses Intel SGX enclave device to secure the key shards stored in a secret DB

### Setting Up the Project
#### Backend
Copy the env.example file in the packages/backend folder and populate the variables.

You'll need an API token from BitGo and Fireblocks, check their website on how to procure one.

Fireblocks will also require a cert

#### Frontend
Copy the env.example file in the packages/frontend folder and populate the variables.

You'll need an API token from Firebase Google and a project ID


## Backend Docker Image

### Backend Image Rebuild

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
 