import express from 'express';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';
import { createResourceRouter } from './routes/resources.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API', apiBaseUrl });
});

app.use('/api/users/', createResourceRouter(User));
app.use('/api/teams/', createResourceRouter(Team));
app.use('/api/activities/', createResourceRouter(Activity));
app.use('/api/leaderboard/', createResourceRouter(Leaderboard, { points: -1 }));
app.use('/api/workouts/', createResourceRouter(Workout));

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});