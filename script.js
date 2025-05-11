let dpRunTime = 0;
let bruteForceRunTime = 0;

window.onload = function() {
  document.body.style.zoom = 0.8;
  loadMyCodeResult();
  loadCompareCodeResult();
  updateZoomLevel();

};

// -- หมายเหตุ: ส่วนนี้คือฟังค์ชั่นการซูม //
let currentZoom = 1;

function zoomIn() {
  currentZoom = Math.min(currentZoom + 0.1, 3);
  updateZoom();
}

function zoomOut() {
  currentZoom = Math.max(currentZoom - 0.1, 0.5);
  updateZoom();
}

function updateZoom() {
  const mainContent = document.getElementById('main-content');
  mainContent.style.transform = `scale(${currentZoom})`;

  document.documentElement.style.setProperty('--zoom-multiplier', currentZoom);

  document.getElementById('zoom-level').textContent = Math.round(currentZoom * 100) + '%';
}



function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => section.classList.remove("active"));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active");

  const links = document.querySelectorAll("nav a");
  links.forEach(link => link.classList.remove("active"));

  const clickedLink = document.querySelector(`nav a[onclick="showSection('${sectionId}')"]`);
  if (clickedLink) clickedLink.classList.add("active");

  if (sectionId === "applied") {
    updatePerformanceTable();
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (window.scrollY < 300) {
    backToTopBtn.style.display = 'none';
  }
}

// -- เมนูย่อยในหน้า Brute Force -- //
function showMyAlgorithmContent(contentId) {
  const contents = document.querySelectorAll(".myalgo-content");
  contents.forEach(content => content.classList.remove("active"));

  const target = document.getElementById(contentId);
    if (target) {
        target.classList.add("active");
        if (contentId === "mycode") {
            loadMyCodeResult();
        }
    }

  const buttons = document.querySelectorAll(".tab-btn-myalgo");
  buttons.forEach(btn => btn.classList.remove("active"));

  const clicked = document.querySelector(`.tab-btn-myalgo[onclick="showMyAlgorithmContent('${contentId}')"]`);
  if (clicked) clicked.classList.add("active");
}

// -- เมนูย่อยในหน้า Dynamic Programming -- //
function showCompareContent(contentId) {
  const contents = document.querySelectorAll(".compare-content");
  contents.forEach(content => content.classList.remove("active"));

  const target = document.getElementById(contentId);
  if (target) target.classList.add("active");

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  const clicked = document.querySelector(`.tab-btn[onclick="showCompareContent('${contentId}')"]`);
  if (clicked) clicked.classList.add("active");
}

// -- เมนูย่อยในหน้า Applied -- //
function showAppliedContent(contentId) {
  const contents = document.querySelectorAll(".applied-content");
  contents.forEach(content => content.classList.remove("active"));

  const target = document.getElementById(contentId);
  if (target) target.classList.add("active");

  const buttons = document.querySelectorAll(".tab-btn-applied");
  buttons.forEach(btn => btn.classList.remove("active"));

  const clicked = document.querySelector(`.tab-btn-applied[onclick="showAppliedContent('${contentId}')"]`);
  if (clicked) clicked.classList.add("active");
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if (window.scrollY > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});



function recalculateRunTime() {
  loadMyCodeResult();
  loadCompareCodeResult();
  updatePerformanceTable();
}


// -- หมายเหตุ: ส่วนนี้คือการโชว์รายละเอียด 8 ข้อ //
function toggleSteps() {
  const details = document.getElementById('steps-details');
  details.classList.toggle('hidden');
}



// -- หมายเหตุ: ส่วนนี้คือการโชว์โค๊ด Brute Force ในหน้า Code -- //
const bruteForcePythonCode = `
import itertools
import time

def maximize_rent_brute_force(space_limit, spaces, rents):
    n = len(spaces)
    max_rent = 0
    best_combination = []

    for combination in itertools.product([0, 1], repeat=n):
        total_space = sum(spaces[i] for i in range(n) if combination[i] == 1)
        total_rent = sum(rents[i] for i in range(n) if combination[i] == 1)

        if total_space <= space_limit and total_rent > max_rent:
            max_rent = total_rent
            best_combination = [i for i in range(n) if combination[i] == 1]

    total_space_used = sum(spaces[i] for i in best_combination)
    space_left = space_limit - total_space_used

    return max_rent, total_space_used, space_left, best_combination

start_time = time.time()

space_limit = 1000
shops = list('ABCDEFGHIJKLMNOPQRST')
spaces = [100, 150, 200, 80, 120, 170, 130, 90, 160, 140,
          110, 190, 180, 150, 170, 100, 120, 130, 90, 140]
rents = [30000, 45000, 50000, 25000, 35000, 48000, 32000, 27000, 44000, 39000,
         31000, 47000, 49000, 43000, 45000, 34000, 36000, 38000, 30000, 41000]

max_rent, total_space_used, space_left, selected_shops = maximize_rent_brute_force(space_limit, spaces, rents)

end_time = time.time()
elapsed_time = end_time - start_time

print("ร้านค้าที่ควรเลือก:", [shops[i] for i in selected_shops])
print(f"รายได้ค่าเช่าสูงสุด: {max_rent} บาท")
print(f"พื้นที่รวมที่ใช้: {total_space_used} ตร.ม.")
print(f"พื้นที่ว่างเหลือ: {space_left} ตร.ม.")
print(f"เวลาในการคำนวณ: {elapsed_time:.6f} วินาที")

`;

function maximizeRentBruteForce() {
  const spaceLimit = 1000;
  const shops = [...'ABCDEFGHIJKLMNOPQRST'];
  const spaces = [100, 150, 200, 80, 120, 170, 130, 90, 160, 140,
                  110, 190, 180, 150, 170, 100, 120, 130, 90, 140];
  const rents = [30000, 45000, 50000, 25000, 35000, 48000, 32000, 27000, 44000, 39000,
                 31000, 47000, 49000, 43000, 45000, 34000, 36000, 38000, 30000, 41000];

  const n = spaces.length;
  let maxRent = 0;
  let bestCombination = [];

  for (let comb = 0; comb < (1 << n); comb++) {
    let totalSpace = 0;
    let totalRent = 0;
    for (let i = 0; i < n; i++) {
      if (comb & (1 << i)) {
        totalSpace += spaces[i];
        totalRent += rents[i];
      }
    }
    if (totalSpace <= spaceLimit && totalRent > maxRent) {
      maxRent = totalRent;
      bestCombination = [];
      for (let i = 0; i < n; i++) {
        if (comb & (1 << i)) {
          bestCombination.push(i);
        }
      }
    }
  }

  const totalSpaceUsed = bestCombination.reduce((sum, i) => sum + spaces[i], 0);
  const spaceLeft = spaceLimit - totalSpaceUsed;

  return {
    maxRent: maxRent,
    totalSpaceUsed: totalSpaceUsed,
    spaceLeft: spaceLeft,
    selectedShops: bestCombination,
    shops: shops
  };
}

function showCompareContent(contentId) {
  const contents = document.querySelectorAll(".compare-content");
  contents.forEach(content => content.classList.remove("active"));

  const target = document.getElementById(contentId);
  if (target) {
    target.classList.add("active");

    if (contentId === "code") {
      loadCompareCodeResult();
    }
  }

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  const clicked = document.querySelector(`.tab-btn[onclick="showCompareContent('${contentId}')"]`);
  if (clicked) clicked.classList.add("active");
}


function loadCompareCodeResult() {
  const start = performance.now();
  const result = maximizeRentBruteForce();
  const end = performance.now();
  const calculationTime = (end - start).toFixed(2);

  bruteForceRunTime = calculationTime;

  const selectedShopNames = result.selectedShops.map(i => result.shops[i]);

  const codeDiv = document.getElementById('code');
  codeDiv.innerHTML = `
    <h2 class="subheading2"><div class="center">โค้ด Brute Force<br>(Python Version)</div></h2>
    <pre style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; overflow-x: auto;">
    <code>${escapeHtml(bruteForcePythonCode)}</code></pre>

    <h2>ผลลัพธ์จาก Brute Force (กรณี 20 ร้าน)</h2>
    <blockquote class="explain-block">
      <p>
        รายได้ค่าเช่าสูงสุด: ${result.maxRent} บาท
        <br> ร้านค้าที่ควรเลือก: ${selectedShopNames.join(', ')} </br>
        พื้นที่รวมที่ใช้: ${result.totalSpaceUsed} ตร.ม.
        <br> พื้นที่ว่างเหลือ: ${result.spaceLeft} ตร.ม. </br>
        <br> เวลาในการคำนวณ: ${calculationTime} มิลลิวินาที </br>
      </p>
    </blockquote>
  `;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}



// -- หมายเหตุ: ส่วนนี้คือการโชว์โค๊ด DP ในหน้า My Code -- //
const dpPythonCode = `
import time

def maximize_rent_correct(space_limit, spaces, rents):
    n = len(spaces)
    dp = [[0] * (space_limit + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(space_limit + 1):
            if spaces[i-1] <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w - spaces[i-1]] + rents[i-1])
            else:
                dp[i][w] = dp[i-1][w]

    w = space_limit
    selected_shops = []
    total_space_used = 0

    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected_shops.append(i-1)
            total_space_used += spaces[i-1]
            w -= spaces[i-1]

    space_left = space_limit - total_space_used

    return dp[n][space_limit], total_space_used, space_left, selected_shops

start_time = time.time()

space_limit = 1000
shops = list('ABCDEFGHIJKLMNOPQRST')
spaces = [100, 150, 200, 80, 120, 170, 130, 90, 160, 140,
          110, 190, 180, 150, 170, 100, 120, 130, 90, 140]
rents = [30000, 45000, 50000, 25000, 35000, 48000, 32000, 27000, 44000, 39000,
         31000, 47000, 49000, 43000, 45000, 34000, 36000, 38000, 30000, 41000]

max_rent, total_space, space_left, selected = maximize_rent_correct(space_limit, spaces, rents)

end_time = time.time()
elapsed_time = end_time - start_time

print("ร้านค้าที่ควรเลือก:", [shops[i] for i in selected])
print(f"รายได้ค่าเช่าสูงสุด: {max_rent} บาท")
print(f"พื้นที่รวมที่ใช้: {total_space} ตร.ม.")
print(f"พื้นที่ว่างเหลือ: {space_left} ตร.ม.")
print(f"เวลาในการคำนวณ: {elapsed_time:.6f} วินาที")

`;

function maximizeRentOptimized() {
  const spaceLimit = 1000;
  const shops = [...'ABCDEFGHIJKLMNOPQRST'];
  const spaces = [100, 150, 200, 80, 120, 170, 130, 90, 160, 140,
                  110, 190, 180, 150, 170, 100, 120, 130, 90, 140];
  const rents = [30000, 45000, 50000, 25000, 35000, 48000, 32000, 27000, 44000, 39000,
                 31000, 47000, 49000, 43000, 45000, 34000, 36000, 38000, 30000, 41000];

  const n = spaces.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(spaceLimit + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= spaceLimit; w++) {
      if (spaces[i-1] <= w) {
        dp[i][w] = Math.max(dp[i-1][w], dp[i-1][w - spaces[i-1]] + rents[i-1]);
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }

  let w = spaceLimit;
  const selectedShops = [];
  let totalSpaceUsed = 0;

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i-1][w]) {
      selectedShops.push(i-1);
      totalSpaceUsed += spaces[i-1];
      w -= spaces[i-1];
    }
  }

  const spaceLeft = spaceLimit - totalSpaceUsed;

  return {
    maxRent: dp[n][spaceLimit],
    totalSpaceUsed: totalSpaceUsed,
    spaceLeft: spaceLeft,
    selectedShops: selectedShops,
    shops: shops
  };
}

function loadMyCodeResult() {
  const start = performance.now();
  const result = maximizeRentOptimized();
  const end = performance.now();
  const calculationTime = (end - start).toFixed(2);

  dpRunTime = calculationTime;

  const selectedShopNames = result.selectedShops.map(i => result.shops[i]);

  const mycodeDiv = document.getElementById('mycode');
  mycodeDiv.innerHTML = `
    <h2 class="subheading2"><div class="center">โค้ด Dynamic Programming<br>(Python Version)</br></div></h2>
    <pre style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; overflow-x: auto;">
    <code>${escapeHtml(dpPythonCode)}</code></pre>


    <h2>ผลลัพธ์จาก Dynamic Programming (กรณี 20 ร้าน)</h2>
    <blockquote class="explain-block">
      <p>
        รายได้ค่าเช่าสูงสุด: ${result.maxRent} บาท
        <br> ร้านค้าที่ควรเลือก: ${selectedShopNames.join(', ')} </br>
        พื้นที่รวมที่ใช้: ${result.totalSpaceUsed} ตร.ม.
        <br> พื้นที่ว่างเหลือ: ${result.spaceLeft} ตร.ม. </br>
        <br> เวลาในการคำนวณ: ${calculationTime} มิลลิวินาที </br>
      </p>
    </blockquote>
  `;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


function updatePerformanceTable() {
  document.getElementById('dp-runtime').textContent = dpRunTime + ' ms';
  document.getElementById('brute-runtime').textContent = bruteForceRunTime + ' ms';
}



// -- หมายเหตุ: ส่วนนี้คือ ป๊อบอัพแสดงยืนยันการดาวโหลด -- //
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("confirm-modal");
  const btnYes = document.getElementById("confirm-yes");
  const btnNo = document.getElementById("confirm-no");
  let downloadUrl = "";

  document.querySelectorAll("a.download-txt").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      downloadUrl = this.href;
      modal.style.display = "flex";
    });
  });

  btnYes.addEventListener("click", function () {
    modal.classList.add("fade-out");

    modal.addEventListener("animationend", function handleFadeOutYes() {
      modal.style.display = "none";
      modal.classList.remove("fade-out");
      modal.removeEventListener("animationend", handleFadeOutYes);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "";
      a.click();
    });
  });

  btnNo.addEventListener("click", function () {
    modal.classList.add("fade-out");

    modal.addEventListener("animationend", function handleFadeOutNo() {
      modal.style.display = "none";
      modal.classList.remove("fade-out");
      modal.removeEventListener("animationend", handleFadeOutNo);
    });
  });
});


// -- หมายเหตุ: ส่วนนี้คือฟังค์ชั่น Dark Mode -- //
const toggleBtn = document.getElementById('toggle-theme');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
  }
});

// -- หมายเหตุ: ส่วนนี้คืออัปโหลดคลิป และทำให้ video ไม่ได้รับผลของการสเกล 0.8 -- //
const videoFrame = document.getElementById('video-frame');
videoFrame.srcdoc = `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          background: transparent;
        }
        video {
          width: 100%;
          height: auto;
          display: block;
        }
      </style>
    </head>
    <body>
      <video controls src="video/final.mp4"></video>
    </body>
  </html>
`;
