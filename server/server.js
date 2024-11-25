import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// MongoDB pajungimas
mongoose
  .connect(process.env.URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
