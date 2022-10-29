
### INSTALL AWS CLI IN WINDOWS
https://docs.aws.amazon.com/zh_tw/cli/v1/userguide/install-windows.h

### Offline POST API not working
nvm install 15.4.0
nvm use 15.4.0
### Install guide for Linux
https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/

### 1. Get AWS IAM key
aws configure
### 2. Setup
Install Nodejs
Install Serverless Application Framework
npm install serverless -g
Setup AWS credentials
```
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```
Clone repository
Install dependencies
npm install
Give the name for service in serverless.yml file
npm run deploy
### 3. Run server offline
```
npm start
```
### 3. Swagger export
### 4. Health check
### 5. Deploy
```
npm run deploy
```
