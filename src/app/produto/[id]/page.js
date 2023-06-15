'use client'

import { useRouter } from "next/navigation"

export default async function Produto({ params }) {
    const router = useRouter();
    const id = { id: parseInt(params.id) }

    const idJson = JSON.stringify(id);

    const req = await fetch("http://localhost:3003/produto", {
        method: "POST",
        cache: "no-cache",
        headers: { 'content-type': 'application/json' },
        body: idJson
    })
    const produto = await req.json();



    return (
        <div>
            <p>{produto.codigo}</p>
            <p>{produto.titulo}</p>
            <p>{produto.data}</p>
            <p>{produto.preco}</p>
            <p>{produto.descricao}</p>
            <p>{produto.imagem}</p>

        </div>

    )
}