/* consumo de api via fetch */

let select = document.getElementById("idSelectMoedas");

select.onclick = async function (event) {
  let moedas = await buscaMoedaFetch();
  let opcaoTransacao = document.querySelector("input[name=options]:checked").value;

  moedas.value.forEach(function (element) {
    let option = document.createElement("option");
    option.value = element.simbolo;
    option.textContent += element.nomeFormatado;
    select.appendChild(option);
  });
  
  let cotacao = await cotacaoDoDia(select.value);

  if (opcaoTransacao == "vender") {
    document.getElementById("output").innerText = 'Cotação do dia para venda: ' + cotacao.value[0].cotacaoVenda;
    
  }else{
    document.getElementById("output").innerText = 'Cotação do dia para compra: ' + cotacao.value[0].cotacaoCompra;
  }
};

/* consumo de api com fetch lista de moedas */
async function buscaMoedaFetch() {
  let resposta = await fetch(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda"
  );

  return resposta.json();
}

/* consumo de api com fetch cotação de moeda */
async function cotacaoDoDia(moeda) {
  let data = new Date().toLocaleDateString("en-US").replaceAll("/", "-");
  let resposta = await fetch(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodoFechamento(codigoMoeda=@codigoMoeda,dataInicialCotacao=@dataInicialCotacao,dataFinalCotacao=@dataFinalCotacao)?@codigoMoeda='" +
      moeda + "'&@dataInicialCotacao='" + data + "'&@dataFinalCotacao='" + data + "'&$format=json&$select=cotacaoCompra,cotacaoVenda"
  );

  return resposta.json();
}
