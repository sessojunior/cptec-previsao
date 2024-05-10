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
