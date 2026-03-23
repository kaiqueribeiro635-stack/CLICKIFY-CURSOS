# Click IA 2.0 — UI (SaaS Premium)

## Objetivo
Implementar uma interface central de geração de sites por IA (Click IA 2.0) com estética SaaS premium, minimalista e tecnológica.

## Regras obrigatórias
- Não exibir menções a serviços/modelos externos (ex.: “Claude”, “Cloud”, “Lovable”).
- Exibir somente a marca: “Click IA 2.0”.
- Badge superior: “🚀 Click IA 2.0”.
- Placeholder principal:
  - “Peça para Click IA criar uma landing page, funil, e-commerce ou site completo com design profissional…”

## UI/UX
- Fundo: gradiente escuro moderno (azul profundo → grafite) com glow central suave.
- Card: glassmorphism (branco translúcido + blur), borda arredondada, sombra profunda, animação de entrada.
- Campo: textarea (120–150px), sem redimensionamento manual, foco com borda azul neon e ring.
- Botão: gradiente azul moderno, hover com leve elevação.

## Arquitetura de código
- `api.js`: encapsula URL/chave e fornece `enviarParaAPI(prompt)` com POST JSON `{ prompt }` e `Authorization: Bearer`.
- `click-ia.js`: expõe `enviarPrompt()` e lida com validação/estado/feedback.
- CSS separado: estilos base e efeitos/animações.

## Responsividade e acessibilidade
- Layout centralizado e fluido; quebra em mobile com tamanhos responsivos.
- Controles com `label` e estados via `aria-*`.
- Respeitar `prefers-reduced-motion`.

## Evolução futura
- Preparar estrutura para histórico de mensagens (lista/estado), sem acoplamento à API.
