import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  cursor: pointer;
  display: block;
  font-size: 22px;
  padding-left: 35px;
  position: relative;
  user-select: none;
  margin: 8px;

  > input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  &:hover input ~ span {
    background-color: #ccc;
  }

  > input:checked ~ span {
    background-color: #2196f3;
  }

  > input:checked ~ span:after {
    display: block;
  }

  > span:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const Input = styled.input``;

export const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

export const Error = styled.span`
  color: red;
  text-indent: 6px;
`;
