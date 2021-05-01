import React, { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';

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
  label,
  url,
  subField,
  ...rest
}) => {
  const classes = useStyles();
  const [total, setTotal] = useState();

  useEffect(() => {
    const getTestData = () => {
      axios
        .get(`https://had105rhf4.execute-api.us-west-2.amazonaws.com/test/${url}`)
        .then((response) => {
          console.log(JSON.parse(response.data));
          setTotal(JSON.parse(response.data).Items[0][`${subField}`]);
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
              {label}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Total.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  subField: PropTypes.string
};

export default Total;
