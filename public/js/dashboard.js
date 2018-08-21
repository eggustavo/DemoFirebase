var canvasGraficoBarras = document.getElementById('canvasGraficoBarras').getContext('2d');

var myBarChart = new Chart(canvasGraficoBarras, {
    type: 'bar',
    data: {
        labels: ["Contas à Receber", "Contas à Pagar"],
        datasets: [{
            label: "Valores",
            data: [],
            backgroundColor: [
                //'rgba(255, 99, 132, 0.2)',
                'rgba(0,191,255)',
                'rgba(255, 0, 0)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255, 159, 64, 1)'
            ],            
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
            display: false
        }        
    }    
});

firebase.database().ref('financeiro').on('value', function(snapshot) {
    var valCr = 0;
    var valCp = 0;
    snapshot.forEach(function (item) {
        if (item.val().origem === 'CR') {
            valCr = valCr + parseFloat(item.val().valor);
        } else {
            valCp = valCp + parseFloat(item.val().valor);
        }
    });

    myBarChart.data.datasets[0].data[0] = valCr;
    myBarChart.data.datasets[0].data[1] = valCp;
    myBarChart.update();
});