//Botões
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authGitHubButton = document.getElementById('authGitHubButton');
var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');

//Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

//Display
var displayName = document.getElementById('displayName');

//Criar Novo Usuário
createUserButton.addEventListener('click', function() {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function() {
            alert('Bem vindo ' + emailInput.value);
        })
        .catch(function(error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao Cadastrar, verifique o erro no console.');
        });
});

//Autenticação com E-mail e Senha
authEmailPassButton.addEventListener('click', function() {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function(result) {
            console.log(result);
            displayName.innerText = 'Bem vindo, ' + emailInput.value;
            alert('Autenticado ' + emailInput.value);
        })
        .catch(function(error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.');
        });
});

//Autenticação Anônima
authAnonymouslyButton.addEventListener('click', function() {
    firebase
        .auth()
        .signInAnonymously()
        .then(function(result) {
            console.log(result);
            displayName.innerText = 'Bem vindo, desconhecido';
            alert('Autenticado Anonimamente.');
        })
        .catch(function(error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.');
        });
});

//Autenticação GitHub
authGitHubButton.addEventListener('click', function() {
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});

//Autenticação Google
authGoogleButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});

//Autenticação Facebook
authFacebookButton.addEventListener('click', function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});

//Autenticação Twitter
authTwitterButton.addEventListener('click', function() {
    var provider = new firebase.auth.TwitterAuthProvider();
    signIn(provider);
});

//Logout
logOutButton.addEventListener('click', function() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        }, function(error) {
            console.error(error);
        });
});

function signIn(provider) {
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            console.log(result);
            var token = result.credential.accessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.displayName;
        })
        .catch(function(error) {
            console.log(error);
            alert('Falha na autenticação.');
        });
}



