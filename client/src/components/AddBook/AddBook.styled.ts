import styled from "styled-components";

export const AddBookForm = styled.form`
  background-color: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 400px;

  & > svg {
    position: absolute;
    top: -6px;
    right: -12px;
    cursor: pointer;
  }
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
  font-size: 1em;
  background: #ad1457;
  border: 0;
  padding: 8px 16px;
  border-radius: 4px;
  position: absolute;
  bottom: 25px;
  left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;