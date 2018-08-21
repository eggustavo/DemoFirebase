var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//Ouvir o evento change
fileButton.addEventListener('change', function(e) {
    //Obter o arquivo
    var file = e.target.files[0];

    //Referenciar o Storage
    var storageRef = firebase.storage().ref('arquivos/' + file.name);

    //Enviar o arquivo
    var task = storageRef.put(file);

    //Atualizar a Progress Bar
    task.on('state_changed', 
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err){
            console.error(err);
        },
        function complete() {
            alert('Envio completo!');
        }    
    );
});