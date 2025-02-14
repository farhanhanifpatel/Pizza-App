const socket = io();

socket.on('connect', () => {
  console.log('Connected with ID:', socket.id);
  if (order) {
    socket.emit('join', `order_${order._id}`);
  }
});
