// 'use strict';

const imgSquareURL = 'img/meme-square/'
const STORAGE_KEY = 'memeDB'

var gImgs = [
    {
        id: 1,
        url: `${imgSquareURL}1.jpg`
    },
    {
        id: 2,
        url: `${imgSquareURL}2.jpg`
    },
    {
        id: 3,
        url: `${imgSquareURL}3.jpg`
    },
    {
        id: 4,
        url: `${imgSquareURL}4.jpg`
    },
    {
        id: 5,
        url: `${imgSquareURL}5.jpg`
    },
    {
        id: 6,
        url: `${imgSquareURL}6.jpg`
    },
    {
        id: 7,
        url: `${imgSquareURL}7.jpg`
    },
    {
        id: 8,
        url: `${imgSquareURL}8.jpg`
    },
    {
        id: 9,
        url: `${imgSquareURL}9.jpg`
    },
    {
        id: 10,
        url: `${imgSquareURL}10.jpg`
    },
    {
        id: 11,
        url: `${imgSquareURL}11.jpg`
    },
    {
        id: 12,
        url: `${imgSquareURL}12.jpg`
    },
    {
        id: 13,
        url: `${imgSquareURL}13.jpg`
    },
    {
        id: 14,
        url: `${imgSquareURL}14.jpg`
    },
    {
        id: 15,
        url: `${imgSquareURL}15.jpg`
    },
    {
        id: 16,
        url: `${imgSquareURL}16.jpg`
    },
    {
        id: 17,
        url: `${imgSquareURL}17.jpg`
    },
    {
        id: 18,
        url: `${imgSquareURL}18.jpg`
    }
];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}
var gCanvas;
var gCtx;

addEventListener('input', updateText);



function cycleLines() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length -1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx += 1;
    document.querySelector('.text-input').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}
function updateSelectedLineIdx() {
    var elTextInput = document.querySelector('.text-input').value;
    if (!elTextInput) return;
    gMeme.selectedLineIdx += 1;

}

function updateText(ev) {
    var txt = ev.target.value;
    if (!txt) gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    else gMeme.lines[gMeme.selectedLineIdx] = { txt };
    renderCanvas();
}

function getImgs() {
    return gImgs;
}

function memeSelect(id) {
    gMeme.selectedImgId = id;
    saveToStorage(STORAGE_KEY, gMeme)
    loadEditor();
}

function loadEditor() {
    window.location.href = `meme-editor.html`;
}

function initModel() {
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
    gMeme = loadFromStorage(STORAGE_KEY)
    renderCanvas();
}


function drawImg(meme) {
    var memeToDraw = new Image();
    memeToDraw.onload = function () {
        gCtx.drawImage(memeToDraw, 0, 0, gCanvas.width, gCanvas.height)
    };
    memeToDraw.src = meme.url;
}

function drawText(lines, x = 120, y = 100) {
    lines.forEach(line => {
        gCtx.font = '48px Impact';
        gCtx.fillStyle = 'white'
        gCtx.lineWidth = '2';
        gCtx.textAlign = 'start';
        gCtx.fillText(line.txt, x, y);
        gCtx.strokeText(line.txt, x, y);
        y += 50;
    });
}

function getMemeById(id) {
    return gImgs.find((img) => {
        return img.id === id;
    })
}