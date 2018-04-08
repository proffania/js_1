function init() {
    var images = document.getElementsByTagName('img');
    console.log(images);
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = changeBigPicture;
    }
}

init();

function changeBigPicture() {
    var big_picture = document.getElementById('big_picture');
    big_picture.innerHTML = '';

    var img = this;
    var imageNameParts = img.id.split('_');

    var src = 'img/big/img' + imageNameParts[1] + '.jpg';

    var imageDomElement = document.createElement('img');
    imageDomElement.src = src;

    imageDomElement.onerror = function () {
        alert('Картинка не найдена!!!')
    }
    imageDomElement.onload = function () {
        big_picture.appendChild(imageDomElement);
    }
}
