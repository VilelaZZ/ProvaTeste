# TaskFlow (mobile)

App Expo (React Native + expo-router) que lista tarefas, mostra os detalhes e altera o status
consumindo a API Java via Axios.

## Rodando

```bash
npm install
cp .env.example .env      # ajuste EXPO_PUBLIC_API_URL (veja abaixo)
npx expo start -c
```

## Telas e navegação

| Rota          | Arquivo                    | O que faz                                              |
| ------------- | -------------------------- | ------------------------------------------------------ |
| `/`           | `src/app/index.tsx`        | Lista, filtro por status, progresso, puxar p/ atualizar |
| `/tasks/[id]` | `src/app/tasks/[id].tsx`   | Detalhes + alteração de status                          |

Navegação: `Link` (lista → detalhes), botão voltar do header e `router.replace('/')` como saída
quando não há tela anterior. A lista recarrega ao voltar dos detalhes (`useFocusEffect`).

## 🔌 Onde conectar o backend

Procure por `🔌 BACKEND` no código. São só 3 arquivos:

1. **`.env`** → `EXPO_PUBLIC_API_URL` (URL base da API).
2. **`src/services/tasks.ts`** → caminhos dos endpoints, campos do JSON (`TaskDto`) e `mapTask`.
3. **`src/constants/task-status.ts`** → nomes do enum de status do Java (`API_STATUS`).

Contrato assumido (ajustável nos arquivos acima):

| Ação              | Requisição                                  | Resposta                                   |
| ----------------- | ------------------------------------------- | ------------------------------------------ |
| Listar            | `GET /tasks`                                | `[Task]` ou página Spring `{ content: [] }` |
| Detalhar          | `GET /tasks/{id}`                           | `Task`                                      |
| Alterar status    | `PATCH /tasks/{id}/status` `{ "status" }`   | `Task` atualizada (ou `204`)                |

```json
{ "id": 1, "title": "Escrever relatório", "description": "…", "status": "IN_PROGRESS",
  "createdAt": "2026-11-17T10:00:00", "dueDate": "2026-11-20" }
```

## Dicas de rede

- Celular físico: use o IP da máquina (não `localhost`) e a mesma rede Wi-Fi.
- Emulador Android: `http://10.0.2.2:8080`.
- Spring Boot precisa de CORS liberado apenas para a versão **web** do Expo.
- Build de produção Android bloqueia `http://`: use HTTPS ou habilite `usesCleartextTraffic`
  (`expo-build-properties`).
