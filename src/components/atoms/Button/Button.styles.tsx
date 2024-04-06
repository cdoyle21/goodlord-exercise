import styled from 'styled-components';

interface PropTypes {
  disabled: boolean;
}

export const StyledButton = styled.button<PropTypes>`
  font-size: 32px;
  max-width: 300px;
  min-height: 51px;
  margin: auto;
  color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#34d9c3')};
  width: 100%;
  background-color: #ffffff;
  border: 1px solid ${({ disabled }) => (disabled ? '#cccccc' : '#34d9c3')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 6px;
  padding: 12px 25px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ffffff' : '#34d9c3')};
    border: 1px solid ${({ disabled }) => (disabled ? '#cccccc' : '#ffffff')};
    color: ${({ disabled }) => (disabled ? '#cccccc' : '#ffffff')};
  }

  &:focus {
    background-color: ${({ disabled }) => (disabled ? '#ffffff' : '#34d9c3')};
    border: 1px solid ${({ disabled }) => (disabled ? '#cccccc' : '#ffffff')};
    color: ${({ disabled }) => (disabled ? '#cccccc' : '#ffffff')};
    outline: none;
  }
`;
