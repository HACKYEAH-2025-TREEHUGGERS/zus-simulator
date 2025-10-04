import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { db } from './db';
import { users } from './db/schema';

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express on Node 23!');
});

// Health check endpoint with database connection test
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Test database connection
    await db.select().from(users).limit(1);
    res.json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Example endpoint to get all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Example endpoint to create a user
app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await db.insert(users).values({ name, email }).returning();
    res.status(201).json(newUser[0]);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});