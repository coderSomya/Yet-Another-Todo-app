import { useMutation, useQuery } from '@apollo/client';
import React, { Key, useState } from 'react'
import { ADD_TODO } from '../graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import { GET_TODOS } from '../graphql/query';
import { GetTodosData, iTodo } from '../types/Todo';

const Todo: React.FC = () => {

   const [title, setTitle] = useState('');
   const [tags, setTags] = useState('');

   const [addTodo] = useMutation(ADD_TODO, {
     optimisticResponse: {
        addTodo:{
            id: uuidv4().toString(),
            title: title,
            tags: tags.split(',').map(tag=> tag.trim()),
            completed: false
        }
     },
     update: (cache, {data: {addTodo}}) : void=>{
        const existingTodos = cache.readQuery<GetTodosData>({
            query: GET_TODOS
        }) || {getTodos: []};
        console.log("existing todos", existingTodos);
        cache.writeQuery({
            query: GET_TODOS,
            data: {
                getTodos: [...existingTodos.getTodos, addTodo]
            }            
        });
    }
   })

   const {data, loading, error} = useQuery(GET_TODOS)

   const handleAddTodo = (e: React.FormEvent) =>{
    e.preventDefault();
    addTodo({
        variables: {
            title,
            tags: tags.split(',').map(tag=>tag.trim())
        }
    })
   }

    return (
        <>
       <div>
        <h1> Graphql powered Todo App </h1>

        <form onSubmit={handleAddTodo}>
            <input 
            type="text" 
            value={title}
            placeholder="Title" 
            onChange={(e)=>{
                setTitle(e.target.value);
            }}/>
            
            <input 
            type="text" 
            value={tags}
            placeholder="Put comma seperated tags" 
            onChange={(e)=>{
                setTags(e.target.value);
            }}/>

            <button 
            type="submit"
            >Add Todo
            </button>

        </form>

        {loading && <p>Loading...</p>}
        {error && <p>Error fetching todos</p>}
        <ul>
            {
                data && 
                data.getTodos.map((todo: iTodo)=>{
                    return(<li key={todo.id as Key}>
                        {todo.title}
                    </li>)
                })
            }
        </ul>
       </div>
        </>
    )
}

export default Todo