'use strict';

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
    selectedImgURL: '',
    selectedLineIdx: 0,
    lines: []
}
var gCanvas;
var gCtx;

function cycleLines() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx += 1;
    return gMeme.lines[gMeme.selectedLineIdx]
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function updateSelectedLineIdx() {
    var elTextInput = document.querySelector('.text-input').value;
    if (!elTextInput) return;
    gMeme.selectedLineIdx = gMeme.lines.length;

}

function doUpdateText(ev) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) currLine = createNewLine(ev.target.value);
    else currLine.txt = ev.target.value;

    // if (currLine.align === 'center') alignCenter(currLine)
    // else if (currLine.align === 'right') alignRight(currLine)
    // else if (currLine.align === 'left') currLine.posX = 25

}

function createNewLine(txt) {
    var posY;
    var fontSize = +document.querySelector('.font-size').value;
    if (!gMeme.lines.length) posY = fontSize;
    else if (gMeme.lines.length === 1) posY = gCanvas.height - (fontSize / 2.5);
    else posY = (gCanvas.height / 2);
    var newLine = {
        txt,
        textAlign: document.querySelector('.text-align').value,
        fontSize,
        fontFamily: document.querySelector('.font-family').value,
        fontColor: document.querySelector('.font-color').value,
        posX: gCanvas.width / 2,
        posY,
    }
    gMeme.lines.push(newLine);
    return newLine;
}

function doUpdateColor(ev) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].fontColor = ev.target.value;
}

function getImgs() {
    return gImgs;
}

function doMemeSelect(id) {
    let img = getImgById(id)
    gMeme.selectedImgId = img.id;
    gMeme.selectedImgURL = img.url
    saveToStorage(STORAGE_KEY, gMeme)
}

function loadEditor() {
    window.location.href = `meme-editor.html`;
}

function initModel() {
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
    gMeme = loadFromStorage(STORAGE_KEY)
}

function doLineMove(where) {
    let line = gMeme.lines[gMeme.selectedLineIdx];
    let distance = line.fontSize;
    if (where === 'up' && line.posY > distance) line.posY -= distance;
    else if (where === 'down' && line.posY < gCanvas.height - distance) line.posY += distance;
}

function doFontSizeUpdate(ev) {
    if (!gMeme.lines.length) return;
    gMeme.lines[gMeme.selectedLineIdx].fontSize = +ev.target.value;
}

function doFontFamilyUpdate(ev) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = ev.target.value;

}

function doTextAlignUpdate(ev) {
    let nextValue;
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (ev.target.value === 'center') nextValue = 'start';
    else if (ev.target.value === 'start') nextValue = 'end';
    else if (ev.target.value === 'end') nextValue = 'center';
    currLine.textAlign = nextValue;
    return currLine;
}

function getImgById(id) {
    return gImgs.find((img) => {
        return img.id === id;
    })
}

function getMeme() {
    return gMeme
}