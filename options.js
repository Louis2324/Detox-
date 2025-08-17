const delayInput = document.getElementById('delay');
const saveBtn = document.getElementById('save');
const msg = document.getElementById('msg');

chrome.storage.sync.get({ delaySeconds: 15 }, ({ delaySeconds }) => {
  delayInput.value = delaySeconds;
});

saveBtn.addEventListener('click', () => {
  const v = Math.max(0, Math.floor(Number(delayInput.value) || 0));
  chrome.storage.sync.set({ delaySeconds: v }, () => {
    msg.textContent = `Saved: ${v}s`;
    setTimeout(() => (msg.textContent = ''), 1500);
  });
});
