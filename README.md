# 🍕 Pizzaria App

Aplicativo mobile para gestão de pedidos em uma pizzaria, desenvolvido com React Native e Expo. Permite criar, visualizar e gerenciar pedidos de forma simples e eficiente.

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [React Navigation](https://reactnavigation.org/)
- [Feather Icons](https://feathericons.com/) via [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- [Node.js](https://nodejs.org/) (Backend - não incluído neste repositório)

## 📱 Funcionalidades

- Seleção de categoria e produto
- Adição de itens ao pedido com quantidade
- Visualização de itens adicionados
- Remoção de itens do pedido
- Finalização e envio do pedido

## 📦 Estrutura do Projeto

```
pizzaria-app/
├── assets/
├── src/
│   ├── components/
│   │   ├── ListItem.tsx
│   │   ├── ModalPicker.tsx
│   │   └── ProductModalPicker.tsx
│   ├── pages/
│   │   ├── Order/
│   │   │   └── index.tsx
│   │   └── FinishOrder/
│   │       └── index.tsx
│   ├── routes/
│   │   └── app.routes.tsx
│   └── services/
│       └── api.ts
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```

## ⚙️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/chicomelo/pizzaria-app.git
   cd pizzaria-app
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o projeto:

   ```bash
   npx expo start
   ```

   O Expo abrirá uma interface no navegador. Você pode escanear o QR code com o aplicativo Expo Go no seu dispositivo móvel ou usar um emulador.

## 📝 Observações

- O backend (API) não está incluído neste repositório. Certifique-se de configurar a URL da API no arquivo `src/services/api.ts` conforme necessário.
- As imagens dos produtos (banners) são carregadas via URLs externas.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
