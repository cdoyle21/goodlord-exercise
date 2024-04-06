import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  padding: 20px 0;
`;

export const Steps = styled.div`
  width: 60vw;
  padding: 20px;
  border: 5px solid #34d9c3;
  border-radius: 6px;
`;

export const Container = styled.div``;

export const Subtitle = styled.h3`
  padding-bottom: 15px;
`;

export const InputLabel = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 24px;
`;

export const InputWrapper = styled.div`
  min-height: 85px;
  max-height: 85px;
  padding: 5px 0 0;

  input,
  select {
    font-size: 16px;
    width: 100%;
    height: 40px;
    border: 2px solid #d3d3d3;
    border-radius: 6px;
  }

  input:focus,
  select:focus {
    border-color: #34d9c3;
    outline: none;
  }
`;

export const ErrorWrapper = styled.div`
  overflow-wrap: break-word;
  padding: 4px 2px;
  color: #34d9c3;
  font-family: var(--font-arimo, 'Arimo', Helvetica);
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  padding: 32px 0;
`;
