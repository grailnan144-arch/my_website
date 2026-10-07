// ==========================================
// AVIATION IMAGE SHOWCASE
// ==========================================
const aviationImages = [
    'images/aviation/aviation_1.jpg',  'images/aviation/aviation_2.jpg',  'images/aviation/aviation_3.jpg',
    'images/aviation/aviation_4.jpg',  'images/aviation/aviation_5.jpg',  'images/aviation/aviation_6.jpg',
    'images/aviation/aviation_7.jpg',  'images/aviation/aviation_8.jpg',  'images/aviation/aviation_9.jpg',
    'images/aviation/aviation_10.jpg', 'images/aviation/aviation_11.jpg', 'images/aviation/aviation_12.jpg',
    'images/aviation/aviation_13.jpg', 'images/aviation/aviation_14.jpg', 'images/aviation/aviation_15.jpg',
    'images/aviation/aviation_16.jpg', 'images/aviation/aviation_17.jpg', 'images/aviation/aviation_18.jpg',
    'images/aviation/aviation_19.jpg'
];

let aviationIndex = 0;
let isAnimating = false;

// Apply a 3D cylinder transition on the current image
function animateAviationImage(direction) {
    const img = document.getElementById('aviationImage');
    if (!img) return;

    const cls = direction === 'next' ? 'slide-next' : 'slide-prev';

    img.classList.remove('slide-next', 'slide-prev');
    void img.offsetWidth;
    img.classList.add(cls);

    isAnimating = true;
    img.addEventListener('animationend', function handler() {
        img.removeEventListener('animationend', handler);
        img.classList.remove('slide-next', 'slide-prev');
        isAnimating = false;
    });
}

// Open the aviation gallery modal
function openAviationGallery() {
    aviationIndex = 0;
    const m = document.getElementById('aviationModal');
    const img = document.getElementById('aviationImage');
    const t = document.getElementById('aviationTotal');
    const i = document.getElementById('aviationIndex');

    if (t) t.textContent = aviationImages.length;
    if (i) i.textContent = 1;
    if (img) img.src = aviationImages[0];
    if (m) {
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close the aviation gallery modal
function closeAviationGallery() {
    const m = document.getElementById('aviationModal');
    if (m) {
        m.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show the previous aviation image
function prevAviation() {
    if (isAnimating) return;
    aviationIndex = (aviationIndex - 1 + aviationImages.length) % aviationImages.length;
    const img = document.getElementById('aviationImage');
    const i = document.getElementById('aviationIndex');
    if (i) i.textContent = aviationIndex + 1;
    if (img) img.src = aviationImages[aviationIndex];
    animateAviationImage('prev');
}

// Show the next aviation image
function nextAviation() {
    if (isAnimating) return;
    aviationIndex = (aviationIndex + 1) % aviationImages.length;
    const img = document.getElementById('aviationImage');
    const i = document.getElementById('aviationIndex');
    if (i) i.textContent = aviationIndex + 1;
    if (img) img.src = aviationImages[aviationIndex];
    animateAviationImage('next');
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', function (e) {
    const m = document.getElementById('aviationModal');
    if (!m || !m.classList.contains('active')) return;
    if (e.key === 'Escape') closeAviationGallery();
    if (e.key === 'ArrowLeft') prevAviation();
    if (e.key === 'ArrowRight') nextAviation();
});

// ==========================================
// BACKGROUND MUSIC
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    var bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    function startPlay() {
        bgMusic.muted = false;
        var p = bgMusic.play();
        if (p !== undefined) { p.catch(function () {}); }
        document.removeEventListener('click', startPlay);
        document.removeEventListener('touchstart', startPlay);
        document.removeEventListener('keydown', startPlay);
    }

    bgMusic.muted = false;
    var p0 = bgMusic.play();
    if (p0 !== undefined) {
        p0.catch(function () {
            document.addEventListener('click', startPlay);
            document.addEventListener('touchstart', startPlay);
            document.addEventListener('keydown', startPlay);
        });
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) { bgMusic.pause(); }
        else { bgMusic.play().catch(function () {}); }
    });

    window.addEventListener('beforeunload', function () {
        try { bgMusic.pause(); bgMusic.currentTime = 0; } catch (e) {}
    });
});