<h1 align="center" style="font-weight: bold;">Salve o amigo!</h1>

<p align="center">
    <img src="Salve o amigo!/JogosHTML5/jogo1/imgs/project_imgs/logo.png" alt="logo" width="400px">
</p>

[JAVASCRIPT__BADGE]: https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript
[HTML__BADGE]: https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[JQUERY__BADGE]: https://img.shields.io/badge/jQuery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white
[CSS__BADGE]: https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Iniciando</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Colaboradores</a> •
 <a href="#contribute">Contribua</a>
</p>

<p align="center">
    <b>Este é o Salve o Amigo! Um pequeno jogo que consiste em derrotar os inimigos e salvar um pequeno amigo da zona de batalha! Desenvolvido para treinar lógica de programação.</b>
</p>

<h2 id="layout">🎨 Preview</h2>

<p align="center">
    <img src="Salve o amigo!/JogosHTML5/jogo1/imgs/project_imgs/Salve o amigo.gif" alt="gif" width="600px">
</p>

<h2 id="technologies">💻 Tecnologias</h2>

<div>

![javascript][JAVASCRIPT__BADGE]
![HTML][HTML__BADGE]
![jQuery][JQUERY__BADGE]
![CSS][CSS__BADGE]

</div>

<h2 id="started">🚀 Iniciando</h2>

<h3>Pré-requisitos</h3>

Lista dos pré-requisitos. Exemplos:

- [Vscode]
- [Git]
- [Navegador (De preferência o Chrome)]

<h3>Clonando</h3>

```bash
git clone url-do-seu-projeto-no-github
```

<h3>Configurando as variáveis do .env</h2>

Use o `.env.example` como referência para criar seu arquivo de configuração `.env` com suas credenciais da AWS

```yaml
NODE_AWS_REGION=us-east-1
NODE_AWS_KEY_ID={YOUR_AWS_KEY_ID}
NODE_AWS_SECRET={YOUR_AWS_SECRET}
```

<h3>Executando</h3>

Como iniciar o seu projeto

```bash
cd project-name
npm some-command-to-run
```

<h2 id="routes">📍 API Endpoints</h2>

Aqui você pode listar as principais rotas da sua API e quais são os corpos de requisição esperados.

| rota                          | descrição                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| <kbd>GET /authenticate</kbd>  | retorna as informações do usuário, veja os [detalhes da resposta](#get-auth-detail) |
| <kbd>POST /authenticate</kbd> | autentica o usuário na API, veja os [detalhes da requisição](#post-auth-detail)     |

<h3 id="get-auth-detail">GET /authenticate</h3>

**RESPOSTA**

```json
{
  "name": "Joao Victor",
  "age": 22,
  "email": "his-email@gmail.com"
}
```

<h3 id="post-auth-detail">POST /authenticate</h3>

**REQUISIÇÃO**

```json
{
  "username": "joaovictor",
  "password": "4444444"
}
```

**RESPOSTA**

```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```

<h2 id="colab">🤝 Colaboradores</h2>

Um agradecimento especial a todas as pessoas que contribuíram para este projeto.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/98715957?v=4" width="100px;" alt="Foto de perfil da Fernanda Kipper"/><br>
        <sub>
          <b>João Victor</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://t.ctcdn.com.br/n7eZ74KAcU3iYwnQ89-ul9txVxc=/400x400/smart/filters:format(webp)/i490769.jpeg" width="100px;" alt="Foto do Elon Musk"/><br>
        <sub>
          <b>Elon Musk</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://miro.medium.com/max/360/0*1SkS3mSorArvY9kS.jpg" width="100px;" alt="Foto do Steve Jobs"/><br>
        <sub>
          <b>Steve Jobs</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribua</h2>

Aqui você vai explicar como outros desenvolvedores podem contribuir com o seu projeto. Por exemplo, explicando como criar suas branches, quais padrões seguir e como abrir um pull request

1. `git clone https://github.com/Fernanda-Kipper/text-editor.git`
2. `git checkout -b feature/NOME`
3. Siga os padrões de commit
4. Abra um Pull Request explicando o problema resolvido ou a funcionalidade criada e, se houver, anexe screenshots das modificações visuais e aguarde a revisão!

<h3>Documentações que podem ajudar</h3>

[📝 Como criar um Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Padrão de commit](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
