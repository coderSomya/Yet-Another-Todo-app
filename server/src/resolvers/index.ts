import TodoRepository from "../repository/todoRepository";
import TodoService from "../services/todoService";

const todoService = new TodoService(
    new TodoRepository()
);

const resolvers = {
    Query: {
        getTodos: async () =>{
            return await todoService.getAll();
        }
    }
}

export default resolvers;
