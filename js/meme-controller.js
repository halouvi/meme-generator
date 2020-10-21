'use strict';

function initGallery() {
    renderGallery();
}

function renderGallery() {
    getImgs().forEach((img) => {
        document.querySelector('.gallery').innerHTML += `<img src="${img.url}" onclick=(onMemeSelect(${img.id}))>`;
    })
}

function onMemeSelect(id) {
    memeSelect(id);
}

function initEditor() {
    initModel()
}

function onAddLine() {
    updateSelectedLineIdx()
    document.querySelector('.text-input').value = '';
}

function onCycleLines() {
    cycleLines()
}

function renderCanvas() {
    drawImg(getMemeById(gMeme.selectedImgId));
    setTimeout(() => drawText(gMeme.lines), 2)
}