import React,{ useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Todo from "./Todo";

interface ContainerProps { }

const TodoContainer: React.FC<ContainerProps> = () => {
  const [input, setInput] = useState("");
  const [storage, setStorage] = useState(JSON.stringify(localStorage) || "{}");

  const refresh = () => {
    setStorage(JSON.stringify(localStorage));
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>My Todo List</HeaderTitle>

        <InputWrapper>
          <InputBox type="text" value={input} onChange={(e) => {setInput(e.target.value)}}></InputBox>
          <InputButton onClick={() => {
            if (input.trim().length > 0) {
              localStorage.setItem(Date.now().toString(), JSON.stringify({value: input, completed: false}));
              setInput("")
              refresh(); 
            }
          }}>
            Add To List
          </InputButton>
        </InputWrapper>
      </HeaderWrapper>

      <TodoWrapper>
        {
          localStorage.length > 0 ?
          Object.keys(JSON.parse(storage)).sort().map((key, i) => 
              <Todo key={i} id={key} refresh={refresh} data={JSON.parse(localStorage.getItem(key) || "{}")}></Todo>)
            :<p>No Todos</p>
        }
      </TodoWrapper>
    </>
  );
};


const HeaderWrapper = styled.div`
  background-color: slateblue;
  margin: 0;
  padding: 1rem 0;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 2rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.4rem;
`;

const InputBox = styled.input`
  background-color: gainsboro;
  padding: 1rem;
  width: 300px;
  height: 40px;
  outline: none;
  border: none;
`;

const InputButton = styled.button`
  color: white;
  background-color: black;
  width: 100px;
  font-size: 1.1rem;
  outline: none;
`;

const TodoWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;


export default TodoContainer;
