import { Paper, Typography } from '@mui/material';
import React from 'react';

const Calendar = () => {
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        minHeight: 400,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1D1D1F',
          fontWeight: 600,
          mb: 2,
        }}
      >
        カレンダー
      </Typography>
      {/* TODO: カレンダーコンポーネントの実装 */}
    </Paper>
  );
};

export default Calendar;
