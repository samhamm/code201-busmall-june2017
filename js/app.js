'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.labels = [];
Product.pics = [document.getElementById('left'),
                document.getElementById('center'),
                document.getElementById('right')];
Product.list = document.getElementById('productlist');
Product.totalClicks = 0;
Product.views = [];
Product.votes = [];

function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}

for(var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics(){
  var currentlyShowing = [];
  // make left image unique
  currentlyShowing[0] = makeRandom();
  while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    // console.error('Match in prior view! Re-rolling');
    currentlyShowing[0] = makeRandom();
  }
  // make center image unique
  currentlyShowing[1] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[1] ||
        Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    // console.error('Duplicate, or in prior view! Re-rolling!');
    currentlyShowing[1] = makeRandom();
  }
  // make right image unique
  currentlyShowing[2] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[2] ||
        currentlyShowing[1] === currentlyShowing[2] ||
        Product.justViewed.indexOf(currentlyShowing[2]) !== -1){
    // console.error('Duplicate on 3rd one! Re-rolling!')
    currentlyShowing[2] = makeRandom();
  }
  // To the DOM and beyond!
  for (var i = 0; i < 3; i++){
    Product.pics[i].src = Product.all[currentlyShowing[i]].path;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}

function handleClick(event) {
  // console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    Product.container.style.display = 'none';
    // showList();
    makeChart();
  }
  if (event.target.id === 'image_container') {
    return alert('Click on an image, dumbass!');
  }
  Product.totalClicks += 1;
  for(var i = 0; i < Product.names.length; i++){
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      // console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views');
    }
  }
  displayPics();
}

function showList() {
  for(var i = 0; i < Product.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views';
    Product.list.appendChild(liEl);
  }
}

function makeChartData(){
  Product.all.forEach(function(product){
    Product.labels.push(product.name);
    Product.votes.push(product.votes);
    Product.views.push(product.views);
  })
}

function makeChart(){
  makeChartData();
  var ctx = document.getElementById('chartypants').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.labels,
      datasets: [{
        label: 'total votes',
        backgroundColor: 'gold',
        borderColor: '#214',
        data: Product.votes,
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            max: 8,
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  });
  Chart.defaults.global.defaultFontColor = '#eee';
}

Product.container.addEventListener('click', handleClick);

displayPics();
