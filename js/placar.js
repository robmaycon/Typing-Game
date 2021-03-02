$("#botao-placar").click(mostraplacar);
$("#botao-sync").click(sincronizaPlacar);


function insereplacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPoints = $("#conta-points").text();
   
    var linha = novalinha(usuario,numPoints);
    linha.find(".botao-remove").click(removelinha);

    $(".placar").slideDown(500);
    scrollplacar();

    corpoTabela.append(linha);
}

function scrollplacar() {
	var posicaoplacar = $(".placar").offset().top;
	$("html, body").animate(
	{
		scrollTop: posicaoplacar
	},1000);
}

function novalinha(usuario, palavras){

	var linha = $("<tr>");
	var colunausuario = $("<td>").text(usuario);
	var colunapalavra = $("<td>").text(palavras);
	var colunaremover = $("<td>");
	var link = $("<a>").addClass("botao-remove").attr("href","#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colunaremover.append(link);
	linha.append(colunausuario);
	linha.append(colunapalavra);
	linha.append(colunaremover);
	return linha;
}
function removelinha(){
    event.preventDefault();
	var linha = $(this).parent().parent()
	linha.fadeOut(1000);
	setTimeout(function() {
		linha.remove();
	},1000);

}

function mostraplacar() {
	$(".placar").stop().slideToggle(600);

}

function sincronizaPlacar() {
	var placar = [];
	var linha = $("tbody>tr");
	linha.each(function(){
		var usuario = $(this).find("td:nth-child(1)").text();

		var palavras = $(this).find("td:nth-child(2)").text();

		var score = {
			usuario: usuario,
			pontos: palavras
		};
		placar.push(score);
	})

	var dados = {
		placar: placar
	};
	$.post("http://localhost:3000/placar",dados, function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "Score Saved!")
	}).fail(function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "Something is Wrong, try again!");
	}).always(function(){
		setTimeout(function(){
			$(".tooltip").tooltipster("close");
		},1500);
	})
}

function atualizaPlacar (){
	$.get("http://localhost:3000/placar", function(data){
		$(data).each(function(){
			var linha = novalinha(this.usuario, this.pontos);
			linha.find(".botao-remove").click(removelinha);
			$("tbody").append(linha);
		})
	});
}