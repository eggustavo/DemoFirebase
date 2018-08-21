var nomeInput = document.getElementById('nomeInput');
var idadeInput = document.getElementById('idadeInput');
var btnAdicionar = document.getElementById('btnAdicionar');
var listaPessoas = document.getElementById('listaPessoas');

//Adicionando evento no click no botão
btnAdicionar.addEventListener('click', function() {
    create(nomeInput.value, idadeInput.value);
});

function create(nome, idade) {
    var data = {
        nome: nome,
        idade: idade
    };

    firebase.database().ref().child('usuarios').push(data);

    nomeInput.value = '';
    idadeInput.value = '';
}

//Acessando os dados
firebase.database().ref('usuarios').on('value', function(snapshot) {
    listaPessoas.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().nome + ': ' + item.val().idade));
        listaPessoas.appendChild(li);
    });
});