
# 🎓 Fatec Centro Paula Souza, Jacareí - 3º DSM 2024

<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">DATA SOLUTIONS GROUP</h2>
</p>

> Status: Development
> 
![Code Quality](https://img.shields.io/badge/code%20quality-A%20%2B-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 💻  Sobre o Projeto:

Este é um aplicativo web desenvolvido em **React** que ajuda os usuários a monitorar sua ingestão diária de nutrientes, auxiliando na manutenção de uma dieta equilibrada e saudável. Ideal para quem deseja acompanhar o consumo de alimentos e garantir a ingestão correta de nutrientes essenciais.

## 📋 Funcionalidades:

- **Interface Amigável:** Fácil navegação para acompanhar a ingestão de nutrientes.
- **Metas Nutricionais Personalizadas:** Definição de metas específicas para diferentes nutrientes (por exemplo, proteínas, carboidratos, vitaminas).
- **Banco de Dados de Alimentos:** Pesquisa e registro de alimentos com informações nutricionais detalhadas.
- **Visualização do Progresso:** Gráficos e resumos para acompanhar o desempenho ao longo do tempo.
- **Sugestões de Receitas:** Receitas personalizadas com base nas necessidades nutricionais do usuário.

## 📑 Pré-requisitos:

- **Node.js** (v14 ou superior)
- **React** (v17 ou superior)
- **TypeScript** (para segurança de tipos)
- **MongoDB** (v4.4 ou superior)
  
## Front-End - React ⚛️

A interface web foi desenvolvida utilizando **React** com **TypeScript**, oferecendo uma experiência de usuário moderna e responsiva.

- **React Router** para a navegação entre páginas.
- **Axios** para fazer requisições à API do servidor.
- **Styled Components** para estilização e design da interface.

## Back-End (Node.js e Express)

O back-end é construído utilizando **Node.js** com **Express** e interage com o banco de dados **MongoDB** para armazenar e gerenciar dados nutricionais.

- **Mongo Atlas** banco de dados nuvem, para garantir segurança no projeto.
- **Mongoose** para manipular dados no MongoDB.
- **Autenticação** com JWT para garantir a segurança das sessões de usuários.

## Estrutura de Pastas

```bash
├── client              # Aplicação web React
│   ├── src
│   └── public
├── server              # Back-end Express
│   ├── controllers     # Controladores da API
│   ├── models          # Modelos do MongoDB
│   ├── routes          # Rotas da API
│   └── middleware      # Middleware de autenticação
└── .env                # Variáveis de ambiente
```

## 📊 Tecnologias Utilizadas

- **React** (front-end)
- **TypeScript** (front-end)
- **MongoDB** (banco de dados)
- **Express.js** (back-end)
- **Node.js** (runtime)

## 💡 Melhorias Futuras

- **Relatórios Nutricionais Avançados:** Análises detalhadas para melhor acompanhamento da dieta.
- **Sugestões com IA:** Recomendação de alimentos baseada em hábitos alimentares.
- **Integração com Apps de Saúde:** Sincronização com aplicativos de fitness para monitoramento mais completo.

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja o nosso [Guia de Contribuição](CONTRIBUTING.md) para mais detalhes sobre como começar.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🧑‍💻 Autores

| Função            | Nome              | LinkedIn                                                     | GitHub                                                      |
|-------------------|-------------------|--------------------------------------------------------------|-------------------------------------------------------------|
| SCRUM MASTER      | Fillipe Pereira Bueno de Almeida  | [![LinkedIn](https://img.icons8.com/ios-filled/50/000000/linkedin.png)](https://www.linkedin.com/in/fillipe-almeida-46017025b) | [![GitHub](https://img.icons8.com/ios-filled/50/000000/github.png)](https://github.com/FPbueno) |
| PRODUCT OWNER     | Isaac Souza Santos  | [![LinkedIn](https://img.icons8.com/ios-filled/50/000000/linkedin.png)](https://www.linkedin.com/in/nome) | [![GitHub](https://img.icons8.com/ios-filled/50/000000/github.png)](https://github.com/nome) |
| DEV TEAM          | Tiago Santini Da Silva  | [![LinkedIn](https://img.icons8.com/ios-filled/50/000000/linkedin.png)](https://www.linkedin.com/in/tiago-santini-da-silva-b545752a6) | [![GitHub](https://img.icons8.com/ios-filled/50/000000/github.png)](https://github.com/TiagoSan23) |
| DEV TEAM          | Renan Ming Han  | [![LinkedIn](https://img.icons8.com/ios-filled/50/000000/linkedin.png)](https://www.linkedin.com/in/renan-ming-) | [![GitHub](https://img.icons8.com/ios-filled/50/000000/github.png)](https://github.com/MingRenan) |





# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
