function changeRegion(item) {
	let regions = document.querySelectorAll(".region");
	for (let i = 0; i < regions.length; i++) {
		regions[i].classList.add("hidden");
	}
	let subtitleLinks = document.querySelectorAll(".subtitle-links li a");
	for (let i = 0; i < subtitleLinks.length; i++) {
		subtitleLinks[i].classList.remove("active");
	}
	document.getElementsByClassName(item.dataset.region)[0].classList.remove("hidden");
	item.classList.add("active");
}

function openImage(imageSrc, item) {
	const figureBtn = document.querySelector("#" + item);
	document.querySelector(".dialog-figure").setAttribute("src", imageSrc);
	let figureBtns = document.querySelectorAll(".figure-btn");
	for (let i = 0; i < figureBtns.length; i++) {
		figureBtns[i].classList.remove("active");
	}
	figureBtn.classList.add("active");
}

function openDialog(item) {
	const title = document.querySelector(".dialog-title");
	const content = document.querySelector(".dialog-content");
	const model = item.dataset.model;
	const variable = item.dataset.variable;
	const urlBase = item.dataset.urlBase;
	const hs = item.dataset.hs.split(" ");
	title.innerHTML = item.dataset.title;
	let src = urlBase.replace("[model]", model).replace("[variable]", variable).replace("[hs]", hs[0]);
	let text = `<img class="dialog-figure" src="${src}" alt="${model}" />`;
	text += `<ul class="figure-list"><li>Horários: </li>`;
	hs.map((item, index) => {
		const imageSrc = urlBase.replace("[model]", model).replace("[variable]", variable).replace("[hs]", item);
		const active = index == 0 ? " active" : "";
		text += `<li><button class="figure-btn btn-open-image ${active}" id="figure-btn-${item}" onclick="openImage('${imageSrc}', 'figure-btn-${item}')">${item}</button></li>`;
	});
	text += `</ul>`;
	content.innerHTML = text;

	dialog.show();
}

function closeDialog() {
	dialog.close();
}


// ________________________

// Mapeamento dos nomes dos botões para os nomes dos selects e opções correspondentes
var modeloSelecionado = {
	'wrf': ['024h', '048h', '072h', '096h', '120h', '144h', '168h'],
	'brams': ['024h', '048h', '072h', '096h', '120h', '144h', '168h'],
	'eta': ['024h', '048h', '072h', '096h', '120h', '144h', '168h'],
	'smec': ['024h', '048h', '072h', '096h', '120h', '144h', '168h'],
	'multi': ['10mm', '25mm', '50mm', '75mm', '100mm', '150mm'],
	'bam': ['Semana 1', 'Semana 2']
};

// Adiciona um evento de clique a cada botão
document.querySelectorAll('.btns-container button').forEach(function(button) {
	button.addEventListener('click', function() {
		// Remove a classe 'active' de todos os botões
		document.querySelectorAll('.btns-container button').forEach(function(btn) {
			btn.classList.remove('active');
		});
		// Adiciona a classe 'active' ao botão clicado
		button.classList.add('active');
		// Remove todos os conteúdos anteriores
		document.querySelectorAll('.carousel-inner .carousel-item').forEach(function(item) {
			item.remove();
		});
		// Obtém o modelo selecionado
		var modelo = button.getAttribute('aria-label');
		// Obtém os botões para o modelo selecionado
		var botoes = modeloSelecionado[modelo];
		// Cria uma div para os botões
		var div = document.createElement('div');
		div.classList.add('carousel-item', 'active');
		div.innerHTML = '<div class="text" id="' + modelo + '"></div>';
		// Adiciona os botões de "Precipitação Diária" à div, exceto para "Multimodelos" e "BAM"
		if (modelo !== 'multi' && modelo !== 'bam') {
			var divDiaria = document.createElement('div');
			divDiaria.innerHTML = '<h4>Precipitação Diária:</h4>';
			botoes.forEach(function(btn) {
				var buttonElement = document.createElement('button');
				var aElement = document.createElement('a');
				aElement.href = '';
				aElement.target = '_blank';
				aElement.textContent = btn;
				buttonElement.appendChild(aElement);
				divDiaria.appendChild(buttonElement);
			});
			div.querySelector('.text').appendChild(divDiaria);
		}
		// Adiciona a seção de "Precipitação Acumulada" se não for "Multimodelos" ou "BAM"
		if (modelo !== 'multi' && modelo !== 'bam') {
			var divAcumulada = document.createElement('div');
			divAcumulada.classList.add('text', 'acumulada');
			divAcumulada.innerHTML = '<h4>Precipitação Acumulada:</h4>';
			botoes.forEach(function(btn) {
				var buttonElement = document.createElement('button');
				var aElement = document.createElement('a');
				aElement.href = '';
				aElement.target = '_blank';
				aElement.textContent = btn;
				buttonElement.appendChild(aElement);
				divAcumulada.appendChild(buttonElement);
			});
			// Adiciona a seção de "Precipitação Acumulada" à div
			div.querySelector('.text').appendChild(divAcumulada);
		}
		// Adiciona a seção de "Probabilidade de Precipitação Acumulada" se for "Multimodelos"
		if (modelo === 'multi') {
			var divAcumulada = document.createElement('div');
			divAcumulada.classList.add('text', 'acumulada');
			divAcumulada.innerHTML = '<h4>Probabilidade de Precipitação Acumulada:</h4>';
			botoes.forEach(function(btn) {
				var buttonElement = document.createElement('button');
				var aElement = document.createElement('a');
				aElement.href = '';
				aElement.target = '_blank';
				aElement.textContent = btn;
				buttonElement.appendChild(aElement);
				divAcumulada.appendChild(buttonElement);
			});
			// Adiciona a seção de "Probabilidade de Precipitação Acumulada" à div
			div.querySelector('.text').appendChild(divAcumulada);
		}
		// Adiciona a seção de "Previsão Próximas Semanas" se for "BAM"
		if (modelo === 'bam') {
			var divAcumulada = document.createElement('div');
			divAcumulada.classList.add('text', 'acumulada');
			divAcumulada.innerHTML = '<h4>Previsão Próximas Semanas:</h4>';
			botoes.forEach(function(btn) {
				var buttonElement = document.createElement('button');
				var aElement = document.createElement('a');
				aElement.href = '';
				aElement.target = '_blank';
				aElement.textContent = btn;
				buttonElement.appendChild(aElement);
				divAcumulada.appendChild(buttonElement);
			});
			// Adiciona a seção de "Previsão Próximas Semanas" à div
			div.querySelector('.text').appendChild(divAcumulada);
		}
		// Insere a div gerada na página
		document.querySelector('.carousel-inner').appendChild(div);
	});
});
