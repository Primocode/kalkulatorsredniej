let number = 0;

if (true) {
	const window = document.querySelector('.window')
	window.style.display = "flex";
	const window1 = document.querySelectorAll('.window-container')
	const next = document.querySelector('.next')
	const previous = document.querySelector('.previous');
	const goto = document.querySelector('.goto');
	window1.item(number).className = "window-container-active"

	if (localStorage.getItem("info") == "false") {
		window.remove();
	}

	function check() {
		if (number == 0) {
			previous.style.display = "none";
		}
		if (number == window1.length - 1) {
			next.style.display = "none";
			goto.style.display= "block";
		}
		if (number == window1.length) {
			window.style.display = "none";
		}
	}
	check()

	const addClassName = () => {
		for (let i = 0; i < window1.length; i++) {
			window1[i].className = "window-container";
		}
	}

	const nextFunction = () => {
		number++
		previous.style.display = "block";
		addClassName()
		window1.item(number).className = "window-container-active"
		check()
	}
	next.addEventListener('click', nextFunction);

	const previousFunction = () => {
		number--
		goto.style.display = "none";
		next.style.display = "block";
		addClassName()
		window1.item(number).className = "window-container-active"
		check()
	}
	previous.addEventListener('click', previousFunction);

	const gotoFunction = () => {
		window.remove();
	}
	goto.addEventListener('click', gotoFunction);
}
localStorage.setItem("info", "false");
