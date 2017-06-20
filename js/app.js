'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.totalClicks = 0;

Product.left = document.getElementById('left');
Product.center = document.getElementById('center');
Product.right = document.getElementById('right');
Product.container = document.getElementById('image_container');
Product.tally = document.getElementById('tally');

function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}

Product.all = [];

for(var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics(){
  var at = [];
  at[0] = makeRandom();
  at[1] = makeRandom();

  while(at[0] === at[1]) {
    console.error('Duplicate! Re-rolling!');
    at[1] = makeRandom();
  }

  at[2] = makeRandom();
  while(at[0] === at[2] || at[1] === at[2]){
    console.error('Duplicate! Re-rolling!')
    at[2] = makeRandom();
  }
  Product.left.src = Product.all[at[0]].path;
  Product.center.src = Product.all[at[1]].path;
  Product.right.src = Product.all[at[2]].path;
  Product.left.id = Product.all[at[0]].name;
  Product.center.id = Product.all[at[1]].name;
  Product.right.id = Product.all[at[2]].name;
  Product.all[at[0]].views += 1;
  Product.all[at[1]].views += 1;
  Product.all[at[2]].views += 1;
}

function handleClick(event) {
  Product.totalClicks += 1;
  console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    showTally();
  }
  if (event.target.id === 'image_container') {
    return alert('Click on an image, dumbass!');
  }
  for(var i = 0; i < Product.names.length; i++){
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views');
    }
  }
  displayPics();
}

function showTally() {
    for(var i = 0; i < Product.all.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views';
      Product.tally.appendChild(liEl);
    }
}

Product.container.addEventListener('click', handleClick);
displayPics();
