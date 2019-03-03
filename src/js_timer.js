var backgroundImg=new Image();
backgroundImg.src="img/bg.png";
var timerLoop;
var audio = new Audio('sound/sound.mp3');

var timeRemaining=3;

function timeTimerStart(){
    console.log("start");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    //빨간타이머부분준비
    centerX=canvas.width/2;
    centerY=canvas.height/2;
    radius=canvas.width/3;
    top=centerY-radius;
    context.fillStyle="red";
    context.strokeStyle="red";
    //배경 분단위 부분
    context.drawImage(backgroundImg, 0,0, canvas.width, canvas.height);
    //루프시작
    timerLoop = setInterval(loop,100);

}
function loop() {
  draw();
  if(timeRemaining>3600) timeRemaining=3600;
  else if (timeRemaining<=0)   {
    clearInterval(timerLoop);
    audio.play();
    alert("Time up!");
    audio.pause();
  }
  temp=timeRemaining*10-1;  //소수점 단위가 계산이 오류가 나는 경우가 있기 때문에 10곱해준 후 계산
  timeRemaining=temp/10;

}
function draw(){
  context.clearRect(canvas.width/6, canvas.height/6, canvas.width*4/6, canvas.height*4/6);
  context.beginPath();
  context.moveTo(centerX,centerY);
  context.lineTo(centerX,top);
  context.arc(centerX,centerY,radius, -Math.PI*0.5,-Math.PI*(timeRemaining/1800+0.5),true);
  context.lineTo(centerX,centerX);
  context.fill();
  context.closePath();
}
