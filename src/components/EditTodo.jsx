import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function EditTodo({ todo }) {
  const [description, setDescription] = useState(todo.description);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.put(
        `http://localhost:5000/api/todos/${todo.todo_id}`,
        body,
        {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        }
      );

      console.log(response.data);
      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      <div
        class="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateTodo(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

const Input = styled.input`
  width: 100%;
  border-width: 2px;
  border-radius: 5px;
  /* border-color: #4c00ff; */
  border-color: black;
`;
