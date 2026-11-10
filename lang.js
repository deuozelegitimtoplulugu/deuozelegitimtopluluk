// Ortak Dil Yönetimi
function applySiteLang(lang) {
    // data-tr ve data-en etiketine sahip tüm öğeleri güncelle
    const elements = document.querySelectorAll('[data-tr][data-en]');
    elements.forEach(el => {
        const val = el.getAttribute(`data-${lang}`);
        if (val) {
            el.innerHTML = val;
        }
    });

    // Sayfa başlığını güncelle (Varsa)
    const titleEl = document.querySelector('title');
    if (titleEl && titleEl.getAttribute(`data-${lang}`)) {
        document.title = titleEl.getAttribute(`data-${lang}`);
    }

    // Buton metnini güncelle (Varsa)
    const btnText = document.getElementById('langBtnText');
    if (btnText) {
        btnText.innerText = (lang === 'tr') ? 'EN' : 'TR';
    }

    document.documentElement.lang = lang;
    localStorage.setItem('site_lang', lang);
}

window.toggleSiteLang = function() {
    const current = localStorage.getItem('site_lang') || 'tr';
    const next = (current === 'tr') ? 'en' : 'tr';
    applySiteLang(next);
};

// Sayfa ilk yüklendiğinde hafızadaki dili uygula
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site_lang') || 'tr';
    if (savedLang === 'en') {
        applySiteLang('en');
    }
});
