// ===== DROPDOWN MENU FUNCTIONS =====
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.menu-image') && !event.target.matches('.menu-image img')) {
        const dropdown = document.getElementById('dropdownMenu');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }

    // Close modal when clicking outside (for gallery)
    const modal = document.getElementById('imageModal');
    if (modal && event.target === modal) {
        closeModal();
    }
}

// ===== WHATSAPP FUNCTIONS =====
function openWhatsApp() {
    const phoneNumber = '6285323494100';
    const message = 'Halo Ruang KopiKupi! Saya ingin mengetahui informasi lebih lanjut tentang menu dan layanan Anda.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

// ===== CONTACT PAGE FUNCTIONS =====
function initContactPage() {
    const today = new Date().getDay();
    const dayElements = document.querySelectorAll('.day-hours');
    if (dayElements.length > 0) {
        dayElements.forEach((el, index) => {
            if (index === (today === 0 ? 6 : today - 1)) {
                el.classList.add('today');
            }
        });
    }
}

// ===== LOCATION PAGE FUNCTIONS =====
function initLocationPage() {
    const landmarkItems = document.querySelectorAll('.landmark-item');
    landmarkItems.forEach(item => {
        item.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    });

    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', function () {
            this.style.background = 'rgba(0, 0, 0, 0.5)';
        });
        mapContainer.addEventListener('mouseleave', function () {
            this.style.background = 'rgba(0, 0, 0, 0.3)';
        });
    }
}

// ===== GALLERY SLIDER FUNCTIONS =====
let currentSlideIndex = 0;
let autoSlideInterval;

function initGallerySlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    const totalSlides = slides.length;

    // Start auto slide
    startAutoSlide();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    if (dots[index]) {
        dots[index].classList.add('active');
    }

    // Move slider track
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    }

    // === Tambahan: Autoplay ulang video di slide aktif ===
    const allVideos = document.querySelectorAll('.slide video');
    allVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    const currentSlide = slides[index];
    const currentVideo = currentSlide.querySelector('video');
    if (currentVideo) {
        currentVideo.play().catch(err => {
            console.warn('Autoplay blocked:', err);
        });
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const totalSlides = slides.length;
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const totalSlides = slides.length;
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);

    stopAutoSlide();
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// ===== MODAL FUNCTIONS =====
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    if (modal && modalImage) {
        modal.style.display = 'block';
        modalImage.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== GALLERY PAGE INITIALIZATION =====
function initGalleryPage() {
    initGallerySlider();

    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('load', function () {
            this.parentElement.classList.add('loaded');
        });
    });

    window.addEventListener('scroll', function () {
        const slider = document.querySelector('.gallery-slider');
        if (slider) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            slider.style.transform = `translateY(${rate}px)`;
        }
    });

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// ===== KEYBOARD EVENTS =====
document.addEventListener('keydown', function (event) {
    if (document.querySelector('.gallery-slider')) {
        if (event.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    }

    if (event.key === 'Escape') {
        closeModal();
    }
});

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.galeri-body')) {
        initGalleryPage();
    } else if (document.querySelector('.contact-grid')) {
        initContactPage();
    } else if (document.querySelector('.location-grid')) {
        initLocationPage();
    }
});

// ===== FORM SARAN =====
document.getElementById('saranForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new FormData(this);

    fetch('https://formsubmit.co/ajax/sitimarlina285@gmail.com', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Saran berhasil dikirim!');
            window.location.href = 'saran.html';
        } else {
            alert('Gagal mengirim. Coba lagi.');
        }
    }).catch(error => {
        alert('Terjadi kesalahan. Silakan coba lagi.');
        console.error(error);
    });
});
