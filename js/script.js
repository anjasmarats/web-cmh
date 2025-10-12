// Mode Gelap/Terang
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Cek preferensi pengguna dari localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Terapkan mode sesuai preferensi
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    
    // Toggle mode gelap/terang
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Simpan preferensi ke localStorage
        const isNowDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDarkMode);
    });
    
    // Animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Amati elemen untuk animasi scroll
    document.querySelectorAll('.service-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll untuk tautan navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tambahkan kelas saat di-scroll untuk navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});