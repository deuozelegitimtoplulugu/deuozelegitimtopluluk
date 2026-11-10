function applySiteLang(lang) {
    const elements = document.querySelectorAll('[data-tr][data-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (!text) return;

        // Eğer içinde ikon varsa sadece yazı kısmını güncelle, ikonu koru
        const icon = el.querySelector('i');
        if (icon) {
            el.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                    node.textContent = ' ' + text;
                }
            });
        } else {
            el.innerHTML = text;
        }
    });

    const titleEl = document.querySelector('title');
    if (titleEl && titleEl.getAttribute(`data-${lang}`)) {
        document.title = titleEl.getAttribute(`data-${lang}`);
    }

    const btnTexts = document.querySelectorAll('.lang-btn-text, #langBtnText');
    btnTexts.forEach(btn => {
        btn.innerText = (lang === 'tr') ? 'EN' : 'TR';
    });

    const inpChat = document.getElementById('chatInput');
    if (inpChat) {
        inpChat.placeholder = (lang === 'en') ? "Ask Fehim a question..." : "Fehim'e bir soru sor...";
    }

    document.documentElement.lang = lang;
    localStorage.setItem('site_lang', lang);
}

window.toggleSiteLang = function() {
    const current = localStorage.getItem('site_lang') || 'tr';
    const next = (current === 'tr') ? 'en' : 'tr';
    applySiteLang(next);
};

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site_lang') || 'tr';
    if (savedLang === 'en') {
        applySiteLang('en');
    }
});
