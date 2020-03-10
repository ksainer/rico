class Select {
	constructor(select, list, callback) {
		if (!(select instanceof HTMLDivElement)) return console.error(select + 'is not an dom-element.');
		if (!Array.isArray(list)) return console.error(list, 'is not an array.');

		if (callback) {
			if (typeof callback === 'function') {
				this.callback = callback;
			} else {
				console.warn('callback is not a function.');
			}
		}

		this.select = select;
		this.list = list;
		this.currentRadioIndex = 0;
		this.countItem = 0;
		this.radios = [];
	};

	render() {
		const labelCurrentVal = document.createElement('label');
		labelCurrentVal.className = 'select__current-val';

		this.checkbox = document.createElement('input');
		this.checkbox.setAttribute('type', 'checkbox');
		this.checkbox.className = 'select__check';

		this.currentText = document.createElement('p');
		this.currentText.className = 'select__text';
		this.currentText.textContent = this.list[0];
		this.currentText.onselectstart = () => false;
		this.checkbox.onkeydown = (e) => {
			if (e.code === "Enter") {
				this.checkbox.click();
			}
			if (e.code === "ArrowDown") {
				e.preventDefault();
				if (this.ul.children[this.currentRadioIndex + 1]) {
					this.currentRadioIndex++;
				} else {
					this.currentRadioIndex = 0;
				}
				this.radios[this.currentRadioIndex].click();
			}
			if (e.code === "ArrowUp") {
				e.preventDefault();
				if (this.ul.children[this.currentRadioIndex - 1]) {
					this.currentRadioIndex--;
				} else {
					this.currentRadioIndex = this.countItem - 1;
				}
				this.radios[this.currentRadioIndex].click();
			}
		};
		this.checkbox.onchange = () => {
			if (this.checkbox.checked) {
				this.ul.hidden = false;
				this.radios[this.currentRadioIndex].checked = true;
				this.radios[this.currentRadioIndex].focus();
			} else {
				this.ul.hidden = true;
				this.checkbox.focus();
			}
		};

		this.ul = document.createElement('ul');
		this.ul.className = 'select__list';
		this.ul.hidden = true;

		this.list.forEach(item => this.addItem(item));

		labelCurrentVal.append(this.checkbox, this.currentText);
		this.select.append(labelCurrentVal, this.ul);

		document.addEventListener('click', e => {
			if (!this.select.contains(e.target) && this.checkbox.checked) {
				this.checkbox.click();
			};
		});
	}

	addItem(text) {
		let i = this.countItem;

		const item = document.createElement('li');
		item.className = 'select__item';

		const label = document.createElement('label');
		label.className = 'select__label';

		const radio = document.createElement('input');
		radio.className = 'select__radio';
		radio.setAttribute('type', 'radio');
		radio.setAttribute('name', 'radio');

		const p = document.createElement('p');
		p.className = 'select__text';
		p.textContent = text;
		p.onselectstart = () => false;

		label.append(radio, p);
		item.append(label);
		this.ul.append(item);

		radio.onclick = (e) => {
			this.currentText.textContent = p.textContent;
			this.currentRadioIndex = i;

			if (e.clientX && radio.checked) {
				this.checkbox.click();
			}
			if (this.callback) {
				this.callback(i);
			}
		}

		radio.onkeydown = (e) => {
			if (e.keyCode === 13 || e.keyCode === 27 || e.keyCode === 9)
				this.checkbox.click();
		}

		this.countItem++;
		this.radios.push(radio);
	};

	removeItem(count = 1) {
		if (!Number.isInteger(count)) {
			return console.error(count, 'is not a Nubmer.');
		};

		count = Math.min(count, this.countItem - 1)

		for (let i = 0; i < count; i++) {
			this.ul.children[this.countItem - 1].remove();
			this.radios.pop();
			this.countItem--;
		}
	};

	disabledItem(indexArray) {
		if (!Number.isInteger(indexArray) && !Array.isArray(indexArray)) return console.error(indexArray, 'is not an Array or Nubmer.');

		if (Number.isInteger(indexArray)) {
			indexArray = [indexArray];
		};

		this.radios.forEach((radio, i) => {
			if (indexArray.includes(i)) {
				radio.disabled = true;
			} else if (radio.disabled) {
				radio.disabled = false;
			}
		});
	};

	change(newValsArray) {
		if (!Array.isArray(newValsArray)) return console.error(newValsArray, 'is not an Array.');

		if (this.countItem > newValsArray.length) {
			this.removeItem(this.countItem - newValsArray.length);
			this.radios.forEach((radio,i) => {
				radio.parentElement.lastElementChild.textContent = newValsArray[i];
			});
		} else {
			newValsArray.forEach((text,i) => {
				if (this.radios[i]) {
					this.radios[i].parentElement.lastElementChild.textContent = text;
				} else {
					this.addItem(text);
				};
			});
		}
		this.radios[0].click();
	};
};

document.addEventListener('DOMContentLoaded', () => {

// === end custom select ===

let arr = [
	// one section
	[
		// глухая
		{
			800: {
				1000: 2194,
				1200: 2424,
				1300: 2654,
				1400: 2884,
				1500: 3113
			},
			900: {
				1000: 2414,
				1200: 2666,
				1300: 2918,
				1400: 3170,
				1500: 3422
			},
			1000: {
				1000: 2636,
				1200: 2910,
				1300: 3184,
				1400: 3458,
				1500: 3732
			},
			1100: {
				1000: 2857,
				1200: 3153,
				1300: 3449,
				1400: 3745,
				1500: 4041
			},
			1200: {
				1000: 3078,
				1200: 3096,
				1300: 3714,
				1400: 4062,
				1500: 4350
			}
		},
		// поворотная
		{
			800: {
				1000: 4196,
				1200: 4488,
				1300: 4780,
				1400: 5072,
				1500: 5364
			},
			900: {
				1000: 4650,
				1200: 4964,
				1300: 5278,
				1400: 5592,
				1500: 5906
			},
			1000: {
				1000: 4914,
				1200: 5250,
				1300: 5586,
				1400: 5922,
				1500: 6258
			},
			1100: {
				1000: 5179,
				1200: 5537,
				1300: 5895,
				1400: 6253,
				1500: 6611
			},
			1200: {
				1000: 5442,
				1200: 5822,
				1300: 6202,
				1400: 6582,
				1500: 6962
			}
		}
	],
	// two section
	[
		// глухая
		{
			1100: {
				1100: 3498,
				1200: 3757,
				1300: 4016,
				1400: 4275,
				1500: 4534,
				1600: 4793
			},
			1200: {
				1100: 3737,
				1200: 4014,
				1300: 4291,
				1400: 4568,
				1500: 4845,
				1600: 5122
			},
			1300: {
				1100: 3974,
				1200: 4269,
				1300: 4564,
				1400: 4859,
				1500: 5154,
				1600: 5447
			},
			1400: {
				1100: 4212,
				1200: 4524,
				1300: 4836,
				1400: 5148,
				1500: 5460,
				1600: 5771
			},
			1500: {
				1100: 4450,
				1200: 4779,
				1300: 5108,
				1400: 5437,
				1500: 5766,
				1600: 6096
			},
			1600: {
				1100: 4688,
				1200: 5035,
				1300: 5382,
				1400: 5729,
				1500: 6067,
				1600: 6422
			}
		},
		// глухая + поворотная
		{
			1100: {
				1100: 5196,
				1200: 5531,
				1300: 5866,
				1400: 6201,
				1500: 6536,
				1600: 6872
			},
			1200: {
				1100: 5463,
				1200: 5814,
				1300: 6165,
				1400: 6516,
				1500: 6867,
				1600: 7220
			},
			1300: {
				1100: 5713,
				1200: 6034,
				1300: 6355,
				1400: 6676,
				1500: 6997,
				1600: 7318
			},
			1400: {
				1100: 5914,
				1200: 6314,
				1300: 6714,
				1400: 7114,
				1500: 7514,
				1600: 7912
			},
			1500: {
				1100: 6459,
				1200: 6854,
				1300: 7249,
				1400: 7644,
				1500: 8039,
				1600: 8435
			},
			1600: {
				1100: 6906,
				1200: 7319,
				1300: 7732,
				1400: 8145,
				1500: 8558,
				1600: 8971
			}
		},
		// поворотная + поворотно-откидная
		{
			1100: {
				1100: 7355,
				1200: 7755,
				1300: 8155,
				1400: 8555,
				1500: 8955,
				1600: 9355
			},
			1200: {
				1100: 7654,
				1200: 8068,
				1300: 8482,
				1400: 8896,
				1500: 9310,
				1600: 9726
			},
			1300: {
				1100: 7951,
				1200: 8379,
				1300: 8807,
				1400: 9235,
				1500: 9663,
				1600: 10093
			},
			1400: {
				1100: 8019,
				1200: 8495,
				1300: 8971,
				1400: 9447,
				1500: 9923,
				1600: 10397
			},
			1500: {
				1100: 8692,
				1200: 9163,
				1300: 9634,
				1400: 10105,
				1500: 10576,
				1600: 11047
			},
			1600: {
				1100: 9349,
				1200: 9839,
				1300: 10329,
				1400: 10819,
				1500: 11309,
				1600: 11794
			}
		}
	],
	// three section
	[
		{
			1700: {
				1500: 9265,
				1600: 9789,
				1700: 10313,
				1800: 10836
			},
			1800: {
				1500: 9587,
				1600: 10129,
				1700: 10671,
				1800: 11211
			},
			1900: {
				1500: 9907,
				1600: 10467,
				1700: 11027,
				1800: 11588
			},
			2000: {
				1500: 10230,
				1600: 10808,
				1700: 11386,
				1800: 11963
			},
			2100: {
				1500: 10510,
				1600: 11104,
				1700: 11698,
				1800: 12291
			},
			2200: {
				1500: 10935,
				1600: 11541,
				1700: 12147,
				1800: 12754
			}
		}
	]
];

let types = [
	[
		'KBE Engine',
		'KBE Expert'
	],
	[
		'REHAU Engine',
		'REHAU Expert'
	],
	[
		'MONTBLANK Engine',
		'MONTBLANK Expert'
	]
];

let arrCoef = [1, 1.4, 1.5];
let arrCoef2 = [[1,1.4],[1,1.5],[1,1.4]];

let w = 800,
	h = 1000,
	coef1 = 0, 
	coef2 = 0,
	count = 0,
	type = [0,0,0];


const topLine = document.body.querySelector('.calculate__top-line'),
	width = topLine.querySelector('.calculate__size .calculate__width'),
	height = topLine.querySelector('.calculate__size .calculate__height'),
	cost = document.body.querySelector('.calculate__t-cost'),
	avarCost = document.body.querySelector('.calculate__a-cost');

const typeSelect = new Select(topLine.querySelector('.select'), types[0], (i) => {
	coef2 = i;
	calc();
});
typeSelect.render();

function calc() {
	let a = arr[count][type[count]];
	
	let keysW =  Object.keys(a);
	w = Math.max(w, keysW[0]);
	w = Math.min(w, keysW[keysW.length - 1]);
	if (a[w]) width.value = w;
	else w = height.value = keysW[0];

	let keysH =  Object.keys(a[w]);
	h = Math.max(h, keysH[0]);
	h = Math.min(h, keysH[keysH.length - 1]);
	if (a[w][h]) height.value = h;
	else h = height.value = keysH[0];

	cost.textContent = Math.round(a[w][h] * arrCoef[coef1] * arrCoef2[coef1][coef2]);
	avarCost.textContent = Math.round(a[w][h] * arrCoef[coef1] * arrCoef2[coef1][coef2] * 1.2);
}
calc();

// === calc size (width + height) ===
width.oninput = function() {
	if (arr[count][type[count]][this.value]) {
		w = this.value;
		calc();
	}
}

width.onblur = function() {
	let keysW = Object.keys(arr[count][type[count]]);
	if (!arr[count][type[count]][this.value]) {
		for (let i = 0; i < keysW.length; i++) {
			if (+this.value < keysW[i]) {
				w = this.value = keysW[i];
				return
			}
		}
		w = this.value = keysW[keysW.length - 1];
	}
}

height.oninput = function() {
	if (arr[count][type[count]][w][this.value]) {
		h = this.value;
		calc();
	}
}

height.onblur = function() {
	let keysH = Object.keys(arr[count][type[count]][w]);
	if (!arr[count][type[count]][w][this.value]) {
		for (let i = 0; i < keysH.length; i++) {
			if (+this.value < keysH[i]) {
				h = this.value = keysH[i];
				return
			}
		}
		h = this.value = keysH[keysH.length - 1];
	}
}
// === end size ===

// === products ===

let prods = topLine.querySelectorAll('input[name="prod"]');

prods.forEach((item, i)=> {

	item.onchange = function() {
		coef1 = i;
		coef2 = 0;
		calc();

		typeSelect.change(types[i]);
	}
})

// === end prods ===

// === count ===

const countSection = document.body.querySelector('.calculate__count-section'),
	countSectionItems = countSection.querySelectorAll('.calculate__c-item'),
	arrImg = ['img__blind', 'img__turn', 'img__turn-folding'];

countSectionItems.forEach((item, countSection) => {

	let countSectionItemRadio = item.querySelector('.calculate__c-radio');
	countSectionItemRadio.addEventListener('change', function() {
		count = countSection;

		let a = arr[count][type[count]];
		let keysW = Object.keys(a);
		let keysH = Object.keys(a[keysW[0]]);

		width.setAttribute('min', keysW[0]);
		width.setAttribute('max', keysW[keysW.length - 1]);
		height.setAttribute('min', keysH[0]);
		height.setAttribute('max', keysH[keysH.length - 1]);

		calc();
	});

	const wrapImgs = item.querySelectorAll('.calculate__wrap-c-img');

	if (countSection === 0) {
		const select = new Select(
			item.querySelector('.select'), 
			['Глухая', 'Поворотная'], 
			i => {
				wrapImgs[0].className = 'calculate__wrap-c-img img__blind';
				wrapImgs[0].classList.add(arrImg[i]);
				type[0] = i;
				calc();
			}
		);
		select.render();
	} else if (countSection === 1) {		
		const selects = [];

		item.querySelectorAll('.select').forEach((item, index) => {
			selects[index] = new Select(
				item, 
				['Глухая', 'Поворотная', 'Поворотно-откидная'], 
				i => {
					wrapImgs[index].className = 'calculate__wrap-c-img img__blind';
					wrapImgs[index].classList.add(arrImg[i]);

					type[1] = selects[index].currentRadioIndex + selects[+!index].currentRadioIndex;
					if (type[1] > 2) { type[1] = 2; }

					if (i === 0) {
						selects[+!index].disabledItem(2);
					} else if (i === 1) {
						selects[+!index].disabledItem(1);
					} else if (i === 2) {
						selects[+!index].disabledItem([0,2]);
					}
					
					calc();
				}
			);
			selects[index].render();
			selects[index].disabledItem(2);
			
		});
	}
})

// === end selects ===
})