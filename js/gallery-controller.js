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
    doMemeSelect(id);
    loadEditor();
}

function loadEditor() {
    window.location.href = `meme-editor.html`;
}
