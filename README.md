# Boas-vindas ao repositório do meu projeto do App de Músicas.

Neste projeto eu criei o TrybeTunes, uma aplicação capaz de reproduzir músicas das mais variadas bandas e artistas, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada. Então aqui vai uma listinha do que essa aplicação é capaz de fazer:

  - Fazer login;
  - Pesquisar por uma banda ou artista;
  - Listar os álbuns disponíveis dessa banda ou artista;
  - Visualizar as músicas de um álbum selecionado;
  - Reproduzir uma prévia das músicas deste álbum;
  - Favoritar e desfavoritar músicas;
  - Ver a lista de músicas favoritas;
  - Ver o perfil da pessoa logada;
  - Editar o perfil da pessoa logada;

Neste projeto, eu fui desafiado a usar os seguintes conhecimentos:

- Fazer requisições e consumir dados vindos de uma `API`;

- Utilizar os ciclos de vida de um componente React;

- Utilizar a função `setState` de forma a garantir que um determinado código só é executado após o estado ser atualizado

- Utilizar o componente `BrowserRouter` corretamente;

- Criar rotas, mapeando o caminho da URL com o componente correspondente, via `Route`;

- Utilizar o `Switch` do `React Router`

- Criar links de navegação na aplicação com o componente `Link`;

Abaixo estão códigos que estão dentro do projeto mas a autoria é da Trybe, juntamente deles está a explicação do que cada um faz. (A explicação também foi criada pela instituição.)

- Existe no projeto um diretório `src/services` que contém os arquivos `favoriteSongsAPI.js`, `searchAlbumsAPI.js`, `userAPI.js` e `musicsAPI.js`. Esses arquivos serão responsáveis por lidar com as requisições simuladas que serão usadas durante o desenvolvimento. Entenda mais sobre eles abaixo:

  <details><summary><strong> <code>userAPI.js</code></strong></summary>

  O arquivo `userAPI.js` será utilizado para manipular as informações da pessoa logada, dentro dele estarão as funções para recuperar e atualizar as informações da pessoa usuária, além de criar um novo perfil. Todas essas funções simulam o funcionamento de uma API.

  - Para recuperar as informações da pessoa usuária, utilize a função `getUser`. Ela retornará um objeto com as informações da pessoa logada caso exista.
  **Atenção:** caso não encontre nenhuma informação da pessoa usuária, a API retornará um objeto vazio.

  - Para criar um novo perfil, utilize a função `createUser`, ela recebe como parâmetro o objeto que contém as informações da pessoa usuária. Esse objeto deverá conter a seguinte estrutura:

  ```javascript
  {
    name: '',
    email: '',
    image: '',
    description: '',
  }
  ```

  Para atualizar as informações da pessoa logada, utilize a função `updateUser`. Assim como a função anterior, ela também recebe um objeto com as informações que serão atualizadas, esse objeto deve conter a mesma estrutura do anterior.
  </details>

  <details><summary><strong> <code>searchAlbumsAPI.js</code></strong></summary>

  O arquivo `searchAlbumsAPI.js` contém uma função que faz uma requisição a uma API e retorna os álbuns de uma banda ou artista. Para essa função funcionar, ela recebe como parâmetro uma string, que deve ser o nome da banda ou artista. O retorno dessa função, quando encontra as informações, é um array com cada álbum dentro de um objeto.
  **Atenção:** caso não encontre nenhuma informação da banda ou artista, a API retornará um array vazio.
  </details>
  <details><summary><strong> <code>favoriteSongsAPI.js</code></strong></summary>

  O arquivo `favoriteSongsAPI.js` é responsável por manipular as informações das músicas favoritas. Nele há as funções `getFavoriteSongs`, `addSong` e `removeSong`, que recuperam, adicionam e removem músicas dos favoritos, respectivamente. Assim como nos arquivos anteriores, todas as funções simulam o funcionamento de uma API.

  A função `getFavoriteSongs` retorna um array com as músicas favoritas ou um array vazio, caso não haja nenhuma música.

  A função `addSong` recebe um objeto que representa a música que você quer salvar como favorita e adiciona ao array já existente das músicas que já foram favoritadas.

  A função `removeSong` também recebe um objeto que representa a música que você deseja remover da lista de músicas favoritas.

  **Atenção:** os objetos de música precisam ter a chave `trackId` para que as músicas sejam adicionadas e removidas corretamente.
  </details>
  <details><summary><strong> <code>musicsAPI.js</code></strong></summary>

  O arquivo `musicsAPI.js` contém a função `getMusics` que faz uma requisição a uma API e retorna os as músicas de um álbum. Ela recebe como parâmetro uma string, que deve ser o id do álbum. O retorno dessa função, quando encontra as informações, é um array onde o primeiro elemento é um objeto com informações do álbum e o restante dos elementos são as músicas do álbum.
  **Atenção:** caso não encontre nenhuma informação, a API retornará um array vazio.
  </details>
</details>
