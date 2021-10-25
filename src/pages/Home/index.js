import React, { useDebugValue, useEffect, useState } from 'react';
import { Container, Title, Input, Submit, Result, ResultContent, ResultLink, ResultSpam, ResultTitle } from './styles';
import api from '../services/api';

export default function Home() {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])

    async function searchApi(list) {
        const data = {
            "word_lists": []
        }
        data.word_lists = list
        // const response = await api.post()
        console.log(data)
    }

    function render(pos, listagem) {
        var listaux = []

        while (listagem[pos] != ")" && pos < listagem.length) {
            if (listagem[pos] == "(") {
                var aux = render(pos + 1, listagem)
                pos = aux[0]
                listaux.push(aux[1])
            }
            else
                listaux.push(listagem[pos])

            pos++
        }
        return [pos, listaux]
    }

    async function lisat(listagem) {
        var aux = render(0, listagem)
        var list = aux[1]
        searchApi(list)
    }

    async function loadpostSearchs() {
        const replace0 = search.replaceAll("(", " ( ")
        const replace1 = replace0.replaceAll(")", " ) ")
        const replace2 = replace1.replaceAll('"', ' " ')
        const replace3 = replace2.replaceAll("  ", " ")
        const spliter = replace3.split(" ")
        const arr = spliter.filter(item => item != '')
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
        console.log(arr)
        await lisat(arr)
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