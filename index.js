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
let select = document.getElementById("idSelectMoedas");

select.onclick = async function () {
  let moedas = await buscaMoedaFetch();

  moedas.value.forEach(function (element) {
    let option = document.createElement("option");
    option.value = element.simbolo;
    option.textContent += element.simbolo;
    select.appendChild(option);
  });

  let cotacao = await cotacaoDoDia(select.value);
  
};

/* consumo de api com fetch */
async function buscaMoedaFetch() {
  let resposta = await fetch(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda"
  );

  return resposta.json();
}

async function cotacaoDoDia(moeda) {
  let data = new Date().toLocaleDateString().replaceAll("/", "-");
  let resposta = await fetch(" https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodoFechamento(codigoMoeda=@codigoMoeda,dataInicialCotacao=@dataInicialCotacao,dataFinalCotacao=@dataFinalCotacao)?@codigoMoeda='"+ moeda +"'&@dataInicialCotacao='"+data+"'&@dataFinalCotacao='01-11-2023'&$format=json&$select=cotacaoCompra,cotacaoVenda");
 
  return resposta.json();
}
