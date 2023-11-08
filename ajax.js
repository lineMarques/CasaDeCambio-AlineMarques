/*  Consumo de API com AJAX e uso de função callback em imprimiTela*/

let select = document.getElementById("idSelectMoedas");

select.onclick = function () {
  buscaMoedaAjax(imprimirMoeda);
};

function buscaMoedaAjax(imprimiTela) {
  var xhr = new XMLHttpRequest();

  xhr.open( 
    "GET",
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda"
  );

  xhr.addEventListener("load", function () {
    let resposta = xhr.responseText;
    imprimiTela(resposta);
  });

  xhr.send();
}

function imprimirMoeda(moedaJSON) {
  let moedaOBJ = JSON.parse(moedaJSON);
  
  moedaOBJ.value.forEach(function (element) {
    let option = document.createElement("option");
    option.value = element.simbolo;
    option.textContent += element.nomeFormatado;
    select.appendChild(option);
  });
}