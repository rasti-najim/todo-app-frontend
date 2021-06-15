import React, { useState } from "react";
import styled from "styled-components";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  //   * the most important part of this component
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      window.location = "/";
    } catch (error) {
      console.log(error);
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
