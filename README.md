# 🚔 UTILITY PRO - Sistema de Documentos Policiais

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)

**Sistema profissional para geração, preenchimento e exportação de documentos policiais oficiais**

[Características](#-características-principais) • [Tecnologias](#-stack-tecnológica) • [Funções](#-documentação-completa-das-funções) • [Instalação](#-instalação-e-execução)

</div>

---

## 📋 Sobre o Projeto

O **Utility Pro** é uma Progressive Web Application (PWA) desenvolvida para otimizar o fluxo de trabalho policial, permitindo a criação, preenchimento e compartilhamento de documentos oficiais diretamente de qualquer dispositivo (desktop, tablet ou smartphone).

### 🎯 Características Principais

- ✅ **WYSIWYG Perfeito**: O que você vê na tela é exatamente o que será impresso ou exportado em PDF
- ✅ **Cross-Platform**: Funciona identicamente em desktop e mobile
- ✅ **Offline-First**: Funciona sem conexão à internet (PWA)
- ✅ **Assinaturas Digitais**: Captura de assinaturas com touch ou mouse
- ✅ **Exportação Inteligente**: PDF de alta qualidade com dimensões A4 precisas
- ✅ **Compartilhamento Nativo**: Integração com WhatsApp e outros apps via Web Share API
- ✅ **Sincronização Automática**: Campos compartilhados entre documentos relacionados

---

## 🛠 Stack Tecnológica

### Core Technologies

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **HTML5** | - | Estrutura semântica e acessível |
| **CSS3** | - | Estilização avançada com Grid, Flexbox e Media Queries |
| **JavaScript (ES6+)** | ECMAScript 2015+ | Lógica de aplicação com módulos nativos |

### Build Tools & Development

| Ferramenta | Versão | Descrição |
|------------|--------|-----------|
| **[Vite](https://vitejs.dev/)** | `7.2.4` | Build tool de próxima geração com HMR instantâneo e otimização automática |
| **[ESLint](https://eslint.org/)** | `9.39.1` | Linter para garantir qualidade e consistência do código |
| **[@eslint/js](https://www.npmjs.com/package/@eslint/js)** | `9.39.1` | Configurações oficiais do ESLint para JavaScript |
| **[PostCSS](https://postcss.org/)** | `8.5.6` | Processador CSS para transformações e otimizações |
| **[Autoprefixer](https://github.com/postcss/autoprefixer)** | `10.4.22` | Adiciona prefixos vendor automaticamente para compatibilidade cross-browser |

### Frameworks & Libraries

#### Estilização
| Biblioteca | Versão | Uso |
|------------|--------|-----|
| **[Tailwind CSS](https://tailwindcss.com/)** | `4.1.17` | Framework CSS utility-first para desenvolvimento rápido e responsivo |
| **[@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss)** | `4.1.17` | Plugin PostCSS oficial do Tailwind v4 |

#### Geração de PDF
| Biblioteca | Versão | Uso |
|------------|--------|-----|
| **[jsPDF](https://github.com/parallax/jsPDF)** | `2.5.1` | Biblioteca líder para geração de PDFs no navegador |
| **[html2canvas](https://html2canvas.hertzen.com/)** | `latest` | Renderização de HTML/CSS como canvas para captura visual perfeita |

#### Assinaturas Digitais
| Biblioteca | Versão | Uso |
|------------|--------|-----|
| **[Signature Pad](https://github.com/szimek/signature_pad)** | `5.1.2` (npm) / `4.1.5` (CDN) | Captura suave de assinaturas com suporte a touch e mouse |

### PWA & Service Worker

- **Service Worker**: Cache inteligente para funcionamento offline
- **Web Manifest**: Instalação como app nativo em Android/iOS
- **Web Share API**: Compartilhamento nativo de arquivos

---

## 📐 Arquitetura do Sistema

### Estrutura de Pastas

```
Termos/
├── src/
│   ├── main.js          # Lógica de roteamento e inicialização
│   └── style.css        # Estilos customizados e regras de impressão
├── index.html           # Documento principal com templates
├── service-worker.js    # Service Worker para PWA
├── manifest.json        # Manifesto PWA
├── icon.png            # Ícone da aplicação
├── vite.config.js      # Configuração do Vite
├── tailwind.config.js  # Configuração do Tailwind
├── postcss.config.js   # Configuração do PostCSS
├── eslint.config.js    # Configuração do ESLint
└── package.json        # Dependências e scripts
```

### Fluxo de Dados

```
Usuário → Interface (HTML) → JavaScript (Eventos) → Manipulação DOM
                                                   ↓
                                    Geração PDF ← html2canvas
                                                   ↓
                                    jsPDF → Blob → Download/Share
```

---

## 📚 Documentação Completa das Funções

### 🔷 Módulo de Roteamento (`main.js`)

#### `handleRoute()`
**Propósito**: Sistema de roteamento baseado em hash URL para navegação SPA (Single Page Application).

**Funcionamento Detalhado**:
```javascript
function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';
  // ...
}
```

1. **Captura do Hash**: Lê a URL atual (ex: `#termo-manifestacao`)
2. **Validação**: Verifica se o hash corresponde a uma rota válida
3. **Renderização Condicional**:
   - Se `hash === 'home'`: Exibe página inicial, esconde documentos
   - Se `hash` é um documento válido: Esconde home, exibe área de documentos
4. **Atualização de UI**: Gerencia classes CSS para tabs ativas
5. **Scroll Reset**: Retorna ao topo da página

**Vantagens**:
- ✅ URLs compartilháveis (ex: `app.com/#termo-compromisso`)
- ✅ Navegação com botões voltar/avançar do navegador
- ✅ Sem recarregamento de página

---

#### `showDocument(documentId)`
**Propósito**: Função auxiliar para navegação programática.

**Parâmetros**:
- `documentId` (string): ID do documento ('relatorio-medico', 'termo-manifestacao', 'termo-compromisso')

**Implementação**:
```javascript
window.showDocument = function (documentId) {
  window.location.hash = documentId;
};
```

**Uso**: Chamada pelos cards da home page via `onclick="showDocument('relatorio-medico')"`

---

#### `backToHome()`
**Propósito**: Retorna à página inicial.

**Implementação**:
```javascript
window.backToHome = function () {
  window.location.hash = 'home';
};
```

**Efeito Cascata**: Altera hash → Dispara `hashchange` event → `handleRoute()` executa

---

#### `openTab(evt, tabName)`
**Propósito**: Navegação entre abas de documentos.

**Parâmetros**:
- `evt` (Event): Evento de clique (para `preventDefault()`)
- `tabName` (string): Nome da aba a ser aberta

**Implementação**:
```javascript
window.openTab = function (evt, tabName) {
  if (evt) evt.preventDefault();
  window.location.hash = tabName;
};
```

---

#### `isPWA()`
**Propósito**: Detecta se a aplicação está rodando como PWA instalado.

**Retorno**: `boolean`

**Implementação**:
```javascript
window.isPWA = function () {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone ||
    document.referrer.includes("android-app://")
  );
};
```

**Casos de Uso**:
- iOS Safari: `navigator.standalone`
- Android Chrome: `display-mode: standalone`
- Android WebView: `referrer` contém `android-app://`

---

### 🔷 Módulo de Assinaturas Digitais

#### Inicialização dos Signature Pads
**Propósito**: Transforma elementos `<canvas>` em áreas de assinatura interativas.

**Implementação**:
```javascript
document.addEventListener("DOMContentLoaded", function () {
  signaturePadPolicialManifestacao = new SignaturePad(
    document.getElementById("signature-pad-policial-manifestacao")
  );
  // ... outros pads
});
```

**Características**:
- ✅ Suporte a touch (mobile) e mouse (desktop)
- ✅ Renderização suave com interpolação de Bézier
- ✅ Responsivo a diferentes tamanhos de tela

---

#### Botões de Limpeza
**Propósito**: Permite apagar assinaturas individualmente.

**Implementação**:
```javascript
btnClearPolicialManifestacao.addEventListener("click", function () {
  signaturePadPolicialManifestacao?.clear();
});
```

**Operador `?.` (Optional Chaining)**: Previne erros se o pad não estiver inicializado.

---

### 🔷 Módulo de Sincronização de Dados

#### `syncHeaderInputs()` (Conceitual)
**Propósito**: Sincroniza campos de cabeçalho entre "Termo de Manifestação" e "Termo de Compromisso".

**Funcionamento**:
```javascript
manifestacaoInputs.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (compromissoInputs[index]) {
      compromissoInputs[index].value = this.value;
    }
  });
});
```

**Benefício**: Usuário preenche uma vez, ambos documentos são atualizados automaticamente.

---

### 🔷 Módulo de Geração de PDF (`index.html`)

#### `generatePDF()` ⭐ **Função Crítica**
**Propósito**: Converte o documento HTML em PDF de alta qualidade com dimensões A4 precisas.

**Desafio Técnico**: 
Mobile devices têm telas estreitas (360px-414px), mas documentos A4 precisam ter 210mm de largura. Gerar PDF diretamente do layout mobile resultaria em documentos "espremidos" e ilegíveis.

**Solução Implementada**:

```javascript
async function generatePDF() {
  const element = getCurrentActiveTab();

  // 1. BACKUP: Salvar estilos originais
  const originalStyles = {
    width: element.style.width,
    maxWidth: element.style.maxWidth,
    margin: element.style.margin,
    boxSizing: element.style.boxSizing
  };

  // 2. TRANSFORMAÇÃO: Forçar layout desktop/A4
  element.style.width = "210mm";           // Largura exata A4
  element.style.maxWidth = "none";         // Remove limitação
  element.style.margin = "0";
  element.style.boxSizing = "border-box";

  // 3. MODO EXPORTAÇÃO: Adicionar classe para estilos especiais
  element.classList.add("export-mode");

  // 4. LIMPEZA VISUAL: Esconder botões de controle
  const clearButtons = element.querySelectorAll(".clear-button");
  clearButtons.forEach((button) => (button.style.display = "none"));

  // 5. GARANTIA DE CARREGAMENTO: Aguardar todas as imagens
  await Promise.all(
    Array.from(element.querySelectorAll("img")).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  // 6. CAPTURA: Renderizar HTML como imagem
  const canvas = await html2canvas(element, {
    scale: 3,                    // Alta resolução (3x)
    useCORS: true,              // Permitir imagens externas
    allowTaint: true,
    logging: false,
    width: element.offsetWidth,  // Usar largura forçada (210mm)
    height: element.offsetHeight,
    windowWidth: 1200,          // 🔑 TRUQUE: Simular janela desktop
    backgroundColor: "#ffffff",
  });

  // 7. RESTAURAÇÃO: Voltar ao layout original
  element.style.width = originalStyles.width;
  element.style.maxWidth = originalStyles.maxWidth;
  element.style.margin = originalStyles.margin;
  element.style.boxSizing = originalStyles.boxSizing;
  element.classList.remove("export-mode");
  clearButtons.forEach((button) => (button.style.display = "block"));

  // 8. CONVERSÃO: Canvas → PNG → PDF
  const imgData = canvas.toDataURL("image/png", 1.0);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  // 9. CÁLCULO DE DIMENSÕES
  const pdfWidth = 210;  // A4 width
  const pdfHeight = 297; // A4 height
  const margin = 10;
  const usableWidth = pdfWidth - margin * 2;
  const usableHeight = pdfHeight - margin * 2;

  const imgWidth = canvas.width / 3;   // Dividir pela escala
  const imgHeight = canvas.height / 3;

  // 10. PROPORÇÃO: Ajustar para caber na página
  const ratio = Math.min(
    usableWidth / imgWidth,
    usableHeight / imgHeight
  );

  const finalWidth = imgWidth * ratio;
  const finalHeight = imgHeight * ratio;

  // 11. CENTRALIZAÇÃO
  const imgX = (pdfWidth - finalWidth) / 2;
  const imgY = margin;

  // 12. PAGINAÇÃO: Múltiplas páginas se necessário
  if (finalHeight > usableHeight) {
    let yPosition = 0;
    const pageHeight = usableHeight;

    while (yPosition < imgHeight) {
      const sourceY = yPosition;
      const sourceHeight = Math.min(
        pageHeight / ratio,
        imgHeight - yPosition
      );

      if (yPosition > 0) {
        pdf.addPage();
      }

      // Canvas temporário para seção atual
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = canvas.width;
      tempCanvas.height = sourceHeight * 3;

      tempCtx.drawImage(
        canvas,
        0, sourceY * 3,
        canvas.width, sourceHeight * 3,
        0, 0,
        canvas.width, sourceHeight * 3
      );

      const tempImgData = tempCanvas.toDataURL("image/png", 1.0);
      pdf.addImage(
        tempImgData, "PNG",
        imgX, margin,
        finalWidth, sourceHeight * ratio
      );

      yPosition += sourceHeight;
    }
  } else {
    pdf.addImage(imgData, "PNG", imgX, imgY, finalWidth, finalHeight);
  }

  return pdf;
}
```

**Parâmetros de html2canvas**:
- `scale: 3`: Resolução 3x para qualidade de impressão (300 DPI equivalente)
- `windowWidth: 1200`: **Chave do sucesso mobile** - Simula viewport desktop
- `useCORS: true`: Permite carregar imagens de domínios externos (logos)

**Retorno**: Objeto `jsPDF` pronto para download ou compartilhamento

---

#### `exportToPDF()`
**Propósito**: Interface pública para download de PDF.

**Implementação**:
```javascript
async function exportToPDF() {
  const pdf = await generatePDF();
  const activeTabId = getCurrentActiveTab().id;
  
  let filename = "documento";
  if (activeTabId === "relatorio-medico") {
    filename = "relatorio_medico";
  } else if (activeTabId === "termo-manifestacao") {
    filename = "termo_manifestacao";
  } else if (activeTabId === "termo-compromisso") {
    filename = "termo_compromisso";
  }

  pdf.save(`${filename}.pdf`);
}
```

**Fluxo**: Gera PDF → Determina nome do arquivo → Dispara download

---

#### `shareViaWhatsApp()`
**Propósito**: Compartilhamento nativo via Web Share API.

**Implementação**:
```javascript
async function shareViaWhatsApp() {
  const pdf = await generatePDF();
  const blob = pdf.output("blob");

  const activeTabId = getCurrentActiveTab().id;
  let filename = "documento";
  let title = "Documento";

  // ... determinação de nome e título ...

  const file = new File([blob], `${filename}.pdf`, {
    type: "application/pdf",
  });

  if (navigator.share) {
    try {
      await navigator.share({
        files: [file],
        title: title,
        text: `Aqui está o documento: ${title}`,
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      alert("Não foi possível compartilhar. Baixando o PDF...");
      exportToPDF();
    }
  } else {
    alert("Compartilhamento não suportado. Baixando o PDF...");
    exportToPDF();
  }
}
```

**Compatibilidade**:
- ✅ Android Chrome 61+
- ✅ iOS Safari 12.2+
- ✅ Fallback automático para download em navegadores não suportados

**Vantagens**:
- Abre menu nativo do sistema operacional
- Usuário escolhe o app (WhatsApp, Email, Drive, etc.)
- Arquivo já anexado automaticamente

---

#### `getCurrentActiveTab()`
**Propósito**: Identifica qual documento está sendo visualizado.

**Implementação**:
```javascript
function getCurrentActiveTab() {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    if (tabContents[i].classList.contains("active")) {
      return tabContents[i];
    }
  }
  return document.getElementById("relatorio-medico"); // Default
}
```

**Retorno**: Elemento DOM do documento ativo

---

### 🔷 Módulo de Service Worker

#### Registro Condicional
**Propósito**: Registrar Service Worker apenas em produção.

**Implementação**:
```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    if (import.meta.env.PROD) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (registration) {
          console.log("ServiceWorker registrado: ", registration.scope);
        })
        .catch(function (error) {
          console.log("Falha no registro do ServiceWorker: ", error);
        });
    } else {
      // Desenvolvimento: Limpar caches antigos
      navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (reg) {
          reg.unregister();
        });
        if (caches && caches.keys) {
          caches.keys().then(function (keys) {
            keys.forEach(function (key) {
              caches.delete(key);
            });
          });
        }
      });
    }
  });
}
```

**Benefícios**:
- ✅ Funcionamento offline após primeira visita
- ✅ Cache inteligente de assets estáticos
- ✅ Desenvolvimento limpo sem cache persistente

---

## 🎨 Sistema de Estilos

### Classes CSS Customizadas

#### `.export-mode`
**Propósito**: Aplicada temporariamente durante geração de PDF para ajustes visuais.

**Regras Principais**:
```css
.export-mode .tab-content {
  width: 210mm !important;
  min-height: 297mm !important;
  padding: 15mm !important;
  font-size: 12pt !important;
  background-color: white !important;
  box-shadow: none !important;
}
```

**Efeito**: Força dimensões A4 exatas, remove sombras, padroniza fontes.

---

#### `.input-field`
**Propósito**: Campos editáveis inline com sublinhado pontilhado.

```css
.input-field {
  border: none;
  border-bottom: 1px dotted #999;
  padding: 0 2px;
  background: transparent;
}
```

**Uso**: Campos como nome, data, RAI, etc.

---

#### `.signature-pad`
**Propósito**: Canvas de assinatura com borda em modo edição.

```css
.signature-pad {
  border: 1px solid #000;
  background-color: #fff;
  width: 100%;
  max-width: 500px;
}

.export-mode .signature-pad {
  border: none; /* Remove borda no PDF */
}
```

---

### Media Queries de Impressão

```css
@media print {
  @page {
    size: auto;
    margin: 10mm;
  }

  .no-print {
    display: none !important;
  }

  .tab-content.active {
    display: block !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

**Funcionalidades**:
- Oculta botões e controles (`.no-print`)
- Preserva cores de fundo e bordas
- Otimiza para impressão física

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ e npm 7+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Ald3b4r4n/UTILITY-PRO.git

# Entre no diretório
cd UTILITY-PRO

# Instale as dependências
npm install
```

### Scripts Disponíveis

```bash
# Desenvolvimento (servidor local com HMR)
npm run dev

# Build de produção
npm run build

# Lint do código
npm run lint

# Testes (se configurados)
npm run test
```

### Acesso Local
Após `npm run dev`, acesse: `http://localhost:5173`

---

## 📱 Instalação como PWA

### Android
1. Abra o site no Chrome
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. O app será instalado como nativo

### iOS
1. Abra o site no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"

---

## 🔧 Configurações Avançadas

### Vite (`vite.config.js`)
```javascript
export default {
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
}
```

### Tailwind (`tailwind.config.js`)
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}
```

### ESLint (`eslint.config.js`)
```javascript
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        SignaturePad: 'readonly',
      }
    }
  }
];
```

---

## 📊 Performance

### Métricas Típicas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 90+

### Otimizações Implementadas
- ✅ Lazy loading de imagens
- ✅ Code splitting automático (Vite)
- ✅ Compressão de assets
- ✅ Cache agressivo via Service Worker

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

**Antonio Rafael**

- WhatsApp: [+55 61 98288-7294](https://wa.me/5561982887294)
- GitHub: [@Ald3b4r4n](https://github.com/Ald3b4r4n)
- Portfólio: [ald3b4r4n.github.io/portfolio](https://ald3b4r4n.github.io/portfolio/)

---

## 🙏 Agradecimentos

- Polícia Militar de Goiás pela especificação dos documentos
- Comunidade open-source pelas excelentes bibliotecas utilizadas

---

<div align="center">

**Desenvolvido com ❤️ para facilitar o trabalho policial**

</div>
