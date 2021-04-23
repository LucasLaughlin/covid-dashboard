import React, { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Total = ({
  className,
  type,
  ...rest
}) => {
  const classes = useStyles();
  const [total, setTotal] = useState();

  useEffect(() => {
    const getTestData = () => {
      axios
        .get(`https://had105rhf4.execute-api.us-west-2.amazonaws.com/test/dailyTotal/${type}`)
        .then((response) => {
          console.log(response);
          setTotal(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getTestData();
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {type}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Total.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
};

export default Total;
