// Файл setup.js
'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var pictures = [];
for (var i = 0; i < 25; i++) {
  var pictureComments = [];
  for (var j = 0; j <= getRandomInt(2); j++) {
    pictureComments[j] = getRandomValue(comments);
  }

  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInRange(1, 25),
    comments: pictureComments
  };

}

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;

var renderPicture = function (pic) {
  var picElement = pictureTemplate.cloneNode(true);

  picElement.querySelector('img').src = pic.url;
  picElement.querySelector('.picture-likes').textContent = pic.likes;
  picElement.querySelector('.picture-comments').textContent = pic.comments.length;

  return picElement;
};

var makeFragment = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  return fragment;
};

picturesList.appendChild(makeFragment());

var galleryOverlay = document.querySelector('.gallery-overlay');

var fillOverlay = function (overlay, pic) {

  overlay.querySelector('.gallery-overlay-image').src = pic.url;
  overlay.querySelector('.likes-count').textContent = pic.likes;
  overlay.querySelector('.comments-count').textContent = pic.comments.length;

};

fillOverlay(galleryOverlay, pictures[0]);
galleryOverlay.classList.remove('hidden');

