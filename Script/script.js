function atualizarTexto(campos){
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
}

     
       