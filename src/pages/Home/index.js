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
        const replace3 = replace2.replaceAll('"', ' " ')
        const replace4 = replace3.replaceAll("  ", " ")
        const spliter = replace4.split(" ")
        const arr = spliter.filter(item => item != '')
        console.log(arr)

    }

    return (
        <Container>
            <Title>PROJETO PAA UnB-2021</Title>
            <Input
                placeholder="Digite sua pesquisa"
                value={search}
                onChange={event => setSearch(event.target.value)}
            />
            <Submit onClick={() => loadpostSearchs()} >PESQUISAR</Submit>

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