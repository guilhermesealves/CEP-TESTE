# Consulta CEP com React

Projeto em **React** para consultar informações de endereço a partir de um **CEP**, utilizando a API do [ViaCEP](https://viacep.com.br/).  
O sistema valida automaticamente o CEP e exibe os dados completos do endereço.


---

Você pode testar em https://cep-teste.vercel.app/

---

## 📌 Funcionalidades

- Consulta CEP e retorna **logradouro, bairro, cidade e estado** automaticamente.  
- Validação de CEP para **apenas números e exatamente 8 dígitos**.  
- Atualização automática ao alterar o CEP.  
- Mensagem de erro caso o CEP seja inválido ou inexistente.  

---

## 🎨 Layout

### Tela inicial
![Layout inicial do buscador de CEP](https://github.com/user-attachments/assets/1fd54b96-2a57-4f6a-8c20-767df7d54686)

### Resultado da consulta
![Resultado da consulta de CEP](https://github.com/user-attachments/assets/effe4388-ac92-46a7-b58f-39621312f263)

### Atualização automática ao alterar o CEP
![Atualização automática do endereço](https://github.com/user-attachments/assets/5ddf7c39-617a-4804-a64d-29fd55c0c4b7)

### Mensagem de erro
![Mensagem de erro para CEP inválido](https://github.com/user-attachments/assets/024c6dd2-5e26-481b-9bbb-4f4c38f71622)

---

## 🚀 Tecnologias utilizadas

- [React](https://reactjs.org/)  
- [React Hook Form](https://react-hook-form.com/)  
- [ViaCEP API](https://viacep.com.br/)  
- CSS puro para estilização  

---

## 💻 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/guilhermesealves/CEP-TESTE
```
Entre na pasta do projeto:
```bash
cd nome-do-repositorio
```
Instale as dependências:
```bash
npm install

```

## ⚡ Uso

- Digite um **CEP válido** (apenas números).  
- Clique no botão **"Consultar CEP"** ou pressione **Enter**.  
- Os campos de endereço serão preenchidos automaticamente.  
- Caso o CEP seja inválido ou incompleto, uma **mensagem de erro** será exibida.  
- Para limpar o formulário, clique em **"Limpar"**.  

---

## 📝 Observações

- O campo CEP **aceita somente números** e deve ter exatamente 8 dígitos.  
- A API usada é gratuita e não requer autenticação.  
- Ideal para **portfólio ou projetos de aprendizado** em React.  

```
Rode o projeto:
```bash
npm start
