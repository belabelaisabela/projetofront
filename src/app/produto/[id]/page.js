'use client'

import { useRouter } from "next/navigation"
import styles from '../page.module.css'

export default async function Produto({ params }) {
    const router = useRouter();
    const id = { id: parseInt(params.id) }

    const idJson = JSON.stringify(id);

    const req = await fetch("http://localhost:3003/produtos", {
        method: "POST",
        cache: "no-cache",
        headers: { 'content-type': 'application/json' },
        body: idJson
    })
    const produto = await req.json();


    const remover = () => {
        console.log(idJson)
        try {
            fetch("http://localhost:3003/produtos", {
                method: "DELETE",
                headers: { 'content-type': 'application/json' },
                body: idJson
            })
            router.push("/");
        } catch (error) {
            alert("Ocorreu um erro" + error)
        }
    }
    return (
        <div>
            <div className={styles.produtoc}><p>{produto.codigo}</p></div>
            <div className={styles.produtoc}><p>{produto.titulo}</p></div>
            <div className={styles.produtoc}><p>{produto.data}</p></div>
            <div className={styles.produtoc}><p>{produto.preco}</p></div>
            <div className={styles.produtoc}><p>{produto.descricao}</p></div>
            <div className={styles.produtoc}><p>{produto.imagem}</p></div>
            <button onClick={e => e.preventDefault(remover())}>REMOVER</button>

        </div>

    )
}