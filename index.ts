import express from 'express';
import routes from './app/routes';
import config from './config';
// Initialize environment variables
//dotenv.config();    

// Initialize the Express app
const app = express();
//const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Register routes
app.use(`/${config.routeBasePath}`, routes);

// Test route to check server status
app.get('/', (req, res) => {
  res.send('E-commerce API is running!');
});

const PORT = process.env.PORT || 3001;


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
