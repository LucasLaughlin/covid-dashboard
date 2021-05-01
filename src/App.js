import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DashboardView from 'src/views/reports/DashboardView';

const App = () => {
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
