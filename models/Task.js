const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new mongoose.Schema({
  title: {
    type: String
  },
 earning: {
    type: String
  },
 link: {
    type: String
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
