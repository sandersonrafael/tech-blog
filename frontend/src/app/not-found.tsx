import Link from 'next/link';

const NotFound = () => {
  return (
    <main
      className="flex flex-col justify-center items-center gap-3 text-center px-3 my-8"
      style={{ minHeight: '50vh' }}
    >
      <h1 className="text-4xl font-bold">Erro 404 - Página não encontrada</h1>
      <p>Parece que a página que você procura não existe ou foi removida.</p>
      <p>
        Verifique se o link está correto ou clique{' '}
        <Link href="/" className="text-blue-400 hover:text-blue-500 transition-colors underline">
          aqui
        </Link>
        {' '}para navegar em nosso Blog.
      </p>
    </main>
  );
};

export default NotFound;
