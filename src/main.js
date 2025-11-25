let signaturePadAutorCompromisso;

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar os pads de assinatura
  const canvasPolicialManifestacao = document.getElementById(
    "signature-pad-policial-manifestacao"
  );
  if (canvasPolicialManifestacao) {
    signaturePadPolicialManifestacao = new SignaturePad(
      canvasPolicialManifestacao
      const manifestacaoInputs =
        termoManifestacao.querySelectorAll(".header-input");
      const compromissoInputs =
        termoCompromisso.querySelectorAll(".header-input");

      const len = Math.min(manifestacaoInputs.length, compromissoInputs.length);
      for (let i = 0; i < len; i++) {
      // Sincronizar de Manifestação para Compromisso
        });
      });

      compromissoInputs.forEach((input, index) => {
        input.addEventListener("input", function () {
          if (manifestacaoInputs[index]) {
            manifestacaoInputs[index].value = this.value;
          }
      // Sincronizar de Compromisso para Manifestação
        });
      });
    }
  };

  syncHeaderInputs();

  // Botões para limpar assinaturas
  const btnClearPolicialManifestacao = document.getElementById(
    "clear-policial-manifestacao"
  );
  if (btnClearPolicialManifestacao) {
    btnClearPolicialManifestacao.addEventListener("click", function () {
      signaturePadPolicialManifestacao?.clear();
    });
  }

  const btnClearVitimaManifestacao = document.getElementById(
    "clear-vitima-manifestacao"
  );
  if (btnClearVitimaManifestacao) {
    btnClearVitimaManifestacao.addEventListener("click", function () {
      signaturePadVitimaManifestacao?.clear();
    });
  }

  const btnClearPolicialCompromisso = document.getElementById(
    "clear-policial-compromisso"
  );
  if (btnClearPolicialCompromisso) {
    btnClearPolicialCompromisso.addEventListener("click", function () {
      signaturePadPolicialCompromisso?.clear();
    });
  }

  const btnClearAutorCompromisso = document.getElementById(
    "clear-autor-compromisso"
  );
  if (btnClearAutorCompromisso) {
    btnClearAutorCompromisso.addEventListener("click", function () {
      signaturePadAutorCompromisso?.clear();
    });
  }

  // Registrar Service Worker somente em produção e limpar em desenvolvimento
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
});

// Navegação entre home e documentos
// Sistema de Roteamento por Hash
function handleRoute() {
  // Obtém o hash atual ou define 'home' como padrão
  const hash = window.location.hash.replace("#", "") || "home";

  const homePage = document.getElementById("home-page");
  const documentsArea = document.getElementById("documents-area");

  // Rota: Home
  if (hash === "home") {
    if (homePage) homePage.style.display = "flex";
    if (documentsArea) documentsArea.style.display = "none";

    // Restaura background original
    document.body.className =
      "bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen";
    window.scrollTo(0, 0);
    return;
  }

  // Rota: Documentos
  // Verifica se o hash corresponde a um documento válido (tab)
  const validTabs = [
    "relatorio-medico",
    "termo-manifestacao",
    "termo-compromisso",
  ];

  if (validTabs.includes(hash)) {
    if (homePage) homePage.style.display = "none";
    if (documentsArea) documentsArea.style.display = "block";

    // Altera background para modo documento
    document.body.className = "bg-gray-100 p-4";

    // Atualiza UI das Tabs
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
    const activeTab = document.getElementById("tab-" + hash);
    if (activeTab) activeTab.classList.add("active");

    // Atualiza Conteúdo das Tabs
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove("active");
    }
    const activeContent = document.getElementById(hash);
    if (activeContent) activeContent.classList.add("active");

    window.scrollTo(0, 0);
  }
}

// Inicializa o roteador
window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

// Funções globais de compatibilidade (agora apenas atualizam o hash)
window.showDocument = function (documentId) {
  window.location.hash = documentId;
};

window.backToHome = function () {
  window.location.hash = "home";
};

window.openTab = function (evt, tabName) {
  if (evt) evt.preventDefault();
  window.location.hash = tabName;
};

// Removida função de rastrear aba ativa (não utilizada)

// Detectar se está em modo PWA
window.isPWA = function () {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone ||
    document.referrer.includes("android-app://")
  );
};
