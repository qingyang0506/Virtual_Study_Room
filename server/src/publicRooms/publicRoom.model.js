const { Schema, model } = require("mongoose");

const PublicRoomSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  users: {
    required: true,
    type: [String],
    default: [],
  },
  playList: {
    required: true,
    type: [Object],
    default: [],
  },
  backgroundUrl: {
    required: true,
    type: String,
  },
  playListId: {
    required: true,
    type: String,
    default: "lofi-01",
  },
});

const PublicRoom = model("publicRoom", PublicRoomSchema);

module.exports = PublicRoom;
