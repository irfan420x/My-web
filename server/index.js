import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/send', async (req, res) => {
  const { name, message } = req.body;
  const text = `New message from Irfan's site:\nName: ${name}\nMessage: ${message}`;
  const telegramURL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await fetch(telegramURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.USER_ID,
      text: text,
    }),
  });
  res.send('<h2>Thank you! Your message has been sent.</h2><a href="/">Back</a>');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
