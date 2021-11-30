import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 5% auto;
  width: 33%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  color: whitesmoke;
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 2rem;
  height: 3rem;
  border-radius: 2rem;
  color: whitesmoke;
  background-color: #222;
  font-size: large;
  border: 0.1rem solid whitesmoke;
  `;

export const Submit = styled.button`
  margin-top: 2rem;
  width: auto;
  padding: 0 2rem;
  height: 3rem;
  background-color: #222;
  border-radius: 1rem;
  color: whitesmoke;
  font-weight: bold;
  font-size: 1.5rem;
  border: 0.1rem solid whitesmoke;
  `;

export const ResultContent = styled.div`
  width: 100%;
  height: auto;
  background: #222;
  border-radius: 2rem;
  padding: 1rem;
  margin-top: 1rem;
  border: 0.2em solid black;
`;

export const ResultTitle = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

export const ResultBody = styled.p`
  font-size: 1.5em;
`;

export const ResultUrl = styled.p`
  font-size: 1.5em;
  color: cyan;
  font-weight: underline;
`;

export const Loading = styled.p`
  margin-top: 2em;
  font-size: 2em;
  font-weight: bold;
`;
