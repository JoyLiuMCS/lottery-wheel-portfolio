const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");

canvas.width = 300;
canvas.height = 300;

const sectors = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
];
const colors = [
  "#FFDDC1",
  "#FFABAB",
  "#FFC3A0",
  "#D5AAFF",
  "#85E3FF",
  "#B9FBC0",
];
let currentAngle = 0;

// 绘制转盘
function drawWheel() {
  const arc = (2 * Math.PI) / sectors.length;
  sectors.forEach((sector, index) => {
    const angle = arc * index;
    ctx.beginPath();
    ctx.fillStyle = colors[index];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, angle, angle + arc);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(
      150 + Math.cos(angle + arc / 2) * 100,
      150 + Math.sin(angle + arc / 2) * 100
    );
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = "#000";
    ctx.fillText(sector, -ctx.measureText(sector).width / 2, 0);
    ctx.restore();
  });
}

// 旋转逻辑
function spinWheel() {
  let spinAngle = Math.random() * 360 + 720; // 随机旋转角度
  let spinDuration = 3000; // 旋转时间（毫秒）
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    currentAngle = (spinAngle * progress) % 360;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate((currentAngle * Math.PI) / 180);
    ctx.translate(-150, -150);
    drawWheel();
    ctx.restore();
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      console.log("Spin complete!");
    }
  }

  requestAnimationFrame(animate);
}

drawWheel();
spinButton.addEventListener("click", spinWheel);
