import React, { useState } from "react";
import {
  Container,
  Title,
  Input,
  Submit,
  ResultContent,
  ResultLink,
  ResultSpam,
  ResultTitle,
  Loading,
} from "./styles";
import api from "../services/api";

const Home = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const loadTree = (position, listing, buffer) => {
    let listaux = [];
    let half = 0;

    if (buffer.length > 0) {
      listaux.push(buffer);
    }

    while (listing[position] !== ")" && position < listing.length) {
      if (half === 0) {
        if (listing[position] === "and" || listing[position] === "or") {
          half = 1;
          listaux.push(listing[position]);
        } else if (listing[position] === "(") {
          let aux = loadTree(position + 1, listing, []);
          position = aux[0];
          listaux.push(aux[1]);
        } else listaux.push(listing[position]);
      } else {
        if (listing[position] === "and" || listing[position] === "or") {
          let aux = loadTree(position, listing, listaux);
          position = aux[0];
          listaux = aux[1];
        } else if (listing[position] === "(") {
          let aux = loadTree(position + 1, listing, []);
          position = aux[0];
          listaux.push(aux[1]);
        } else listaux.push(listing[position]);
      }

      position++;
    }

    return [position, listaux];
  };

  const searchApi = async (list) => {
    console.log(list);
    setLoading(true);
    const data = {
      words_list: [],
    };
    data.words_list = list;
    console.log(data);
    await api
      .post("/questions", data)
      .then((response) => {
        setResult(response.data);
        setLoading(false);
      })
      .catch((err) => console.log("erro:", err));
    // setLoading(false)
  };

  const loadPostSearchs = async () => {
    const replace0 = search.replaceAll("(", " ( ");
    const replace1 = replace0.replaceAll(")", " ) ");
    const replace2 = replace1.replaceAll('"', ' " ');
    const replace3 = replace2.replaceAll("  ", " ");
    const spliter = replace3.split(" ");
    const arr = spliter.filter((item) => item !== "");
    let listindex = [];
    let listaspas = [];
    let listPalavras = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '"') {
        listindex.push(i);
      }
    }
    for (let i = 0; i < listindex.length; i++) {
      if (i % 2 === 0) {
        listaspas.push([listindex[i], listindex[i + 1]]);
      }
    }
    for (let i = 0; i < listaspas.length; i++) {
      let nome = "";
      for (let j = listaspas[i][0] + 1; j < listaspas[i][1]; j++) {
        if (j === listaspas[i][1] - 1) {
          nome += `${arr[j]}`;
        } else {
          nome += `${arr[j]} `;
        }
      }
      listPalavras.push(nome);
    }
    for (let i = listaspas.length - 1; i >= 0; i--) {
      arr.splice(
        listaspas[i][0],
        listaspas[i][1] - listaspas[i][0] + 1,
        listPalavras[i]
      );
    }
    console.log(arr);
    searchApi(loadTree(0, arr, [])[1]);
    for (let i = listaspas.length - 1; i >= 0; i--) {
      arr.splice(
        listaspas[i][0],
        listaspas[i][1] - listaspas[i][0] + 1,
        listPalavras[i]
      );
    }
    console.log(arr);
    // await lisat(arr);
  };

  return (
    <Container>
      <Title>PAA 2021/1 - PROJETO DA DISCIPLINA</Title>
      <Title>STACK OVERFLOW WEB CRAWLER</Title>
      <Input
        placeholder="Digite sua pesquisa"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Submit onClick={() => loadPostSearchs()}>PESQUISAR</Submit>

      {loading && <Loading>CARREGANDO RESULTADOS...</Loading>}

      {loading && <Loading>CARREGANDO RESULTADOS...</Loading>}

      {result.map((item) => (
        <div key={item.id}>
          <ResultContent>
            <ResultTitle>{item.title}</ResultTitle>
            <ResultSpam>{item.body}</ResultSpam>
            <a href={`https://stackoverflow.com${item.url}`}>
              <ResultLink>Acessar Página</ResultLink>
            </a>
          </ResultContent>
        </div>
      ))}

      {result.map((r) => (
        <div key={r}>
          <ResultContent>
            <ResultTitle>TÍTULO DA PÁGINA</ResultTitle>
            <ResultSpam>
              ”Trecho do texto com a palavra chave ou expressão...”
            </ResultSpam>
            <ResultLink>HTTP://LINK.COM</ResultLink>
          </ResultContent>
        </div>
      ))}
    </Container>
  );
};

export default Home;