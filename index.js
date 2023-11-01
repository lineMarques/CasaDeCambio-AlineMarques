
/* Consumo de API com AJAX */ 

/* var btBuscarMoedaAjax = document.getElementById("idBtnMoedasAjax");

btBuscarMoedaAjax.onclick = function () {
  buscaMoedaAjax();
};

function buscaMoedaAjax() {
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

  moedaOBJ.value.forEach((element) => {
    console.table("AJAX", element.simbolo);
  });
} */ 


/* consumo de api via fetch */
var btBuscarMoedaFetch = document.getElementById("idBtnMoedasFetch");

btBuscarMoedaFetch.onclick = async function () {
  let moedas = await buscaMoedaFetch();
  console.log(moedas);
};

/* consumo de api com fetch */
async function buscaMoedaFetch() {
  var resposta = await fetch(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda"
  );

  return resposta.json();
}
