import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Budget from './Budget';
import Total from './Total';
import Line from './Line';
// import Line from './Line';
// import Sales from './Sales';
// import TasksProgress from './TasksProgress';
// import TotalCustomers from './TotalCustomers';
// import TotalProfit from './TotalProfit';
// import TrafficByDevice from './TrafficByDevice';
import SentimentBreakdown from './SentimentBreakdown';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="Number of COVID-19 Related Tweets Today" url="daily/tweets" subField="tweets_per_day" />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="Number of Tweets Mentioning ''corona'' Today" url="/daily/covidTweets" subField="tweets_with_coronakw_per_day" />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="Average COVID-19 Sentiment Today" url="/daily/sentiment" subField="avg_sentiment" />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="Total COVID-19 Cases To Date" url="/total/cases" subField="cases_cum" />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="Total COVID-19 Deaths To Date" url="/total/deaths" subField="deaths_cum" />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="New COVID-19 Cases Today" url="/daily/cases" subField="cases_day" />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Total label="New COVID-19 Deaths Today" url="/daily/deaths" subField="deaths_day" />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Line title="COVID-19 Deaths per Day" />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <SentimentBreakdown />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
