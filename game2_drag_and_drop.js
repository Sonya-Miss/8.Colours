// game2_drag_and_drop.js

// --- ДАНІ ДЛЯ ГРИ 2 ---
const dragAndDropPuzzlesData2 = [
    { correctWord: "How are you", image: "./Pictures/як твої справи.jpg", draggableWord: "How are you" },
    { correctWord: "I'm good", image: "./Pictures/добре.jpg", draggableWord: "I'm good" },
    { correctWord: "I'm happy", image: "./Pictures/щасливий.jpg", draggableWord: "I'm happy" },
    { correctWord: "I'm great", image: "./Pictures/чудово.jpg", draggableWord: "I'm great" },
    { correctWord: "I'm sad", image: "./Pictures/сумний.jpg", draggableWord: "I'm sad" },
    { correctWord: "I'm tired", image: "./Pictures/втомлений.jpg", draggableWord: "I'm tired" },
    { correctWord: "I'm hungry", image: "./Pictures/голодний.jpg", draggableWord: "I'm hungry" }
];

// Глобальна змінна для відстеження перетягуваного елемента для ЦІЄЇ ГРИ
let draggedItem2 = null; // Змінено на draggedItem2, щоб уникнути конфліктів

// --- ДОПОМІЖНІ ФУНКЦІЇ (копія, якщо вони не глобальні в вашому основному файлі) ---
function shuffleArray2(array) { // Змінено назву, щоб уникнути конфліктів
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// --- ФУНКЦІЇ ДЛЯ ГРИ 2 (Перетягування слів) ---

/** Створює одну головоломку для Гри 2 (перетягування слова до картинки) */
function createDragAndDropPuzzle2(puzzleData, index) {
    const puzzleId = `drag2-puzzle-${index}`; // Унікальний ID для Гри 2
    const correctWord = puzzleData.correctWord;
    const imagePath = puzzleData.image;

    // Змінні контейнерів для Гри 2 (знайдені всередині DOMContentLoaded)
    const puzzlesContainerDragAndDrop2 = document.getElementById('puzzles-container-drag-and-drop2');
    if (!puzzlesContainerDragAndDrop2) {
        console.error('Контейнер пазлів для Гри 2 (puzzles-container-drag-and-drop2) не знайдено.');
        return;
    }

    const puzzleWrapper = document.createElement('div');
    puzzleWrapper.id = puzzleId;
    puzzleWrapper.className = "bg-white p-3 rounded-lg shadow-md flex flex-col items-center relative flex-grow-0 flex-shrink-0 w-[calc(33.33%-1.066rem)] min-w-[180px]";
    puzzleWrapper.innerHTML = `
        <img src="${imagePath}" alt="Зображення для слова ${correctWord}" class="w-28 h-28 object-cover rounded-md shadow-sm mb-3"> 
        
        <div class="word-drop-zone2 w-full h-16 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md text-lg font-bold text-gray-500 overflow-hidden">
            <span class="placeholder text-sm">Перетягніть слово сюди</span>
        </div>
        
        <div class="mt-3">
            <button id="check-btn-drag2-${index}" class="w-full bg-sky-500 text-white font-bold py-1.5 px-3 rounded-md hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300 text-sm">
                Перевірити
            </button>
            <p id="message-drag2-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
        </div>
    `;
    puzzlesContainerDragAndDrop2.appendChild(puzzleWrapper);
    
    const wordDropZone = puzzleWrapper.querySelector('.word-drop-zone2'); // Унікальний клас для зони скидання Гри 2
    const checkBtn = document.getElementById(`check-btn-drag2-${index}`);
    const messageEl = document.getElementById(`message-drag2-${index}`);

    addWordDropZoneListeners2(wordDropZone); // Використовуємо функції з суфіксом 2
    checkBtn.addEventListener('click', () => checkWordDropResult2(correctWord, wordDropZone, messageEl, checkBtn)); // Використовуємо функції з суфіксом 2
}

/** Створює та додає перетягувані слова до контейнера для Гри 2 */
function createDraggableWords2() {
    const draggableWordsContainer2 = document.getElementById('draggable-words-container2');
    if (!draggableWordsContainer2) {
        console.error('Контейнер перетягуваних слів для Гри 2 (draggable-words-container2) не знайдено.');
        return;
    }

    draggableWordsContainer2.innerHTML = ''; 
    const wordsToDrag = shuffleArray2(dragAndDropPuzzlesData2.map(p => p.draggableWord)); // Використовуємо shuffleArray2

    wordsToDrag.forEach((word, index) => {
        const wordBox = document.createElement('div');
        wordBox.id = `draggable-word2-${index}`; // Унікальний ID слова для Гри 2
        wordBox.className = 'draggable-word bg-blue-200 text-blue-800 py-3 px-6 rounded-lg shadow-md cursor-grab text-xl md:text-2xl font-semibold transition-transform duration-200 hover:scale-105';
        wordBox.textContent = word;
        wordBox.draggable = true;
        addDraggableWordListeners2(wordBox); // Використовуємо функції з суфіксом 2
        draggableWordsContainer2.appendChild(wordBox);
    });
}

/** Додавання слухачів подій до елементів, що перетягуються (слова) для Гри 2 */
function addDraggableWordListeners2(element) {
    element.addEventListener('dragstart', (e) => {
        draggedItem2 = e.target; // Використовуємо draggedItem2
        e.dataTransfer.setData('text/plain', element.textContent);
        setTimeout(() => {
            e.target.classList.add('opacity-50');
        }, 0);
    });

    element.addEventListener('dragend', (e) => {
        setTimeout(() => {
            if (draggedItem2) { // Використовуємо draggedItem2
               draggedItem2.classList.remove('opacity-50');
            }
            draggedItem2 = null; // Використовуємо draggedItem2
        }, 0);
    });
}

/** Додавання слухачів подій до зон скидання (контейнери над картинками) для Гри 2 */
function addWordDropZoneListeners2(zone) {
    const draggableWordsContainer2 = document.getElementById('draggable-words-container2'); // Отримуємо посилання тут
    
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedItem2 && draggedItem2.classList.contains('draggable-word') && !zone.querySelector('.draggable-word')) {
            zone.classList.add('drag-over');
        }
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');

        if (draggedItem2 && draggedItem2.classList.contains('draggable-word') && !zone.querySelector('.draggable-word')) {
            const existingWord = zone.querySelector('.draggable-word');
            if (existingWord) {
                draggableWordsContainer2.appendChild(existingWord); // Повертаємо в контейнер Гри 2
                existingWord.classList.remove('correct-word-box', 'incorrect-word-box');
                existingWord.draggable = true;
                existingWord.style.cursor = 'grab';
            }
            
            zone.appendChild(draggedItem2); // Використовуємо draggedItem2
            const placeholder = zone.querySelector('.placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            const messageEl = zone.parentElement.querySelector('[id^="message-drag2-"]'); // ID для Гри 2
            if (messageEl) {
                messageEl.textContent = '';
                zone.classList.remove('correct', 'incorrect');
                if (draggedItem2.classList.contains('correct-word-box') || draggedItem2.classList.contains('incorrect-word-box')) {
                    draggedItem2.classList.remove('correct-word-box', 'incorrect-word-box');
                }
            }
            const checkBtn = zone.parentElement.querySelector('[id^="check-btn-drag2-"]'); // ID для Гри 2
            if (checkBtn) {
                checkBtn.disabled = false;
            }
        }
    });
}

/** Перевірка результату для Гри 2 */
function checkWordDropResult2(correctWord, wordDropZone, messageEl, checkBtn) {
    const draggableWordsContainer2 = document.getElementById('draggable-words-container2'); // Отримуємо посилання тут
    
    const droppedWordElement = wordDropZone.querySelector('.draggable-word');
    let userAnswer = '';
    
    if (!droppedWordElement) {
        messageEl.textContent = 'Будь ласка, перетягніть слово';
        messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
        return;
    }

    userAnswer = droppedWordElement.textContent.trim();

    if (userAnswer === correctWord) {
        messageEl.textContent = 'Чудово, правильно!';
        messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-green-600';
        checkBtn.disabled = true;
        wordDropZone.classList.add('correct');
        wordDropZone.classList.remove('incorrect');
        droppedWordElement.classList.add('correct-word-box');
        droppedWordElement.classList.remove('incorrect-word-box');
        droppedWordElement.draggable = false;
        droppedWordElement.style.cursor = 'default';
    } else {
        messageEl.textContent = 'Спробуйте ще раз';
        messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-red-600';
        wordDropZone.classList.add('incorrect');
        wordDropZone.classList.remove('correct');
        droppedWordElement.classList.add('incorrect-word-box');
        droppedWordElement.classList.remove('correct-word-box');

        setTimeout(() => {
            const placeholder = wordDropZone.querySelector('.placeholder');
            if (placeholder) {
                placeholder.style.display = 'inline';
            } else {
                wordDropZone.innerHTML = `<span class="placeholder text-sm">Перетягніть слово сюди</span>`;
            }
            
            wordDropZone.classList.remove('incorrect');
            droppedWordElement.classList.remove('incorrect-word-box', 'opacity-50');
            droppedWordElement.classList.add('bg-blue-200', 'text-blue-800', 'hover:scale-105'); 
            draggableWordsContainer2.appendChild(droppedWordElement); // Повертаємо в контейнер Гри 2
            droppedWordElement.draggable = true;
            droppedWordElement.style.cursor = 'grab';
        }, 1000);
    }
}


// --- ІНІЦІАЛІЗАЦІЯ ГРИ 2 ПІСЛЯ ЗАВАНТАЖЕННЯ DOM ---
document.addEventListener('DOMContentLoaded', () => {
    const puzzlesContainerDragAndDrop2 = document.getElementById('puzzles-container-drag-and-drop2');
    const draggableWordsContainer2 = document.getElementById('draggable-words-container2');

    if (puzzlesContainerDragAndDrop2 && draggableWordsContainer2 && dragAndDropPuzzlesData2.length > 0) {
        console.log('Ініціалізація Гри 2: Перетягни слово до картинки (Емоції)');
        dragAndDropPuzzlesData2.forEach((data, index) => {
            createDragAndDropPuzzle2(data, index);
        });
        createDraggableWords2(); // Викликаємо функцію для створення слів Гри 2
    } else {
        console.warn('Контейнери або дані для Гри 2 відсутні. Перевірте HTML ID або dragAndDropPuzzlesData2.');
    }
});