// Função responsável por realizar a troca de todas as informações de sul para nde e vice versa
document.addEventListener('DOMContentLoaded', function () {
	const btnSul = document.getElementById('btn-sul');
	const btnNde = document.getElementById('btn-nde');
	const divSul = document.getElementById('sul');
	const divNde = document.getElementById('nde');
	const navContainer = document.getElementById('nav-container');

	function showContent(targetDiv) {
		// Insere o conteúdo dinâmico na div alvo
		targetDiv.appendChild(navContainer);
		navContainer.style.display = 'block';
	}

	btnSul.addEventListener('click', function () {
		divSul.style.display = 'block';
		divNde.style.display = 'none';
		btnSul.classList.add('btn-primary');
		btnSul.classList.remove('btn-secondary');
		btnNde.classList.add('btn-secondary');
		btnNde.classList.remove('btn-primary');
		showContent(divSul);
		updateLinks('sul');
	});

	btnNde.addEventListener('click', function () {
		divSul.style.display = 'none';
		divNde.style.display = 'block';
		btnSul.classList.add('btn-secondary');
		btnSul.classList.remove('btn-primary');
		btnNde.classList.add('btn-primary');
		btnNde.classList.remove('btn-secondary');
		showContent(divNde);
		updateLinks('nde');
	});

	// Inicializa com o conteúdo dinâmico na div "sul"
	showContent(divSul);

	function updateLinks(region) {
		const images = document.querySelectorAll('.tab-pane img');
		images.forEach(img => {
			img.src = img.src.replace(/sul|nde/, region);
		});
	}
});

// Função responsável por gerar dinamicamente os botões e divs que irão receber o conteúdo
function toggleContent(event) {
	var buttonId = event.target.id;
	var targetDivId = buttonId.replace("btn-", "");
	var contentDiv = document.getElementById(targetDivId);
	
	if (buttonId === "btn-wrf" || buttonId === "btn-brams" || buttonId === "btn-eta" || buttonId === "btn-smec") {
		if (contentDiv.innerHTML.trim()) {
			contentDiv.innerHTML = `
				<div class="model-container">
					<div class="model-box">
						<p class="prec-text">Precipitação Diária</p>
						<div class="nav nav-pills" id="${targetDivId}-diaria-v-pills-tab" role="tablist">
							${generateButtons("diaria", targetDivId)}
						</div>
						<div class="tab-content" id="${targetDivId}-diaria-v-pills-tabContent">
							${generateImageTabs("diaria", targetDivId)}
						</div>
					</div>
					<div class="model-box">
						<p class="prec-text">Precipitação Acumulada</p>
						<div class="nav nav-pills" id="${targetDivId}-acumulada-v-pills-tab" role="tablist">
							${generateButtons("acumulada", targetDivId)}
						</div>
						<div class="tab-content" id="${targetDivId}-acumulada-v-pills-tabContent">
							${generateImageTabs("acumulada", targetDivId)}
						</div>
					</div>
				</div>
			`;
		}
	}
}

// Função responsável por gerar os botões com as horas para alterar as imagens
function generateButtons(type, targetDivId) {
	var buttonsHTML = "";
	for (var i = 24; i <= 168; i += 24) {
		buttonsHTML += `
			<button class="nav-link ${i === 24 ? 'active' : ''}" id="${targetDivId}-${type}-${i}h" data-bs-toggle="pill"
				data-bs-target="#${targetDivId}-${type}-v-pills-${i}h" type="button" role="tab"
				aria-controls="${targetDivId}-${type}-v-pills-${i}h" aria-selected="${i === 24 ? 'true' : 'false'}">${i}h</button>
		`;
	}
	return buttonsHTML;
}

// Função responsável por verificar o horário selecionado e anexar o link dinâmico da imagem
function generateImageTabs(type, targetDivId) {
	var imageTabsHTML = "";
	var baseUrl;

	if (targetDivId === "wrf") {
		baseUrl = "https://s1.cptec.inpe.br/grafico/Modelos/WRF07/figuras/precipitacao/";
	} else if (targetDivId === "brams") {
		baseUrl = "https://s1.cptec.inpe.br/grafico/Modelos/BRAMS08/figuras/precipitacao/";
	} else if (targetDivId === "eta") {
		baseUrl = "https://s1.cptec.inpe.br/grafico/Modelos/ETA08/figuras/precipitacao/";
	} else if (targetDivId === "smec") {
		baseUrl = "https://s1.cptec.inpe.br/grafico/Modelos/SMEC/figuras/precipitacao/";
	}

	for (var i = 24; i <= 168; i += 24) {
		var imgSrc;
		if (type == "diaria") {
			imgSrc = baseUrl + `prec_sul_${i < 100 ? '0' : ''}${i}.png`;
		} else if (type == "acumulada") {
			imgSrc = baseUrl + `prec_acum_sul_${i < 100 ? '0' : ''}${i}.png`;
		}

		imageTabsHTML += `
            <div class="tab-pane fade ${i === 24 ? 'show active' : ''}" id="${targetDivId}-${type}-v-pills-${i}h" role="tabpanel"
                aria-labelledby="${targetDivId}-${type}-${i}h" tabindex="0">
                <img class="w-100" src="${imgSrc}">
            </div>
        `;
	}
	return imageTabsHTML;
}
