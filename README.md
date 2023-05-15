# Como começar com o projeto React

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).

## Comandos do terminal disponíveis

Na raíz do projeto ('/contactos') pode correr os seguintes comandos:

### `npm start`

Corre a plataforma em modo desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para ver a plataforma no browser.

A página vai atualizar cada vez que fizer alterações na raíz do código.\
Também consegue visualizar erros na consola do terminal.

### `npm run build`

Compila o projeto para produção na pasta ('/build') na raíz do projeto.\
Compila o bundle React e Otimiza a plataforma para o modo produção.

A build é minificado e os nomes dos ficheiros utilizam os hashes.
A plataforma está pronta para deployment

Ver a secção [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informação.

# Alterar os endereços de ficheiros e de API 

Para alterar os endereços de **API** quando for realizado o **deployment** deverá alterar os endereços 
**BASE_URL** para o endereço do servidor onde vai ser feito o deployment e **API_BASE_URL** para o endereço do servidor onde vai estar os ficheiros da **API** (Por default está dentro da pasta **api** na **raíz do projeto**).

![App.js](https://webtelligence.pt/contactos/assets/github/App.jpg)

Também deverá alterar a **homepage** no **package.json** para o endereço onde a aplicação vai ser servida. Por exemplo, se a plataforma for servida em **('dominio.pt/contactos')** deverá alterar o valor para **/contactos**

![package.json](https://webtelligence.pt/contactos/assets/github/package.jpg)

Ao alterar algumas destas propriedades deverá correr o comando **npm run build** para as mudanças tomarem efeito quando for realizar o deployment.\

## Ficheiros PHP (Server Side)

Se alterar a raíz do código nos ficheiros **PHP** não necessita de correr o comando **npm run build** para as mudaças tomarem efeito. Os ficheiros Back-end são independentes dos ficheiros Front-end (React).