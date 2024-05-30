import mongoose from 'mongoose';
import iTodo from '../types/todo'

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

const Todo = mongoose.model<iTodo>('Todo', todoSchema);

export default Todo;