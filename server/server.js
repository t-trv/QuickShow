import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';
import showRouter from './routes/showRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(
    clerkMiddleware({
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
    }),
);

// Connect DB
await connectDB().then();

// Strip webhook route
app.use('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// API Routes
app.get('/', (req, res) => {
    res.send({ message: 'xin chao' });
});
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log('Server is running!');
});
