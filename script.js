const slides = [...document.querySelectorAll('.slide')];
const currentPage = document.getElementById('currentPage');
const progressBar = document.getElementById('progressBar');
const sectionLabel = document.getElementById('sectionLabel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bgMusic = document.getElementById('bgMusic');
const sfx = document.getElementById('sfx');
const musicBtn = document.getElementById('musicBtn');
const soundBtn = document.getElementById('soundBtn');
let index = 0, soundOn = true;

function showSlide(nextIndex, playSound = true) {
  index = Math.max(0, Math.min(slides.length - 1, nextIndex));
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  currentPage.textContent = String(index + 1).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  sectionLabel.textContent = slides[index].dataset.title;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === slides.length - 1;
  if (playSound && soundOn) {
    try { sfx.currentTime = 0; const p = sfx.play(); if (p) p.catch(() => {}); } catch (e) {}
  }
}
prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); showSlide(index + 1); }
  if (e.key === 'ArrowRight' || e.key === 'PageUp') { e.preventDefault(); showSlide(index - 1); }
});
musicBtn.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try { await bgMusic.play(); musicBtn.textContent = '♫ موسیقی: روشن'; }
    catch { musicBtn.textContent = '♫ فایل agag.mp3 را در پوشه assets بگذار'; }
  } else { bgMusic.pause(); musicBtn.textContent = '♫ موسیقی: خاموش'; }
});
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? '🔊 افکت‌ها: روشن' : '🔇 افکت‌ها: خاموش';
});
document.getElementById('answersBtn').addEventListener('click', () => {
  const answers = document.getElementById('answers');
  answers.classList.toggle('hidden');
  document.getElementById('answersBtn').textContent = answers.classList.contains('hidden') ? 'نمایش پاسخ‌های پیشنهادی' : 'پنهان کردن پاسخ‌ها';
});
showSlide(0, false);
