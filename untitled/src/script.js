async function fetchContent() {
    const url = document.getElementById('urlInput').value;
    if (!url) { alert('請輸入網址'); return; }
    
    try {
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url));
        const data = await response.json();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");
        const textContent = doc.body.innerText;
        
        document.getElementById('content').value = textContent;
    } catch (error) {
        alert('抓取失敗: ' + error.message);
    }
}

function downloadBackup() {
    const text = document.getElementById('content').value;
    if (!text) { alert('無內容可下載'); return; }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'backup.txt';
    a.click();
}
