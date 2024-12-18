import React, { useState } from 'react';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCreationForm = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        description: '',
    });

    const [timeSlots, setTimeSlots] = useState(['A', 'B']);
    const [participants, setParticipants] = useState([
        { id: 1, name: '', availability: Array(2).fill('') },
    ]);

    const handleEventDataChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
    };

    const addTimeSlot = () => {
        const newSlot = String.fromCharCode(65 + timeSlots.length);
        setTimeSlots([...timeSlots, newSlot]);
        setParticipants(participants.map(p => ({
            ...p,
            availability: [...p.availability, ''],
        })));
    };

    const addParticipant = () => {
        const newId = participants.length + 1;
        setParticipants([
            ...participants,
            {
                id: newId,
                name: '',
                availability: Array(timeSlots.length).fill(''),
            },
        ]);
    };

    const removeParticipant = (id) => {
        if (participants.length > 1) {
            setParticipants(participants.filter(p => p.id !== id));
        }
    };

    const handleParticipantChange = (id, field, value, index) => {
        setParticipants(participants.map(p => {
            if (p.id === id) {
                if (field === 'name') {
                    return { ...p, name: value };
                } else if (field === 'availability') {
                    const newAvailability = [...p.availability];
                    newAvailability[index] = value;
                    return { ...p, availability: newAvailability };
                }
            }
            return p;
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: API HERE
        console.log({
            eventData,
            timeSlots,
            participants,
        });
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 4,
                backgroundColor: 'background.paper',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    color: '#1D1D1F',
                    fontWeight: 600
                }}
            >
                イベントを作成
            </Typography>

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="イベント名"
                    name="eventName"
                    value={eventData.eventName}
                    onChange={handleEventDataChange}
                    required
                    sx={{
                        mb: 2,
                        '& label': { color: '#86868B' },
                        '& label.Mui-focused': { color: '#007AFF' }
                    }}
                />

                <TextField
                    fullWidth
                    label="備考"
                    name="description"
                    value={eventData.description}
                    onChange={handleEventDataChange}
                    multiline
                    rows={3}
                    sx={{
                        '& label': { color: '#86868B' },
                        '& label.Mui-focused': { color: '#007AFF' }
                    }}
                />
            </Box>

            <Typography
                variant="subtitle1"
                sx={{
                    mb: 2,
                    color: '#1D1D1F',
                    fontWeight: 500
                }}
            >
                日程調整
            </Typography>

            <TableContainer sx={{ mb: 3 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    color: '#1D1D1F',
                                    borderBottom: '2px solid #F5F5F7'
                                }}
                            >
                                名前
                            </TableCell>
                            {timeSlots.map((slot, index) => (
                                <TableCell
                                    key={slot}
                                    align="center"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1D1D1F',
                                        borderBottom: '2px solid #F5F5F7'
                                    }}
                                >
                                    {slot}
                                </TableCell>
                            ))}
                            <TableCell
                                align="center"
                                sx={{
                                    borderBottom: '2px solid #F5F5F7'
                                }}
                            >
                                <IconButton
                                    onClick={addTimeSlot}
                                    sx={{
                                        color: '#007AFF',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 122, 255, 0.1)'
                                        }
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participants.map((participant) => (
                            <TableRow key={participant.id}>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        value={participant.name}
                                        onChange={(e) => handleParticipantChange(participant.id, 'name', e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#F5F5F7',
                                            }
                                        }}
                                    />
                                </TableCell>
                                {participant.availability.map((avail, index) => (
                                    <TableCell key={index} align="center">
                                        <TextField
                                            size="small"
                                            value={avail}
                                            onChange={(e) => handleParticipantChange(
                                                participant.id,
                                                'availability',
                                                e.target.value,
                                                index
                                            )}
                                            sx={{
                                                width: '100px',
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#F5F5F7',
                                                }
                                            }}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => removeParticipant(participant.id)}
                                        sx={{
                                            color: '#FF3B30',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 59, 48, 0.1)'
                                            }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                    variant="outlined"
                    onClick={addParticipant}
                    sx={{
                        borderColor: '#007AFF',
                        color: '#007AFF',
                        '&:hover': {
                            borderColor: '#47A1FF',
                            backgroundColor: 'rgba(0, 122, 255, 0.1)'
                        }
                    }}
                >
                    参加者を追加
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        minWidth: '200px',
                        backgroundColor: '#007AFF',
                        '&:hover': {
                            backgroundColor: '#47A1FF'
                        }
                    }}
                >
                    出欠を記入する
                </Button>
            </Box>
        </Paper>
    );
};

export default EventCreationForm;