'use client'
import { useState } from 'react'
import styles from '../page.module.css'
import { useRouter } from 'next/navigation'

export default function Cadastro() {
    const route = useRouter();
    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [data, setData] = useState();
    const [preco, setPreco] = useState();
    const [descricao, setDescricao] = useState();
    const [imagem, setImagem] = useState();

    const cadastro = (e) => {
        e.preventDefault()
        alert(titulo)
        const produto = {
            titulo: titulo,
            data_cadastro: data,
            preco: preco,
            descricao: descricao,
            imagem: imagem

        }
        const produtoJson = JSON.stringify(produto); 
        fetch("http://localhost:3003/produtos", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: produtoJson
        }).then(function(){ route.push("/")}).catch(()=> console.log("Não foi possível cadastrar!"))
    }

    return (
        <main className={styles.sitetodo}>

        <div className={styles.header}><img className={styles.logo} src='https://www.gsuplementos.com.br/checkout/tema/checkout/img/carrinho-gsuplementos/logo.svg'></img></div>
        
        <div className={styles.containerform}>
            <form method='submit' onSubmit={cadastro}>
                <input type="text" placeholder='Código:' nome="codigo" className={styles.forminput} onChange={e => setCodigo(e.target.value)}
                /><br/>
                <input type="text" placeholder='Título:' nome="titulo" className={styles.forminput} onChange={e => setTitulo(e.target.value)}
                /><br/>
                <input type="date" placeholder='Data:' nome="data" className={styles.forminput} onChange={e => setData(e.target.value)}
                /><br/>
                <input type="text" placeholder='Preço:' nome="preco" className={styles.forminput} onChange={e => setPreco(e.target.value)}
                /><br/>
                <input type="text" placeholder='Descrição:' nome="descricao" className={styles.forminput} onChange={e => setDescricao(e.target.value)}
                /><br/>
                <input type="text" placeholder='Link da Imagem:' nome="imagem" className={styles.forminput} onChange={e => setImagem(e.target.value)}
                /><br/>
                <button type='submit' className={styles.submitbt}>Cadastrar</button>
                <div>
                    <a href='/' className={styles.submitbt2}>Ver Produtos</a>
                </div>
            </form>
        </div>
        </main>
    );
}