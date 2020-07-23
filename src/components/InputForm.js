import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Input = styled.input`
  border: 2px solid lightgray;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  &:active,
  &:focus {
    border: 2px solid pink;
  }
`;

const InputForm = ({ bindValue, onChangeHandle, onKeyPressHandle }) => {
  return (
    <Wrapper>
      <Input
        value={bindValue}
        onChange={onChangeHandle}
        onKeyPress={onKeyPressHandle}
        placeholder="Search some user name"
      />
    </Wrapper>
  );
};

export default InputForm;
