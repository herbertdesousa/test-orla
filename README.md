# Teste Orla
Sou Herbert e essa é minha implementação do desafio. A arquitura da aplicação é uma mistura de <u>MVVM</u> com <u>Clean Archicture</u> herdados do Android Nativo com Kotlin, onde é comumente usado.

[x] create view
[x] update
  [x] logic
  [x] view
[x] delete
  [x] logic
  [x] view
[] search
  [] logic
  [] view
[] localstorage
[] readme

add 'como rodar o projeto'
  explicar o --force
  rodar teste com --clear
add 'requisitos de negocio'
add 'features'
  cache
  arquitetura
    serialização de dados externa com validação
    inspirações de outros lugares
      result - sealed class em kotlin
      exception handler decorator
    in memory database - demostrando desacoplação de serviços
add 'melhorias a ser feitas'
  injeção de depencia na mão, talvez um tsyringe

## Camadas

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
