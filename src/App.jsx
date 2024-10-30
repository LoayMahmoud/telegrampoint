import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
function App() {
    const [telegramId, setTelegramId] = useState('');
    const [points, setPoints] = useState(0);
    const [message, setMessage] = useState('');
    const [userPoints, setUserPoints] = useState(0);

    const handleRegister = async () => {
        if (!telegramId) {
            setMessage('Please enter a Telegram ID.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/register', { telegramId });
            setMessage(response.data.message);
            setUserPoints(0); // Reset points on new registration
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error: ' + error.message);
            }
        }
    };

    const handleAddPoints = async () => {
        if (!telegramId || points <= 0) {
            setMessage('Please enter a valid Telegram ID and points.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/add-points', { telegramId, points });
            setMessage(response.data.message);
            // Update user points
            setUserPoints(prev => prev + points);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error: ' + error.message);
            }
        }
    };

    const handlePlayGame = async () => {
        if (!telegramId) {
            setMessage('Please enter a Telegram ID.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/play-game', { telegramId });
            setMessage(`${response.data.message} | Points won/lost: ${response.data.pointsWon} | Total Points: ${response.data.totalPoints}`);
            // Update user points
            setUserPoints(response.data.totalPoints);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h1>Telegram Bot Mini App</h1>
            <input 
                type="text" 
                placeholder="Enter Telegram ID" 
                value={telegramId} 
                onChange={(e) => setTelegramId(e.target.value)} 
            />
            <button onClick={handleRegister}>Register</button>
            
            <input 
                type="number" 
                placeholder="Enter Points" 
                value={points} 
                onChange={(e) => setPoints(Number(e.target.value))} 
            />
            <button onClick={handleAddPoints}>Add Points</button>
            <button onClick={handlePlayGame}>Play Game</button>

            {message && <p>{message}</p>}
            {userPoints >= 0 && <p>Your Points: {userPoints}</p>} {/* Display user points */}
        </div>
    );
}

export default App;