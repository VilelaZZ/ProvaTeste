# TaskFlow — Sistema de Gerenciamento de Tarefas

O **TaskFlow** é uma aplicação Full Stack para gerenciamento de tarefas, desenvolvida com Java Spring Boot, Angular e Expo (React Native).

O projeto possui uma API REST compartilhada entre as aplicações Web e Mobile, permitindo cadastrar, consultar, atualizar e excluir tarefas, além de alterar seus status.

## Tecnologias utilizadas

- **Backend:** Java 21, Spring Boot, Spring Data JPA e H2.
- **Frontend Web:** Angular e TypeScript.
- **Frontend Mobile:** Expo, React Native e TypeScript.
- **Comunicação:** API REST utilizando HTTP e JSON.
- **Mobile:** Axios para comunicação com a API.

## Estrutura do projeto

```text
ProvaTeste/
├── backend/
│   └── provateste/
├── frontend-web/
├── frontend-mobile/
├── README.md
└── .gitignore
```

## Requisitos para executar o projeto

Antes de iniciar, instale:

- Java 21 ou superior.
- Node.js e npm.
- Git.
- Expo Go no celular, caso queira executar o aplicativo em um dispositivo físico.

## 1. Clonar o repositório

```bash
git clone https://github.com/VilelaZZ/ProvaTeste.git
cd ProvaTeste
```

## 2. Iniciar o Backend

O backend foi desenvolvido com Java e Spring Boot e disponibiliza a API REST utilizada pelas aplicações Web e Mobile.

Acesse a pasta:

```bash
cd backend/provateste
```

Execute o projeto:

**Git Bash / Linux / macOS:**

```bash
./mvnw spring-boot:run
```

**Windows CMD:**

```cmd
mvnw.cmd spring-boot:run
```

O backend será iniciado em:

```text
http://localhost:8080
```

### Banco de dados H2

O projeto utiliza o banco de dados H2 em memória.

Para acessar o console do banco, abra:

```text
http://localhost:8080/h2-console
```

Configurações de conexão:

| Configuração | Valor |
|---|---|
| JDBC URL | `jdbc:h2:mem:taskflowdb` |
| User Name | `sa` |
| Password | Deixar vazio |

**Importante:** como o banco é em memória, os dados são perdidos quando o backend é encerrado ou reiniciado.

## 3. Iniciar o Frontend Web (Angular)

Abra outro terminal na pasta raiz do projeto e acesse:

```bash
cd frontend-web
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npx ng serve
```

O Angular ficará disponível em:

```text
http://localhost:4200
```

A aplicação utiliza a API do backend no endereço:

```text
http://localhost:8080/api/tarefas
```

**Importante:** mantenha o backend em execução enquanto utiliza a aplicação Web.

## 4. Iniciar o aplicativo Mobile (Expo)

Abra outro terminal na pasta raiz do projeto e acesse:

```bash
cd frontend-mobile
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Para executar no navegador:

```bash
npx expo start --web
```

Para executar no celular:

1. Instale o aplicativo Expo Go no dispositivo.
2. Conecte o celular e o computador à mesma rede Wi-Fi.
3. Execute `npx expo start` no terminal.
4. Escaneie o QR Code exibido pelo Expo utilizando o Expo Go.

## 5. Configuração de rede para acessar a API pelo celular

Quando o aplicativo é executado em um celular físico, o endereço `localhost` não representa o computador. Ele representa o próprio dispositivo.

Por isso, é necessário utilizar o endereço IP local do computador onde o backend está sendo executado.

### Descobrir o IP do computador

No Windows, abra o terminal e execute:

```bash
ipconfig
```

Procure pelo endereço IPv4 da conexão Wi-Fi. Exemplo:

```text
192.168.1.100
```

### Configurar a URL da API

Dentro da pasta `frontend-mobile`, crie um arquivo chamado `.env`:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:8080
```

Substitua `192.168.1.100` pelo endereço IPv4 real do computador.

Depois, reinicie o Expo:

```bash
npx expo start --clear
```

### Atenção às configurações de rede

Para que o celular consiga acessar o backend:

- O computador e o celular devem estar conectados à mesma rede Wi-Fi.
- O backend deve estar em execução na porta `8080`.
- O Firewall do Windows deve permitir conexões de entrada na porta `8080`.
- O endereço IP configurado no `.env` deve ser o IP local correto do computador.
- Caso o IP do computador mude, atualize o arquivo `.env`.

Se necessário, permita o acesso do Java pelo Firewall do Windows para redes privadas.

### Endereços utilizados conforme o ambiente

| Ambiente | URL da API |
|---|---|
| Expo Web | `http://localhost:8080` |
| Android Emulator | `http://10.0.2.2:8080` |
| Celular físico | `http://IP_DO_COMPUTADOR:8080` |

O projeto já possui uma URL alternativa para Android Emulator e localhost. A variável `EXPO_PUBLIC_API_URL` permite configurar o endereço conforme o ambiente.

## 6. Endpoints da API

A API disponibiliza as seguintes operações:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/tarefas` | Lista todas as tarefas |
| GET | `/api/tarefas/{id}` | Busca uma tarefa pelo ID |
| POST | `/api/tarefas` | Cadastra uma tarefa |
| PUT | `/api/tarefas/{id}` | Atualiza uma tarefa |
| PATCH | `/api/tarefas/{id}/status` | Atualiza o status |
| DELETE | `/api/tarefas/{id}` | Exclui uma tarefa |

### Campos da tarefa

| Campo | Descrição |
|---|---|
| id | Identificador automático |
| titulo | Título obrigatório |
| descricao | Descrição opcional |
| responsavel | Responsável obrigatório |
| status | Situação da tarefa |
| prioridade | Prioridade da tarefa |

**Status disponíveis:**
- `PENDENTE`
- `EM_ANDAMENTO`
- `CONCLUIDA`

**Prioridades disponíveis:**
- `BAIXA`
- `MEDIA`
- `ALTA`

## 7. Executar o projeto completo

Para utilizar o sistema, mantenha três terminais abertos:

**Terminal 1 — Backend**

```bash
cd backend/provateste
./mvnw spring-boot:run
```

**Terminal 2 — Angular**

```bash
cd frontend-web
npx ng serve
```

**Terminal 3 — Expo**

```bash
cd frontend-mobile
npx expo start
```

Com os três serviços em execução:

- Backend: `http://localhost:8080`
- Angular: `http://localhost:4200`
- Expo Web: disponível pelo endereço apresentado no terminal do Expo.

## 8. Integração entre as aplicações

As aplicações Web e Mobile utilizam a mesma API REST e compartilham os dados armazenados no banco H2 do backend.

O fluxo de integração funciona da seguinte maneira:

1. Uma tarefa é cadastrada ou alterada por uma aplicação.
2. A aplicação envia uma requisição HTTP para o backend.
3. O backend processa a requisição e atualiza o banco de dados.
4. A outra aplicação consulta a API e recebe os dados atualizados.

Dessa forma, uma tarefa cadastrada em uma aplicação pode ser consultada na outra, desde que ambas estejam conectadas ao mesmo backend.

---

**TaskFlow — Gerenciamento de tarefas integrado entre Web e Mobile.**
