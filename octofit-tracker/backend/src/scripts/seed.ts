import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userData = [
      {
        username: 'ava-chen',
        email: 'ava.chen@octofit.example',
        displayName: 'Ava Chen',
        grade: 10,
      },
      {
        username: 'mateo-ruiz',
        email: 'mateo.ruiz@octofit.example',
        displayName: 'Mateo Ruiz',
        grade: 11,
      },
      {
        username: 'nia-brooks',
        email: 'nia.brooks@octofit.example',
        displayName: 'Nia Brooks',
        grade: 10,
      },
      {
        username: 'jordan-kim',
        email: 'jordan.kim@octofit.example',
        displayName: 'Jordan Kim',
        grade: 12,
      },
    ];

    const usersByEmail = new Map<string, (typeof User.prototype) & { _id: mongoose.Types.ObjectId }>();
    for (const user of userData) {
      const savedUser = await User.findOneAndUpdate(
        { email: user.email },
        { $set: user },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      if (savedUser) usersByEmail.set(user.email, savedUser);
    }

    const teamData = [
      {
        name: 'Trailblazers',
        memberEmails: ['ava.chen@octofit.example', 'mateo.ruiz@octofit.example'],
        score: 415,
      },
      {
        name: 'Pace Makers',
        memberEmails: ['nia.brooks@octofit.example', 'jordan.kim@octofit.example'],
        score: 390,
      },
    ];

    const teamsByName = new Map<string, (typeof Team.prototype) & { _id: mongoose.Types.ObjectId }>();
    for (const team of teamData) {
      const memberIds = team.memberEmails.map((email) => usersByEmail.get(email)!._id);
      const savedTeam = await Team.findOneAndUpdate(
        { name: team.name },
        { $set: { name: team.name, memberIds, score: team.score } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      if (savedTeam) teamsByName.set(team.name, savedTeam);

      for (const email of team.memberEmails) {
        await User.updateOne({ email }, { $set: { teamId: savedTeam?._id } });
      }
    }

    const activityData = [
      {
        email: 'ava.chen@octofit.example',
        type: 'run',
        durationMinutes: 32,
        distanceKm: 4.8,
        points: 48,
        completedAt: new Date('2026-09-21T15:30:00.000Z'),
      },
      {
        email: 'mateo.ruiz@octofit.example',
        type: 'cycling',
        durationMinutes: 45,
        distanceKm: 12.5,
        points: 52,
        completedAt: new Date('2026-09-22T16:00:00.000Z'),
      },
      {
        email: 'nia.brooks@octofit.example',
        type: 'strength training',
        durationMinutes: 35,
        points: 40,
        completedAt: new Date('2026-09-23T14:45:00.000Z'),
      },
      {
        email: 'jordan.kim@octofit.example',
        type: 'run',
        durationMinutes: 28,
        distanceKm: 4.2,
        points: 43,
        completedAt: new Date('2026-09-24T15:15:00.000Z'),
      },
      {
        email: 'ava.chen@octofit.example',
        type: 'yoga',
        durationMinutes: 25,
        points: 30,
        completedAt: new Date('2026-09-25T16:30:00.000Z'),
      },
    ];

    for (const activity of activityData) {
      const user = usersByEmail.get(activity.email)!;
      const { email, ...activityFields } = activity;
      await Activity.updateOne(
        { userId: user._id, type: activity.type, completedAt: activity.completedAt },
        { $set: { ...activityFields, userId: user._id } },
        { upsert: true },
      );
    }

    const leaderboardData = [
      { email: 'ava.chen@octofit.example', points: 248, period: '2026-09' },
      { email: 'mateo.ruiz@octofit.example', points: 221, period: '2026-09' },
      { email: 'nia.brooks@octofit.example', points: 236, period: '2026-09' },
      { email: 'jordan.kim@octofit.example', points: 209, period: '2026-09' },
    ];

    for (const entry of leaderboardData) {
      const user = usersByEmail.get(entry.email)!;
      await Leaderboard.updateOne(
        { userId: user._id, period: entry.period },
        { $set: { userId: user._id, points: entry.points, period: entry.period } },
        { upsert: true },
      );
    }

    const workoutData = [
      {
        name: 'After-School 5K Builder',
        description: 'A steady running session with warm-up and cool-down intervals.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Brisk walk warm-up', durationMinutes: 5 },
          { name: 'Easy run', durationMinutes: 20 },
          { name: 'Walking cool-down', durationMinutes: 5 },
        ],
      },
      {
        name: 'Bodyweight Strength Circuit',
        description: 'A balanced strength session using simple bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 25,
        exercises: [
          { name: 'Squats', sets: 3, repetitions: 12 },
          { name: 'Incline push-ups', sets: 3, repetitions: 10 },
          { name: 'Reverse lunges', sets: 3, repetitions: 8 },
          { name: 'Plank', sets: 3, durationSeconds: 30 },
        ],
      },
      {
        name: 'Recovery and Mobility',
        description: 'Gentle mobility work to support recovery after an active day.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: [
          { name: 'Cat-cow stretch', durationMinutes: 4 },
          { name: 'Hip flexor stretch', durationMinutes: 6 },
          { name: 'Hamstring stretch', durationMinutes: 6 },
          { name: 'Breathing cooldown', durationMinutes: 4 },
        ],
      },
    ];

    for (const workout of workoutData) {
      await Workout.updateOne({ name: workout.name }, { $set: workout }, { upsert: true });
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
