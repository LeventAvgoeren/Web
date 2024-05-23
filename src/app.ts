import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { HelloService } from './HelloService';
import { Human } from './Human';

const app = express();
const port = 3000;
const helloService = new HelloService();

// Middleware to parse JSON bodies
app.use(bodyParser.json());


//XALLLLLLoo
app.get('/', (req, res) => {
  const message = helloService.getHelloMessage();
  res.json({ message: message });
});

app.post('/human', async (req, res) => {
  try {
    const { name, password, alter } = req.body;
    const human = new Human({ name, password, alter });
    const result = await human.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/human/:id', async (req, res) => {
  try {
    const human = await Human.findById(req.params.id);
    if (!human) {
      return res.status(404).json({ error: 'Human not found' });
    }
    res.status(200).json(human);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

app.put('/human/:id', async (req, res) => {
  try {
    const { name, password, alter } = req.body;
    const human = await Human.findByIdAndUpdate(
      req.params.id,
      { name, password, alter },
      { new: true, runValidators: true }
    );
    if (!human) {
      return res.status(404).json({ error: 'Human not found' });
    }
    res.status(200).json(human);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

app.delete('/human/:id', async (req, res) => {
  try {
    const human = await Human.findByIdAndDelete(req.params.id);
    if (!human) {
      return res.status(404).json({ error: 'Human not found' });
    }
    res.status(200).json({ message: 'Human deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



export default app;
