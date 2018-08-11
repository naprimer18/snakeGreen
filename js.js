var rand = function (min, max) {k = Math.floor(Math.random() * (max - min) + min); return (Math.round( k / s) * s);}
var count = 0; 
var flag = "false";
var createApple = function () {a = [rand(20, 150),rand(20, 150)]; }, 
    createSnake = function () {sBody = [{x: 20,y: 35},{x: 10,y: 35},{x: 0,y: 35}];}
var gP = document.getElementById('gP'), 
    g = gP.getContext('2d');
    sBody = 0;
    d = 1, 
    a = null, 
    s = 10; createSnake(); createApple(); 
gP.width = s*20; 
gP.height = s*20;
setInterval(function() {
    
    if (a[0] + s >= gP.width || a[1] + s >= gP.height) createApple(); 
    g.clearRect(0,0,gP.width,gP.height); 
    g.fillStyle = "#FF0017FF";
    g.fillRect(...a, s,s);
    g.fillStyle = "#00FF0DFF" ;

    sBody.forEach(function(el, i) {
        if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1 ) sBody.splice(0,sBody.length-1), sBody = [{x:20,y:35}], d = 1 ,  alert("You score -->" + count) ,location.reload();//Проверка на столкновение
    });

    var m = sBody[0], f = {x: m.x,y: m.y}, l = sBody[sBody.length - 1]; 
    if (d == 1)  f.x = l.x + s, f.y = Math.round(l.y / s) * s; // движение 
    if (d == 2) f.y = l.y + s, f.x = Math.round(l.x / s) * s; 
    if (d == 3) f.x = l.x - s, f.y = Math.round(l.y / s) * s; 
    if (d == 4) f.y = l.y - s, f.x = Math.round(l.x / s) * s; 
    if(f.x < 0 || f.y < 0 || f.x >gP.width-30 || f.y >gP.height-30) {
      sBody.splice(0,sBody.length-1), sBody = [{x:20,y:35}]; 
      alert("You score --> " + count); location.reload();
    }

    sBody.push(f); //Добавляем хвост после головы с новыми координатами
    sBody.splice(0,1); //Удаляем хвост
    //Отрисовываем каждый элемент змейки
    sBody.forEach(function(pob, i) {
    
        if (d == 1) if (pob.x > Math.round(gP.width / s) * s -30) sBody.splice(0,sBody.length-1), sBody = [{x:20,y:35}], d = 1;
        if (d == 2) if (pob.y > Math.round(gP.height / s) * s -30) sBody.splice(0,sBody.length-1), sBody = [{x:20,y:35}], d = 1;
        if (d == 3) if (pob.x < 0) sBody.splice(0,sBody.length-1), sBody = [{x:20,y:35}], d = 1; 
        if (d == 4) if (pob.y < 0) sBody.splice(0,sBody.length-1), sBody = [{x:20,y:35}], d = 1;
        if (pob.x == a[0] && pob.y == a[1])  { createApple(), sBody.unshift({x: f.x - s, y:l.y}) ,count+=1; console.log(count)}
        g.fillRect(pob.x, pob.y, s, s);     

        
        // s - это ширина и высота нашего "квадрата"
    });
}, 150);

onkeydown = function (e) {
    var k = e.keyCode;
    if ([38,39,40,37].indexOf(k) >= 0)   
        e.preventDefault();
    if (k == 39 && d != 3) d = 1; 
    if (k == 40 && d != 4) d = 2; 
    if (k == 37 && d != 1) d = 3; 
    if (k == 38 && d != 2) d = 4; 
};

