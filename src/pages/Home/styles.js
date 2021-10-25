import styled from "styled-components";

export const Container = styled.div`
  margin: 80px auto 0; 
  max-width: 450px;
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
    font-size: 30px;
    font-weight: bold;
`;

export const Input = styled.input`
    width: 500px;
    height: 45px;
    background: #F7F7F7;
    border-radius: 5px;
`;

export const Submit = styled.button`
    margin-top: 5px;
    width: 509px;
    height: 45px;
    background: #F7F7F7;
    border-radius: 5px;
    background: #59ACC7;
`;

export const Result = styled.p`
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    padding: 7px;
    background-color: #80C0D4;
    border-radius: 5px;
    width: 509px;
    height: 26px;
    text-align: center;
    align-items: center;
    align-self: center;
`;

export const ResultContent = styled.div`
    width: 585px;
    height: auto;
    background: #80C0D4;
    border-radius: 20px;
    padding: 1px 10px 1px 10px;
    margin-bottom: 10px;
    border: 0.5px black solid;
    
`;

export const ResultTitle = styled.p`
   font-size: 24px;
   font-weight: bold;
   color: white
`;

export const ResultSpam = styled.p`
   font-size: 18px;
   color: white
   
`;

export const ResultLink = styled.p`
   font-size: 18px;
   color: white
   
`;

export const Loading = styled.p`
    margin-top: 80px;
    font-size: 30px;
    font-weight: bold;
    color: #80C0D4
`;