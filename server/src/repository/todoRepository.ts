import Todo from "../models/todo";
import iTodo from "../types/todo";

class TodoRepository {

    async getAll(): Promise<iTodo[]> {
        return await Todo.find();
    }

    async create(title: String, tags: String[]): Promise<iTodo> {
        return await Todo.create({
            title,
            tags,
            completed: false
        })
    }
}

export default TodoRepository;