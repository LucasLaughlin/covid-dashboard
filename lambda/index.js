const router = require('aws-lambda-router');
const AthenaExpress = require("athena-express");
const aws = require("aws-sdk");
const athenaExpressConfig = { 
  aws,
  s3: "s3://twitter-covid-test/output", /* optional format 's3://bucketname'*/
  db: "coviddb"
}; //configuring athena-express with aws sdk object
const athenaExpress = new AthenaExpress(athenaExpressConfig); 

exports.handler = router.handler({
  proxyIntegration: {
    cors: true,
    routes: [
          {
            path: '/dailyTotal/covid',
            method: 'GET',
            action: async (request, context) => {
              let sqlQuery = {
                sql: 'SELECT * FROM coviddb.tweetdata limit 10'
              };
              try {
                  let results = await athenaExpress.query(sqlQuery);
                  console.log(results);
                  return results;
              } catch (error) {
                  return error;
              }
            }
          },
          {
            path: '/dailyTotal/vaccine',
            method: 'GET',
            action: async (request, context) => {
              let sqlQuery = {
                sql: 'SELECT * FROM coviddb.tweetdata limit 10'
              };
              try {
                  let results = await athenaExpress.query(sqlQuery);
                  return JSON.stringify(results);
              } catch (error) {
                  return error;
              }
            }
        },
        {
          path: '/dailyTotal/mask',
          method: 'GET',
          action: async (request, context) => {
            const sqlQuery = "SELECT elb_name, request_port, request_ip FROM elb_logs LIMIT 3";
            try {
                const results = await athenaExpress.query(sqlQuery);
                return results;
            } catch (error) {
                return error;
            }
          }
        },
        {
          path: '/dailyTotal/Cases',
          method: 'GET',
          action: async (request, context) => {
            const sqlQuery = "SELECT elb_name, request_port, request_ip FROM elb_logs LIMIT 3";
            try {
                const results = await athenaExpress.query(sqlQuery);
                return results;
            } catch (error) {
                return error;
            }
          }
        },
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