
const TwoPI = Math.PI * 2;
var w = window.innerWidth;
var h = window.innerHeight;
var center_x = w / 2;
var center_y = h / 2;

var colors = ['#FF0000', '#E8D45B', '#8CFF00']

// I know the abs is not needed... but oh well
var max_distance = Math.abs(Math.max(center_x, center_y));
var min_distance = Math.abs(Math.min(center_x, center_y));
function Firefly(){
  this.velocity = 0;
  var random_angle = Math.random() * TwoPI;
  this.x = center_x +  Math.sin(random_angle) * ((Math.random() * (max_distance - min_distance) + min_distance));
  this.y = center_y + Math.cos(random_angle) * ((Math.random() * (max_distance - min_distance) + min_distance));

  
  
  this.angle_of_attack = Math.atan2(  this.y - center_y ,  this.x - center_x);
  this.vel =  ( Math.random() * 5 ) + 5 ;
  
  this.color = colors[ ~~(colors.length * Math.random()) ]
  
  
  this.xvel = this.vel * Math.cos( this.angle_of_attack );
  this.yvel = this.vel * Math.sin( this.angle_of_attack );
  this.size = 2 + Math.random() * 2;
  
  this.phase_diff = Math.random() * TwoPI;
    
}



Firefly.prototype.move = function(dt){
  if( isOnHeart(this.x, this.y)){
    this.size -= 0.001;
    return;
  }
  this.x += this.xvel * dt;
  this.y += this.yvel * dt;
}

Firefly.prototype.render = function(ctx, now){
  if( this.size < 1) {
    return;
  }
  ctx.globalAlpha = Math.max(Math.abs(Math.sin( (now + this.phase_diff) / (~~(this.size * 100)) )), 0.4);
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 20 / this.size; 
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.size, 0, TwoPI, false);
  ctx.closePath();
  ctx.fill();
}

var max_fireflies = 500;
var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fireflies = [];


var last = Date.now();
var dt = 0, now = 0;
var alive_fireflies = 0;
var last_emit = 0;

function render(){
  now = Date.now();
  dt = (last - now) / 1000; 
  last = now;
  ctx.clearRect(0,0,w,h);
  fireflies.forEach(function(f){
    f.move(dt);
    f.render(ctx, now);    
  });
  
  fireflies = fireflies.filter(function(f){
    return (f.size > 1);
  });

  alive_fireflies = fireflies.length;  
  
  if( alive_fireflies < max_fireflies && last_emit - now < - 100){
    fireflies.push( new Firefly());
    last_emit = now;
  }
  
  requestAnimationFrame(render);
}


render();

// 
function isOnHeart(x,y){
	  x = ((x - center_x) / (min_distance * 1.2)) * 1.8;
	  y = ((y - center_y) / (min_distance)) * - 1.8;

    var x2 = x * x;
  	var y2 = y * y;
    // Simplest Equation of lurve
    return (Math.pow((x2 + y2 - 1), 3) - (x2 * (y2 * y)) <= 0);
}

function displayPage(){
    _org_p = 0926
    _p = document.getElementById('lock-pass').value 
    if(_p == _org_p){
        document.getElementsByClassName('lock-screen')[0].classList.add('hide')
        
    }
}


function updateTimer(){
    let birth = 1683599400000;
    sec =birth - Date.now()
    sec = sec/1000
    document.getElementById('secons').innerHTML = `${Math.floor(sec)} s`
}
// window.onload = function(){
//     setInterval(updateTimer,1000)

// }



function MouseEnter(e){
  var finder = document.getElementsByClassName('finder')[0];
  var x = e.clientX - 125;
  var y = e.clientY - 125;
  finder.style.top = y + "px";
  finder.style.left = x + "px";
}


/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'Assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems, {});
});



images = [
  'img1.jpeg',
  'img2.jpeg',
  'img3.jpeg',
  'img4.jpeg',
  'img5.jpeg',
  'img7.jpeg',
  'img8.jpeg',
  'img9.jpeg',
  'img10.jpeg',

]
_currentImg = 1
function nextImg(){
  if(_currentImg >= images.length){
    _currentImg = 1
  }
  else{
    _currentImg++;
    document.getElementById('carosel-img').src = 'Assets/'+ images[_currentImg]
  }
}

function prevImg(){
  if(_currentImg <= 0){
    _currentImg = 10

  }
  else{
    _currentImg--;
    document.getElementById('carosel-img').src ='Assets/'+ images[_currentImg]
  }
}