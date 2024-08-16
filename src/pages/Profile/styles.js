import styled from "styled-components";

export const Container = styled.div`
  > header {
    width: 100%;
    height: 144px;
    
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};

    display: flex;
    align-items: center;

    padding: 0 124px;
    svg {
      font-size: 24px;
      color: ${({theme}) => theme.COLORS.GRAY_100}
    }
  }
`;

export const Form = styled.form`
  max-width: 340px;
  margin: 30px auto 0;

  > div:nth-child(3) {
    margin-bottom: 24px;
  }
`;

export const Avatar = styled.div`
  position: relative;
  margin: -128px auto 32px;
  width: 186px;
  height: 186px;
  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  > label {
    width: 48px;
    height: 48px;
    padding: 14px;
    cursor: pointer;
    border-radius: 50%;
    background-color:${({theme}) => theme.COLORS.ORANGE};
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      display:none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: ${({theme}) => theme.COLORS.BACKGROUND_800};
    }
  }
`;