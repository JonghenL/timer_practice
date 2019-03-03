var backgroundImg = new Image();
backgroundImg.src = "img/bg.png";
var timerLoop;
var audio = new Audio('sound/sound.mp3');
var timeRemaining = 0;
var rr;

function timeTimerStart() {
  //캔버스준비
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  //빨간타이머부분준비
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  radius = canvas.width / 3;
  top = centerY - radius;
  context.fillStyle = "red";
  context.strokeStyle = "red";

  //배경 분단위 부분
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  canvas.addEventListener("click", function(e) {
    tmpX = -1 * (e.layerY - canvas.width / 2);
    tmpY = e.layerX - canvas.height / 2;
    temp = Math.atan2(tmpY, tmpX);//좌표로 각도 구하는 함수
    rr = temp;
    if (rr < 0) timeRemaining = -1 * (rr * 1800) / Math.PI;
    else timeRemaining = -1 * ((rr * 1800) / Math.PI - 3600);
    //새루프시작
    clearInterval(timerLoop); // 앞서 시작된 루프 취소
    timerLoop = setInterval(loop, 100);
    console.log(timeRemaining);
  });
}

function loop() {
  drawTimer();
  if (timeRemaining < 0.1) {
    audio.play();
    alert("Time up!");
    audio.pause();
    clearInterval(timerLoop);
  } else {
    temp = timeRemaining * 10 - 1; //소수점 단위가 계산이 오류가 나는 경우가 있기 때문에 10곱해준 후 계산
    timeRemaining = temp / 10;
  }

}

function drawTimer() {
  //타이머 그리는 부분
  context.clearRect(canvas.width / 6, canvas.height / 6, canvas.width * 4 / 6, canvas.height * 4 / 6);
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(centerX, top);
  context.arc(centerX, centerY, radius, -Math.PI * 0.5, -Math.PI * (timeRemaining / 1800 + 0.5), true);
  context.lineTo(centerX, centerX);
  context.fill();
  context.closePath();
}
