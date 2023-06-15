"use client"
import Link from 'next/link';

export default async function Home() {

  const req = await fetch("http://localhost:3004/produtos", {
    next:{ revalidate: 1},
  });
  const produtos = await req.json();

  return (
    <main> <Link href="/cadastro" className='voltar'> CADASTRAR </Link>

      {produtos.map(produtos => (
        <div key={produtos.codigo}>
          <p>{produtos.titulo}</p>
          <p>{produtos.data}</p>
          <p>{produtos.preco}</p>
          <p>{produtos.descricao}</p>
          <p>{produtos.imagem}</p>
          <Link href={`/produto/${produtos.id}`}>ver mais</Link>
          
        </div>
      ))}
    </main>
  )
}