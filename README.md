# nodejs-mongo-lambda
This sample uses the Serverless Application Framework to implement small APIs using AWS Lambda function for shoppingcart  in TypeScript, deploy it via CloudFormation, and publish it through API Gateway.

### INSTALL AWS CLI IN WINDOWS
https://docs.aws.amazon.com/zh_tw/cli/v1/userguide/install-windows.h

### Offline POST API not working
nvm install 15.4.0
nvm use 15.4.0

### Install guide for Linux
https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/

### 1. Get AWS IAM key
aws configure

### 2. Environment setup
Create Monogodb in Mongo Altis

Install Nodejs

Install Serverless Application Framework
`npm install serverless -g`

Setup AWS credentials
```
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```
Clone repository
Install dependencies
`npm install`

Give the name for service in serverless.yml file
`npm run deploy`

### 3. Run server offline
```
npm start
```

### 4. Swagger export
Call API get json file
https://app.swaggerhub.com/apis-docs/ALANCCL92/simple-shoppingcart_api/1


### 5. Health check

### 6. Deploy
`npm run deploy`

### 7. Test
`npm run `

### DB/Collection schema

Users
| COLUMN     | TYPE      |        |
|------------|-----------|--------|
| email      | String    |        |
| first_name | String    |        |
| last_name  | String    |        |
| gender     | String    |        |
| address    | Object    |        |
|            | street    | String |
|            | city      | String |
|            | post_code | String |

Products
| COLUMN      | TYPE     |
|-------------|----------|
| category    | String   |
| name        | String   |
| price       | Integer  |
| description | String   |

Orders
|Column       |Type         |
|-------------|-------------|
|user_id      |ObjectId (fk)|
|payment      |String       |
|timestamp    |Datetime     |
|total        |Integer      |
|delivery     |String       |

OrderItems
| COLUMN     | TYPE         |
|------------|--------------|
| order_id   | ObjectId (fk)|
| product_id | ObjectId (fk)|
| quantity   | Integer      |

### API
Create new user: [POST] /dev*/user
Delete specific user: [DELETE] /dev*/user/{userId}
Create new product: [POST] /dev/product
Delete specific product: [DELETE] /dev*/product/{productId}
Create new order: [POST] /dev*/order
List all orders: [GET] /dev*/orders
Get specific user: [GET] /dev*/user/{userId}

[*] In local environment, /dev/ could be ignored.
If access more detail, please check https://app.swaggerhub.com/apis-docs/ALANCCL92/simple-shoppingcart_api/1

### TODO
- Raise up Test coverage
