import React, { useState } from 'react';
import { Container, Title, Input, Submit, Result, ResultContent, ResultLink, ResultSpam, ResultTitle, Loading } from './styles';
import axios from 'axios';

export default function Home() {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])

    function loadTree(pos, listagem, buffer) {
        var listaux = []
        var half = 0

        if (buffer.length > 0)
            listaux.push(buffer)

        while (listagem[pos] != ")" && pos < listagem.length) {
            if (half == 0) {
                if (listagem[pos] == "and" || listagem[pos] == "or") {
                    half = 1
                    listaux.push(listagem[pos])
                }
                else if (listagem[pos] == "(") {
                    var aux = loadTree(pos + 1, listagem, [])
                    pos = aux[0]
                    listaux.push(aux[1])
                }
                else
                    listaux.push(listagem[pos])
            }
            else {
                if (listagem[pos] == "and" || listagem[pos] == "or") {
                    var aux = loadTree(pos, listagem, listaux)
                    pos = aux[0]
                    listaux = aux[1]
                }
                else if (listagem[pos] == "(") {
                    var aux = loadTree(pos + 1, listagem, [])
                    pos = aux[0]
                    listaux.push(aux[1])
                }
                else
                    listaux.push(listagem[pos])
            }

            pos++
        }

        return [pos, listaux]
    }

    async function searchApi(list) {
        console.log(list)
        setLoading(true)
        const data = {
            "words_list": []
        }
        data.words_list = list
        console.log(data)
        await axios.post('https://paa-backend-webcrawler.herokuapp.com/questions', data)
            .then((response) => {
                setResult(response.data)
                setLoading(false)
            })
            .catch((err) => console.log("erro:", err))
        // setLoading(false)

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
        searchApi(loadTree(0, arr, [])[1])
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


            {loading && <Loading>CARREGANDO RESULTADOS...</Loading>}

            {
                result.length > 0 &&
                <Result>RESULTADOS DA PESQUISA:</Result>
            }

            {result.map(item => (
                <div key={item.id}>
                    <ResultContent>
                        <ResultTitle>{item.title}</ResultTitle>
                        <ResultSpam>{item.body}</ResultSpam>
                        <a href={`https://stackoverflow.com${item.url}`}><ResultLink>Acessar Página</ResultLink></a>
                    </ResultContent>
                </div>
            ))}

        </Container>
    );
}