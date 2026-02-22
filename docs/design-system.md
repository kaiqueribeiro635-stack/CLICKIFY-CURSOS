# Clickify Design System

## Componente: Botão de Visibilidade (Olhinho)

**Objetivo**

Alternar a visualização de valores sensíveis (ex.: valores de vendas) sem recarregar a página.

**Markup**

```html
<button class="icon-btn visibility-toggle" id="vendasVisibilityBtn" type="button"
  aria-label="Clicar para Esconder" title="Clicar para Esconder" aria-pressed="false">
  <i class="fa-solid fa-eye vt-ico vt-ico--show" aria-hidden="true"></i>
  <i class="fa-solid fa-eye-slash vt-ico vt-ico--hide" aria-hidden="true"></i>
  <span class="sr-only" id="vendasVisLabel">Clicar para Esconder</span>
</button>
```

**Contrato de comportamento**

- `aria-pressed="false"`: valores visíveis; rótulo indica ação “Esconder”.
- `aria-pressed="true"`: valores mascarados; rótulo indica ação “Mostrar”.
- Persistência: estado salva em `localStorage` usando a chave `vendas_masked` (`"1"`/`"0"`).
- Seletores mascarados:
  - Coluna de valor da tabela de vendas (coluna 7 / índice 6)
  - Elementos com `.sensitive-value`, `.maskable`, `[data-sensitive="true"]` e `#saldoValue`

**Acessibilidade**

- Deve manter `aria-label`, `title` e o texto do `.sr-only` sempre sincronizados com o estado.
- Deve responder a clique e teclado (`Enter` e `Space`).
