# Teste Orla
Sou Herbert e essa é minha implementação do desafio. A arquitura da aplicação é uma mistura de <u>MVVM</u> com <u>Clean Archicture</u> herdados do Android Nativo com Kotlin, onde é comumente usado.

1. [Rodando o Projeto](#StartUp)
2. [Arquitetura](#Arquitetura)
3. [Features](#Features)

## StartUp
### Rodando o Projeto
Para rodar o projeto execute:
```
npm run install --force
```
a flat *force* é usada temporáriamente, a atual versão do react 18.2.0 é "incompatível" com a styled-componentes "6.1.11".
```
npm run android | ios
```
para rodar em seu dispositivel ou em um emulador.

### Rodando os Testes
Para rodar a cobertura de testes unitários:
```
npm run test
```

## Arquitetura

### Data Layer
Camada de dados da aplicação, toda interação com <u>APIs externas, Fonte de dados,
modelos de dados externos</u> e etc

**Datasource**
<u>Fonte de dados</u>, onde é chamado as APIs externas, como o InMemoryDatabase por exemplo, podendo ter ou não um <u>contrato</u> caso tenha mais de uma <u>implementação</u>.

**Model**
<u>Formato do dado</u>, esse formato feito com algum trabalho de <u>serialização</u> evitando que a fonte externa esteja diferente da tipagem evitando problemas em <u>runtime</u>.

**Repositories**
Onde ocorre a <u>chamada das diferentes fonte de dados</u> relacionadas a um domínio em específico, um exemplo seria uma chamada a API Backend e um outro serviço de BaaS como Firebase na autenticação de um usuário.

### Domain Layer
Camada de <u>Regras de Negócio da Aplicação</u> onde testes deve ser de maior foco por justamente testar as funcionalidades da aplicação sem interfêrencia de dados externos ou UI.

**Entites**
<u>Formato de dado</u> da aplicação. Separar **entity** de **model** permite que os dados vindo de uma api sejam diferentes dos dados dentro da aplicação, sendo mais desacoplável.
Além do mais, na maioria das vezes as **entities** possuem um *serializer* ou *deserializer* da model.

**UseCases**
Nas **UseCases** são onde efetivamente as regras de negócios são feitas, regras de criar de algum dado, sign-in na autenticação, validação de formulário...

### View Layer

**Components** Pasta de componentes comuns, como Input, Buttons...

**Screens** Telas da aplicação

## Features
### Cache
Na camada de **dados** em **repositories**, um datasource de cache em implementado em memory com invalidação ao criar, atualizar ou deletar algum dado.

### Serialização de Dados
Typescript vem com o propósito de melhorar o problema de tipagem fraca do Javascript, porém ele não atua em runtime, para isso foi aplicado o **zod** para validar e **serializar o dados** de fontes externas ainda na camada de dados.

### Lidando com Errors
A ideia central é evitar que dados externos **quebrem** a aplicação e para orquestrar os erros duas *features* com inspiração no android nativo foi implementado:
- **Result**: baseado em **sealed class** do Kotlin e adaptado para o Typescript.
- **ExceptionHandler**: Decorator que pega qualquer possível erro e resulta em um erro tratado.
