import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true, index: true },
    email: { type: String, trim: true, lowercase: true, index: true },
    displayName: { type: String, trim: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true, strict: false },
);

const teamSchema = new Schema(
  {
    name: { type: String, trim: true, index: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    type: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, strict: false },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    points: { type: Number, default: 0, index: true },
    period: { type: String, trim: true },
  },
  { timestamps: true, strict: false },
);

const workoutSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    exercises: [{ type: Schema.Types.Mixed }],
  },
  { timestamps: true, strict: false },
);

export const User = model('User', userSchema, 'users');
export const Team = model('Team', teamSchema, 'teams');
export const Activity = model('Activity', activitySchema, 'activities');
export const Leaderboard = model('Leaderboard', leaderboardSchema, 'leaderboard');
export const Workout = model('Workout', workoutSchema, 'workouts');