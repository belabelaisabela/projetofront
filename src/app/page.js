"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    <main> <Link href="/cadastro" className='voltar'> CADASTRAR </Link>

      {produtos.map(produtos => (
        <div key={produtos.codigo}>
          <p style={{fontWeight: 'bold', textAlign: 'center'}}>{produtos.titulo}</p>
          <p style={{textAlign: 'center'}}>{produtos.data}</p>
          <p style={{textAlign: 'center', fontSize: 25}}>{produtos.preco}</p>
          <p style={{textAlign: 'center'}}>{produtos.descricao}</p>
          <p><img  style={{width: 150, marginLeft: 880}} src={produtos.imagem}></img></p>
          <button onClick={e => e.preventDefault(remover(produtos.codigo))}>REMOVER</button>
          <Link href={`/produto/${produtos.codigo}`}>ver mais</Link>
          
        </div>
      ))}
    </main>
  )
}