const mongoose = require('mongoose');

const TaskItem = new mongoose.Schema({ 
    task: { 
        type: String, 
        required: true, 
    }, 
    status: { 
        type: String, 
        required: true, 
    }
});

const ToDoSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    items: [ {type: TaskItem}, ]
});

const TodoList = mongoose.model('TodoList', ToDoSchema);

module.exports = TodoList;