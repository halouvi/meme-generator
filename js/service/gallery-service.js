'use strict';

function doMemeSelect(id) {
    const img = gImgs.find((img) => {
        return img.id === id;
    })
    gMeme.selectedImgId = img.id;
    gMeme.selectedImgURL = img.url
    saveToStorage(getStorageKey(), gMeme)
}