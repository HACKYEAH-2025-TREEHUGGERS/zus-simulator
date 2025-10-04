import express, { Express, Request, Response } from 'express';

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express on Node 23!');
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});