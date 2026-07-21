function atualizarTexto(campo) {
  campo.value = campo.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

// Traduz utilizando a API pública MyMemory
async function traduzir() {
  const res = document.getElementById("resultado");
  const campo = document.getElementById("texto");
  const frase = campo.value.trim();

  if (!frase) {
    res.innerText = "⚠️ Digite uma frase para traduzir.";
    return;
  }

  res.innerText = "Traduzindo... ⏳";

  try {
    // Chama a API pública MyMemory
    const resposta = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(frase)}&langpair=pt|en`,
    );

    const dados = await resposta.json();

    if (dados.responseData.translatedText) {
      res.innerText = dados.responseData.translatedText;
    } else {
      res.innerText = "❌ Erro ao obter tradução.";
    }
  } catch (erro) {
    console.error("Erro:", erro);
    res.innerText = "⚠️ Falha na conexão com o serviço de tradução.";
  }
}
