var origemInput = document.getElementById('origemInput');
var valorInput = document.getElementById('valorInput');
var btnAdicionar = document.getElementById('btnAdicionar');

//Adicionando evento no click no botão
btnAdicionar.addEventListener('click', function() {
    create(origemInput.value, valorInput.value);
});

function create(origem, valor) {
    var data = {
        origem: origem,
        valor: valor
    };

    firebase.database().ref().child('financeiro').push(data);

    origemInput.value = 'CP';
    valorInput.value = '';    
}