
/* ===== ข้อมูล E‑Book (เล่มเดียว) ===== */
const ebook = {
  id: 1,
  title: "E‑Book: วิธีการสร้างเว็บไซต์",
  author: "ทีมจัดทำโครงการ",
  year: 2025,
  cover: "covers/how-to-build-website.png", // ถ้าไม่มีภาพ ปล่อยเป็น "" ได้
  preview: "./ebooks/how-to-build-website.pdf",
  download: "./ebooks/how-to-build-website.pdf",
  description:
    "สรุปขั้นตอนการสร้างเว็บไซต์ตั้งแต่พื้นฐาน: HTML/CSS, การปรับแต่งด้วย Bootstrap, การเพิ่มความโต้ตอบด้วย JavaScript และแนวทางนำเว็บไซต์ขึ้นออนไลน์ (GitHub Pages/Netlify)."
};

/* ===== องค์ประกอบในหน้า ===== */
const bookListEl = document.getElementById("bookList");
const bookSelect = document.getElementById("bookSelect");
const previewTop = document.getElementById("previewTop");
const downloadTop = document.getElementById("downloadTop");

const pickerModal = document.getElementById("pickerModal");
const openPickerBtn = document.getElementById("openPickerBtn");
const closePickerBtn = document.getElementById("closePickerBtn");
const pickerGrid = document.getElementById("pickerGrid");

const themeToggle = document.getElementById("themeToggle");

/* ===== Utility: สลับธีม Light/Dark ===== */
function setTheme(mode){
  if(mode === "light"){ document.documentElement.classList.add("light"); }
  else{ document.documentElement.classList.remove("light"); }
  localStorage.setItem("theme", mode);
}
function toggleTheme(){
  const isLight = document.documentElement.classList.toggle("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}
themeToggle.addEventListener("click", toggleTheme);
(function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved === "light"){ setTheme("light"); }
})();

/* ===== การ์ดหนังสือในหน้าหลัก ===== */
function createBookCard(book){
  const card = document.createElement("article");
  card.className = "card";

  const cover = document.createElement("div");
  cover.className = "cover";
  if (book.cover) cover.style.backgroundImage = `url(${book.cover})`;
  else cover.textContent = "ไม่มีภาพปก";

  const content = document.createElement("div");
  content.className = "content";

  const title = document.createElement("h3");
  title.textContent = book.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${book.author} • ${book.year}`;

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = book.description;

  const actions = document.createElement("div");
  actions.className = "actions";

  const btnPreview = document.createElement("a");
  btnPreview.className = "btn soft";
  btnPreview.href = book.preview;
  btnPreview.target = "_blank";
  btnPreview.rel = "noopener";
  btnPreview.textContent = "อ่านออนไลน์ (PDF)";

  const btnDownload = document.createElement("a");
  btnDownload.className = "btn primary";
  btnDownload.href = book.download;
  btnDownload.target = "_blank";
  btnDownload.rel = "noopener";
  btnDownload.textContent = "ดาวน์โหลด";

  actions.append(btnPreview, btnDownload);
  content.append(title, meta, desc, actions);
  card.append(cover, content);
  return card;
}

function renderMain(){
  bookListEl.innerHTML = "";
  bookListEl.appendChild(createBookCard(ebook));

  // อัปเดตปุ่มบน Hero
  previewTop.href = ebook.preview;
  downloadTop.href = ebook.download;
}

/* ===== Modal: เลือก E‑Book (เล่มเดียว แต่ทำให้ดูเป็นระบบ) ===== */
function openPicker(){ pickerModal.setAttribute("aria-hidden", "false"); }
function closePicker(){ pickerModal.setAttribute("aria-hidden", "true"); }
openPickerBtn.addEventListener("click", openPicker);
closePickerBtn.addEventListener("click", closePicker);
pickerModal.addEventListener("click", (e) => { if (e.target.dataset.close === "true") closePicker(); });

function renderPicker(){
  pickerGrid.innerHTML = "";

  const b = ebook;
  const item = document.createElement("div");
  item.className = "picker-item";

  const thumb = document.createElement("div");
  thumb.className = "thumb";
  if (b.cover) thumb.style.backgroundImage = `url(${b.cover})`;

  const t = document.createElement("div");
  t.className = "title"; t.textContent = b.title;

  const m = document.createElement("div");
  m.className = "meta"; m.textContent = `${b.author} • ${b.year}`;

  const acts = document.createElement("div");
  acts.className = "pick-actions";

  const pickBtn = document.createElement("button");
  pickBtn.className = "btn primary";
  pickBtn.textContent = "เลือกเล่มนี้";
  pickBtn.addEventListener("click", () => {
    closePicker();
    document.querySelector(".section-title").scrollIntoView({ behavior: "smooth" });
  });

  const previewBtn = document.createElement("a");
  previewBtn.className = "btn soft";
  previewBtn.textContent = "อ่านออนไลน์";
  previewBtn.href = b.preview; previewBtn.target = "_blank"; previewBtn.rel = "noopener";

  acts.append(pickBtn, previewBtn);
  item.append(thumb, t, m, acts);
  pickerGrid.appendChild(item);
}

/* ===== Dropdown (เผื่ออนาคตเพิ่มหลายเล่ม) ===== */
bookSelect.addEventListener("change", renderMain);

/* ===== เริ่มต้น ===== */
renderMain();
renderPicker();
