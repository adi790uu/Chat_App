const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    roomId: String,
    messages: [
      {
        msg: 'String',
        sender: 'String',
        class: 'String',
      },
    ],
  },
  { timestamps: true }
);

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
