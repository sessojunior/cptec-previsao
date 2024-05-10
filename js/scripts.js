function changeRegion(dataId) {
	let regions = document.querySelectorAll(".region");
	for (let i = 0; i < regions.length; i++) {
		regions[i].classList.add("hidden");
		console.log(regions[i]);
	}
	let subtitleLinks = document.querySelectorAll(".subtitle-links li a");
	for (let i = 0; i < subtitleLinks.length; i++) {
		subtitleLinks[i].classList.remove("active");
	}
	document.getElementsByClassName(dataId.dataset.region)[0].classList.remove("hidden");
	dataId.classList.add("active");
}
