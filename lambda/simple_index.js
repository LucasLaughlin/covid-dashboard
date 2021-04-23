const router = require('aws-lambda-router');
const AthenaExpress = require("athena-express");
const aws = require("aws-sdk");
const athenaExpressConfig = { 
  aws,
  s3: "s3://twitter-covid-test/input-covid", /* optional format 's3://bucketname'*/
 }; //configuring athena-express with aws sdk object
const athenaExpress = new AthenaExpress(athenaExpressConfig); 

exports.handler = router.handler({
  proxyIntegration: {
    cors: true,
    routes: [
        {
          path: '/sentiment',
          method: 'GET',
          action: (request, context) => {
            return JSON.stringify({"message": "This is a test"});
          }
        },
    ],
    errorMapping: {
      'NotFound': 404,
    }
  }
})