const icon = document.getElementById('icon');
const jsonUrl = '../json/userLocationData.json';
const traceContainer = document.getElementById('trace-container'); // 假設有一個元素用於容納移動痕跡
let currentIndex = 0;
let currentFloor = '1F'; // 新增 currentFloor 變數

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;

  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;

  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  console.log(x, y);
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  icon.style.left = `${iconX}%`;
  icon.style.top = `${iconY}%`;

  // 繪製移動痕跡
  const tracePoint = document.createElement('div');
  tracePoint.className = 'trace-point';
  tracePoint.style.left = `${iconX}%`;
  tracePoint.style.top = `${iconY}%`;
  traceContainer.appendChild(tracePoint);
}

function loadjson() {
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const point = data[currentIndex];

        if (point.Floor !== currentFloor) {
          // 換樓層時的處理，這裡可以添加你的樓層切換相關邏輯
          console.log(`Switched to Floor ${point.Floor}`);
          currentFloor = point.Floor;
        }

        updateIconPosition(point.X, point.Y);
        currentIndex++;

        // 如果資料到達末尾，重新從頭開始
        if (currentIndex >= data.length) {
          currentIndex = 0;
        }
      }
    })
    .catch(error => console.error('Error fetching or parsing JSON:', error));
}

// 初始加載 icon 位置
loadjson();

// 每秒更新一次位置
setInterval(loadjson, 100);
