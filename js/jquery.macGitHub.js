(function($) {
	var todasLinhas = '';
	$.fn.macGitHub = function(options) {
			
			var vOptions = $.extend({}, $.fn.macGitHub.defaults, options);

			// oculta a div
			$(this).hide();

			// Titulo
			if (vOptions.titulo) {
				$(this).append('<h2>'+ vOptions.texto +'</h2>');
			}

			// Listagem dos repositorios
			$(this).append('<ul id="git-repositorio"></ul>');

			$("ul#git-repositorio").hide();

			var pl = $('<p id="'+ vOptions.preloaderId +'">'+ vOptions.loaderText +'</p>');
			$(this).append(pl);

			$(this).show();			

			$(this).append('<div id="footer">Siga-me no git: <a href="http://github.com/' + vOptions.usuario + '">http://github.com/' + vOptions.usuario + '</a></div>');

			var montaLinha = '';
			$.getJSON("http://github.com/api/v2/json/repos/show/" + vOptions.usuario +"?callback=?", function(data) {
				if(data)
				{
					$(pl).remove();

					$.each(data.repositories, function(i,item){
						montaLinha = montaLinha + "<li>";
						montaLinha = montaLinha + "<a href='" + item.url + "' title='" + item.name + "' target='_blank'>" + item.name;
						montaLinha = montaLinha + "</a> - <span class='watchers'> Watchers: <a href='http://github.com/" + vOptions.usuario + "/" + item.name + "/toggle_watch' target='_blank'>" + item.watchers + "</a></span>/";
						montaLinha = montaLinha + "<span class='forks'>Forks:" + item.forks + "</span>";
						montaLinha = montaLinha + "</li>";	

						//$("<li>").attr("text", item.description).appendTo("ul#git-repositorio");
						$("ul[id*=git-repositorio]").append(montaLinha);
						
						montaLinha = '';						

						//Limitando para quantos itens deseja colocar			    
						if(vOptions.itens){
							if ( i == vOptions.numItens -1 ) return false;
						}
					  });
				}
			});

			// Mostrar os repositorios
			if (vOptions.slideIn) {
				$("ul#git-repositorio").slideDown(1000);
			}
			 // plugin defaults
			$.fn.macGitHub.defaults = {
				usuario: null,
				titulo: true,
				texto: "Meus repositorios",
				loaderText: "",
				preloaderId: "preloader",
				slideIn: true,
				itens: false,
				numItens: 0
			};

	}

})(jQuery);
