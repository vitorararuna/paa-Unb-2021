import React, { useEffect, useState } from 'react';
import { Container, Title, Input, Submit, Result, ResultContent, ResultLink, ResultSpam, ResultTitle } from './styles';
import api from '../services/api';

export default function Home() {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])


    async function loadSearchs() {
        const words = {
            listWords: [],
        };

        const spliter = await search.split(" ")
        spliter.map(s => words.listWords.push(s))
        console.log(words)

        const response = await api.get()
        await console.log(response.data.items)
    }

    async function loadpostSearchs() {
        const data = {
            "meta": {
                "keywords": {
                    "keyword1": "python"
                }
            },
            "callback": "parse_item",
            "spider_name": "stackcrawler"
        }
        console.log(data.meta)
        const response = await api.post('/', data)
        await console.log(response)
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