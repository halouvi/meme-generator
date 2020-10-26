'use strict';

const imgSquareURL = 'img/meme-square/'


var gCanvas;
var gCtx;
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
    lines: [
        {
            txt: "",
            textAlign: "center",
            fontFamily: "Impact",
            fontColor: "#ffffff",
            fontSize: 36,
            posX: 250,
            posY: 36
        }
    ]
}

function initModel() {
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
    gMeme = loadFromStorage(STORAGE_KEY)
}

function doUpdateText(ev) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) currLine = createNewLine(ev.target.value);
    else currLine.txt = ev.target.value;
    return currLine;
}

function createNewLine(txt) {
    let posY;
    const fontSize = 36;
    if (!gMeme.lines.length) posY = fontSize;
    else if (gMeme.lines.length === 1) posY = gCanvas.height - (fontSize / 2.5);
    else posY = (gCanvas.height / 2);
    const newLine = {
        txt,
        textAlign: document.querySelector('.text-align').value,
        fontFamily: document.querySelector('.font-family').value,
        fontColor: document.querySelector('.font-color').value,
        fontSize,
        posX: gCanvas.width / 2,
        posY,
    }
    gMeme.lines.push(newLine);
    return newLine;
}

function doCycleLines() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx += 1;
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    return currLine;
}

function doAddline(elTxtInput) {
    if (!elTxtInput.value) return false;
    gMeme.selectedLineIdx = gMeme.lines.length;
    return true
}

function doDeleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (!gMeme.lines.length) gMeme.lines.push(
        {
            fontColor: "#ffffff",
            fontFamily: "Impact",
            fontSize: 36,
            posX: 250,
            posY: 36,
            textAlign: "center",
            txt: ""
        }
    )
}

function doTextAlignUpdate(currAlign) {
    let nextAlign = '';
    if (currAlign === 'center') nextAlign = 'start'
    else if (currAlign === 'start') nextAlign = 'end';
    else if (currAlign === 'end') nextAlign = 'center';
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) currLine = { textAlign: nextAlign };
    else currLine.textAlign = nextAlign;
    return currLine;
}

function doLineMove(where) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) return
    const distance = currLine.fontSize;
    if (where === 'up' && currLine.posY > distance) currLine.posY -= distance;
    else if (where === 'down' && currLine.posY < gCanvas.height - distance) currLine.posY += distance;
    return currLine;
}

function doFontFamilyUpdate(currFont) {
    const fonts = ['Impact', 'Arial', 'Montserrat-Bold', 'Montserrat-Regular']
    const nextFontIdx = fonts.indexOf(currFont) + 1;
    let nextFont = nextFontIdx < fonts.length ? fonts[nextFontIdx] : fonts[0];
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) {
        currLine = { fontFamily: nextFont };
    } else {
        currLine.fontFamily = nextFont;
    }
    return currLine;
}

function doFontSizeUpdate(direction) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!currLine) return;
    direction === 'up' ? currLine.fontSize *= 1.2 : currLine.fontSize /= 1.2;
    return currLine;
}

function doFontColorUpdate(ev) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (!currLine) return;
    currLine.fontColor = ev.target.value;
    return currLine;
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme
}