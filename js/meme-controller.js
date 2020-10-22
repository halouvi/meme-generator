'use strict';

function initGallery() {
    renderGallery();
}

function renderGallery() {
    getImgs().forEach((img) => {
        document.querySelector('.gallery').innerHTML += `<img src="${img.url}" onclick=(onMemeSelect(${img.id}))>`;
    })
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
            if (gCtx.textAlign === 'center') posX = gCanvas.width/2
            if (gCtx.textAlign === 'end') posX = gCanvas.width
            if (gCtx.textAlign === 'start') posX = 0
            gCtx.fillText(line.txt, posX, line.posY);
            gCtx.strokeText(line.txt, posX, line.posY);
        });
    };
}

function renderControls(currLine) {
    if (currLine){
        document.querySelector('.text-input').value = currLine.txt;
        document.querySelector('.font-size').value = currLine.fontSize;
        document.querySelector('.font-color').value = currLine.fontColor;
        document.querySelector('.font-family').value = currLine.fontFamily;
        document.querySelector('.text-align').value = currLine.textAlign;
        document.querySelector('.text-align').innerText = currLine.textAlign;
    } else document.querySelector('.text-input').value = null;
}

function onMemeSelect(id) {
    doMemeSelect(id);
    loadEditor();
}

function initEditor() {
    initModel()
    document.querySelector('.text-input').addEventListener('input', onUpdateText);
    document.querySelector('.font-color').addEventListener('input',onFontColorUpdate);
    renderCanvas();
}

function onUpdateText(ev) {
    doUpdateText(ev);
    renderCanvas()
}

function onFontColorUpdate(ev) {
    doUpdateColor(ev);
    renderCanvas()
}

function onAddLine() {
    updateSelectedLineIdx()
    document.querySelector('.text-input').value = '';
}

function onDeleteLine() {
    deleteLine();
    renderControls(cycleLines());
    renderCanvas();
}

function onCycleLines() {
    renderControls(cycleLines())
}

function onLineMove(where) {
    doLineMove(where);
    renderCanvas();
}

function onFontSizeUpdate(ev) {
    doFontSizeUpdate(ev);
    renderCanvas();
}

function onFontFamilyUpdate(ev) {
    doFontFamilyUpdate(ev);
    renderCanvas();
}

function onTextAlignUpdate(ev) {
    renderControls(doTextAlignUpdate(ev));
    renderCanvas()
}