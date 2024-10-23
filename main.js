const form = document.getElementById('formulario-agenda');
const nomeListaContato = [];
const telListaContato = []; 
const addSucesso = '<span class="contato-adicionado add-sucesso"> CONTATO ADICIONADO COM SUCESSO </span>';
let linhas = ' ';

// Formatação do telefone enquanto digita
const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', function () {
    let value = inputTelefone.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length > 11) {
        value = value.slice(0, 11); // Limita a 11 dígitos
    }

    if (value.length > 2) {
        // Formata o número
        value = `(${value.slice(0, 2)}) ${value.slice(2, 3)}${value.slice(3, 7)}-${value.slice(7, 11)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }

    inputTelefone.value = value;
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    setTimeout(function() {
        document.getElementById('contato-adicionado').style.display = 'none';
    }, 5000);
});

function adicionaLinha() {
    const inputNomeContato = document.getElementById('nome');
    const inputTelContato = document.getElementById('telefone');
    
    // Validação do telefone: formato (xx) xxxxx-xxxx
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/; // Exemplo: (11) 98765-4321

    if (!phonePattern.test(inputTelContato.value)) {
        alert('Telefone inválido! Por favor, use o formato (xx) xxxxx-xxxx.');
        return; // Impede a adição se o telefone for inválido
    }

    if (nomeListaContato.includes(inputNomeContato.value)) {
        alert(`O nome ${inputNomeContato.value} já consta na lista com o telefone: ${inputTelContato.value}`);
    } else {
        nomeListaContato.push(inputNomeContato.value);
        telListaContato.push(inputTelContato.value);
        let linha = "<tr>";
        linha += `<td> ${inputNomeContato.value} </td>`;
        linha += `<td> ${inputTelContato.value} </td>`;
        linha += "</tr>";
        linhas += linha;
        document.getElementById('contato-adicionado').innerHTML = addSucesso;
        inputNomeContato.value = "";
        inputTelContato.value = "";
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}
