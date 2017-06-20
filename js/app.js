'use strict';

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var container = document.getElementById('image_container');

function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}

Product.all = [];

for(var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

function makeRandom() {
  return Math.floor(Math.random() * names.length);
}

function displayPics(){
  var showing = [];
  showing[0] = makeRandom();
  showing[1] = makeRandom();
  while(showing[0] === showing[1]) {
    console.log('Duplicate! Re-rolling!');
    showing[1] = makeRandom();
  }
  showing[2] = makeRandom();
  while(showing[0] === showing[2] || showing[1] === showing[2]){
    console.log('Duplicate! Re-rolling!')
    showing[2] = makeRandom();
  }
  left.src = Product.all[showing[0]].path;
  center.src = Product.all[showing[1]].path;
  right.src = Product.all[showing[2]].path;
  left.id = Product.all[showing[0]].name;
  center.id = Product.all[showing[1]].name;
  right.id = Product.all[showing[2]].name;
}

function handleClick(event) {
  console.log(event.target.id + ' was clicked');
  if (event.target.id === 'image_container') {
    alert('Click on an image, dumbass!');
  }
  displayPics();
}
container.addEventListener('click', handleClick);
displayPics();
