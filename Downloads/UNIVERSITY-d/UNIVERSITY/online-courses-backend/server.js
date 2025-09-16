require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { initSockets } = require('./sockets');   // sockets.js ھۆججىتىنى قوشىمىز
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Course = require('./models/Course');

// مارشروتلار
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const topicRoutes = require('./routes/topics');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);

// Socket.io قوشۇش
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});

// socket ئىشقا قوشۇش
initSockets(io);

// MongoDB قا ئۇلاش
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB ئۇلاندى'))
  .catch(err => console.error('❌ MongoDB ئۇلىنىش خاتالىقى', err));

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

// مارشروتلار ئىشقا قوشۇش
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/messages', messageRoutes);

// سىناق ئۈچۈن بەت
app.get('/', (req, res) => res.send('📚 Online Courses Backend ئىجرا بولۇۋاتىدۇ'));

// Port ئىشقا قوشۇش
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server port ${PORT} دا ئىجرا بولۇۋاتىدۇ`));
