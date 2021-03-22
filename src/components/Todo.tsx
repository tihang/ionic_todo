import React, { useState } from 'react';
import { IonModal, IonButton, IonContent } from '@ionic/react';
import { CheckmarkCircleOutline, EllipseOutline, PencilOutline, TrashOutline } from 'react-ionicons'
import styled from "styled-components"

interface TodoProps {
  id: string;
  refresh: () => void;
  data: {
    value: string,
    completed: string
  };
}

const Todo: React.FC<TodoProps> = ({ id, data, refresh}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(data.value);
  return (
    <>
    <Wrapper>
        <RightWrapper  onClick={() => completeTodo(id, refresh)}>
           {data.completed ? 
              <CheckmarkCircleOutline
              color={'#56c46b'}
              style={{marginRight: '3px'}} 
              height="28px" width="28px"  
              />
             :<EllipseOutline color={'#8892b0'} 
               style={{marginRight: '3px'}} 
               height="28px" width="28px"
              />
          }
        <Text>{data.value}</Text>
        </RightWrapper>
        
        <LeftWrapper>
            <PencilOutline
              color={'#00000'} 
              style={{cursor: 'pointer', margin: '8px'}} 
              height="28px" width="28px"
              onClick={() => setShowModal(true)}
            />
          
            <TrashOutline
              color={'#00000'}
              style={{cursor: 'pointer', margin: '8px'}} 
              height="28px" width="28px"
              onClick={() => deleteTodo(id, refresh)}
            />
        </LeftWrapper>
    </Wrapper>
    
    {/* EDIT MODAL */}
    <IonContent>
      <IonModal onDidDismiss={() => setShowModal(false)} isOpen={showModal}>
        <ModalHeading>EDIT TASK</ModalHeading>
        <ModalTextArea onChange={(e) => setModalContent(e.target.value)}>{modalContent}</ModalTextArea>
        <ModalButtonWrapper>
          <IonButton color="success" expand="full" 
            onClick={() => {
              editTodo(id, modalContent, data, refresh);
              setShowModal(false);
            }}>
            Save</IonButton>
          <IonButton color="light" expand="full" onClick={() => setShowModal(false)}>Cancel</IonButton>
        </ModalButtonWrapper>
      </IonModal>
    </IonContent>
    </>
  );
};

const completeTodo = (id: string, refresh: Function) => {
  let item = JSON.parse(localStorage.getItem(id) || "{}");

  if(item.completed){
    item.completed = false;
  } else {
    item.completed = true;
  }
  localStorage.setItem(id, JSON.stringify(item));
  refresh();
}

const editTodo = (id: string, modalContent: string, data: {completed: string}, refresh: Function) => {
  // let item = JSON.parse(localStorage.getItem(id) || "{}");
  localStorage.setItem(id, JSON.stringify({value: modalContent, completed: data.completed}));
  refresh();
}

const deleteTodo = (id: string, refresh: Function) => {
  localStorage.removeItem(id);
  refresh();
}


const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;


const Text = styled.p``;

const ModalHeading = styled.h1`
  text-align: center;
`;

const ModalTextArea = styled.textarea`
  margin: 1rem;
  padding: 1rem;
`;

const ModalButtonWrapper = styled.div`

`;


export default Todo;
