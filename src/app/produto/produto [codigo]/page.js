'use client'

import { useRouter } from "next/navigation"

export default async function Produto({ params }) {
    const router = useRouter();

    const req = await fetch("http://localhost:3003/produto" + params.codigo, {
        method: "GET",
        cache: "no-cache",
        headers: { 'content-type': 'application/json' },
    })
    const res = await req.json();
    const produto = res[0];

    return (
        <div>
            <img src={produto.imagem}/>
            <p>{produto.codigo}</p>
            <p>{produto.titulo}</p>
            <p>{produto.data}</p>
            <p>{produto.preco}</p>
            <p>{produto.descricao}</p>
        </div>

    )
}