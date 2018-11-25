# Projeto MyReads

Projeto de gestão de leitura de livros.
Descrição:

- A página inicial contém 3 prateleiras sendo: "Lendo atualmente", "Quero ler" e "Lido";
- Os livros podem ser trocados de prateleira pelo botão de editar;
- É possível buscar um livro desejado na página de busca e adicioná-lo a uma prateleira.

## Rodando o projeto:
Execute os comandos baixo
* Instalar as dependências usando `npm install`
* Iniciar o servidor de desenvolvimento `npm start`

## Importante! Pesquisa de livros
Nas buscas utilize somentes os termos listados em [SEARCH_TERMS.md](SEARCH_TERMS.md).

## Curiosidades sobre o desenvolvimento

- Deu muito trabalho configurar a aplicação para que as `views` ficassem em arquivos diferentes mantendo o mesmo state de livros. Eu teimei em fazer assim, pois alguns itens da User Interface requeriam states próprios para melhor controle e se ficasse tudo no mesmo arquivo o projeto iria parecer bagunçado.
- Eu inicialmente tinha escolhido o Blueprint como UI principal, pois ele tem elementos de User Interface mais bonitos, porém ele não tinha elementos de layout como grids, containers e breakpoints. Embora eu pudesse instalar uma dependência só para isso optei por trocar para o Materialize UI que tem tudo o que eu precisei durante todo o projeto.
- A estrutura atual formada de assets/components/services/views é a mesma que eu utilizo com Vue JS. Eu a considero uma estrutura versário para qualquer tipo de projeto Single Page Application.