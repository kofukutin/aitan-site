function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const isOpen = content.style.maxHeight;

  // 全部閉じる
  document.querySelectorAll('.accordion-content').forEach(el => {
    el.style.maxHeight = null;
  });

  // 開く
  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

// 初期状態で1番目（TOEIC）だけ開く
window.addEventListener('DOMContentLoaded', () => {
  const firstContent = document.querySelector('.accordion-content');
  if (firstContent) {
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
  }
});
