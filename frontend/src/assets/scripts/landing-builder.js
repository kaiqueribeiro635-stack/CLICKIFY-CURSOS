/**
 * Clickify Landing Page Builder - JavaScript Module
 * Sistema de criação e gerenciamento de landing pages
 */

// Função utilitária para selecionar elementos
function q(selector) {
    return document.querySelector(selector);
}

// Função para download de arquivos
function dl(content, name, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 300);
}

// Função para gerar landing page completa
function buildLandingPage(config) {
    const { tx = '#111827', bg = '#ffffff', ac = '#3B82F6' } = config || {};
    
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page - Clickify</title>
</head>
<body style="--text:${tx};--bg:${bg};--accent:${ac}">
    <section class="hero">
        <h1>Título Principal</h1>
        <p class="sub">Subtítulo descritivo da sua oferta</p>
        <a href="#" class="cta">Call to Action</a>
    </section>
    <section class="section">
        <div class="grid grid-2">
            <div class="card">
                <h3>Feature 1</h3>
                <p>Descrição do primeiro benefício.</p>
            </div>
            <div class="card">
                <h3>Feature 2</h3>
                <p>Descrição do segundo benefício.</p>
            </div>
        </div>
    </section>
    <footer class="rodape">
        <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
    </footer>
</body>
</html>`;

    const css = `*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto;background:var(--bg);color:var(--text)}.hero{padding:48px 16px;text-align:center}.hero h1{margin:0 0 8px 0}.sub{color:#555}.cta{display:inline-block;background:var(--accent);color:#fff;border:1px solid var(--accent);border-radius:10px;padding:12px 16px;font-weight:700;text-decoration:none}.section{padding:24px 16px;max-width:960px;margin:0 auto}.grid{display:grid;gap:12px}.grid-2{grid-template-columns:1fr 1fr}.card{border:1px solid #e5ecf6;border-radius:12px;padding:16px;background:#fff}.rodape{padding:24px 16px;text-align:center;border-top:1px solid #e5ecf6}img{max-width:100%;display:block;border-radius:10px}article h3{margin:0 0 6px 0}form input,form textarea{padding:10px 12px;border:1px solid #dce3ef;border-radius:10px}form .cta{margin-top:6px}`;

    const js = `document.addEventListener("DOMContentLoaded",function(){var f=document.querySelector("form");if(f){f.addEventListener("submit",function(e){e.preventDefault();var ok=true;Array.from(f.querySelectorAll("[required]")).forEach(function(inp){if(!String(inp.value||"").trim()){ok=false;inp.setAttribute("aria-invalid","true");}});if(ok){alert("Formulário enviado");}})}var pay=document.querySelector("a.cta[href=\\#\"]");pay&&pay.addEventListener("click",function(e){e.preventDefault();alert("Pagamento indisponível no modo demo")});});`;

    return { html, css, js };
}

// Função principal de build
function build() {
    const status = q('#status');
    const outH = q('#waiOutHTML');
    const outC = q('#waiOutCSS');
    const outJ = q('#waiOutJS');

    const colors = {
        tx: q('#waiTextColor')?.value || '#111827',
        bg: q('#waiBgColor')?.value || '#ffffff',
        ac: q('#waiAccentColor')?.value || '#3B82F6'
    };

    const { html, css, js } = buildLandingPage(colors);

    if (outH) outH.value = html;
    if (outC) outC.value = css;
    if (outJ) outJ.value = js;
    
    if (status) status.textContent = 'Gerado';

    try {
        localStorage.setItem('wai_index', html);
        localStorage.setItem('wai_css', css);
        localStorage.setItem('wai_js', js);
    } catch(e) {
        console.warn('Erro ao salvar no localStorage:', e);
    }
}

// Função para integrar projeto
function integrateProject() {
    build();
    const name = (q('#waiName')?.value || 'Projeto Web').trim();
    const dataHTML = `
        <!DOCTYPE html>
        <html>
        <head><title>${name}</title></head>
        <body>
            <h1>${name}</h1>
            <p>Site gerado pela Clickify.</p>
            <img src="https://picsum.photos/seed/landing/640/360" alt="Imagem">
            <a href="#" class="cta">Call to Action</a>
        </body>
        </html>
    `;

    try {
        const key = 'ep_pages';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        list.push({ name, data: dataHTML, updated: Date.now() });
        localStorage.setItem(key, JSON.stringify(list));
    } catch(e) {
        console.warn('Erro ao integrar projeto:', e);
    }

    const funnelsList = document.querySelector('.funnels-list');
    if (funnelsList) {
        const card = document.createElement('div');
        card.className = 'funnel-card';
        card.setAttribute('data-name', name);
        
        const info = document.createElement('div');
        info.className = 'funnel-info';
        
        const h = document.createElement('h3');
        h.className = 'funnel-name';
        h.textContent = name;
        
        const d = document.createElement('div');
        d.className = 'funnel-date';
        const dt = new Date();
        const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                       'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        d.textContent = `${dt.getDate()} de ${months[dt.getMonth()]} de ${dt.getFullYear()}`;
        
        info.appendChild(h);
        info.appendChild(d);
        
        const menu = document.createElement('button');
        menu.className = 'funnel-menu';
        menu.setAttribute('aria-label', 'Opções');
        menu.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
        
        card.appendChild(info);
        card.appendChild(menu);
        funnelsList.insertAdjacentElement('afterbegin', card);
    }

    const status = q('#status');
    if (status) status.textContent = 'Integrado';
}

// Editor de Landing Page Pro
function initEditorPro() {
    const submitBtn = q('#submitBtn');
    if (!submitBtn || false) return;

    submitBtn.style.display = 'block';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.textAlign = 'left';
    submitBtn.style.whiteSpace = 'normal';
    submitBtn.style.width = '100%';
    submitBtn.style.background = 'transparent';
    submitBtn.style.border = '0';
    submitBtn.style.padding = '0';
    submitBtn.style.minWidth = '0';
    submitBtn.style.height = 'auto';
    submitBtn.style.boxShadow = 'none';
    submitBtn.style.filter = 'none';
    submitBtn.style.margin = '0';
    
    submitBtn.innerHTML = `
        <div class="lp-editor-pro">
            <div class="lp-toolbar">
                <button id="lpSave" type="button"><i class="fas fa-save"></i> Salvar</button>
                <button id="lpExport" type="button"><i class="fas fa-download"></i> Exportar</button>
                <button id="lpReset" type="button"><i class="fas fa-redo"></i> Resetar</button>
                <span class="lp-divider"></span>
                <button id="lpBold" type="button"><i class="fas fa-bold"></i></button>
                <button id="lpItalic" type="button"><i class="fas fa-italic"></i></button>
                <button id="lpH1" type="button">H1</button>
                <button id="lpH2" type="button">H2</button>
                <button id="lpP" type="button">P</button>
            </div>
            <div class="lp-toolbar">
                <label>Tamanho: <input type="number" id="lpFontSize" value="16" min="8" max="72"></label>
                <label>Linha: <input type="number" id="lpLineHeight" value="1.6" step="0.1" min="1" max="3"></label>
                <button id="lpAlignLeft" type="button"><i class="fas fa-align-left"></i></button>
                <button id="lpAlignCenter" type="button"><i class="fas fa-align-center"></i></button>
                <button id="lpAlignRight" type="button"><i class="fas fa-align-right"></i></button>
            </div>
            <div class="lp-toolbar">
                <button id="lpAddSection" type="button"><i class="fas fa-plus"></i> Seção</button>
                <button id="lpDupSection" type="button"><i class="fas fa-copy"></i> Duplicar</button>
                <button id="lpDelSection" type="button"><i class="fas fa-trash"></i> Remover</button>
            </div>
            <div class="lp-toolbar">
                <label>Altura: <input type="number" id="lpSectionHeight" value="360" min="100" max="1200"></label>
                <label>Padding: <input type="number" id="lpSectionPadding" value="12" min="0" max="100"></label>
                <label>Margin: <input type="number" id="lpSectionMargin" value="12" min="0" max="100"></label>
            </div>
            <div class="lp-toolbar">
                <button id="lpCols1" type="button">1 coluna</button>
                <button id="lpCols2" type="button">2 colunas</button>
                <button id="lpCols3" type="button">3 colunas</button>
            </div>
            <div class="lp-toolbar">
                <input type="file" id="lpImgFile" accept="image/*" style="display:none">
                <button id="lpImgUpload" type="button"><i class="fas fa-upload"></i> Upload</button>
                <input type="text" id="lpImgUrl" placeholder="URL da imagem">
                <button id="lpImgApply" type="button">Aplicar</button>
                <button id="lpImgRemove" type="button">Remover</button>
                <button id="lpImgAi" type="button"><i class="fas fa-magic"></i> IA</button>
            </div>
            <div class="lp-toolbar">
                <input type="text" id="lpVidUrl" placeholder="URL do YouTube">
                <button id="lpVidAdd" type="button">Adicionar vídeo</button>
                <button id="lpVidRemove" type="button">Remover vídeo</button>
            </div>
            <div class="lp-toolbar">
                <label>Fundo: <input type="color" id="lpBgColor" value="#ffffff"></label>
                <label>Texto: <input type="color" id="lpTextColor" value="#111827"></label>
                <label>Borda: <input type="color" id="lpBorderColor" value="#dce3ef"></label>
                <label>Destaque: <input type="color" id="lpAccentColor" value="#3B82F6"></label>
            </div>
            <div class="lp-toolbar">
                <label>Botão: <input type="color" id="lpButtonColor" value="#3B82F6"></label>
                <label>Texto: <input type="color" id="lpButtonText" value="#ffffff"></label>
            </div>
            <div class="lp-toolbar">
                <label>Espessura: <input type="number" id="lpBorderSize" value="1" min="0" max="10"></label>
                <label>Raio: <input type="number" id="lpBorderRadius" value="10" min="0" max="50"></label>
                <label><input type="checkbox" id="lpShadow"> Sombras</label>
                <label>Opacidade: <input type="number" id="lpOpacity" value="1" min="0" max="1" step="0.1"></label>
            </div>
            <div class="lp-toolbar">
                <button id="lpGradient" type="button">Gradiente</button>
                <button id="lpAnim" type="button">Animação</button>
            </div>
            <div class="lp-toolbar">
                <button data-theme="azul" type="button">Azul</button>
                <button data-theme="verde" type="button">Verde</button>
                <button data-theme="escuro" type="button">Escuro</button>
                <button data-theme="premium" type="button">Premium</button>
            </div>
            <div class="lp-toolbar">
                <button id="lpAddBtn" type="button">Botão</button>
                <input type="text" id="lpBtnText" placeholder="Texto">
                <input type="text" id="lpBtnLink" placeholder="https://...">
                <button id="lpBtnApply" type="button">Aplicar</button>
                <button id="lpBtnDelete" type="button">Remover</button>
            </div>
            <div id="lpPreview" class="lp-preview" contenteditable="true">
                <section class="lp-section">
                    <h1>Título Principal</h1>
                    <h2>Subtítulo</h2>
                    <p>Este é um parágrafo de exemplo. Você pode editar este texto diretamente.</p>
                    <a href="#" class="lp-cta">Call to Action</a>
                </section>
            </div>
        </div>
    `;

    const preview = q('#lpPreview');
    if (!preview) return;

    preview.style.transition = 'all .2s ease';

    // Funções do Editor
    function exec(cmd, val) {
        document.execCommand(cmd, false, val);
    }

    function saveToStorage() {
        try {
            localStorage.setItem('lp_editor_content', preview.innerHTML);
        } catch(e) {
            console.warn('Erro ao salvar:', e);
        }
    }

    function loadFromStorage() {
        try {
            const saved = localStorage.getItem('lp_editor_content');
            if (saved) preview.innerHTML = saved;
        } catch(e) {
            console.warn('Erro ao carregar:', e);
        }
    }

    // Event Listeners
    q('#lpSave')?.addEventListener('click', saveToStorage);
    q('#lpExport')?.addEventListener('click', () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(preview.innerHTML);
            const status = q('#status');
            if (status) status.textContent = 'Exportado';
        }
    });
    q('#lpReset')?.addEventListener('click', () => {
        preview.innerHTML = `
            <section class="lp-section">
                <h1>Título Principal</h1>
                <h2>Subtítulo</h2>
                <p>Este é um parágrafo de exemplo. Você pode editar este texto diretamente.</p>
                <a href="#" class="lp-cta">Call to Action</a>
            </section>
        `;
    });

    // Auto-save
    let saveTimeout;
    preview.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveToStorage, 250);
    });

    // Toolbar buttons
    q('#lpBold')?.addEventListener('click', () => exec('bold'));
    q('#lpItalic')?.addEventListener('click', () => exec('italic'));
    q('#lpH1')?.addEventListener('click', () => exec('formatBlock', 'H1'));
    q('#lpH2')?.addEventListener('click', () => exec('formatBlock', 'H2'));
    q('#lpP')?.addEventListener('click', () => exec('insertParagraph'));

    // Font size
    q('#lpFontSize')?.addEventListener('input', function() {
        const sel = window.getSelection();
        const node = sel?.anchorNode?.parentElement || preview;
        node.style.fontSize = this.value + 'px';
    });

    // Line height
    q('#lpLineHeight')?.addEventListener('input', function() {
        const sel = window.getSelection();
        const node = sel?.anchorNode?.parentElement || preview;
        node.style.lineHeight = this.value;
    });

    // Alignment
    function applyAlign(v) {
        const sel = window.getSelection();
        const node = sel?.anchorNode?.parentElement || preview;
        node.style.textAlign = v;
    }

    q('#lpAlignLeft')?.addEventListener('click', () => applyAlign('left'));
    q('#lpAlignCenter')?.addEventListener('click', () => applyAlign('center'));
    q('#lpAlignRight')?.addEventListener('click', () => applyAlign('right'));

    // Columns
    q('#lpCols1')?.addEventListener('click', () => {
        preview.style.display = 'grid';
        preview.style.gridTemplateColumns = '1fr';
        preview.style.gap = '12px';
    });

    q('#lpCols2')?.addEventListener('click', () => {
        preview.style.display = 'grid';
        preview.style.gridTemplateColumns = '1fr 1fr';
        preview.style.gap = '12px';
    });

    q('#lpCols3')?.addEventListener('click', () => {
        preview.style.display = 'grid';
        preview.style.gridTemplateColumns = '1fr 1fr 1fr';
        preview.style.gap = '12px';
    });

    // Image handling
    q('#lpImgUpload')?.addEventListener('click', () => q('#lpImgFile')?.click());

    q('#lpImgFile')?.addEventListener('change', function(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';
        img.style.borderRadius = '10px';
        preview.appendChild(img);
    });

    q('#lpImgApply')?.addEventListener('click', () => {
        const url = (q('#lpImgUrl')?.value || '').trim();
        if (!url) return;
        const img = preview.querySelector('img') || document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';
        img.style.borderRadius = '10px';
        if (!img.parentElement) preview.appendChild(img);
    });

    q('#lpImgRemove')?.addEventListener('click', () => {
        preview.querySelectorAll('img').forEach(img => img.remove());
    });

    q('#lpImgAi')?.addEventListener('click', () => {
        const seed = Math.random().toString(36).slice(2);
        const img = preview.querySelector('img') || document.createElement('img');
        img.src = 'https://picsum.photos/seed/' + seed + '/800/400';
        img.style.maxWidth = '100%';
        img.style.borderRadius = '10px';
        if (!img.parentElement) preview.appendChild(img);
    });

    // Video handling
    q('#lpVidAdd')?.addEventListener('click', () => {
        const url = (q('#lpVidUrl')?.value || '').trim();
        if (!url) return;
        const id = (url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/) || [])[1];
        if (!id) return;
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '360';
        iframe.src = 'https://www.youtube.com/embed/' + id;
        iframe.setAttribute('allowfullscreen', 'true');
        preview.appendChild(iframe);
    });

    q('#lpVidRemove')?.addEventListener('click', () => {
        preview.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });

    // Section management
    function currentSection() {
        let s = preview.querySelector('section.lp-section.selected');
        if (!s) {
            s = preview.querySelector('section.lp-section') || createSection();
            s.classList.add('selected');
        }
        return s;
    }

    function createSection() {
        const s = document.createElement('section');
        s.className = 'lp-section';
        s.style.padding = '12px';
        s.style.margin = '12px 0';
        s.style.minHeight = '360px';
        s.innerHTML = '<h3>Nova Seção</h3><p>Conteúdo da seção.</p>';
        preview.appendChild(s);
        return s;
    }

    q('#lpAddSection')?.addEventListener('click', () => {
        const s = createSection();
        s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    q('#lpDupSection')?.addEventListener('click', () => {
        const s = currentSection();
        const clone = s.cloneNode(true);
        s.insertAdjacentElement('afterend', clone);
    });

    q('#lpDelSection')?.addEventListener('click', () => {
        const s = currentSection();
        s.remove();
    });

    q('#lpSectionHeight')?.addEventListener('input', function() {
        const s = currentSection();
        s.style.minHeight = this.value + 'px';
    });

    q('#lpSectionPadding')?.addEventListener('input', function() {
        const s = currentSection();
        s.style.padding = this.value + 'px';
    });

    q('#lpSectionMargin')?.addEventListener('input', function() {
        const s = currentSection();
        s.style.margin = this.value + 'px 0';
    });

    // Section selection
    preview.addEventListener('click', (e) => {
        const s = e.target.closest('section.lp-section');
        preview.querySelectorAll('section.lp-section.selected').forEach(x => x.classList.remove('selected'));
        if (s) s.classList.add('selected');
    });

    // Colors
    const lpBgColor = q('#lpBgColor');
    const lpTextColor = q('#lpTextColor');
    const lpBorderColor = q('#lpBorderColor');
    const lpAccentColor = q('#lpAccentColor');
    const lpButtonColor = q('#lpButtonColor');
    const lpButtonText = q('#lpButtonText');

    function applyColors() {
        const box = q('.lp-editor');
        if (box) {
            box.style.background = lpBgColor?.value;
            box.style.color = lpTextColor?.value;
            box.style.borderColor = lpBorderColor?.value;
        }
        const cta = preview.querySelector('.lp-cta');
        if (cta) {
            cta.style.background = lpButtonColor?.value || lpAccentColor?.value;
            cta.style.borderColor = lpButtonColor?.value || lpAccentColor?.value;
            cta.style.color = lpButtonText?.value || '#fff';
        }
        try {
            localStorage.setItem('lp_colors', JSON.stringify({
                bg: lpBgColor?.value,
                text: lpTextColor?.value,
                border: lpBorderColor?.value,
                accent: lpAccentColor?.value,
                btn: lpButtonColor?.value || '',
                btnText: lpButtonText?.value || ''
            }));
        } catch(e) {}
    }

    [lpBgColor, lpTextColor, lpBorderColor, lpAccentColor, lpButtonColor, lpButtonText].forEach(el => {
        el?.addEventListener('input', applyColors);
    });

    // Style box
    const lpBorderSize = q('#lpBorderSize');
    const lpBorderRadius = q('#lpBorderRadius');
    const lpShadow = q('#lpShadow');
    const lpOpacity = q('#lpOpacity');

    function applyStyleBox() {
        const box = q('.lp-editor');
        if (!box) return;
        box.style.borderWidth = (lpBorderSize?.value || '1') + 'px';
        box.style.borderRadius = (lpBorderRadius?.value || '10') + 'px';
        box.style.boxShadow = lpShadow?.checked ? '0 6px 16px rgba(0,0,0,0.06)' : 'none';
        box.style.opacity = lpOpacity?.value || '1';
    }

    [lpBorderSize, lpBorderRadius, lpShadow, lpOpacity].forEach(el => {
        el?.addEventListener('input', applyStyleBox);
    });

    // Gradient
    q('#lpGradient')?.addEventListener('click', () => {
        const box = q('.lp-editor');
        if (box) {
            box.style.background = 'linear-gradient(135deg, #ffffff 0%, ' + (lpAccentColor?.value || '#3B82F6') + ' 100%)';
        }
    });

    // Animation
    q('#lpAnim')?.addEventListener('click', () => {
        const box = q('.lp-editor');
        if (!box) return;
        box.style.transition = 'all .25s ease';
        box.style.transform = 'scale(1.01)';
        setTimeout(() => { box.style.transform = 'none'; }, 300);
    });

    // Themes
    q('#lpGradient')?.addEventListener('click', () => {
        const box = q('.lp-editor');
        if (box) {
            box.style.background = 'linear-gradient(135deg, #ffffff 0%, ' + (lpAccentColor?.value || '#3B82F6') + ' 100%)';
        }
    });

    // Theme buttons
    qAll('[data-theme]').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            const box = q('.lp-editor');
            const cta = preview.querySelector('.lp-cta');
            
            if (theme === 'azul') {
                box.style.background = '#ffffff';
                box.style.color = '#111';
                box.style.borderColor = '#dce3ef';
                cta.style.background = '#2F6BFF';
                cta.style.borderColor = '#2F6BFF';
            } else if (theme === 'verde') {
                box.style.background = '#ffffff';
                box.style.color = '#111';
                box.style.borderColor = '#dce3ef';
                cta.style.background = '#0b8a6a';
                cta.style.borderColor = '#0b8a6a';
            } else if (theme === 'escuro') {
                box.style.background = '#0b0f14';
                box.style.color = '#e8f0ff';
                box.style.borderColor = '#2a3647';
                cta.style.background = '#2F6BFF';
                cta.style.borderColor = '#2F6BFF';
            } else if (theme === 'premium') {
                box.style.background = '#000';
                box.style.color = '#ffd66e';
                box.style.borderColor = '#444';
                cta.style.background = '#ffd66e';
                cta.style.color = '#000';
                cta.style.borderColor = '#ffd66e';
            } else {
                box.style.background = '#ffffff';
                box.style.color = '#111';
                box.style.borderColor = '#dce3ef';
                cta.style.background = '#6A8CFF';
                cta.style.borderColor = '#6A8CFF';
            }
        });
    });

    // Button management
    q('#lpAddBtn')?.addEventListener('click', () => {
        const btn = document.createElement('a');
        btn.href = '#';
        btn.textContent = 'Clique Aqui';
        btn.style.display = 'inline-block';
        btn.style.background = '#2F6BFF';
        btn.style.color = '#fff';
        btn.style.border = '1px solid #2F6BFF';
        btn.style.borderRadius = '10px';
        btn.style.padding = '10px 14px';
        btn.style.fontWeight = '700';
        preview.appendChild(btn);
    });

    q('#lpBtnApply')?.addEventListener('click', () => {
        const btn = preview.querySelector('a');
        if (!btn) return;
        btn.textContent = q('#lpBtnText')?.value || 'Clique Aqui';
        btn.href = q('#lpBtnLink')?.value || '#';
    });

    q('#lpBtnDelete')?.addEventListener('click', () => {
        preview.querySelectorAll('a').forEach(a => a.remove());
    });

    // Drag and drop
    preview.addEventListener('dragover', (e) => e.preventDefault());
    preview.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '10px';
            preview.appendChild(img);
        }
    });

    // Keyboard shortcuts
    preview.addEventListener('keydown', (e) => {
        const key = (e.key || '').toLowerCase();
        if (e.ctrlKey || e.metaKey) {
            if (key === 'b') {
                e.preventDefault();
                exec('bold');
            } else if (key === 'i') {
                e.preventDefault();
                exec('italic');
            }
        }
    });

    // Button hover effects
    qAll('.lp-toolbar button').forEach(btn => {
        btn.style.transition = 'background-color .15s ease, border-color .15s ease, transform .1s ease';
        btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.98)');
        btn.addEventListener('mouseup', () => btn.style.transform = 'none');
        btn.addEventListener('mouseleave', () => btn.style.transform = 'none');
    });

    // Load saved content
    loadFromStorage();
}

// Utility function to query multiple elements
function qAll(selector) {
    return document.querySelectorAll(selector);
}

// Export page functions
function initExportButtons() {
    const genBtn = q('#waiGenerate');
    if (genBtn) genBtn.addEventListener('click', build);

    const expHtml = q('#waiExportHTML');
    if (expHtml) expHtml.addEventListener('click', () => {
        dl((q('#waiOutHTML')?.value) || '', 'index.html', 'text/html');
    });

    const expCss = q('#waiExportCSS');
    if (expCss) expCss.addEventListener('click', () => {
        dl((q('#waiOutCSS')?.value) || '', 'styles.css', 'text/css');
    });

    const expJs = q('#waiExportJS');
    if (expJs) expJs.addEventListener('click', () => {
        dl((q('#waiOutJS')?.value) || '', 'script.js', 'application/javascript');
    });

    const depGuide = q('#waiDeployGuide');
    if (depGuide) depGuide.addEventListener('click', () => {
        const guide = `1. Exporte os arquivos.
2. Faça upload em um host estático (Netlify, Vercel ou GitHub Pages).
3. Configure domínio se tiver.
4. Conecte o formulário via webhook ou e-mail.
5. Ative HTTPS e cache.`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(guide).then(() => {
                const status = q('#status');
                if (status) {
                    status.textContent = 'Guia copiado';
                    setTimeout(() => status.textContent = 'Pronto', 800);
                }
            });
        }
    });

    const integrateBtn = q('#waiIntegrate');
    if (integrateBtn) integrateBtn.addEventListener('click', integrateProject);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initExportButtons();
    initEditorPro();
    
    // Load saved pages into list
    loadSavedPages();
});

function loadSavedPages() {
    try {
        const key = 'ep_pages';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        const funnelsList = document.querySelector('.funnels-list');
        
        if (!Array.isArray(list) || !funnelsList) return;

        list.forEach(page => {
            const card = document.createElement('div');
            card.className = 'funnel-card';
            card.setAttribute('data-name', page.name);
            
            const info = document.createElement('div');
            info.className = 'funnel-info';
            
            const name = document.createElement('h3');
            name.className = 'funnel-name';
            name.textContent = page.name;
            
            const date = document.createElement('div');
            date.className = 'funnel-date';
            const d = new Date(page.updated || Date.now());
            const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                           'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            date.textContent = `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
            
            info.appendChild(name);
            info.appendChild(date);
            
            const menu = document.createElement('button');
            menu.className = 'funnel-menu';
            menu.setAttribute('aria-label', 'Opções');
            menu.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
            
            card.appendChild(info);
            card.appendChild(menu);
            funnelsList.appendChild(card);
        });
    } catch(e) {
        console.warn('Erro ao carregar páginas salvas:', e);
    }
}

// Page Editor Functions
function showCreateView(template) {
    const createView = q('#createPageView');
    const searchBox = q('#searchBox');
    const gridEl = q('#gridTemplates');
    const titleInput = q('#waiTitleInput');
    const errorEl = q('#waiError');
    const h = q('.tmpl-title');
    
    if (createView) {
        createView.classList.add('active');
        createView.setAttribute('aria-hidden', 'false');
    }
    if (searchBox) searchBox.style.display = 'none';
    if (gridEl) gridEl.style.display = 'none';
    if (h) h.textContent = 'Criar Nova Página';
    if (titleInput) {
        titleInput.value = '';
        titleInput.setAttribute('data-template', template.name);
        titleInput.setAttribute('data-template-img', template.img);
        titleInput.setAttribute('data-template-desc', template.desc);
        titleInput.removeAttribute('aria-invalid');
    }
    if (errorEl) errorEl.classList.remove('show');
}

function showGridView() {
    const createView = q('#createPageView');
    const searchBox = q('#searchBox');
    const gridEl = q('#gridTemplates');
    const h = q('.tmpl-title');
    
    if (createView) {
        createView.classList.remove('active');
        createView.setAttribute('aria-hidden', 'true');
    }
    if (searchBox) searchBox.style.display = 'block';
    if (gridEl) gridEl.style.display = 'grid';
    if (h) h.textContent = 'Criar Nova Página';
}

function showEditView(name) {
    const editView = q('#editPageView');
    const createView = q('#createPageView');
    const searchBox = q('#searchBox');
    const gridEl = q('#gridTemplates');
    const h = q('.tmpl-title');
    
    if (editView) {
        editView.classList.add('active');
        editView.setAttribute('aria-hidden', 'false');
    }
    if (createView) {
        createView.classList.remove('active');
        createView.setAttribute('aria-hidden', 'true');
    }
    if (searchBox) searchBox.style.display = 'none';
    if (gridEl) gridEl.style.display = 'none';
    
    const epTitle = q('#epTitle');
    const epContent = q('#epContent');
    const epStatus = q('#epStatus');
    
    if (h) h.textContent = 'Editar Página';
    if (epTitle) epTitle.textContent = 'Editando: ' + name;
    if (epStatus) epStatus.textContent = 'Pronto';

    // Load stored content
    try {
        const key = 'ep_pages';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        const found = list.find(p => p.name === name);
        if (found && found.data && epContent) {
            epContent.innerHTML = found.data;
        }
    } catch(e) {
        console.warn('Erro ao carregar conteúdo:', e);
    }
}

// Funnel menu handlers
function initFunnelMenuHandlers() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.funnel-menu');
        if (btn) {
            const card = btn.closest('.funnel-card');
            let pop = card?.querySelector('.funnel-pop');
            if (!pop) {
                pop = document.createElement('div');
                pop.className = 'funnel-pop';
                pop.setAttribute('role', 'menu');
                
                const edit = document.createElement('button');
                edit.type = 'button';
                edit.className = 'funnel-edit';
                edit.textContent = 'Editar página';
                edit.setAttribute('role', 'menuitem');
                
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'funnel-delete';
                del.textContent = 'Excluir página';
                del.setAttribute('role', 'menuitem');
                
                pop.appendChild(edit);
                pop.appendChild(del);
                card?.appendChild(pop);
            }
            
            const isOpen = pop.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            return;
        }

        const editBtn = e.target.closest('.funnel-edit');
        if (editBtn) {
            const card = editBtn.closest('.funnel-card');
            const pop = card?.querySelector('.funnel-pop');
            if (pop) pop.classList.remove('open');
            return;
        }

        const delBtn = e.target.closest('.funnel-delete');
        if (delBtn) {
            const card = delBtn.closest('.funnel-card');
            const name = card?.getAttribute('data-name') || 
                        (card?.querySelector('.funnel-name')?.textContent || '').trim();
            
            let conf = card?.querySelector('.confirm-row');
            if (!conf) {
                conf = document.createElement('div');
                conf.className = 'confirm-row';
                
                const yes = document.createElement('button');
                yes.type = 'button';
                yes.className = 'yes';
                yes.textContent = 'Confirmar';
                
                const no = document.createElement('button');
                no.type = 'button';
                no.className = 'no';
                no.textContent = 'Cancelar';
                
                conf.appendChild(yes);
                conf.appendChild(no);
                delBtn.insertAdjacentElement('afterend', conf);
            }
            
            const onNo = () => conf.remove();
            const onYes = () => {
                try {
                    const key = 'ep_pages';
                    const list = JSON.parse(localStorage.getItem(key) || '[]')
                        .filter(p => p.name !== name);
                    localStorage.setItem(key, JSON.stringify(list));
                } catch(err) {}
                
                card.style.opacity = '0.6';
                setTimeout(() => { card?.remove(); }, 150);
            };
            
            conf.querySelector('.no')?.addEventListener('click', onNo, { once: true });
            conf.querySelector('.yes')?.addEventListener('click', onYes, { once: true });
            return;
        }

        // Close all popups
        document.querySelectorAll('.funnel-pop.open').forEach(pop => {
            pop.classList.remove('open');
            const b = pop.parentElement?.querySelector('.funnel-menu');
            b?.setAttribute('aria-expanded', 'false');
        });
    });
}

// Page Editor Pro initialization
function initPageEditorPro() {
    const editView = q('#editPageView');
    if (!editView) return;

    const epTitle = q('#epTitle');
    const epContent = q('#epContent');
    const epImg = q('#epImg');
    const epStatus = q('#epStatus');

    // Formatting buttons
    function exec(cmd) {
        document.execCommand(cmd, false);
    }

    q('#epBold')?.addEventListener('click', () => exec('bold'));
    q('#epItalic')?.addEventListener('click', () => exec('italic'));
    q('#epH1')?.addEventListener('click', () => exec('formatBlock', 'H1'));
    q('#epH2')?.addEventListener('click', () => exec('formatBlock', 'H2'));

    // Column layout
    q('#epOne')?.addEventListener('click', () => {
        epContent?.classList.remove('ep-two', 'ep-three');
        epContent?.classList.add('ep-one');
    });

    q('#epTwo')?.addEventListener('click', () => {
        epContent?.classList.remove('ep-one', 'ep-three');
        epContent?.classList.add('ep-two');
    });

    q('#epThree')?.addEventListener('click', () => {
        epContent?.classList.remove('ep-one', 'ep-two');
        epContent?.classList.add('ep-three');
    });

    // Alignment
    function applyAlign(v) {
        const sel = window.getSelection();
        const node = sel?.anchorNode?.parentElement || epContent;
        (node || epContent).style.textAlign = v;
    }

    q('#epAlignLeft')?.addEventListener('click', () => applyAlign('left'));
    q('#epAlignCenter')?.addEventListener('click', () => applyAlign('center'));
    q('#epAlignRight')?.addEventListener('click', () => applyAlign('right'));
    q('#epAlignJustify')?.addEventListener('click', () => applyAlign('justify'));

    // Font size
    q('#epFontSize')?.addEventListener('input', function() {
        const sel = window.getSelection();
        const node = sel?.anchorNode?.parentElement || epContent;
        (node || epContent).style.fontSize = this.value + 'px';
    });

    // Line height
    q('#epLineHeight')?.addEventListener('input', function() {
        if (epContent) epContent.style.lineHeight = this.value;
    });

    // Section management
    function currentSection() {
        let s = epContent?.querySelector('.ep-section.selected');
        if (!s) {
            s = epContent?.querySelector('.ep-section') || createSection();
            s?.classList.add('selected');
        }
        return s;
    }

    function createSection() {
        const s = document.createElement('section');
        s.className = 'ep-section';
        s.style.padding = '12px';
        s.style.margin = '12px 0';
        s.style.minHeight = '360px';
        s.innerHTML = '<h3>Título</h3><p>Subtítulo ou descrição.</p>';
        epContent?.appendChild(s);
        return s;
    }

    epContent?.addEventListener('click', (e) => {
        const s = e.target.closest('.ep-section');
        epContent?.querySelectorAll('.ep-section.selected')?.forEach(x => x.classList.remove('selected'));
        if (s) s.classList.add('selected');
    });

    q('#epAddSection')?.addEventListener('click', () => {
        const s = createSection();
        s?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    q('#epDupSection')?.addEventListener('click', () => {
        const s = currentSection();
        const n = s?.cloneNode(true);
        s?.insertAdjacentElement('afterend', n);
    });

    q('#epDelSection')?.addEventListener('click', () => {
        const s = currentSection();
        s?.remove();
    });

    // Section styles
    q('#epSectionPadding')?.addEventListener('input', function() {
        const s = currentSection();
        s.style.padding = this.value + 'px';
    });

    q('#epSectionMargin')?.addEventListener('input', function() {
        const s = currentSection();
        s.style.margin = this.value + 'px 0';
    });

    q('#epSectionHeight')?.addEventListener('input', function() {
        const s = currentSection();
        s.style.minHeight = this.value + 'px';
    });

    // Image handling
    q('#epImgApply')?.addEventListener('click', () => {
        const url = (q('#epImgUrl')?.value || '').trim();
        if (url && epImg) epImg.src = url;
    });

    q('#epImgRemove')?.addEventListener('click', () => {
        const img = epContent?.querySelector('#epImg');
        img?.remove();
    });

    q('#epImgGen')?.addEventListener('click', () => {
        const seed = encodeURIComponent((q('#epImgAI')?.value || 'seed').slice(0, 40));
        if (epImg) epImg.src = 'https://picsum.photos/seed/' + seed + '/640/360';
    });

    // Video handling
    q('#epVidAdd')?.addEventListener('click', () => {
        const url = (q('#epVidUrl')?.value || '').trim();
        if (!url) return;
        const id = (url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/) || [])[1];
        if (!id) return;
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '360';
        iframe.src = 'https://www.youtube.com/embed/' + id;
        iframe.setAttribute('allowfullscreen', 'true');
        const s = currentSection();
        s?.querySelector('.ep-inner')?.appendChild(iframe);
    });

    q('#epVidRemove')?.addEventListener('click', () => {
        epContent?.querySelectorAll('iframe')?.forEach(iframe => iframe.remove());
    });

    // Border & radius
    q('#epBorderSize')?.addEventListener('input', function() {
        if (epContent) {
            epContent.style.borderWidth = this.value + 'px';
            epContent.style.borderStyle = 'solid';
            epContent.style.borderColor = getComputedStyle(editView).getPropertyValue('--lp-border');
        }
    });

    q('#epRadius')?.addEventListener('input', function() {
        if (epContent) epContent.style.borderRadius = this.value + 'px';
    });

    // Shadow
    q('#epShadowOn')?.addEventListener('click', () => {
        if (epContent) epContent.style.boxShadow = '0 10px 24px rgba(0,0,0,0.25)';
    });

    q('#epShadowOff')?.addEventListener('click', () => {
        if (epContent) epContent.style.boxShadow = 'none';
    });

    // Opacity
    q('#epOpacity')?.addEventListener('input', function() {
        if (epContent) epContent.style.opacity = this.value;
    });

    // Gradient
    q('#epApplyGradient')?.addEventListener('click', () => {
        const start = q('#epGradStart')?.value || '#000000';
        const end = q('#epGradEnd')?.value || '#000000';
        editView.style.setProperty('--lp-bg', `linear-gradient(180deg, ${start}, ${end})`);
    });

    // Animation
    q('#epAnim')?.addEventListener('change', function() {
        epContent?.classList.remove('anim-fade', 'anim-slide', 'anim-pop');
        const v = this.value;
        if (v === 'fade') epContent?.classList.add('anim-fade');
        else if (v === 'slide') epContent?.classList.add('anim-slide');
        else if (v === 'pop') epContent?.classList.add('anim-pop');
    });

    // Image upload
    q('#epImgInp')?.addEventListener('change', function(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        if (epImg) epImg.src = url;
    });

    // Save
    q('#epSave')?.addEventListener('click', function() {
        if (epStatus) epStatus.textContent = 'Salvando...';
        
        const key = 'ep_pages';
        const name = epTitle?.textContent.replace('Editando: ', '') || '';
        const data = epContent?.innerHTML || '';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        const existing = list.find(p => p.name === name);
        const now = Date.now();
        
        if (existing) {
            existing.data = data;
            existing.updated = now;
        } else {
            list.push({ name, data, updated: now });
        }
        
        localStorage.setItem(key, JSON.stringify(list));
        
        setTimeout(() => {
            if (epStatus) epStatus.textContent = 'Salvo';
        }, 300);
    });

    // Done
    q('#epDone')?.addEventListener('click', () => {
        editView.classList.remove('active');
        editView.setAttribute('aria-hidden', 'true');
        const modalOverlay = q('#modalOverlay');
        const modal = q('#modal');
        modalOverlay?.classList.remove('show');
        modal?.classList.remove('show');
        setTimeout(() => { modalOverlay?.style.display = 'none'; }, 150);
    });

    // Top toolbar
    q('#epTopSave')?.addEventListener('click', () => q('#epSave')?.click());

    q('#epTopExport')?.addEventListener('click', () => {
        const name = epTitle?.textContent.replace('Editando: ', '') || '';
        const cfg = {
            bg: getComputedStyle(editView).getPropertyValue('--lp-bg').trim(),
            text: getComputedStyle(editView).getPropertyValue('--lp-text').trim(),
            border: getComputedStyle(editView).getPropertyValue('--lp-border').trim(),
            accent: getComputedStyle(editView).getPropertyValue('--lp-accent').trim()
        };
        const data = epContent?.innerHTML || '';
        const s = JSON.stringify({ name, cfg, data });
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(s).then(() => {
                if (epStatus) {
                    epStatus.textContent = 'Exportado';
                    setTimeout(() => epStatus.textContent = 'Pronto', 800);
                }
            });
        }
    });

    q('#epTopReset')?.addEventListener('click', () => {
        if (epContent) {
            epContent.innerHTML = `
                <section class="ep-section">
                    <h1>Seu Título Aqui</h1>
                    <p>Edite este texto para personalizar sua landing page.</p>
                    <img src="https://picsum.photos/seed/landing/640/360" alt="Imagem" id="epImg">
                    <a href="#" class="ep-cta">Call to Action</a>
                </section>
            `;
        }
        editView.style.setProperty('--lp-bg', '#0b0f14');
        editView.style.setProperty('--lp-text', '#e8f0ff');
        editView.style.setProperty('--lp-border', '#303a49');
        editView.style.setProperty('--lp-accent', '#0e7a50');
        
        if (epStatus) {
            epStatus.textContent = 'Resetado';
            setTimeout(() => epStatus.textContent = 'Pronto', 800);
        }
    });
}

// Initialize funnel menu handlers
initFunnelMenuHandlers();

// Initialize page editor pro
initPageEditorPro();
