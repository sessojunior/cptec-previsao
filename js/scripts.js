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

function toggleWrfContent(event) {
	var buttonId = event.target.id;
	var targetDivId = buttonId.replace("btn-", "");
	var contentDiv = document.getElementById(targetDivId);
	
	if (buttonId === "btn-wrf" || buttonId === "btn-brams") {
		// console.log('ButtonID:', buttonId)
		if (contentDiv.innerHTML.trim()) {
			contentDiv.innerHTML = `
				<div class="d-flex gap-3">
					<div class="align-items-start mt-1 w-50">
						<div class="nav nav-pills me-3" id="${targetDivId}-diaria-v-pills-tab" role="tablist">
							${generateButtons("diaria", targetDivId)}
						</div>
						<div class="tab-content" id="${targetDivId}-diaria-v-pills-tabContent">
							${generateImageTabs("diaria", targetDivId)}
						</div>
					</div>
					<div class="align-items-start mt-1 w-50">
						<div class="nav nav-pills me-3" id="${targetDivId}-acumulada-v-pills-tab" role="tablist">
							${generateButtons("acumulada", targetDivId)}
						</div>
						<div class="tab-content" id="${targetDivId}-acumulada-v-pills-tabContent">
							${generateImageTabs("acumulada", targetDivId)}
						</div>
					</div>
				</div>
			`;
			// console.log('CONTENT DIV:', targetDivId)
		}
	}
}

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

function generateImageTabs(type, targetDivId) {
	var imageTabsHTML = "";
	var baseUrl;

	if (targetDivId === "wrf") {
		baseUrl = "https://s1.cptec.inpe.br/grafico/Modelos/WRF07/figuras/precipitacao/";
	} else if (targetDivId === "brams") {
		baseUrl = "https://s1.cptec.inpe.br/grafico/Modelos/BRAMS08/figuras/precipitacao/";
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
