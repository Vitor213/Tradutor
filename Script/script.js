/*function atualizarTexto(campos){
    let res = document.getElementById('resultado')
    let campo = document.getElementById('texto')
    campos.value = campos.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
}

function traduzir() {
    let res = document.getElementById('resultado')
    let campo = document.getElementById('texto')
    if (campo.value.trim().length === 0) {
        window.alert("Digite uma frase para podermos prosseguir!");
    } else {
        let frase = campo.value.trim();

        // Torna a função assíncrona para usar await
        (async () => {
            try {
                let resposta = await fetch(`http://localhost:4000/traduzir?frase=${encodeURIComponent(frase)}`);
                let dados = await resposta.json();

                if (dados.traducao) {
                    res.innerText = `Tradução: ${dados.traducao}`;
                } else if (dados.erro) {
                    res.innerText = `Erro: ${dados.erro}`;
                }
            } catch (erro) {
                res.innerText = 'Erro ao conectar com a API';
                console.error(erro);
            }
        })();
    }
} */

    // Atualiza o texto digitado (mantém apenas letras e espaços)
function atualizarTexto(campo) {
  campo.value = campo.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}

// Traduz utilizando a API pública MyMemory
async function traduzir() {
  const res = document.getElementById('resultado');
  const campo = document.getElementById('texto');
  const frase = campo.value.trim();

  if (!frase) {
    res.innerText = '⚠️ Digite uma frase para traduzir.';
    return;
  }

  res.innerText = 'Traduzindo... ⏳';

  try {
    // Chama a API pública MyMemory
    const resposta = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(frase)}&langpair=pt|en`
    );

    const dados = await resposta.json();

    if (dados.responseData.translatedText) {
      res.innerText = dados.responseData.translatedText;
    } else {
      res.innerText = '❌ Erro ao obter tradução.';
    }
  } catch (erro) {
    console.error('Erro:', erro);
    res.innerText = '⚠️ Falha na conexão com o serviço de tradução.';
  }
}


     
       