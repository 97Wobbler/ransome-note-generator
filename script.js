function saveAsImage() {
    htmlToImage.toPng(document.getElementById('letter-container'))
        .then(function (dataUrl) {
            download(dataUrl, 'img.png');
        });
}

function download(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const letterContainer = document.getElementById(`letter-container`);

function generate() {
    const textarea = document.getElementById('input-text-area');
    let text = removeCharacters(textarea.value);

    if (!text) text = "안녕하세요!"

    resetAllLetters();

    for (const char of text) {
        new LetterElement(char)
            .initialize()
            .update()
            .addOnHTML();

        // const br = document.createElement('div');
        // br.style.width = "100%"; 
        // letterContainer.appendChild(br);
    }
}

function resetAllLetters() {
    letterContainer.innerHTML = '';
}

class LetterElement {
    constructor(textContent) {
        this.textContent = addKoreanLetter(textContent);
    }

    initialize() {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.container.onclick = () => { this.update() };

        this.text = document.createElement('div');
        this.text.classList.add('text');
        this.text.textContent = this.textContent;

        this.container.appendChild(this.text);

        return this;
    }

    update() {
        this.rotate();
        this.changeSize();
        this.changeColor();
        this.changeFont();
        return this;
    }

    addOnHTML() {
        letterContainer.appendChild(this.container);
    }

    rotate() {
        const maxValue = 10;
        const randomAngle = 2 * Math.random() * maxValue - maxValue;
        this.container.style.transform = `rotate(${randomAngle}deg)`;

        return this;
    }

    changeColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const backgroundColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        const backgroundColorBrightness = (r + g + b) / 3;
        const backgroundColorIsBright = backgroundColorBrightness > 128;

        const textColor = backgroundColorIsBright ? '#000000' : '#FFFFFF';

        this.container.style.backgroundColor = backgroundColor;
        this.text.style.color = textColor;

        return this;
    }

    changeSize() {
        this.text.style.fontSize = 20 + Math.random() * 10 + 'px';
        return this;
    }

    changeFont() {
        const fontIndex = Math.ceil(3 * Math.random());
        this.text.classList.add(`font-${fontIndex}`);

        return this;
    }
}

function removeCharacters(inputString) {
    inputString = inputString.trim();
    inputString = inputString.replace(/\./g, '\n');
    inputString = inputString.replace(/\s/g, '');

    return inputString;
}

function addKoreanLetter(inputString) {
    const koreanCharCodeStart = String('가').charCodeAt(0);
    const koreanCharCodeEnd = String('힣').charCodeAt(0);

    const inputCharCode = inputString.charCodeAt(0);

    if (inputCharCode < koreanCharCodeStart || inputCharCode > koreanCharCodeEnd) return inputString;

    const randomKoreanChar1 = getFrequentlyUsedRandomKoreanChar();
    const randomKoreanChar2 = getFrequentlyUsedRandomKoreanChar();

    return randomKoreanChar1 + inputString + randomKoreanChar2;
}

function getFrequentlyUsedRandomKoreanChar() {
    const choseong = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const jungseong = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const jongseong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const choseongFrequentlyUsed = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅎ'];
    const jungseongFrequentlyUsed = ['ㅏ', 'ㅐ', 'ㅓ', 'ㅔ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'];
    const jongseongFrequentlyUsed = [''];

    const choseongRandom = choseongFrequentlyUsed[Math.floor(choseongFrequentlyUsed.length * Math.random())];
    const jungseongRandom = jungseongFrequentlyUsed[Math.floor(jungseongFrequentlyUsed.length * Math.random())];
    const jongseongRandom = jongseongFrequentlyUsed[Math.floor(jongseongFrequentlyUsed.length * Math.random())];

    const choseongIndex = choseong.indexOf(choseongRandom);
    const jungseongIndex = jungseong.indexOf(jungseongRandom);
    const jongseongIndex = jongseong.indexOf(jongseongRandom);

    const randomKoreanCharCode = choseongIndex * 21 * 28 + jungseongIndex * 28 + jongseongIndex + 0xAC00;
    const randomKoreanChar = String.fromCharCode(randomKoreanCharCode);

    return randomKoreanChar;
}
