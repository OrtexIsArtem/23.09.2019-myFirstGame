// объявление переменных
// важные переменные v
const area = document.body;
const menu = document.querySelector('.menu');
const ball = document.createElement('span');               // ШАР
const miss = document.createElement('span');               // крестик (клик мимо)
const btnStart = document.createElement('button');             // кнопка старта игры
const ballBg = document.querySelector('.ball-bg');           // игровая арена  // меню
const modalEndGame = document.querySelector('.modal-end__game');   // модальное окно. конец игры
const settingBall = document.querySelector('.settingBall');       // окно настроек игры
const resetBtn = document.querySelector('.reset-btn');         // кнопка сброса настр.
const modalRestart = document.querySelector('.modal-restart');     // переиграть
const timeEnd = document.querySelector('.time-end');          // место для счетчика
const btnBall = document.querySelector('.btn-ball');          // первая кнопка
const ballLvl = document.querySelector('.ball-menu__lvl');    // блок с кнопками уровней
const tablRecords = document.querySelector('.tabl-records');      // таблица рекордов
const tablContent = document.querySelector('.tabl-records__content');// таблица рекордов
const ballMenus = document.querySelectorAll('.ball-menu');      // кнопки меню
const clearRecord = document.querySelector('.btn-clear__record');  // кнопка очистки рекордов
const reloadS = document.createElement('button');             // кнопка очистки таблицы
const btnSop = document.querySelector('.btn-shop');          // кнопка магазина
const shops = document.querySelector('.shop');               // магазин
const shopBack = document.querySelector('.btn-back');           // закрыть магазин
let ballSizeOut = document.querySelector('.ball-size__out');    // размер шара (вывод)
let ballMenuTitle = document.querySelector('.title-ball__menu');  // заголовок в меню
let scoreOutBall = document.querySelector('.scoreOut');          // место для вывода очков
let settingBallBtn = document.querySelector('.settingBallBtn');    // вход в настройки
let infoLvl = document.querySelector('.infoLvl');           // инфа о уровне
let modalResul = document.querySelector('.modal-text__info');  // модальное окно. резльтат
let modalLvl = document.querySelector('.modal-text__lvl');   // поле сложности в модалке
let modaMiss = document.querySelector('.modal-text__miss');  // количество промахов в модалке
let modalLoad = document.querySelector('.modal-load');        // перзагрузить стр
let recordsItem = document.querySelectorAll('.records__item'); // поля для ввода рекордов
let animFanc;           // генер. анимаций
let timeMissClick;      // таймер с кликом мимо
let counterTime;        // счетчик 

// переменные для рекордов
let first;
let second;
let third;
let fourth;
let fifth;
let sizeBallVal;
let colorBallVal;
let colorAreaVal;

// массив с рекордами
let arrRecords = [];

// кнопки сложности
const ballMenuEasy = document.querySelector('.ball-menu__easy');
const ballMenuMedium = document.querySelector('.ball-menu__medium');
const ballMenuHard = document.querySelector('.ball-menu__hard');

// подсказки к ним
const btnEasy = document.querySelector('.btn-easy');
const btnMedium = document.querySelector('.btn-medium');
const btnHard = document.querySelector('.btn-hard');

// поля настроек   // астройки пользователя
let sizeBall = document.querySelector('.settingBall__ball-size__input');
let colorBall = document.querySelector('.settingBall__ball-color-input');
let colorArea = document.querySelector('.game-color__input');
let backSetting = document.querySelector('.back-setting');


// основные настройки игры
const settingGame = {
	dificaltyCount: 1000,     // скорость мерцания шариков
	playStatus: false,    // статус игры
	score: 0,        // очки
	counter: 15,        // время до конца игры
	complexity: 'Легкая', //сложность игры
	emergingBall: 500,      // появление шарика
	missCounter: 0,        // счетчик промахов
	restartCounter: true,      // при переигрывании превожу на false. избегаю повторной загрузки счетчика
	startHardGame: false,     // сложный режим выключен

};

function game(event) {
	// СОХРАНЕНИЯ
	if (localStorage.getItem('tabl')) {
		arrRecords = JSON.parse(localStorage.getItem('tabl'));
	}
	// ОЧИСТКА таблицы

	clearRecord.addEventListener('click', () => {
		localStorage.clear();
		settingGame.btnClear = false;
		for (let i = 0; i < recordsItem.length; i++) {  // перебираю поля ввода
			recordsItem[i].innerHTML = '';                // и очищаю их
		}
		// сообщение об успехе
		clearRecord.innerHTML = 'Отлично! обновите страницу';
		clearRecord.style.backgroundColor = '#00c700';
		reloadS.textContent = 'Обновить';
		tablContent.appendChild(reloadS);
		reloadS.onclick = reload;
	});


	// МАГАЗИН
	function shop() {
		btnSop.classList.add('hide');
		shops.classList.remove('hide');
		shopBack.addEventListener('click', () => {
			shops.classList.add('hide');
			btnSop.classList.remove('hide');
		});
	}

	//                      МЕНЮ
	btnBall.addEventListener('click', function startMenuBall() {
		// открытие меню с игрой
		ballBg.classList.remove('hide');
		menu.classList.add('hide'); // div в котором кнопка меню...
		btnSop.addEventListener('click', shop); // отрыть магазин
		recordsOut();
	});


	//                         НАВЕДЕНИЕ НА КНОПКИ СЛОЖНОСТИ
	// экспериментирую...
	for (let i = 0; i < ballMenus.length; i++) {
		ballMenus[0].addEventListener('mousemove', easyInfo);
		ballMenus[0].addEventListener('mouseleave', easyInfoLeav);
		ballMenus[1].addEventListener('mousemove', mediumInfo);
		ballMenus[1].addEventListener('mouseleave', mediumInfoLeav);
		ballMenus[2].addEventListener('mousemove', hardInfo);
		ballMenus[2].addEventListener('mouseleave', hardInfoLeav);
	}

	function easyInfo() {
		btnEasy.style.opacity = '0.7';
	}

	function easyInfoLeav() {
		btnEasy.style.opacity = '0';
	}

	function mediumInfo() {
		btnMedium.style.opacity = '0.7';
	}

	function mediumInfoLeav() {
		btnMedium.style.opacity = '0';
	}

	function hardInfo() {
		btnHard.style.opacity = '0.7';
	}

	function hardInfoLeav() {
		btnHard.style.opacity = '0';
	}

// ----------------------------------------

	ballMenuEasy.addEventListener('click', gameLvl);

	// средний уровень сложности
	ballMenuMedium.addEventListener('click', startMediumGame);

	function startMediumGame() {
		settingGame.dificaltyCount = 900;
		settingGame.complexity = "Средняя";
		gameLvl();
	}

	// высокий уровень сложности
	ballMenuHard.addEventListener('click', startHardGame);

	function startHardGame() {
		settingGame.startHardGame = true;   // включил сложный режим
		settingGame.dificaltyCount = 900;
		settingGame.complexity = "Высокая";
		gameLvl();
	}

	// анимация
	function animationBall() {
		animFanc = Math.floor(Math.random() * 3 + 1);
		ball.style.animationName = `muveAnim-${animFanc}`;
	}

	// клик на любую из кнопок сложности
	function gameLvl() {
		infoLvl.classList.remove('hide'); // инфа о уровне
		ballLvl.classList.add('hide');
		tablRecords.classList.add('hide');
		ballBg.appendChild(btnStart);
		btnStart.innerHTML = 'Играть';
		btnStart.classList.add('play');
		ballMenuTitle.classList.add('hide');
		btnStart.addEventListener('click', ballSpawn);
	}


	// создание / анимация шарика
	function ballSpawn() {
		btnStart.classList.add('hide');
		ballBg.appendChild(ball);
		ball.classList.add('ball');
		random();

	}

	function random() { // рандомно генерирую отступы у шара
		let randTop = Math.floor((Math.random() * 550) + 1);
		let randLeft = Math.floor((Math.random() * 700) + 1);
		ball.style.top = randTop + 'px';
		ball.style.left = randLeft + 'px';

	}

	//                  НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ
	settingBallBtn.addEventListener('click', function () {
		settingBall.classList.remove('hide');
		setInterval(check, 300); // проверять каждый 300мс изменения в настройках
		backSetting.addEventListener('click', closeSetting); // закрыть настройки

		// вывод value на экран
		sizeBall.addEventListener('input', () => {
			ballSizeOut.innerHTML = sizeBall.value;
			if (sizeBall.value <= 10) {
				ballSizeOut.innerHTML = sizeBall.value + ' ' + 'лол, удачи';
			} else if (sizeBall.value >= 50) {
				ballSizeOut.innerHTML = sizeBall.value + ' ' + 'слабак!)';
			}
		});

		// применить все настройки при их закрытии
		function closeSetting() {
			settingBall.classList.add('hide');
			sizeBallVal = +sizeBall.value; // размер шарика
			colorBallVal = colorBall.value; // цвет шарика
			colorAreaVal = colorArea.value; // цвет интерфейса

			ball.style.width = sizeBallVal + 'px'; // размер шарика
			ball.style.height = sizeBallVal + 'px'; // размер шарика
			ball.style.backgroundColor = colorBallVal; // цвет шарика
			ballBg.style.backgroundColor = colorAreaVal; // цвет арены
		}
	});

	// проверка настроек
	function check() {
		sizeBallVal = +sizeBall.value; // размер шарика
		colorBallVal = colorBall.value; // цвет шарика
		colorAreaVal = colorArea.value; // цвет интерфейса
		if (sizeBallVal != '30' || colorBallVal != '#00a700' || colorAreaVal != '#c0afc5') {
			resetBtn.classList.remove('hide');
		} else {
			resetBtn.classList.add('hide');
		}
	}


	// СБРОС НАСТРОЕК
	resetBtn.addEventListener('click', resetSettings);

	function resetSettings() {
		colorBall.value = '#00a700'; // цвет шарика
		sizeBall.value = 30; // разме шарика
		colorArea.value = '#c0afc5'; // цвет интерфейса
		ballSizeOut.textContent = '30';

		ball.style.width = +sizeBall + 'px'; // размер шарика
		ball.style.height = +sizeBall + 'px'; // размер шарика
		ball.style.backgroundColor = colorBall; // цвет шарика
		ballBg.style.backgroundColor = colorArea; // цвет арены
		resetBtn.classList.add('hide');
	}

	//                                        ! СТАРТ ИГРЫ !

	btnStart.addEventListener('click', startsGame);

	function startsGame() {
		scoreOutBall.innerHTML = settingGame.score; // вывиел дефолтное значение
		settingGame.playStatus = true; // переводим статус игру в тру
		settingBallBtn.classList.add('hide'); // скрыл кнапку с настройками
		tablRecords.classList.add('hide'); // таблица рекордов

		// проверка на выбраный уровень
		if (settingGame.startHardGame === false) {
			hideBall();
		} else {
			hideBallHard();
		}
		random();

		// проверка на цвет арены // если арена черная сделать счетчик белым
		if (colorArea.value == '#000000') {
			scoreOutBall.style.color = '#fff';
		}
		infoLvl.classList.add('hide'); // скрыл ифу о уровне

		counterTime = setInterval(timeEndScore, 1000); // вызов счетчика
		timeEnd.innerHTML = `Осталось времени: ${settingGame.counter}`;
		// избегаю повторного запуска при переигрыванию
		if (settingGame.restartCounter === true) {
			timeMissClick = setTimeout(() => {
				missClick(); // клик мимо шарика
			}, 1000);
		}
		console.log(settingGame.startHardGame);
	}


	//                                            НАСТРОЙКИ ШАРИКА
	// функция клика по шарику
	ball.addEventListener('click', function clickBall(event) {
		soundClick(); // звук клика по шарику
		this.classList.add('hide'); // скрыть шарик
		settingGame.score++;
		scoreOutBall.innerHTML = settingGame.score;

	});

	//  ЗВУКИ                                       ЗВУКИ
	function soundClick() {
		let audio = new Audio(); // новый элемент Audio
		audio.src = 'click.mp3'; // путь к звуку "click"
		audio.autoplay = true;   // запускаем
	}

	function soundMissClick() {
		let audio = new Audio();     // новый элемент Audio
		audio.src = 'missClick.mp3'; // путь к звуку "missClick"
		audio.autoplay = true;       // запускаем
	}

	//                                  НАСТРОЙКИ АНИМАЦИИ ШАРИКА
	function hideBall() {
		if (settingGame.playStatus === true) {
			ball.classList.add('hide');
			hideShowBall();
			random();
		}
	}

	// ДЕФОЛТНОЕ скритие / появление - шарика
	function hideShowBall() {
		setTimeout(() => {
			ball.classList.remove('hide');
			setTimeout(() => {
				hideBall();

			}, settingGame.dificaltyCount);
		}, settingGame.emergingBall);
	}

	// появление шариков в СЛОЖНОМ уровне
	function hideBallHard() {
		if (settingGame.playStatus === true) {
			ball.classList.add('hide');
			hideShowBallHard();
			random();
		}
	}

	function hideShowBallHard() {
		setTimeout(() => {
			ball.classList.remove('hide');
			animationBall();
			setTimeout(() => {
				hideBallHard();
			}, settingGame.dificaltyCount);
		}, settingGame.emergingBall);
	}

	// СЧЕТЧИК
	function timeEndScore() {
		settingGame.counter--;
		timeEnd.innerHTML = `Осталось времени: ${settingGame.counter}`;

		// условия остановки таймера
		if (settingGame.counter <= 0) {
			modalEndGame.classList.remove('hide'); // модалка
			settingGame.playStatus = false; // остановить игру
			stopGameBall(); // детальные настройки при остановке
		}

	}

	// проверка на 0 очков
	function scoreZero() {
		if (settingGame.score == 0) {
			return false;
		}
		settingGame.score--;
		scoreOutBall.innerHTML = settingGame.score;

	}

	// клик мимо цели
	function missClick() {
		area.appendChild(miss); // спан для "х" // промахов
		ballBg.addEventListener('click', (event) => {
			const target = event.target;
			// если клик по объекту с класом ball // не выполнять код
			if (target.classList.contains('ball')) {
				return false;
			}

			soundMissClick(); // звук клика мимо
			scoreZero();  // проверка н 0 очков
			// следы от кликов мимо
			miss.style.position = 'absolute';
			miss.innerHTML = 'x';
			miss.style.left = event.clientX + 'px';
			miss.style.zIndex = 100;
			miss.style.top = event.clientY + 'px';
			setTimeout(() => {
				miss.innerHTML = '';
				settingGame.missCounter++;
			}, 500);
			// окрас счетчика
			scoreOutBall.style.color = 'red';
			setTimeout(() => {
				scoreOutBall.style.color = '#000';
			}, 200);
		});
	}

	//                                          КОНЕЦ ИГРЫ
	function stopGameBall() {
		ball.classList.add('hide');
		clearInterval(counterTime); // остановка таймера
		modalEndGame.classList.remove('hide'); // модалка
		modalResul.innerHTML = `Твой результат: ${settingGame.score} очков`; // инфа
		modalLvl.innerHTML = `Сложность: ${settingGame.complexity}`;
		modaMiss.innerHTML = `Промахов: ${settingGame.missCounter}`;
		arrRecords.push(settingGame.score);  // записываю рекорд в массив
		//сортировка массива
		arrRecords.sort((a, b) => {
			return b - a;
		});
		// записываю в переменные рекорды
		first = arrRecords[0];
		second = arrRecords[1];
		third = arrRecords[2];
		fourth = arrRecords[3];
		fifth = arrRecords[4];
		// перебор места для вывода рекордов
		for (let i = 0; i < recordsItem.length; i++) {
			recordsOut();
		}
		localStorage.setItem('tabl', JSON.stringify(arrRecords)); // СОХРАНЯЮ РЕКОРДЫ

		tablRecords.classList.remove('hide'); // таблица рекордов
		modalRestart.addEventListener('click', restart); // переиграть
		modalLoad.addEventListener('click', reload); // перезагрузить страницу
	}

	// вывод рекордов
	function recordsOut() {
		if (first != undefined) {
			recordsItem[0].innerHTML = first;
		}
		if (second != undefined) {
			recordsItem[1].innerHTML = second;
		}
		if (third != undefined) {
			recordsItem[2].innerHTML = third;
		}
		if (fourth != undefined) {
			recordsItem[3].innerHTML = fourth;
		}
		if (fifth != undefined) {
			recordsItem[4].innerHTML = fifth;
		}

	}

	// переиграть
	function restart() {
		settingGame.restartCounter = false;  // избегаю повторной загрузки счетчика
		modalEndGame.classList.add('hide');      // закрываю модалку
		settingGame.counter = 15;            // сбрасываю к дефолтным значениям
		settingGame.score = 0;
		scoreOutBall.innerHTML = settingGame.score;
		settingGame.missCounter = 0;
		startsGame();     // запускаю игру заново
	}

	// перезагрузка страницы
	function reload() {
		location.reload();
	}
}

game();

// ПАРАЛАКС
const parallaxImg = document.querySelector('.parallax');
const parallaxText = document.querySelector('.parallax-text');

function parallax(event) {
	parallaxImg.style.transform = `translate(${event.clientX / 100}px, ${event.clientY / 100}px)`;
	parallaxText.style.transform = `translate(${event.clientX / 40}px, ${event.clientY / 40}px)`;
}

document.addEventListener('mousemove', parallax);


area.onload = function (event) {

	setTimeout(() => {
		let preloader = document.querySelector('.preloader');
		if (!preloader.classList.contains('load')) {
			preloader.classList.add('load');
		}
	}, 1000);

};