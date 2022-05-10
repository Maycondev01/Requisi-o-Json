const limparFormulario = (endereco) => { // Limpar Elementos do HTML
    document.getElementById('endereco').value = '';     // Colocar valor em branco
    document.getElementById('bairro').value = '';   // Colocar valor em branco
    document.getElementById('cidade').value = '';   // Colocar valor em branco
    document.getElementById('estado').value = '';   // Colocar valor em branco
}

const preencherFormulario = (endereco) => { // Preencher Elementos no HTML usando a API JSON
    document.getElementById('endereco').value = endereco.logradouro; // Logadouro = API
    document.getElementById('bairro').value = endereco.bairro; // Bairro = API
    document.getElementById('cidade').value = endereco.localidade; // Localidade = API
    document.getElementById('estado').value = endereco.uf;  // uf = API
}


const eNumero = (numero) => /^[0-9]+$/.test(numero); // INICIAR UM TESTE NO CEP. ^ = INICIO; DE 0 a 9. $= FIM: true
const cepValido = (cep) => cep.length == 8 && eNumero(cep);  // SE O TAMANHO DO CEP = 8 E eNumero de 0-9: True

const pesquisarCep = async() => {
    limparFormulario(); // SE DER FALSE LIMPA OS ELEMENTOS DO HTML
    const cep = document.getElementById('cep').value; // Valor do Elemento CEP
    const url = `http://viacep.com.br/ws/${cep}/json/`; // CONCATENAR O VALOR DO CEP NA API JSON.
    if (cepValido(cep)) { // SE CEPVALIDO = TRUE, ENTÃO...
        const dados = await fetch(url); // AGUARDAR A FETCH(PROMESSA) DE OBTER OS DADOS DA URL
        const endereco = await dados.json(); // DEPOIS QUE PEGOU OS DADOS DA URL, AGORA TRANSFORMAR EM JSON.
        if(endereco.hasOwnProperty('erro')) { // SE DER ERRO ENTÃO...
            document.getElementById('endereco').value = 'CEP não encontrado';
        } else { // SE NÃO, ENTÃO PREENCHER FORMULARIO COM TODOS VALORES EM HTML
            preencherFormulario(endereco);
        }
    } else { // SE NÃO ENTÃO...
        document.getElementById('endereco').value = 'CEP incorreto'
    }
}

document.getElementById('cep') // PEGAR ELEMENTO DO ID CEP DO HTML
.addEventListener('focusout', pesquisarCep); // ADICIONAR EVENTO DE APÓS PREENCHER