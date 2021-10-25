import React, { useEffect, useState } from 'react';
import { Container, Title, Input, Submit, Result, ResultContent, ResultLink, ResultSpam, ResultTitle } from './styles';
import api from '../services/api';

export default function Home() {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])


    async function loadpostSearchs() {
        const replace0 = search.replaceAll("(", " ( ")
        const replace1 = replace0.replaceAll(")", " ) ")
        const replace2 = replace1.replaceAll('"', ' " ')
        const replace3 = replace2.replaceAll("  ", " ")
        const spliter = replace3.split(" ")
        const arr = spliter.filter(item => item != '')
        console.log(arr)
        var listindex = []
        var listaspas = []
        var listPalavras = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '"') {
                listindex.push(i)
            }
        }
        for (var i = 0; i < listindex.length; i++) {
            if (i % 2 == 0) {
                listaspas.push([listindex[i], listindex[i + 1]])
            }
        }
        for (var i = 0; i < listaspas.length; i++) {
            var nome = ''
            for (var j = listaspas[i][0] + 1; j < listaspas[i][1]; j++) {
                if (j == listaspas[i][1] - 1) { nome += `${arr[j]}` }
                else { nome += `${arr[j]} ` }
            }
            listPalavras.push(nome)
        }
        for (var i = listaspas.length - 1; i >= 0; i--) {
            arr.splice(listaspas[i][0], listaspas[i][1] - listaspas[i][0] + 1, listPalavras[i])
        }

        console.log(listindex)
        console.log(listaspas)
        console.log(listPalavras)
        console.log(arr)
    }

    async function teste() {
        setResult([1, 2, 3])
    }

    return (
        <Container>
            <Title>PROJETO PAA UnB-2021</Title>
            <Input
                placeholder="Digite sua pesquisa"
                value={search}
                onChange={event => setSearch(event.target.value)}
            />
            <Submit onClick={() => teste()} >PESQUISAR</Submit>

            {
                result.length > 0 &&
                <Result>RESULTADOS DA PESQUISA:</Result>
            }

            {result.map(r => (
                <div key={r}>
                    <ResultContent>
                        <ResultTitle>TÍTULO DA PÁGINA</ResultTitle>
                        <ResultSpam>”Trecho do texto com a palavra chave ou expressão...”</ResultSpam>
                        <ResultLink>HTTP://LINK.COM</ResultLink>
                    </ResultContent>
                </div>
            ))}

        </Container>
    );
}