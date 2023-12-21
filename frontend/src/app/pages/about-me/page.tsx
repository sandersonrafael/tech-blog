import '../Pages.css';

const AboutMePage = () => {
  return (
    <main className="page-main-content">
      <h1>Sobre Mim</h1>

      <h2>Quem sou eu?</h2>

      <p>
        Olá, eu me chamo Sanderson Rafael! Sou desenvolvedor de software e me considero atualmente Full Stack,
        embora meu maior interesse seja pelo Back-end. Sempre fui muito ligado à informática, desde o dia que obtive
        meu primeiro computador, aos 11 anos. A partir disto, despertei bastante interesse em como a informática
        facilita nossa vida e transforma processos complexos em coisas simples, seja para o entretenimento, como jogos,
        filmes etc. Como para tarefas essenciais do nosso quotidiano, como troca de informações, estudos, trabalhos etc.
      </p>

      <h2>Minha trajetória</h2>

      <p>
        Fui apresentado à programação em 2022, começando a estudar através dos cursos de base, como os do Curso em Vídeo,
        do professor Gustavo Guanabara. Nisto pude extrair bastante aprendizado nos conceitos iniciais da programação
        Front-end, nas tecnologias: HTML, CSS e JavaScript, realizando alguns projetos de nível iniciante.
      </p>

      <p>
        Após esse contato inicial, comecei assistir cursos da Udemy, cujo primeiro foi o &ldquo;<b>Curso JavaScript e
        TypeScript do Básico ao Avançado</b>&rdquo;, do professor Luiz Otávio Miranda. Ao final do curso, fiz meu
        primeiro projeto independente, que trata-se do Front-end de uma loja virtual com HTML, CSS e JavaScript.
      </p>

      <p>
        Me sentindo um pouco mais confiante na base da programação Front-end, iniciei então o &ldquo;<b>Curso de
        React.Js e Next.Js (nível intermediário e avançado)</b>&rdquo;, do Otávio Miranda, também da Udemy. Neste, pude
        aprender sobre React e suas ferramentas (React Router DOM, Styled Components etc), sobre o TypeScript (e como
        ele torna o código mais seguro), sobre o framework mais popular do React, o Next, além de ter um primeiro
        contato com o Back-end através do Node JS com o Express JS e o MongoDB.
      </p>

      <p>
        No decorrer do mesmo período, realizei vários projetos guiados, assisti diversos vídeos no YouTube também sobre
        o React e suas ferramentas e consegui obter um conhecimento razoável, me motivando a realizar agora o meu
        primeiro projeto independente do React, que trata-se de um aplicativo de gestão financeira, com o React no
        Front-end e Node JS, Express e MongoDB no Back-end.
      </p>

      <p>
        Estudei um pouco também sobre algumas ferramentas como o VueJS e o Bootstrap. Tive bastante facilidade, pois
        os conceitos eram muito próximos dos que eu já tinha encontrado anteriormente nas ferramentas estudadas,
        com diferenças somente de sintaxe, mas com os mesmos conceitos. Realizei desta vez um projeto com o VueJS,
        TypeScript e Bootstrap 5, que trata-se de uma galeria de quadrinhos, heróis e eventos da Marvel, consumindo sua
        API Oficial.
      </p>

      <p>
        E finalmente, com enorme interesse desperto pelo Back-end, passei a estudar o Java e suas ferramentas. Para
        isto, iniciei realizando os cursos &ldquo;<b>Java COMPLETO 2023 Programação Orientada a Objetos + Projetos</b>
        &rdquo; e &ldquo;<b>REST APIs RESTFul do 0 à AWS c. Spring Boot 3 Java e Docker</b>&rdquo;. Pude aprender
        diversos conceitos sobre a web e sobre o Back-end, incluindo bancos de dados relacionais, como o MySQL.
        Realizei alguns projetos apresentados nos cursos e ao final, me empenhei a realizar agora um novo projeto
        por conta própria, utilizando tudo que já aprendi até então. Trata-se deste blog, por onde vos falo, cujo
        Back-end foi desevolvido com Java + Spring Boot + MySQL e o Front-end com Next JS + TypeScript + Tailwind.
      </p>

      <h2>Minha stack</h2>

      <p>
        As tecnologias que mais utilizo atualmente, são: Java (Spring Boot) | JavaScript (TypeScript) | React (Next)
        | Node (Express) | Git (GitHub) | MongoDB | MySQL. Porém, acredito nas linguagens, frameworks e bibliotecas como somente
        ferramentas para solucionar problemas, me colocando sempre em busca de novos conhecimentos e aprendizados.
      </p>

      <h2>Meus projetos</h2>

      <h3>Blog de tecnologia Full Stack</h3>

      <p>
        Como desafio para pôr em prática o conhecimento que adquiri no Java e no Spring Boot através dos cursos,
        desenvolvi um blog sobre tecnologia, cujo back-end utiliza Java com Spring Boot + MySQL e o front-end utiliza
        NextJS com TypeScript + Tailwind CSS.
      </p>

      <p>
        A aplicação utiliza de recursos de segurança com o Spring Security, como filtros de segurança e autorização
        com JsonWebToken, controle de acesso através do CORS, encriptação de senhas com o BCrypt, dentre outros.
        Apresenta também recursos como validações de entradas de usuário, serviços de e-mail para confirmação de
        cadastro, assinatura de newsletter e recuperação de senha. Migrations para melhor controle de alterações
        no banco de dados, responsividade, persistência de imagens com o Firebase Storage, além de bastante
        interatividade com o usuário.
      </p>

      <p>
        Site:{' '}
        <a href="https://alltech.mystack.site" target="_blank" rel="noopener noreferrer">
          https://alltech.mystack.site
        </a>

        <br />

        Repositório:{' '}
        <a href="https://github.com/sandersonrafael/tech-blog" target="_blank" rel="noopener noreferrer">
          https://github.com/sandersonrafael/tech-blog
        </a>
      </p>

      <h3>Aplicativo de gestão financeira</h3>

      <p>
        Desenvolvi por conta própria um aplicativo de gestão financeira, utilizando a MERN Stack (MongoDB, ExpressJS,
        ReactJS e NodeJS), onde pude me aprofundar nos conceitos presentes no desenvolvimento de aplicações, como:
        responsividade, requisições HTTP, gerenciamento de estados, segurança dos dados, autenticação e autorização,
        encriptação de senhas, persistência de dados do lado do cliente, dentre outros.
      </p>
      <p>
        Site:{' '}
        <a href="https://my-financial-app.netlify.app" target="_blank" rel="noopener noreferrer">
          https://my-financial-app.netlify.app
        </a>

        <br />

        Repositório:{' '}
        <a href="https://github.com/sandersonrafael/my-financial-app" target="_blank" rel="noopener noreferrer">
          https://github.com/sandersonrafael/my-financial-app
        </a>
      </p>

      <h3>Galeria de heróis e quadrinhos Marvel</h3>

      <p>
        Desenvolvi uma aplicação front-end que exibe e lista personagens, quadrinhos e eventos do universo Marvel,
        através do consumo da sua API oficial. A aplicação foi desenvolvida com as tecnologias: TypeScript, Vue JS, Vue
        Router e Bootstrap. O aplicativo possui recursos como: responsividade, validação de formulários, consumo de API,
        listagem de dados, paginação, pesquisas, carregamento dinâmico, modais, etc.
      </p>

      <p>
        Site:{' '}
        <a href="https://bee-marvel.vercel.app/" target="_blank" rel="noopener noreferrer">
          https://bee-marvel.vercel.app/
        </a>

        <br />

        Repositório:{' '}
        <a href="https://github.com/sandersonrafael/bee-marvel" target="_blank" rel="noopener noreferrer">
          https://github.com/sandersonrafael/bee-marvel
        </a>
      </p>

      <h3>Loja virtual front-end</h3>

      <p>
        Me propus a desenvolver uma loja virtual com bastantes recursos disponíveis, utilizando o mínimo de tecnologias,
        como: HTML, CSS, JavaScript e arquivos JSON, com o intuito de masterizar o máximo possível toda a base do
        desenvolvimento front-end. O site apresenta recursos como: páginas com url e conteúdo carregados dinamicamente
        através do consumo de APIs internas e externas à aplicação (páginas de produtos, páginas de coleções, busca de
        cep, rastreamento dos correios etc), manipulação do Local Storage (página de favoritos, carrinho, etc),
        manipulação de cookies, validação de formulários, responsividade, dentre outros.
      </p>

      <p>
        Site:{' '}
        <a href="https://sk8-lifestyle.netlify.app/" target="_blank" rel="noopener noreferrer">
          https://sk8-lifestyle.netlify.app/
        </a>

        <br />
        Repositório:{' '}
        <a href="https://github.com/sandersonrafael/loja-virtual" target="_blank" rel="noopener noreferrer">
          https://github.com/sandersonrafael/loja-virtual
        </a>
      </p>

      <h2>Fale comigo</h2>

      <p>
        Quer conversar sobre tecnologia, solicitar um orçamento ou me contratar? Entre em contato comigo através dos
        meios disponíveis no rodapé e te responderei assim que possível!
      </p>
    </main>
  );
};

export default AboutMePage;
