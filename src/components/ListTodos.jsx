import React, { useEffect, useState } from "react";
import styled from "styled-components";

import EditTodo from "./EditTodo";

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error);
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
