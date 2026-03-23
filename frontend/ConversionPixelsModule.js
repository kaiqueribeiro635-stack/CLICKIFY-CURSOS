(function () {
  const DRAFT_KEY_DEFAULT = 'draftProductConfig';
  const PLATFORMS = ['facebook', 'google_ads', 'google_analytics', 'tiktok', 'kwai', 'pinterest'];

  function pxUid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function safeJsonParse(raw) {
    try {
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function getProductIdFromUrl() {
    try {
      const u = new URL(window.location.href);
      return u.searchParams.get('productId') || u.searchParams.get('id') || '';
    } catch (_) {
      return '';
    }
  }

  function normalizeInt(v, fallback) {
    const n = Number(String(v ?? '').replace(/[^\d-]/g, ''));
    if (!Number.isFinite(n)) return fallback;
    return Math.max(0, Math.min(999, Math.trunc(n)));
  }

  function buildDefaultState() {
    const pixels = {};
    PLATFORMS.forEach((p) => (pixels[p] = []));
    return {
      activePlatform: 'facebook',
      pixels,
      settings: {
        purchasePixEnabled: false,
        pixConversionValue: 100,
        purchaseBoletoEnabled: false,
        boletoConversionValue: 100,
        disableOrderBumps: false,
      },
    };
  }

  function loadFromDraft(draftKey) {
    const raw = localStorage.getItem(draftKey);
    const d = raw ? safeJsonParse(raw) : null;
    const base = buildDefaultState();
    if (!d || typeof d !== 'object') return base;

    const cp = d.conversionPixels;
    if (cp && typeof cp === 'object') {
      PLATFORMS.forEach((p) => {
        if (Array.isArray(cp[p])) {
          base.pixels[p] = cp[p].map((x) => ({
            id: x && x.id ? String(x.id) : pxUid(),
            pixelId: x && x.pixelId ? String(x.pixelId) : '',
            domain: x && x.domain ? String(x.domain) : '',
          }));
        }
      });
    }

    const st = d.conversionPixelSettings;
    if (st && typeof st === 'object') {
      base.settings.purchasePixEnabled = Boolean(st.purchasePixEnabled);
      base.settings.pixConversionValue = normalizeInt(st.pixConversionValue, 100);
      base.settings.purchaseBoletoEnabled = Boolean(st.purchaseBoletoEnabled);
      base.settings.boletoConversionValue = normalizeInt(st.boletoConversionValue, 100);
      base.settings.disableOrderBumps = Boolean(st.disableOrderBumps);
    }

    return base;
  }

  function persistToDraft(draftKey, state) {
    const raw = localStorage.getItem(draftKey);
    const prev = raw ? safeJsonParse(raw) : null;
    const next = prev && typeof prev === 'object' ? prev : {};
    next.conversionPixels = state.pixels;
    next.conversionPixelSettings = state.settings;
    localStorage.setItem(draftKey, JSON.stringify(next));
  }

  function makeApiBase() {
    return '/api';
  }

  function buildDbRows(productId, state) {
    const rows = [];
    PLATFORMS.forEach((platform) => {
      (state.pixels[platform] || []).forEach((x) => {
        rows.push({
          product_id: productId,
          platform,
          pixel_id: String(x.pixelId || '').trim(),
          domain: String(x.domain || '').trim(),
          purchase_pix_enabled: state.settings.purchasePixEnabled,
          pix_conversion_value: normalizeInt(state.settings.pixConversionValue, 100),
          purchase_boleto_enabled: state.settings.purchaseBoletoEnabled,
          boleto_conversion_value: normalizeInt(state.settings.boletoConversionValue, 100),
          disable_order_bumps: state.settings.disableOrderBumps,
        });
      });
    });
    return rows;
  }

  function init(opts) {
    const draftKey = (opts && opts.draftKey) || DRAFT_KEY_DEFAULT;
    const productId = (opts && opts.productId) || getProductIdFromUrl();
    const onSaved = (opts && opts.onSaved) || null;

    const elTabs = Array.from(document.querySelectorAll('.px-tab'));
    const elPanes = Array.from(document.querySelectorAll('.px-pane'));
    const elAddButtons = Array.from(document.querySelectorAll('[data-px-add]'));
    const elSaveBtn = document.getElementById('pxSaveBtn');
    const elManageButtons = Array.from(document.querySelectorAll('.px-manage'));

    const elTogglePix = document.getElementById('pxTogglePurchasePix');
    const elToggleBoleto = document.getElementById('pxTogglePurchaseBoleto');
    const elToggleDisable = document.getElementById('pxToggleDisableOrderBumps');
    const elPixValueRow = document.getElementById('pxPixValueRow');
    const elBoletoValueRow = document.getElementById('pxBoletoValueRow');
    const elPixValue = document.getElementById('pxPixValue');
    const elBoletoValue = document.getElementById('pxBoletoValue');

    const state = loadFromDraft(draftKey);

    function setActiveTab(platform) {
      state.activePlatform = platform;
      elTabs.forEach((t) => t.classList.toggle('active', t.getAttribute('data-px-tab') === platform));
      elPanes.forEach((p) => p.classList.toggle('active', p.getAttribute('data-px-pane') === platform));
    }

    function renderPlatform(platform) {
      const listEl = document.getElementById(`pxList_${platform}`);
      const countEl = document.getElementById(`pxCount_${platform}`);
      if (!listEl) return;
      const list = state.pixels[platform] || [];
      if (countEl) countEl.textContent = `${list.length}/50`;

      if (list.length === 0) {
        listEl.innerHTML = `<div class="px-empty"><i class="fa-solid fa-circle-info"></i><span>Nenhum pixel adicionado</span></div>`;
        return;
      }

      listEl.innerHTML = list
        .map(
          (x) => `
            <div class="px-row" data-px-row="${x.id}">
              <input class="pc-input" placeholder="Insira seu Pixel ID" value="${String(x.pixelId || '').replace(/\"/g, '&quot;')}" data-px-field="pixelId" data-px-id="${x.id}" />
              <input class="pc-input" placeholder="ex: seudominio.com" value="${String(x.domain || '').replace(/\"/g, '&quot;')}" data-px-field="domain" data-px-id="${x.id}" />
              <button class="px-remove" type="button" aria-label="Remover" data-px-remove="${x.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
          `,
        )
        .join('');

      listEl.querySelectorAll('[data-px-field]').forEach((inp) => {
        inp.addEventListener('input', (e) => {
          const el = e.target;
          const id = el.getAttribute('data-px-id');
          const field = el.getAttribute('data-px-field');
          const item = (state.pixels[platform] || []).find((i) => i.id === id);
          if (!item) return;
          item[field] = el.value;
          el.classList.remove('px-input-invalid');
          persistToDraft(draftKey, state);
        });
      });

      listEl.querySelectorAll('[data-px-remove]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-px-remove');
          removePixel(platform, id);
        });
      });
    }

    function renderAll() {
      PLATFORMS.forEach((p) => renderPlatform(p));
    }

    function addPixel(platform) {
      const list = state.pixels[platform] || [];
      if (list.length >= 50) return;
      list.push({ id: pxUid(), pixelId: '', domain: '' });
      state.pixels[platform] = list;
      renderPlatform(platform);
      persistToDraft(draftKey, state);
    }

    function removePixel(platform, id) {
      const list = state.pixels[platform] || [];
      state.pixels[platform] = list.filter((x) => x.id !== id);
      renderPlatform(platform);
      persistToDraft(draftKey, state);
    }

    function toggleEvent(key, value) {
      state.settings[key] = value;
      persistToDraft(draftKey, state);
    }

    function syncToggleUi() {
      if (elTogglePix) elTogglePix.checked = Boolean(state.settings.purchasePixEnabled);
      if (elToggleBoleto) elToggleBoleto.checked = Boolean(state.settings.purchaseBoletoEnabled);
      if (elToggleDisable) elToggleDisable.checked = Boolean(state.settings.disableOrderBumps);

      if (elPixValue) elPixValue.value = String(normalizeInt(state.settings.pixConversionValue, 100));
      if (elBoletoValue) elBoletoValue.value = String(normalizeInt(state.settings.boletoConversionValue, 100));

      if (elPixValueRow) elPixValueRow.classList.toggle('show', Boolean(state.settings.purchasePixEnabled));
      if (elBoletoValueRow) elBoletoValueRow.classList.toggle('show', Boolean(state.settings.purchaseBoletoEnabled));
    }

    function validatePixelIds() {
      let ok = true;
      PLATFORMS.forEach((platform) => {
        const listEl = document.getElementById(`pxList_${platform}`);
        if (!listEl) return;
        listEl.querySelectorAll('[data-px-field="pixelId"]').forEach((inp) => {
          const v = String(inp.value || '').trim();
          if (!v) {
            ok = false;
            inp.classList.add('px-input-invalid');
          } else {
            inp.classList.remove('px-input-invalid');
          }
        });
      });
      return ok;
    }

    async function savePixelConfig() {
      syncToggleUi();
      persistToDraft(draftKey, state);
      const ok = validatePixelIds();
      if (!ok) return;

      if (productId) {
        const payload = { pixels: buildDbRows(productId, state) };
        try {
          await fetch(`${makeApiBase()}/products/${encodeURIComponent(productId)}/conversion-pixels`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch (_) {}
      }

      if (typeof onSaved === 'function') onSaved();
    }

    elTabs.forEach((t) => t.addEventListener('click', () => setActiveTab(t.getAttribute('data-px-tab'))));
    elAddButtons.forEach((b) => b.addEventListener('click', () => addPixel(b.getAttribute('data-px-add'))));
    if (elSaveBtn) elSaveBtn.addEventListener('click', savePixelConfig);

    elManageButtons.forEach((b) =>
      b.addEventListener('click', () => {
        alert('Em breve');
      }),
    );

    if (elTogglePix) {
      elTogglePix.addEventListener('change', () => {
        toggleEvent('purchasePixEnabled', Boolean(elTogglePix.checked));
        syncToggleUi();
      });
    }
    if (elToggleBoleto) {
      elToggleBoleto.addEventListener('change', () => {
        toggleEvent('purchaseBoletoEnabled', Boolean(elToggleBoleto.checked));
        syncToggleUi();
      });
    }
    if (elToggleDisable) {
      elToggleDisable.addEventListener('change', () => {
        toggleEvent('disableOrderBumps', Boolean(elToggleDisable.checked));
        syncToggleUi();
      });
    }
    if (elPixValue) {
      elPixValue.addEventListener('input', () => {
        toggleEvent('pixConversionValue', normalizeInt(elPixValue.value, 100));
      });
    }
    if (elBoletoValue) {
      elBoletoValue.addEventListener('input', () => {
        toggleEvent('boletoConversionValue', normalizeInt(elBoletoValue.value, 100));
      });
    }

    setActiveTab(state.activePlatform || 'facebook');
    renderAll();
    syncToggleUi();

    return {
      addPixel,
      removePixel,
      toggleEvent,
      savePixelConfig,
      getState: () => JSON.parse(JSON.stringify(state)),
    };
  }

  window.ConversionPixelsModule = { init };
})();

