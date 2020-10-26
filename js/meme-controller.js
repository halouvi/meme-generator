'use strict';


function initEditor() {
    initModel()
    document.querySelector('.text-input').addEventListener('input', onUpdateText);
    document.querySelector('.font-color').addEventListener('input', onFontColorUpdate);
    renderCanvas();
}

function renderCanvas() {
    var meme = getMeme();
    var imgToDraw = new Image();
    imgToDraw.src = meme.selectedImgURL;
    imgToDraw.onload = () => {
        gCtx.drawImage(imgToDraw, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach(line => {
            gCtx.font = `${line.fontSize}px ${line.fontFamily}`;
            gCtx.fillStyle = line.fontColor;
            gCtx.lineWidth = '2';
            gCtx.textAlign = line.textAlign;
            let posX;
            if (gCtx.textAlign === 'center') posX = gCanvas.width / 2
            if (gCtx.textAlign === 'end') posX = gCanvas.width
            if (gCtx.textAlign === 'start') posX = 0
            gCtx.fillText(line.txt, posX, line.posY);
            gCtx.strokeText(line.txt, posX, line.posY);
        });
    };
}

function renderControls(currLine) {
    if (!currLine) {
        document.querySelector('.text-input').value = null
    } else {
        document.querySelector('.text-input').value = currLine.txt;
        document.querySelector('.font-color').value = currLine.fontColor;
        document.querySelector('.font-family').value = currLine.fontFamily;
        document.querySelector('.font-family').style.fontFamily = currLine.fontFamily;
        document.querySelector('.text-align').value = currLine.textAlign;
        document.querySelector('.text-align img').src = `img/icons/align-${currLine.textAlign}.png`
    }
}

function onUpdateText(ev) {
    doUpdateText(ev);
    renderCanvas()
}

function onFontColorUpdate(ev) {
    doFontColorUpdate(ev);
    renderCanvas()
}

function onAddLine() {
    const elTxtInput = document.querySelector('.text-input');
    if (doAddline(elTxtInput)) elTxtInput.value = '';
}

function onDeleteLine() {
    deleteLine();
    renderControls(cycleLines());
    renderCanvas();
}

function onCycleLines() {
    renderControls(doCycleLines())
}

function onLineMove(value) {
    doLineMove(value);
    renderCanvas();
}

function onFontSizeUpdate(value) {
    doFontSizeUpdate(value);
    renderCanvas();
}

function onFontFamilyUpdate(value) {
    renderControls(doFontFamilyUpdate(value));
    renderCanvas();
}

function onTextAlignUpdate(value) {
    renderControls(doTextAlignUpdate(value));
    renderCanvas()
}