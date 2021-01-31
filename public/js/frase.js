$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
/* desabilita o botao quando o jogo comecar*/
function fraseAleatoria(){
	$("#spinner").toggle();
	$.get("http://localhost:3000/frases",trocafrasealeatoria)
	.fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").stop().toggle();
        },1500);
    })
    .always(function(){
    	$("#spinner").toggle();
    })

}

function trocafrasealeatoria(data){
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);
	frase.text(data[numeroAleatorio].texto);
	atualizatamanhofrase();
	atualizaTempo(data[numeroAleatorio].tempo);

}
function buscaFrase(){
	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();
	console.log("id da minha frase" + fraseId);
	var dados = { id: fraseId};
	$.get("http://localhost:3000/frases",dados, trocaFrase)
	.fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").stop().toggle();
        },1500);
    })
    .always(function(){
    	$("#spinner").toggle();
    })
}

function trocaFrase(data){
	var frase = $(".frase");
	frase.text(data.texto);
	atualizatamanhofrase();
	atualizaTempo(data.tempo);
};