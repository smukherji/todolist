const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    task: { 
        type: String, 
        required: true, 
    }, 
    status: { 
        type: String, 
        required: true, 
    }
});

module.exports = mongoose.model('TodoList', ToDoSchema);