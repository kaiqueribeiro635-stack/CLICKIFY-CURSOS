(function () {
  // UI da Click IA 2.0 (camada de apresentação). A lógica de API fica em api.js.
  function qs(root, sel) {
    return root.querySelector(sel);
  }

  function setStatus(root, text) {
    const el = qs(root, "[data-cia2-status]");
    if (!el) return;
    el.textContent = text || "";
  }

  function setLog(root, value) {
    const el = qs(root, "[data-cia2-log]");
    if (!el) return;
    el.textContent = value || "";
  }

  async function enviarPrompt(root) {
    // Captura + validação do prompt antes de chamar a API.
    const ta = qs(root, "#cia2Prompt");
    const btn = qs(root, "[data-cia2-send]");
    const prompt = String(ta?.value || "").trim();

    if (!prompt) {
      setStatus(root, "Digite um pedido antes de enviar.");
      ta?.focus();
      return;
    }

    if (!window.ClickIA2Api || typeof window.ClickIA2Api.enviarParaAPI !== "function") {
      setStatus(root, "API não configurada. Ajuste API_CONFIG em src/assets/scripts/api.js.");
      return;
    }

    const cfg = window.ClickIA2Api.API_CONFIG || {};
    const url = String(cfg.url || "").trim();
    const key = String(cfg.key || "").trim();
    if (!url || url === "INSERIR_URL_AQUI" || !key || key === "INSERIR_CHAVE_AQUI") {
      setStatus(root, "Configure API_CONFIG (url e key) em src/assets/scripts/api.js.");
      return;
    }

    try {
      if (btn) btn.disabled = true;
      setStatus(root, "Enviando...");

      const data = await window.ClickIA2Api.enviarParaAPI(prompt);
      console.log("[Click IA 2.0] Resposta:", data);
      setLog(root, JSON.stringify(data, null, 2));
      setStatus(root, "Resposta recebida. Veja o console e o painel de saída.");
      alert("Resposta recebida (modo demo). Veja o console.");
    } catch (err) {
      console.error("[Click IA 2.0] Erro:", err);
      setStatus(root, err?.message || "Falha ao enviar para a API.");
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function mount(container, opts) {
    // Renderiza e conecta handlers; preparado para evoluir para histórico de mensagens.
    const onClose = (opts && opts.onClose) || null;

    container.innerHTML = `
      <div class="cia2-shell cia2-fade-in" role="dialog" aria-modal="true" aria-label="Click IA 2.0">
        <div class="cia2-top">
          <div class="cia2-brand">
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="cia2-mark" aria-hidden="true"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <span class="cia2-badge">🚀 Click IA 2.0</span>
            </div>
            <h1 class="cia2-title">Criação automática de sites com IA</h1>
            <p class="cia2-sub">Descreva o que você quer e gere uma estrutura pronta para landing page, funil, e-commerce ou site completo.</p>
          </div>
          <div class="cia2-actions">
            <button type="button" class="cia2-btn ghost" data-cia2-clear><i class="fa-solid fa-eraser" aria-hidden="true"></i> Limpar</button>
            <button type="button" class="cia2-btn" data-cia2-close><i class="fa-solid fa-xmark" aria-hidden="true"></i> Fechar</button>
          </div>
        </div>

        <div class="cia2-main">
          <div class="cia2-card">
            <div class="cia2-form">
              <label class="cia2-label" for="cia2Prompt">Seu pedido</label>
              <textarea
                id="cia2Prompt"
                class="cia2-textarea"
                placeholder="Peça para Click IA criar uma landing page, funil, e-commerce ou site completo com design profissional…"
                aria-describedby="cia2Help"
                spellcheck="false"
              ></textarea>

              <div class="cia2-row">
                <div class="cia2-help" id="cia2Help">Dica: informe público-alvo, oferta, tom de voz, cores e seções desejadas.</div>
                <button type="button" class="cia2-btn primary" data-cia2-send>
                  <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                  Enviar
                </button>
              </div>

              <div class="cia2-status" role="status" aria-live="polite" data-cia2-status>Pronto.</div>
            </div>
          </div>

          <div class="cia2-card cia2-side">
            <h3>Saída (JSON)</h3>
            <div class="cia2-kv">
              <div class="item">
                <div class="k">Endpoint</div>
                <div class="v" data-cia2-endpoint>INSERIR_URL_AQUI</div>
              </div>
              <div class="item">
                <div class="k">Modo</div>
                <div class="v">POST + Bearer</div>
              </div>
            </div>
            <div class="cia2-log" data-cia2-log aria-label="Saída da API"></div>
          </div>
        </div>
      </div>
    `;

    const root = container;
    const closeBtn = qs(root, "[data-cia2-close]");
    const clearBtn = qs(root, "[data-cia2-clear]");
    const sendBtn = qs(root, "[data-cia2-send]");
    const endpoint = qs(root, "[data-cia2-endpoint]");

    if (endpoint && window.ClickIA2Api && window.ClickIA2Api.API_CONFIG) {
      endpoint.textContent = window.ClickIA2Api.API_CONFIG.url || "INSERIR_URL_AQUI";
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (typeof onClose === "function") onClose();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        const ta = qs(root, "#cia2Prompt");
        if (ta) ta.value = "";
        setLog(root, "");
        setStatus(root, "Pronto.");
        ta?.focus();
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        enviarPrompt(root);
      });
    }

    const ta = qs(root, "#cia2Prompt");
    ta?.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        enviarPrompt(root);
      }
    });

    setTimeout(() => ta?.focus(), 30);

    return {
      destroy: function () {
        container.innerHTML = "";
      },
    };
  }

  window.ClickIA2 = {
    mount,
    enviarPrompt,
  };
})();
