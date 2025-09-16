function initSockets(io) {
  io.on('connection', (socket) => {
    console.log('🟢 يېڭى بىر قوللانچى ئۇلاندى:', socket.id);

    // دەرس بويىچە ئۆيگە قوشۇش
    socket.on('joinCourse', (courseId) => {
      socket.join(courseId);
      console.log(`👤 ${socket.id} course ${courseId} غا قوشۇلدى`);
    });

    // ئۇچۇر يوللاش
    socket.on('sendMessage', ({ courseId, message }) => {
      io.to(courseId).emit('newMessage', message);
    });

    // ئايرىلىش
    socket.on('disconnect', () => {
      console.log('🔴 قوللانچى ئايرىلدى:', socket.id);
    });
  });
}

module.exports = { initSockets };
