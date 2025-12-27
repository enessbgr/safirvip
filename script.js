// Safir VIP Transfer - Ana JavaScript Dosyası
(function() {
    'use strict';
    
    // DOM yüklendiğinde çalışacak fonksiyonlar
    document.addEventListener('DOMContentLoaded', function() {
        
        console.log('Safir VIP Transfer - JavaScript yüklendi');
        
        /* =========================================
           1. HAMBURGER MENÜ
           ========================================= */
        function initHamburgerMenu() {
            const hamburger = document.getElementById('hamburger-btn');
            const navMenu = document.getElementById('nav-menu');
            
            if (!hamburger || !navMenu) return;
            
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                
                const icon = hamburger.querySelector('i');
                if (icon) {
                    if (navMenu.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark');
                    } else {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            });
            
            // Menü dışına tıklayınca kapat
            document.addEventListener('click', function(e) {
                if (navMenu.classList.contains('active') && 
                    !hamburger.contains(e.target) && 
                    !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            });
            
            // Mobilde linklere tıklayınca menüyü kapat
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                        const icon = hamburger.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-xmark');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            });
        }
        
        /* =========================================
           2. FAQ AKORDİYON
           ========================================= */
        function initFAQ() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.addEventListener('click', function() {
                        item.classList.toggle('active');
                    });
                }
            });
        }
        
        /* =========================================
           3. ANİMASYON GEÇİŞLERİ (KENDİ SİSTEMİMİZ)
           ========================================= */
        function initCustomAnimations() {
            // Eğer AOS yüklü değilse, kendi animasyon sistemimizi başlat
            if (typeof AOS === 'undefined') {
                console.log('AOS yok, kendi animasyon sistemimizi başlatıyoruz...');
                initScrollAnimations();
            } else {
                console.log('AOS yüklü, animasyonlar hazır.');
                // AOS'u yeniden başlat (güvence için)
                AOS.refresh();
            }
        }
        
        /* =========================================
           4. KENDİ SCROLL ANİMASYON SİSTEMİMİZ
           ========================================= */
        function initScrollAnimations() {
            // Animasyonlu elementleri seç
            const animatedElements = document.querySelectorAll('[data-aos]');
            if (animatedElements.length === 0) return;
            
            console.log(`${animatedElements.length} animasyonlu element bulundu`);
            
            // Intersection Observer oluştur
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animationType = element.getAttribute('data-aos') || 'fade-up';
                        
                        // Animasyonu başlat
                        element.classList.add('aos-animate');
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        
                        // Gecikme varsa uygula
                        const delay = element.getAttribute('data-aos-delay');
                        if (delay) {
                            element.style.transitionDelay = delay + 'ms';
                        }
                        
                        // Takibi bırak
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Her elementi gözlemle
            animatedElements.forEach(element => {
                // Başlangıç durumunu ayarla
                const animationType = element.getAttribute('data-aos') || 'fade-up';
                element.style.opacity = '0';
                element.style.transition = 'all 0.6s ease-out';
                
                // Animasyon tipine göre başlangıç pozisyonu
                switch(animationType) {
                    case 'fade-up':
                        element.style.transform = 'translateY(30px)';
                        break;
                    case 'fade-down':
                        element.style.transform = 'translateY(-30px)';
                        break;
                    case 'fade-left':
                        element.style.transform = 'translateX(-50px)';
                        break;
                    case 'fade-right':
                        element.style.transform = 'translateX(50px)';
                        break;
                    default:
                        element.style.transform = 'translateY(30px)';
                }
                
                // Gecikme varsa ayarla
                const delay = element.getAttribute('data-aos-delay');
                if (delay) {
                    element.style.transitionDelay = '0ms'; // Başlangıçta 0
                }
                
                observer.observe(element);
            });
        }
        
        /* =========================================
           5. SMOOTH SCROLL
           ========================================= */
        function initSmoothScroll() {
            // Sayfa içi linkler için
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href !== '#' && href !== '') {
                        e.preventDefault();
                        
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }
        
        /* =========================================
           6. HOVER EFFECTS
           ========================================= */
        function initHoverEffects() {
            // Buton hover efektleri
            const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-reservation');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Kart hover efektleri
            const cards = document.querySelectorAll('.service-card, .blog-card, .testimonial-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                    this.style.transition = 'all 0.3s ease';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        }
        
        /* =========================================
           7. BACK TO TOP BUTTON (SOLA ALINDI)
           ========================================= */
        function initBackToTop() {
            // Butonu oluştur
            const backToTopBtn = document.createElement('button');
            backToTopBtn.id = 'backToTop';
            backToTopBtn.className = 'back-to-top-btn';
            backToTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
            backToTopBtn.setAttribute('aria-label', 'En üste git');
            document.body.appendChild(backToTopBtn);
            
            // Scroll olayını dinle
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            // Tıklama olayı
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        /* =========================================
   8. SABİT WHATSAPP VE TELEFON BUTONLARI (SAĞDA)
   ========================================= */
function initFixedButtons() {
    // EĞER BUTONLAR ZATEN VARSA TEKRAR EKLEME (Çift buton oluşmasını engelle)
    if (document.querySelector('.fixed-buttons')) {
        console.log('Sabit butonlar zaten mevcut');
        return;
    }
    
    // Sabit butonları oluştur
    const fixedButtonsHTML = `
        <div class="fixed-buttons">
            <a href="https://wa.me/905370588533" class="fixed-btn whatsapp" target="_blank" aria-label="WhatsApp'tan yaz">
                <i class="fa-brands fa-whatsapp"></i>
                <span class="btn-text">WhatsApp'tan Yaz</span>
            </a>
            <a href="tel:+905370588533" class="fixed-btn phone" aria-label="Hemen ara">
                <i class="fa-solid fa-phone"></i>
                <span class="btn-text">Hemen Ara</span>
            </a>
        </div>
    `;
    
    // Body'nin en başına ekle (diğer elementlerin üstünde görünsün)
    document.body.insertAdjacentHTML('afterbegin', fixedButtonsHTML);
    
    console.log('Sabit butonlar eklendi:', window.location.href);
    
    // Hover efektlerini mobilde düzelt
    const fixedBtns = document.querySelectorAll('.fixed-btn');
    fixedBtns.forEach(btn => {
        // Mobilde touch event için
        btn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Mobilde mavi vurguyu engelle
            this.classList.add('hover-effect');
        });
        
        btn.addEventListener('touchend', function(e) {
            this.classList.remove('hover-effect');
        });
        
        btn.addEventListener('touchcancel', function(e) {
            this.classList.remove('hover-effect');
        });
    });
}
        
        /* =========================================
           9. SAYFA YÜKLENDİĞİNDE ANİMASYON
           ========================================= */
        function initPageLoadAnimation() {
            // Sayfa yüklendiğinde body'ye loaded class'ı ekle
            document.body.classList.add('loaded');
            
            // Hero bölümüne özel animasyon
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                setTimeout(function() {
                    heroContent.classList.add('animated');
                }, 300);
            }
        }
        
        /* =========================================
           TÜM FONKSİYONLARI BAŞLAT
           ========================================= */
        initHamburgerMenu();
        initFAQ();
        initCustomAnimations();
        initSmoothScroll();
        initHoverEffects();
        initBackToTop();
        initFixedButtons(); // ⬅️ Burada çağır
        initPageLoadAnimation();
        
        // Window resize'da AOS'u tazele
        window.addEventListener('resize', function() {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
        
        // Sayfa tam yüklendiğinde
        window.addEventListener('load', function() {
            console.log('Sayfa tamamen yüklendi');
            
            // AOS'u yenile
            if (typeof AOS !== 'undefined') {
                setTimeout(function() {
                    AOS.refresh();
                    console.log('AOS refreshed');
                }, 500);
            }
            
            // Loaded class'ını ekle
            document.body.classList.add('fully-loaded');
            
            // Butonların yüklendiğini kontrol et
            const fixedButtons = document.querySelector('.fixed-buttons');
            if (fixedButtons) {
                console.log('Sabit butonlar başarıyla yüklendi');
            } else {
                console.error('Sabit butonlar yüklenemedi!');
            }
        });
        
    }); // DOMContentLoaded sonu
    
})(); // IIFE sonu

