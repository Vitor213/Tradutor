const express = require ('express')
const axios = require ('axios')
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = 4000

app.get('/traduzir', async (req, res) => {
    const frase = req.query.frase;

    if (!frase) {
        return res.status(400).json({ erro: 'Frase não fornecida' });
    }

    console.log('Recebida frase para tradução:', frase); // <-- log antes da requisição

    try {
        const resposta = await axios.post('https://libretranslate.de/translate', {
            q: frase,
            source: 'pt',
            target: 'en',
            format: 'text'
        });
        console.log('DEBUG: Resposta da API externa:', resposta.data);

        if (resposta.data.translatedText) {
            res.json({
                original: frase,
                traducao: resposta.data.translatedText
            });
        } else {
            res.json({
                original: frase,
                traducao: null,
                erro: 'Não foi possível obter a tradução',
                resposta: resposta.data // Adiciona resposta da API externa para debug
            });
        }
    } catch (erro) {
        console.error('Erro na requisição para a API externa:', erro); // <-- log detalhado
        res.status(500).json({ erro: 'Erro ao traduzir' });
    }
});

app.get('/', (req, res) => {
    res.send('API do Tradutor - use /traduzir?frase=...');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
