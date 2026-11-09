# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Fluxo de conta (protótipo)

O cadastro, login, perfil e solicitações de aluguel deste protótipo ficam no `localStorage` do navegador. As senhas são armazenadas como hashes PBKDF2, mas a autenticação continua sendo controlada pelo cliente e não deve ser usada em produção. Para isso, substitua o armazenamento local por uma API com validação e sessão no servidor.

Para testar, abra `/frota`, escolha **Ver detalhes**, crie uma conta e confirme que o app retorna ao veículo escolhido. O botão **Alugar** cria uma solicitação local, disponível em **Minha conta > Minhas reservas**. A sessão e os dados ficam restritos ao mesmo navegador.
