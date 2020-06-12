const resultField = document.querySelector('.resultText');
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
let grades = [];
let averageValueWeight = 0;
let averageValueSumGrade = 0;
let length = 0;
let averageSchoolSubject = 0;
const tabColors = ["#D44242", "#7F5CB4", "#E8B200","#00A1E8", "#6BAB4C", "#16D900"];
document.querySelector('.enterGrade').style.display = "none";

const buttonAddSubject = () => {
	let schoolSubject = document.querySelector('.text');
	if (schoolSubject.value == 0) {
		communication("Wpisz przedmiot");
	} else {
		document.querySelector('.enterGrade').style.display = "flex";
		numerous++
		const addTable = document.createElement('div');
		document.querySelector('.content').appendChild(addTable);
		addTable.classList.add('table');

		const schoolSubjectContainer = document.createElement('div');
		addTable.appendChild(schoolSubjectContainer);
		schoolSubjectContainer.classList.add('schoolSubject');
		
		const subjectAdd = document.createElement("h2");
		schoolSubjectContainer.appendChild(subjectAdd);
		subjectAdd.classList.add('schoolSubjectText-h2');
		subjectAdd.textContent = schoolSubject.value;
	
		const subjectRemove = document.createElement("button");
		subjectRemove.appendChild(document.createTextNode("X"));
		schoolSubjectContainer.appendChild(subjectRemove);
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
		const averageButton = (e) => {
			let nodeListGrade = document.querySelectorAll(`[data-id='id${averageText.dataset.id}']`);
			nodeListGrade.forEach((item, i) => {
				averageValueWeight += Number(nodeListGrade[i].dataset.weight);
				averageValueSumGrade += Number(nodeListGrade[i].dataset.adding);
			})
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
			averageValueWeight = 0;
			averageValueSumGrade = 0;
			showResult();
		} 

		subjectRemove.addEventListener('click', function() {;
			if(document.getElementById("grade" + subjectRemove.dataset.id))  {
				communication("Musisz usunąć pozostałe oceny.");
			}
			else {
				schoolSubjectContainer.remove();
				addTable.remove();
			}
		})

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
	
					grades.push((valueGrade));
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
					
					gradeRemove.addEventListener('click', function(e) {
						grades.splice(grades.indexOf(Number(e.target.dataset.grade)), 1);
						grade.remove();
						averageButton();
					});
				}
			} else {
				communication("Najpierw musisz wpisać ocenę oraz wagę");
			}
			averageButton();
		})
	}
	schoolSubject.value = "";
};
document.querySelector('.addButton').addEventListener('click', buttonAddSubject);

let blockade = true;

subjects = ["Biologia", "Chemia", "EDB", "Etyka", "Fizyka", "Geografia", "Historia", "Język angielski", "Język niemiecki", "Język polski", "Matematyka", "Muzyka", "Plastyka", "Religia", "Wiedza o społeczeństwie", "WDŻ", "Wychowanie fizyczne"];

document.querySelector('.menu').addEventListener('click', function() {
	if (blockade === false) {
		communication("Wszystkie przedmioty zostały już dodane");
	}
	if (blockade) {
		subjects.forEach((item, i) => {
			document.querySelector('.text').value = subjects[i];
			buttonAddSubject();
		})
		blockade = false;
	}
})

const showResult = () => {
	let averageTextNode = document.querySelectorAll('.averageText');
	averageTextNode.forEach((item, i) => {
		averageSchoolSubject += Number(averageTextNode[i].innerText);
		if (Number(averageTextNode[i].innerText) > 0) {
			length++
		}
	})
	resultField.textContent = (averageSchoolSubject / length).toFixed(3);
	if (grades.length <= 0) {
		resultField.textContent = "";
	}
	averageSchoolSubject = 0;
	length = 0;
	let counts = {},
    append = '';
 
	grades.forEach(x => { 
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

const message = document.querySelector('.message');
const communication = (mess) => { 
	message.style.display = "block";
	message.textContent = mess;
	setTimeout(function(){ 
		message.style.display = "none";
	}, 2500);
}