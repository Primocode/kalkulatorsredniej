
let number = 0;

if (true) {
	const window = document.querySelector('.window')
	const window1 = document.querySelectorAll('.window-container')
	const next = document.querySelector('.next')
	const previous = document.querySelector('.previous');
	const goto = document.querySelector('.goto');
	window1.item(number).className = "window-container-active"


	if (localStorage.getItem("info") == "false") {
		window.style.display = "none";
	}
		

	function sprawdz() {
		if (number == 0) {
			previous.style.display = "none";
		}
		if (number == 3) {
			next.style.display = "none";
			goto.style.display= "block";
		}
		if (number == 4) {
			window.style.display = "none";
		}
	}
	sprawdz()

	const nextFunction = () => {
		sprawdz()
		number++
		previous.style.display = "block";
		window1.item(0).className = "window-container"
		window1.item(1).className = "window-container"
		window1.item(2).className = "window-container"
		window1.item(3).className = "window-container"
		window1.item(number).className = "window-container-active"
		sprawdz()
	}

	next.addEventListener('click', nextFunction);

	const previousFunction = () => {
		number--
		goto.style.display = "none";
		next.style.display = "block";
		window1.item(0).className = "window-container"
		window1.item(1).className = "window-container"
		window1.item(2).className = "window-container"
		window1.item(3).className = "window-container"
		window1.item(number).className = "window-container-active"
		sprawdz()
	}

	previous.addEventListener('click', previousFunction);

	const gotoFunction = () => {
		window.style.display = "none";
	}

	goto.addEventListener('click', gotoFunction);
}
localStorage.setItem("info", "false");



