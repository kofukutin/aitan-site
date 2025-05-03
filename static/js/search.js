let allWords = [];

fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    allWords = data;
  });

const searchBox = document.getElementById('searchBox');
const resultsList = document.getElementById('resultsList');

searchBox.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    resultsList.innerHTML = '';
  
    if (query.length >= 2 && allWords.length > 0) {
      const matches = allWords.filter(entry => entry.word.includes(query));
      matches.forEach(match => {
        const li = document.createElement('li');
        li.style.marginBottom = "0.5em";
        li.innerHTML = `<a href="${match.url}" style="text-decoration:none; font-size:1.1em; color:#333;">${match.word}</a>`;
        resultsList.appendChild(li);
      });
  
      if (matches.length === 0) {
        const li = document.createElement('li');
        li.style.color = "#aaa";
        li.style.fontSize = "0.95em";
        li.textContent = "一致する単語が見つかりませんでした";
        resultsList.appendChild(li);
      }
  
    } else if (query.length > 0) {
      const li = document.createElement('li');
      li.style.color = "#aaa";
      li.style.fontSize = "0.95em";
      li.textContent = "2文字以上入力してください";
      resultsList.appendChild(li);
    }
  });
  
