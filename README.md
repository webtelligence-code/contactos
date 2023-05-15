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

Para alterar os endereços de **API** quando for realizado o **deployment**, abra a raíz do projeto procure o ficheiro **App.js** presente na pasta **/src**.\
Depois deverá alterar o endereço **BASE_URL** para o endereço do servidor onde vai ser feito o deployment e **API_BASE_URL** para o endereço do servidor onde vai estar os ficheiros da **API** (Deverá apontar para o caminho onde os ficheiros vão estar presentes no servidor).

![App.js](https://webtelligence.pt/contactos/assets/github/App.jpg)

Também deverá alterar a **homepage** no **package.json** para o endereço onde a aplicação vai ser servida. Por exemplo, se a plataforma for servida em **('dominio.pt/contactos')** deverá alterar o valor para **/contactos**

![package.json](https://webtelligence.pt/contactos/assets/github/package.jpg)

Ao alterar algumas destas propriedades deverá correr o comando **npm run build** para as mudanças tomarem efeito quando for realizar o deployment.\

## Ficheiros PHP (Server Side)

Se alterar a raíz do código nos ficheiros **PHP** não necessita de correr o comando **npm run build** para as mudaças tomarem efeito. Os ficheiros Back-end são independentes dos ficheiros Front-end (React).

# Alterar o caminho das fotos de perfil (Avatar)

Para alterar o caminho das fotos de perfil dos trabalhadores, na pasta do projeto dentro de **/src/components/profile** abra o ficheiro **WorkerImage.js** e altere o caminho onde as fotos de perfil estão presentes no servidor.\
Por default o endereço aponta para (dominio.pt/contactos/workers/{username}/{username}.webp).

![WorkerImage.js](https://webtelligence.pt/contactos/assets/github/WorkerImage.jpg)

Também deverá alterar o endereço no componente **ModalAvatarEdit.js** para o endereço respetivo do servidor

![ModalAvatarEdit.js](https://webtelligence.pt/contactos/assets/github/ModalAvatarEdit.jpg)