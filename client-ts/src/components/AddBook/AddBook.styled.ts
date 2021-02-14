import styled from "styled-components";

export const AddBookForm = styled.form`
  background-color: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 400px;
`;

export const FormControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const InputLabel = styled.label`
  text-align: right;
  padding: 6px;
`;

export const TextInput = styled.input`
  margin: 4px;
  padding: 6px;
  box-sizing: border-box;
`;

export const SelectInput = styled.select`
  margin: 4px;
  padding: 6px;
  box-sizing: border-box;
`;

export const ErrorMessage = styled.span`
  color: #ad1457;
`;

export const SubmitButton = styled.button`
  color: #fff;
  font-size: 2em;
  background: #ad1457;
  border: 0;
  padding: 16px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;
