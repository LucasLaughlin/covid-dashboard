/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const SentimentBreakdown = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: []
  });
  const [percentages, setPercentages] = useState([
    {
      title: 'Negative',
      value: 63,
      color: colors.indigo[500]
    },
    {
      title: 'Positive',
      value: 15,
      color: colors.red[600]
    },
    {
      title: 'Neutral',
      value: 23,
      color: colors.orange[600]
    }
  ]);

  useEffect(() => {
    const getTestData = () => {
      axios
        .get('https://had105rhf4.execute-api.us-west-2.amazonaws.com/test/daily/sentimentBreakdown')
        .then((response) => {
          console.log(JSON.parse(response.data));
          setData({
            datasets: [
              {
                data: [JSON.parse(response.data).Items[0].count_sent, JSON.parse(response.data).Items[1].count_sent, JSON.parse(response.data).Items[2].count_sent],
                backgroundColor: [
                  colors.indigo[500],
                  colors.red[600],
                  colors.orange[600]
                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
              }
            ],
            labels: ['Negative', 'Neutral', 'Positive']
          });
          const total = parseInt(JSON.parse(response.data).Items[0].count_sent, 10) + parseInt(JSON.parse(response.data).Items[1].count_sent, 10) + parseInt(JSON.parse(response.data).Items[2].count_sent, 10);
          setPercentages([
            {
              title: 'Negative',
              value: Math.round((JSON.parse(response.data).Items[0].count_sent / total) * 100),
              color: colors.indigo[500]
            },
            {
              title: 'Neutral',
              value: Math.round((JSON.parse(response.data).Items[1].count_sent / total) * 100),
              color: colors.red[600]
            },
            {
              title: 'Positive',
              value: 100 - Math.round((JSON.parse(response.data).Items[0].count_sent / total) * 100) - Math.round((JSON.parse(response.data).Items[1].count_sent / total) * 100),
              color: colors.orange[600]
            }
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTestData();
  }, []);

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="COVID-19 Tweet Sentiment Today" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {percentages.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

SentimentBreakdown.propTypes = {
  className: PropTypes.string
};

export default SentimentBreakdown;
