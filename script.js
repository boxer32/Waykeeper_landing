// Language Toggle
(function() {
    const langToggle = document.querySelector('.language-toggle');
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('waykeeper-lang') || 'en';
    
    // Set initial language
    document.documentElement.lang = currentLang;
    document.body.classList.add(`lang-${currentLang}`);
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
    });
    
    // Language switch handler
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem('waykeeper-lang', lang);
            document.documentElement.lang = lang;
            document.body.classList.remove('lang-en', 'lang-zh');
            document.body.classList.add(`lang-${lang}`);
            
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
})();

// Modal Controls
(function() {
    const wechatModal = document.getElementById('wechatModal');
    const wechatBtn = document.getElementById('wechatBtn');
    const wechatDockBtn = document.getElementById('wechatDockBtn');
    const modalClose = document.querySelector('.modal-close');
    
    function openModal() {
        wechatModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        wechatModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (wechatBtn) {
        wechatBtn.addEventListener('click', openModal);
    }
    
    if (wechatDockBtn) {
        wechatDockBtn.addEventListener('click', openModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (wechatModal) {
        wechatModal.addEventListener('click', (e) => {
            if (e.target === wechatModal) {
                closeModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wechatModal.classList.contains('active')) {
            closeModal();
        }
    });
})();

// Copy to Clipboard
(function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const number = btn.dataset.number;
            if (!number) return;
            
            try {
                await navigator.clipboard.writeText(number);
                showToast();
            } catch (err) {
                console.error('Failed to copy:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = number;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast();
            }
        });
    });
    
    function showToast() {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
})();

// Parallax Effect (subtle 6-8px)
(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const heroBg = document.querySelector('.hero-bg-image');
    if (!heroBg) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const hero = document.querySelector('.hero');
        if (scrollY < (hero?.offsetHeight || 0)) {
            const parallax = scrollY * 0.075; // ~7.5% for 6-8px effect
            if (window.innerWidth >= 1024) {
                heroBg.style.transform = `translateY(${parallax}px)`;
            }
        }
    }, { passive: true });
})();

// Fade in animations on scroll
(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
})();

