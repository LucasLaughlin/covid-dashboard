import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DashboardView from 'src/views/reports/DashboardView';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const getTestData = () => {
      axios
        .get(' https://had105rhf4.execute-api.us-west-2.amazonaws.com/test/sentiment')
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTestData();
  });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default App;
