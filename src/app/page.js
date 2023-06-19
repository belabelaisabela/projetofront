"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'

export default async function Home() {
  const router = useRouter();

  const req = await fetch("http://localhost:3003/produtos", {
    next:{ revalidate: 1},
  });
  const produtos = await req.json();
  

  const remover = async (id) => {
    const codigo = {id:parseInt(id)}
    const idJson = JSON.stringify(codigo);
    console.log(idJson)
    try {
      fetch("http://localhost:3003/produtos", {
        method: "DELETE",
        headers: { 'content-type': 'application/json' },
        body: idJson
      })
      router.refresh();
    } catch (error) {
      alert("Ocorreu um erro" + error)
    }
  }

  return (
    <main> 
    <div className={styles.header}><img className={styles.logo} src='https://www.gsuplementos.com.br/checkout/tema/checkout/img/carrinho-gsuplementos/logo.svg'></img></div>
    <h1><Link href="/cadastro" className='voltar'> CADASTRAR ITEM </Link></h1>
    <h1>PRODUTOS</h1>
<div >
  <div className={styles.containerfull}>
      {produtos.map(produtos => (
        <div key={produtos.codigo} className={styles.tudo}>
          <img  style={{width: 100, marginLeft: 125, marginTop:10}} src={produtos.imagem}></img>
          <h3 style={{fontWeight: 'bold', textAlign: 'center'}}>{produtos.titulo}</h3>
          <p style={{textAlign: 'center', fontSize: 25}}>{produtos.preco}</p>
          <h4 style={{textAlign: 'center', outline: 'none' }}><Link href={`/produto/${produtos.codigo}`}>ver mais</Link></h4><br/>
          <button className={styles.submitproduto} onClick={e => e.preventDefault(remover(produtos.codigo))}>REMOVER</button><br/>
        </div>
      ))}
      </div>
</div>
    </main>
  )
}