// Configuração isolada para permitir trocar provedor/modelo sem alterar a UI.
const API_CONFIG = {
  url: "INSERIR_URL_AQUI",
  key: "INSERIR_CHAVE_AQUI",
};

// Cliente HTTP único para a camada de IA.
async function enviarParaAPI(prompt) {
  const body = { prompt };

  const res = await fetch(API_CONFIG.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_CONFIG.key}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let extra = "";
    try {
      extra = await res.text();
    } catch (e) {}
    throw new Error(`Erro na API (${res.status}): ${extra || res.statusText}`);
  }

  return res.json();
}

window.ClickIA2Api = {
  API_CONFIG,
  enviarParaAPI,
};

const ProductsApi = {
  async getProducts(category = 'all') {
    const url = new URL('/api/products', window.location.origin);
    if (category !== 'all') {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Falha ao carregar produtos');
    return res.json();
  },

  async getCounts() {
    const res = await fetch('/api/products/counts');
    if (!res.ok) throw new Error('Falha ao carregar contagens');
    return res.json();
  }
};

window.ProductsApi = ProductsApi;

