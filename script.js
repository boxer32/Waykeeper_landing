// Language Toggle
(function() {
    function updateLanguage(lang) {
        // Update all elements with data-en and data-zh attributes
        const elements = document.querySelectorAll('[data-en][data-zh]');
        elements.forEach(element => {
            const attr = lang === 'zh' ? 'data-zh' : 'data-en';
            const content = element.getAttribute(attr);
            
            if (content) {
                // Remove all existing content
                element.innerHTML = '';
                
                // Check if content contains HTML tags
                if (content.includes('<br>') || content.includes('<')) {
                    element.innerHTML = content;
                } else {
                    // Create a new text node to ensure clean replacement
                    const textNode = document.createTextNode(content);
                    element.appendChild(textNode);
                }
            }
        });
        
        // Force a reflow to ensure changes are visible
        document.body.offsetHeight;
        
        // Update aria-labels for better accessibility
        const ariaLabels = {
            'en': {
                'Call us': 'Call us',
                'WhatsApp': 'WhatsApp',
                'WeChat': 'WeChat',
                'Email us': 'Email us'
            },
            'zh': {
                'Call us': '致电',
                'WhatsApp': 'WhatsApp 咨询',
                'WeChat': '微信',
                'Email us': '邮件联系'
            }
        };
        
        document.querySelectorAll('[aria-label]').forEach(el => {
            const currentLabel = el.getAttribute('aria-label');
            if (currentLabel && ariaLabels[lang][currentLabel]) {
                el.setAttribute('aria-label', ariaLabels[lang][currentLabel]);
            }
        });
        
        // Update body class for CSS
        document.body.classList.remove('lang-en', 'lang-zh');
        document.body.classList.add(`lang-${lang}`);
        document.documentElement.lang = lang;
    }
    
    function initLanguageToggle() {
        const langButtons = document.querySelectorAll('.lang-btn');
        if (langButtons.length === 0) return;
        
        const currentLang = localStorage.getItem('waykeeper-lang') || 'en';
        
        // Set initial language
        updateLanguage(currentLang);
        langButtons.forEach(btn => {
            if (btn.dataset.lang === currentLang) {
                btn.classList.add('active');
            }
        });
        
        // Language switch handler
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                localStorage.setItem('waykeeper-lang', lang);
                updateLanguage(lang);
                
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageToggle);
    } else {
        initLanguageToggle();
    }
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

