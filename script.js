document.addEventListener("DOMContentLoaded", () => {
  // 获取所有扇形
  const segments = document.querySelectorAll(".segment");
  const modal = document.querySelector(".modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  const closeBtn = document.querySelector(".close");
  const wheel = document.querySelector(".wheel");

  // 为每个扇形添加点击事件
  segments.forEach((segment) => {
    segment.addEventListener("click", (e) => {
      const infoType = e.target.dataset.info;
      showModal(infoType);
    });
  });

  // 显示模态框
  function showModal(infoType) {
    modalTitle.textContent = infoType;
    modalBody.innerHTML = getModalContent(infoType);
    modal.style.display = "block";
  }

  // 关闭模态框
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  // 根据类型返回内容（你可以后续填充具体内容）
  function getModalContent(type) {
    const contents = {
      Projects: "这里展示我的项目...",
      Education: "这里展示教育经历...",
      Experience: "这里展示工作经历...",
      Contact: "这里展示联系方式...",
      Skills: "这里展示技术类别...",
      Certificates: "这里展示证书...",
    };
    return `<p>${contents[type]}</p>`;
  }

  // 旋转转盘的函数
  function spinWheel() {
    const randomDeg = Math.floor(Math.random() * 360 + 3600); // 随机转动的角度
    wheel.style.transform = `rotate(${randomDeg}deg)`; // 设置转盘旋转的角度
  }

  // 添加点击事件触发转盘旋转
  const pointer = document.querySelector(".pointer");
  pointer.addEventListener("click", () => {
    spinWheel();
  });
});
