import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import EditTodo from "./EditTodo";

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      });
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${id}`,
        {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        }
      );
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container>
      <h1>List Todos</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <DeleteButton onClick={() => deleteTodo(todo.todo_id)}>
                    Delete
                  </DeleteButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;

  h1 {
    margin-top: 10px;
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  border: 0;
  border-radius: 5px;
  padding: 5px;
  color: white;
`;
