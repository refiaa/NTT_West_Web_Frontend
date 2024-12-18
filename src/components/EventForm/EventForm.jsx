import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data:', eventData);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          color: '#1D1D1F',
          fontWeight: 600,
        }}
      >
        新しいイベントを作成
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="イベント名"
              value={eventData.name}
              onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
              required
              sx={{
                '& label': { color: '#86868B' },
                '& label.Mui-focused': { color: '#007AFF' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="datetime-local"
              label="日付・時間"
              InputLabelProps={{ shrink: true }}
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              required
              sx={{
                '& label': { color: '#86868B' },
                '& label.Mui-focused': { color: '#007AFF' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="備考"
              multiline
              rows={4}
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              sx={{
                '& label': { color: '#86868B' },
                '& label.Mui-focused': { color: '#007AFF' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  minWidth: '200px',
                  backgroundColor: '#007AFF',
                  '&:hover': {
                    backgroundColor: '#47A1FF',
                  },
                }}
              >
                イベントを作成する
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EventForm;
