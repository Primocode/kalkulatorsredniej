const buttonAddSubject = document.querySelector('.addButton');
const rightContent = document.querySelector('.content');
const resultText = document.querySelector('.resultText');
const gradeOpen = document.querySelector('.menu');
let inputWeight = document.querySelector('.inputWeight');
let inputGrade = document.querySelector('.inputGrade');

inputGrade.addEventListener('keydown', function() {
	if (inputGrade.value.length == 1) {
		inputGrade.value = "";
	}
});

inputWeight.addEventListener('keydown', function() {
	if (inputWeight.value.length == 2) {
		inputWeight.value = "";
	}
});

let numerous = 0;
let tab = [];
let averageValueWeight = 0;
let averageValueSumGrade = 0;
let length = 0;
let averageSchoolSubject = 0;
const tabColors = ["#D44242", "#7F5CB4", "#E8B200","#00A1E8", "#6BAB4C", "#16D900"];
document.querySelector('.enterGrade').style.display = "none";

const buttonAddSubjectFunction = () => {
	let input = document.querySelector('.text');
	if (input.value == 0) {
		communication("Wpisz przedmiot");
	}

	else {
		document.querySelector('.enterGrade').style.display = "flex";
		numerous++
		const addTable = document.createElement('div');
		rightContent.appendChild(addTable);
		addTable.classList.add('table');

		const div = document.createElement('div');
		addTable.appendChild(div);
		div.classList.add('schoolSubject');
		
		const subjectAdd = document.createElement("h2");
		div.appendChild(subjectAdd);
		subjectAdd.classList.add('schoolSubjectText-h2');
		subjectAdd.textContent = input.value;
	
		const subjectRemove = document.createElement("button");
		subjectRemove.appendChild(document.createTextNode("X"));
		div.appendChild(subjectRemove);
		subjectRemove.classList.add('remove');
		subjectRemove.dataset.id = numerous;

		const addGrade = document.createElement('button');
		addTable.appendChild(addGrade);
		addGrade.classList.add('btn');
		addGrade.textContent = "+";
		subjectRemove.dataset.id = numerous;

		const average = document.createElement("div");
		addTable.appendChild(average);
		average.classList.add('average');

		const avgAverage = document.createElement("div");
		average.appendChild(avgAverage);
		avgAverage.classList.add('avg');
		avgAverage.textContent = "średnia";

		const averageText = document.createElement("h3");
		average.appendChild(averageText);
		averageText.classList.add('averageText');
		averageText.textContent = "0";
		averageText.dataset.id = subjectRemove.dataset.id;
		averageText.dataset.value = 0;
		const averageButtonFunction = (e) => {
			let nodeListGrade = document.querySelectorAll(`[data-id='id${averageText.dataset.id}']`);
			nodeListGrade.forEach((item, i) => {
				averageValueWeight += Number(nodeListGrade[i].dataset.weight);
				averageValueSumGrade += Number(nodeListGrade[i].dataset.adding);
			})

			const count = () => {
				if ((averageValueSumGrade / averageValueWeight) > 0.1) {
					averageText.dataset.sumWeight = averageValueWeight;
					averageText.dataset.sum = averageValueSumGrade;
					averageText.textContent = (averageValueSumGrade / averageValueWeight).toFixed(2);
					averageText.dataset.value = (averageValueSumGrade / averageValueWeight).toFixed(2);
				}
				else {
					averageText.textContent = "0";
					averageText.dataset.value = "0";
				}
			}
			count()
			averageValueWeight = 0;
			averageValueSumGrade = 0;
		} 

		const subjectRemoveAll = () => {
			if(document.getElementById("grade" + subjectRemove.dataset.id))  {
				communication("Musisz usunąć pozostałe oceny.");
			}
			else {
				div.remove();
				addTable.remove();
			}
		}
		subjectRemove.addEventListener('click', subjectRemoveAll);

		addGrade.addEventListener('click', function() {;
			const valueWeight = parseInt(Number(inputWeight.value));
			const valueGrade = parseInt(Number((inputGrade.value)));
			if (valueGrade != "" & valueWeight != "") {
				if (valueGrade > 6) {
					communication("Maksymalna ocena to 6");
				}
				else if (valueGrade < 0) {
					communication("Ocena nie może być mniejsza niż 1");
				}
				else if (valueWeight < 0) {
					communication("waga nie moze byc mniejsza niż 1");
				}
				else if (valueWeight > 99) {
					communication("waga nie może być większa niż 99");
				}

				else {
					const grade = document.createElement('div');
					addTable.appendChild(grade);
					grade.classList.add('grade');
					grade.id = "grade" + subjectRemove.dataset.id;
	
					const gradeNumber = document.createElement('h3');
					grade.appendChild(gradeNumber);
					gradeNumber.classList.add('gradeNumber-h3');

					grade.style.backgroundColor = tabColors[valueGrade -1];
	
					tab.push((valueGrade));
					gradeNumber.textContent = valueGrade;
					inputGrade.value = "";
	
					const gradeRemove = document.createElement("button");
					gradeRemove.appendChild(document.createTextNode("X"));
					gradeRemove.classList.add('removeGrade');
					gradeRemove.dataset.id = "id" + subjectRemove.dataset.id;
					gradeRemove.dataset.grade = valueGrade;
					gradeRemove.dataset.weight = valueWeight;
					gradeRemove.dataset.adding = valueGrade * valueWeight;
					grade.appendChild(gradeRemove);
	
					const gradeWeight = document.createElement('h3');
					grade.appendChild(gradeWeight);
					gradeWeight.classList.add('weight');
					gradeWeight.textContent = "waga " + valueWeight;
					inputWeight.value = "";
					
					const gradeRemoveAll = (e) => {
						tab.splice(tab.indexOf(Number(e.target.dataset.grade)), 1);
						grade.remove();
						averageButtonFunction();
						showResultFunction();
					}
					gradeRemove.addEventListener('click', gradeRemoveAll);
				}
				
			}
			else {
				communication("Najpierw musisz wpisać ocenę oraz wagę");
			}
			averageButtonFunction();
			showResultFunction();
		})
	}
	input.value = "";
}

let blockade = true;

subjects = ["Biologia", "Chemia", "EDB", "Etyka", "Fizyka", "Geografia", "Historia", "Język angielski", "Język niemiecki", "Język polski", "Matematyka", "Muzyka", "Plastyka", "Religia", "Wiedza o społeczeństwie", "WDŻ", "Wychowanie fizyczne"];

const gradeOpenFunction = () => {
	if (blockade === false) {
		communication("Wszystkie przedmioty zostały już dodane");
	}
	if (blockade) {
		subjects.forEach((item, i) => {
			document.querySelector('.text').value = subjects[i];
			buttonAddSubjectFunction();
		})
		blockade = false;
	}
}

gradeOpen.addEventListener('click', gradeOpenFunction);

const counting = () => {
	let averageTextNode = document.querySelectorAll('.averageText');
	averageTextNode.forEach((item, i) => {
		averageSchoolSubject += Number(averageTextNode[i].innerText);
		if (Number(averageTextNode[i].innerText) > 0) {
			length++
		}
	})
}

const showResultFunction = () => {
	counting()
	resultText.textContent = (averageSchoolSubject / length).toFixed(3);
	if (tab.length <= 0) {
		resultText.textContent = "";
	}
	averageSchoolSubject = 0;
	length = 0;
	let counts = {},
    append = '';
 
	tab.forEach(x => { 
		counts[x] = (counts[x] || 0) +1;
	});

	for (let key in counts) {
		append += `<div class="grade-table">
		<div id="grade-value"style="
		border: 3px solid ${tabColors[key -1]};
		color: ${tabColors[key -1]};">
		${key}</div> <div class="conector">=></div> <div id="grade-number"> ${counts[key]} </div> </div>`;
	}
	document.querySelector('#calc').innerHTML = append;
}	
buttonAddSubject.addEventListener('click', buttonAddSubjectFunction);

const message = document.querySelector('.message');
const communication = (mess) => { 
	message.style.display = "block";
	message.textContent = mess;
	setTimeout(function(){ 
		message.style.display = "none";
	}, 2500);
}
