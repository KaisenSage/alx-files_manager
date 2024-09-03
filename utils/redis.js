import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

