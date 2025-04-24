"use strict"

let width = document.getElementById('width');
let height = document.getElementById('height');
const form = document.getElementById('form-wrapper');
const piano = document.getElementById('piano-wrapper');
const playButtons = document.getElementById('play-buttons');
const recordButton = document.getElementById('record');
const stopButton = document.getElementById('stop');
const playButton = document.getElementById('play');

let record = [];
let isRecording = false;
let startTime;

function getPianoInfo() {
    if ((width.value <= 15 && height.value <= 15) && (width.value > 0 && height.value > 0) && (width.value !== '' && height.value !== '')) {
        width = Number(width.value);
        height = Number(height.value);
        form.style.display = 'none';
        playButtons.classList.remove('hidden');
        playButtons.classList.add('play-buttons');

    } else {
        alert('piyano boyutları en fazla 15x15 olabilir!! \nheight-width boş bırakılamaz ve birden küçük olamaz')
    };
};

form.addEventListener("submit", function (e) {
    e.preventDefault();
    getPianoInfo();
    createPiano();
});

function createPiano() {

    piano.style.gridTemplateColumns = `repeat(${width}, ${70}px)`;
    piano.style.gridTemplateRows = `repeat(${height}, ${35}px)`;

    for (let i = 0; i < height * width; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.style.backgroundColor = randomColors();
        piano.appendChild(cell);

        const sound = Math.random() * 800 + 200;
        cell.dataset.note = sound;

        cell.addEventListener('click', function () {
            playBeepWithFrequency(Number(this.dataset.note));

            if (isRecording) {
                const soundTime = Date.now() - startTime;
                record.push({
                    frequency: sound,
                    time: soundTime
                });
            }
        });
    }
};

function randomColors() {
    const colorCodeLetters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += colorCodeLetters[Math.floor(Math.random() * 16)];
    };
    return color;
};

recordButton.addEventListener('click', () => {
    if (!isRecording) {
        record = [];
        isRecording = true;
        startTime = Date.now();
        recordButton.classList.add('recording');
    }
});

stopButton.addEventListener('click', () => {
    if (!isRecording) {
        alert('önce kaydı başlatın')
    } else {
        isRecording = false;
        recordButton.classList.remove('recording');
    }
});

playButton.addEventListener('click', () => {
    if (isRecording === true) {
        alert('kayıt devam ediyor')
    }
    else if (record.length === 0) {
        alert('kaydedilmiş bir ses yok')
    } else {
        playButton.classList.add('playing');
        playRecordedSequence(record);
        setTimeout(() => {
            playButton.classList.remove('playing');
        }, ((record.findLast((element) => element)).time) + 200);
    }
});

function playBeepWithFrequency(frequency) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
};

function playRecordedSequence(sequence) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    sequence.forEach(note => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.frequency.setValueAtTime(note.frequency, audioCtx.currentTime + note.time / 1000);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime + note.time / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(audioCtx.currentTime + note.time / 1000);
        oscillator.stop(audioCtx.currentTime + note.time / 1000 + 0.2);
    });
};
