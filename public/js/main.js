var tempoinicial = $("#tempo-restante").text();
var campo = $(".campo-digitacao");


$(function(){
	atualizatamanhofrase();
	inicializacontador();
	inicializacronometro();
	$("#botao-reiniciar").click(reiniciajogo);
	inicializamarcadores();
	atualizaPlacar();
	botaoSelecionaUsuario();
	$(".tooltip").tooltipster();
	tooltipsterShow();

});

function tooltipsterShow (){
	$(".restoreInformation").tooltipster();
	$(".scoreButton").tooltipster();
	$(".newSentences").tooltipster();
	$(".chooseYouself").tooltipster();
	$(".saveScore").tooltipster();
};

function botaoSelecionaUsuario(){
	$("#usuarios").selectize({
	    create: true,
	    sortField: 'text'
	});
}
function atualizatamanhofrase() {

	var frase = $(".frase").text();
	var numeropalavras = frase.split(" ").length;
	var tamanhofrase = $("#tamanho-frase");
	tamanhofrase.text(numeropalavras); 
}

function atualizaTempo(tempo){
	tempoinicial = tempo;
	$("#tempo-restante").text(tempo);
}

function inicializacontador() {
	campo.on("input", function(){
		var conteudo = campo.val();		
		var qtdpalavras = conteudo.trim().split(/\s+/).length;	

		$("#conta-palavras").text(qtdpalavras);

		var qtdcaracteres = conteudo.length;
		$("#conta-caracteres").text(qtdcaracteres);

		
	})
}

function inicializamarcadores() {
	campo.on("input", function(){
		var frase = $(".frase").text();
		var digitado = campo.val()
		var qtdpalavras = digitado.trim().split(/\s+/).length;
		var comparavel = frase.substr(0,digitado.length);
		var contaCaracteres = digitado.length;
		
		if(digitado == comparavel){
			$('#conta-points').text(contaCaracteres+qtdpalavras);
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else {
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}

function inicializacronometro () {
	campo.one("focus", function(){
		ativabotoao();
		var temporestante = $("#tempo-restante").text();
		var paracronometro = setInterval(function(){
			temporestante--;
			$("#tempo-restante").text(temporestante);
			if( temporestante < 1) {
				clearInterval(paracronometro);
				finalizajogo();
				
				
			}
		},1000);
		
	})
}


function finalizajogo() {
	campo.attr("disabled", true);
	campo.addClass("campo-desativado");
	desabilitaBotao();
	insereplacar();
}




function reiniciajogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#conta-palavras").text(0);
	$("#conta-caracteres") .text(0);
	$("#conta-points").text(0);
	$("#tempo-restante").text(tempoinicial);
	inicializacronometro();
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
	

}
function ativabotoao(){
	$("#botao-reiniciar").addClass("desativa-botao");
	$("#botao-placar").addClass("desativa-botao");
	$("#botao-frase").addClass("desativa-botao");
	$("#botao-frase-id").addClass("desativa-botao");
	$("#botao-sync").addClass("desativa-botao");
	$(".select-usuarios").addClass("desativa-botao");
	$("#frase-id").addClass("desativa-botao");
}
function desabilitaBotao(){
	$("#botao-reiniciar").removeClass("desativa-botao");
	$("#botao-placar").removeClass("desativa-botao");
	$("#botao-frase").removeClass("desativa-botao");
	$("#botao-frase-id").removeClass("desativa-botao");
	$("#botao-sync").removeClass("desativa-botao");
	$(".select-usuarios").removeClass("desativa-botao");
	$("#frase-id").removeClass("desativa-botao");
}
