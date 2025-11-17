import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import courseRoutes from './modules/courses/course.routes.js';
import lessonRoutes from './modules/lessons/lesson.routes.js';
import enrollmentRoutes from './modules/enrollments/enrollment.routes.js';

import { errorHandler } from './middleware/error.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'E-Learning API is running 🚀' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// centralized error
app.use(errorHandler);

export default app;
