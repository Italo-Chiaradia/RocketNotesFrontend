import styled from 'styled-components'

export const Container = styled.button`
  background-color: ${({theme}) => theme.COLORS.ORANGE};
  color: ${({theme}) => theme.COLORS.BACKGROUND_800};
  
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 10px;
  padding: 16px 0;
  margin-top: 24px;

  font-weight: 500;

  &:disabled {
    opacity: .5;
  }
  
`;