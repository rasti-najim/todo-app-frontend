import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  //   * the most important part of this component
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.post(
        `http://localhost:5000/api/todos`,
        body,
        { headers: { "auth-token": localStorage.getItem("auth-token") } }
      );

      console.log(response.data);
      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Container>
      <h1>Todo List</h1>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;

  h1 {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  width: 50%;
  border-width: 2px;
  border-radius: 5px;
  /* border-color: #4c00ff; */
  border-color: black;
`;
const Button = styled.button`
  background-color: #4c00ff;
  color: #fff;
  margin-left: 10px;
  padding: 5px;
  border: 0;
  border-radius: 5px;
`;
