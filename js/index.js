// 解码并输出 [data-title]
(function () {
    const decodeTitle = document.querySelectorAll('[data-title]');
    for (let i = 0; i < decodeTitle.length; i++) {
        const ele = decodeTitle[i];
        const content = getUnicode(ele.getAttribute('data-title'));
        ele.setAttribute('title', content);
        ele.innerHTML = content;
        ele.removeAttribute('data-title');
    }
})();

// 解码并输出 [data-link]
(function () {
    const decodeLink = document.querySelectorAll('[data-link]');
    for (let i = 0; i < decodeLink.length; i++) {
        const ele = decodeLink[i];
        const parrent = ele.parentNode;
        const link = getUnicode(ele.getAttribute('data-link'));
        ele.innerHTML = link;
        ele.removeAttribute('data-link');

        $.ajax({
            type: 'get',
            url: link,
            dataType: 'jsonp',
            timeout: 30000,
            complete: function (res) {
                if (res.status == 200) {
                    parrent.classList.remove('loading');
                    parrent.classList.add('correct');
                    parrent.setAttribute('target', '_blank');
                    parrent.href = link;
                } else {
                    parrent.classList.remove('loading');
                    parrent.classList.add('error');
                }
            },
        });
    }
})();

// Unicode 解码
function getUnicode(str) {
    let valArr = str.split('#-#');
    let result = '';
    for (let i = 0; i < valArr.length; i++) {
        const item = valArr[i];
        if (!item) {
            continue;
        }
        result += String.fromCharCode(parseInt(item, 16));
    }
    return result;
}
