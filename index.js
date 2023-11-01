var btBuscarMoeda = document.getElementById("idBtnMoedas");

btBuscarMoeda.onclick = function () {
    buscaMoeda();
};

function buscaMoeda() {
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda"
  );

  xhr.addEventListener("load", function () {
    let resposta = xhr.responseText;
    imprimirMoeda(resposta);
  });

  xhr.send();
}

function imprimirMoeda(moedaJSON) {
  let moedaOBJ = JSON.parse(moedaJSON);

  moedaOBJ.value.forEach(element => {
    console.table('AJAX', element.simbolo)
  });       
}
