const router = require('aws-lambda-router');
const AthenaExpress = require('athena-express');
const aws = require('aws-sdk');
const awsCredentials = {
  region: "us-west-2",
  accessKeyId: "AKIAWW6WK3K2CEHAJMLI",
  secretAccessKey: "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"
};
aws.config.update(awsCredentials);

const athenaExpressConfig = {
  aws,
  s3: 's3://twitter-covid-test/output', /* optional format 's3://bucketname' */
  db: 'coviddb'
}; // configuring athena-express with aws sdk object
const athenaExpress = new AthenaExpress(athenaExpressConfig);

exports.handler = router.handler({
  proxyIntegration: {
    cors: true,
    routes: [
      {
        path: '/daily/covid',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = {
            sql: `SELECT COUNT(*) as "count" FROM coviddb.tweetdata where kws LIKE '%corona%';`
          };
          try {
            const results = await athenaExpress.query(sqlQuery);
            console.log(results);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Count of total tweets that day =======================================
        path: '/daily/tweets',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = {
            sql: `SELECT
            CAST(date_parse(date,'%a %b %e %H:%i:%s +%f %Y') as DATE) as date,
            COUNT(DISTINCT text) as "tweets_per_day" 
            FROM coviddb.tweetdata
            GROUP BY CAST(date_parse(date,'%a %b %e %H:%i:%s +%f %Y') as DATE)
            ORDER BY 1 desc
            LIMIT 1;
            `
          };
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Count of total tweets with covid kws that day
        path: '/daily/covidTweets',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          CAST(date_parse(date,'%a %b %e %H:%i:%s +%f %Y') as DATE) as date,
          COUNT(DISTINCT text) as "tweets_with_coronakw_per_day" 
          FROM coviddb.tweetdata
          WHERE kws like '%corona%'
          GROUP BY CAST(date_parse(date,'%a %b %e %H:%i:%s +%f %Y') as DATE)
          ORDER BY 1 desc
          LIMIT 1;
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Averages sentiment that day ==============================================
        path: '/daily/sentiment',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `with cte as
          (
          SELECT DISTINCT *
          FROM coviddb.tweetdata
          )
          SELECT
          CAST(date_parse(date,'%a %b %e %H:%i:%s +%f %Y') as DATE) as date,
          AVG(sentiment) as "avg_sentiment" 
          FROM cte
          GROUP BY 1
          ORDER BY 1 desc
          LIMIT 1;          
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Number of cummulative covid cases
        path: '/total/cases',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          DISTINCT CAST(date_parse(date,'%Y-%m-%d') as DATE) as date,
          cases_cum
          FROM coviddb.coviddata
          ORDER BY 1 DESC
          limit 1;          
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Number of cummulative covid deaths
        path: '/total/deaths',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          DISTINCT CAST(date_parse(date,'%Y-%m-%d') as DATE) as date,
          deaths_cum
          FROM coviddb.coviddata
          ORDER BY 1 DESC
          limit 1;          
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Number of covid cases that day
        path: '/daily/cases',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          DISTINCT CAST(date_parse(date,'%Y-%m-%d') as DATE) as date,
          cases_day
          FROM coviddb.coviddata
          ORDER BY 1 DESC
          limit 1;                    
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Number of covid deaths that day
        path: '/daily/deaths',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          DISTINCT CAST(date_parse(date,'%Y-%m-%d') as DATE) as date,
          deaths_day
          FROM coviddb.coviddata
          ORDER BY 1 DESC
          limit 1;                    
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Count of cases per day
        path: '/total/casesbyday',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          DISTINCT CAST(date_parse(date,'%Y-%m-%d') as DATE) as date,
          cases_day
          FROM coviddb.coviddata
          ORDER BY 1 DESC
          ;                    
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
      {// Pie chart -- neutral, pos, neg sentiment
        path: '/daily/sentimentBreakdown',
        method: 'GET',
        action: async (request, context) => {
          const sqlQuery = `SELECT
          CAST(date_parse(date,'%a %b %e %H:%i:%s +%f %Y') AS DATE) date,
          CASE
          WHEN sentiment=0 THEN sentiment
          WHEN sentiment>0 THEN 1
          WHEN sentiment<0 THEN -1
          END AS "sentiment",
          COUNT(date) as "count_sent"
      FROM "coviddb"."tweetdata"
      GROUP BY 1,2
      ORDER BY date desc, sentiment
      LIMIT 3;                          
          `;
          try {
            const results = await athenaExpress.query(sqlQuery);
            return JSON.stringify(results);
          } catch (error) {
            return error;
          }
        }
      },
    ],
    errorMapping: {
      NotFound: 404,
    }
  }
});
