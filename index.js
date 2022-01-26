import express from "express";
import artistRoutes from './routes/routes.js';
const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/api/artists', artistRoutes)

app.listen(PORT, () => {
  console.log(`App listening at  http://localhost:${PORT} `);
})

export default app