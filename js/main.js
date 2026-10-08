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
let animLockTimer = null;

// Apply a 3D cylinder transition on the passed image element
function animateGalleryImage(img, direction) {
    if (!img) return;

    const cls = direction === 'next' ? 'slide-next' : 'slide-prev';

    img.classList.remove('slide-next', 'slide-prev');
    void img.offsetWidth;
    img.classList.add(cls);

    isAnimating = true;

    // Safety net: never leave the gallery locked if animationend never fires
    clearTimeout(animLockTimer);
    animLockTimer = setTimeout(function () {
        img.classList.remove('slide-next', 'slide-prev');
        isAnimating = false;
    }, 900);

    img.addEventListener('animationend', function handler() {
        img.removeEventListener('animationend', handler);
        clearTimeout(animLockTimer);
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
    animateGalleryImage(img, 'prev');
}

// Show the next aviation image
function nextAviation() {
    if (isAnimating) return;
    aviationIndex = (aviationIndex + 1) % aviationImages.length;
    const img = document.getElementById('aviationImage');
    const i = document.getElementById('aviationIndex');
    if (i) i.textContent = aviationIndex + 1;
    if (img) img.src = aviationImages[aviationIndex];
    animateGalleryImage(img, 'next');
}

// ==========================================
// FRENCH FRIES IMAGE GALLERY
// ==========================================
const friesImages = [
    'images/fries/fries_1.png',
    'images/fries/fries_2.jpg',
    'images/fries/fries_3.jpg'
];

let friesIndex = 0;

// Show the current fries image and update the counter
function showFriesImage() {
    const img = document.getElementById('friesImage');
    const i = document.getElementById('friesIndex');
    const t = document.getElementById('friesTotal');
    if (t) t.textContent = friesImages.length;
    if (i) i.textContent = friesIndex + 1;
    if (img) img.src = friesImages[friesIndex];
}

// Open the french fries gallery modal
function openFriesGallery() {
    friesIndex = 0;
    showFriesImage();
    const m = document.getElementById('friesModal');
    if (m) {
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close the french fries gallery modal
function closeFriesGallery() {
    const m = document.getElementById('friesModal');
    if (m) {
        m.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show the previous fries image
function prevFries() {
    if (isAnimating) return;
    friesIndex = (friesIndex - 1 + friesImages.length) % friesImages.length;
    showFriesImage();
    animateGalleryImage(document.getElementById('friesImage'), 'prev');
}

// Show the next fries image
function nextFries() {
    if (isAnimating) return;
    friesIndex = (friesIndex + 1) % friesImages.length;
    showFriesImage();
    animateGalleryImage(document.getElementById('friesImage'), 'next');
}

// ==========================================
// FAVORITES (COMING SOON) POPUP
// ==========================================
const favoritePopupData = {
    spidey: {
        title: 'Spider-Man',
        accent: 'spidey',
        iconHtml: '<i class="fa-solid fa-spider"></i>',
        placeholderText: 'Spider-Man photos coming soon!'
    },
    bbq: {
        title: 'Smoked BBQ',
        accent: 'bbq',
        iconHtml: '<span class="fav-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12 a7 7 0 0 1 14 0 Z"/><path d="M7 13.5 h10"/><path d="M8.6 15.6 h6.8"/><path d="M8 18.8 L6.6 23 M16 18.8 L17.4 23"/><path d="M12 9 c1.5 -1.7 3 -1.7 4.5 0 c1.5 1.7 3 1.7 4.5 0"/></svg></span>',
        placeholderText: 'Smoked BBQ photos coming soon!'
    },
    chips: {
        title: 'Potato Chips',
        accent: 'chips',
        iconHtml: '<span class="fav-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4.5 6.5 H19.5 L18.6 18.4 a2.6 2.6 0 0 1 -2.6 2.6 H8 a2.6 2.6 0 0 1 -2.6 -2.6 Z"/><path d="M4.5 6.5 H19.5 L18.9 4.1 a1.4 1.4 0 0 0 -1.35 -1.05 H6.45 a1.4 1.4 0 0 0 -1.35 1.05 Z"/><ellipse cx="12" cy="12.8" rx="5.2" ry="3.6"/><text x="12" y="11.3" text-anchor="middle" font-family="Outfit, sans-serif" font-size="2.2" font-weight="800" fill="currentColor" stroke="none">POTATO</text><text x="12" y="14.1" text-anchor="middle" font-family="Outfit, sans-serif" font-size="2.2" font-weight="800" fill="currentColor" stroke="none">CHIPS</text></svg></span>',
        placeholderText: 'Potato Chips photos coming soon!'
    }
};

// Open a favorites popup and fill in the title, icon, and placeholder message
function openFavoritePopup(kind) {
    const data = favoritePopupData[kind];
    if (!data) return;

    const m = document.getElementById('favoritesModal');
    const icon = document.getElementById('favPopupIcon');
    const title = document.getElementById('favPopupTitle');
    const phIcon = document.getElementById('favPlaceholderIcon');
    const phText = document.getElementById('favPlaceholderText');

    if (icon) icon.innerHTML = data.iconHtml;
    if (title) title.textContent = data.title;
    if (phIcon) phIcon.innerHTML = data.iconHtml;
    if (phText) phText.textContent = data.placeholderText;

    if (m) {
        m.dataset.accent = data.accent || 'spidey';
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close the favorites popup
function closeFavoritePopup() {
    const m = document.getElementById('favoritesModal');
    if (m) {
        m.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', function (e) {
    const aviationModal = document.getElementById('aviationModal');
    const musicModal = document.getElementById('musicModal');
    const favModal = document.getElementById('favoritesModal');
    const friesModal = document.getElementById('friesModal');
    const aviationOpen = aviationModal && aviationModal.classList.contains('active');
    const musicOpen = musicModal && musicModal.classList.contains('active');
    const favOpen = favModal && favModal.classList.contains('active');
    const friesOpen = friesModal && friesModal.classList.contains('active');

    if (e.key === 'Escape') {
        if (musicOpen) closeMusicVideo();
        else if (aviationOpen) closeAviationGallery();
        else if (friesOpen) closeFriesGallery();
        else if (favOpen) closeFavoritePopup();
        return;
    }

    if (aviationOpen && e.key === 'ArrowLeft') { prevAviation(); return; }
    if (aviationOpen && e.key === 'ArrowRight') { nextAviation(); return; }
    if (musicOpen && e.key === 'ArrowLeft') { prevMusic(); return; }
    if (musicOpen && e.key === 'ArrowRight') { nextMusic(); return; }
    if (friesOpen && e.key === 'ArrowLeft') { prevFries(); return; }
    if (friesOpen && e.key === 'ArrowRight') { nextFries(); return; }
});

// ==========================================
// MUSIC BEATS VIDEO POPUP
// ==========================================
let musicSlowTimer = null;

// Show the loading overlay inside the video popup
function showMusicLoader(text) {
    const loader = document.getElementById('musicLoader');
    const label = document.getElementById('musicLoaderText');
    if (!loader) return;
    loader.classList.remove('hidden', 'is-error');
    if (label) label.textContent = text || 'Loading video…';
    clearTimeout(musicSlowTimer);
    musicSlowTimer = setTimeout(function () {
        const l = document.getElementById('musicLoaderText');
        const lo = document.getElementById('musicLoader');
        if (l && lo && !lo.classList.contains('hidden')) {
            l.textContent = 'Still loading… large video file, please wait.';
        }
    }, 8000);
}

// Hide the loading overlay (video is ready)
function hideMusicLoader() {
    const loader = document.getElementById('musicLoader');
    clearTimeout(musicSlowTimer);
    if (loader) loader.classList.add('hidden');
}

// Report download progress while the video is loading
function updateMusicLoadProgress() {
    const v = document.getElementById('musicVideo');
    const label = document.getElementById('musicLoaderText');
    const loader = document.getElementById('musicLoader');
    if (!v || !label || !loader || loader.classList.contains('hidden')) return;
    try {
        if (isFinite(v.duration) && v.duration > 0 && v.buffered.length > 0) {
            const pct = Math.round((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
            if (pct > 0 && pct < 100) label.textContent = 'Loading video… ' + pct + '%';
        }
    } catch (err) {}
}

// Wire the video element to the loading overlay
(function bindMusicVideoEvents() {
    const v = document.getElementById('musicVideo');
    if (!v) return;
    v.addEventListener('loadeddata', hideMusicLoader);
    v.addEventListener('canplay', hideMusicLoader);
    v.addEventListener('playing', hideMusicLoader);
    v.addEventListener('progress', updateMusicLoadProgress);
    v.addEventListener('waiting', function () { showMusicLoader('Buffering…'); });
    v.addEventListener('error', function () {
        clearTimeout(musicSlowTimer);
        const loader = document.getElementById('musicLoader');
        const label = document.getElementById('musicLoaderText');
        if (loader) {
            loader.classList.remove('hidden');
            loader.classList.add('is-error');
        }
        if (label) label.textContent = 'Video failed to load. Please try again.';
    });
})();

// Start loading the video early when the user hovers/focuses the Music Beats button
document.addEventListener('DOMContentLoaded', function () {
    const musicBtn = document.querySelector('button.fav-card.music');
    const v = document.getElementById('musicVideo');
    if (!musicBtn || !v) return;
    const kick = function () {
        if (v.preload !== 'auto') {
            v.preload = 'auto';
            v.load();
        }
    };
    musicBtn.addEventListener('mouseenter', kick);
    musicBtn.addEventListener('focus', kick);
    musicBtn.addEventListener('touchstart', kick, { passive: true });
});

// Music Beats popup now shows 2 media items: a video and a picture
const musicItems = [
    { type: 'video', src: 'videos/video_1.mp4' },
    { type: 'image', src: 'images/music/music_1.jpg' }
];
let musicIndex = 0;

// Render the current music item (video or image) and update the counter
// direction ('prev'/'next') triggers the same 3D cylinder animation as aviation/fries
function showMusicItem(direction) {
    const v = document.getElementById('musicVideo');
    const img = document.getElementById('musicImage');
    const i = document.getElementById('musicIndex');
    const t = document.getElementById('musicTotal');

    if (t) t.textContent = musicItems.length;
    if (i) i.textContent = musicIndex + 1;

    const item = musicItems[musicIndex];

    if (item.type === 'image') {
        if (v) {
            v.pause();
            try { v.currentTime = 0; } catch (err) {}
            v.style.display = 'none';
        }
        hideMusicLoader();
        if (img) {
            img.src = item.src;
            img.style.display = 'block';
            if (direction) animateGalleryImage(img, direction);
        }
        return;
    }

    if (img) img.style.display = 'none';
    if (v) {
        v.style.display = 'block';
        if (direction) animateGalleryImage(v, direction);
        try { v.currentTime = 0; } catch (err) {}
        const loader = document.getElementById('musicLoader');
        if (loader && v.readyState >= 3) {
            hideMusicLoader();
        } else {
            showMusicLoader('Loading video…');
        }
        const p = v.play();
        if (p !== undefined) p.catch(function () {});
    }
}

// Open the music beats popup (starts on the video)
function openMusicVideo() {
    const m = document.getElementById('musicModal');
    if (!m) return;

    musicIndex = 0;

    const img = document.getElementById('musicImage');
    if (img) img.style.display = 'none';

    m.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Pause the background music so both tracks never overlap
    const bg = document.getElementById('bgMusic');
    if (bg) bg.pause();

    showMusicItem();
}

// Close the music beats popup and stop playback
function closeMusicVideo() {
    const m = document.getElementById('musicModal');
    if (!m || !m.classList.contains('active')) return;

    const v = document.getElementById('musicVideo');
    if (v) {
        v.pause();
        try { v.currentTime = 0; } catch (err) {}
    }

    m.classList.remove('active');
    document.body.style.overflow = '';

    // Resume the background music after the popup closes
    const bg = document.getElementById('bgMusic');
    if (bg) {
        const p = bg.play();
        if (p !== undefined) p.catch(function () {});
    }
}

// Show the previous music item (video / image)
function prevMusic() {
    if (isAnimating) return;
    musicIndex = (musicIndex - 1 + musicItems.length) % musicItems.length;
    showMusicItem('prev');
}

// Show the next music item (video / image)
function nextMusic() {
    if (isAnimating) return;
    musicIndex = (musicIndex + 1) % musicItems.length;
    showMusicItem('next');
}

// ==========================================
// BACKGROUND MUSIC
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    var bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    function startPlay() {
        // Never start the background music while the video popup is open
        var mm = document.getElementById('musicModal');
        if (mm && mm.classList.contains('active')) return;

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
        if (document.hidden) {
            bgMusic.pause();
        } else {
            var mm = document.getElementById('musicModal');
            var videoPopupOpen = mm && mm.classList.contains('active');
            if (!videoPopupOpen) { bgMusic.play().catch(function () {}); }
        }
    });

    window.addEventListener('beforeunload', function () {
        try { bgMusic.pause(); bgMusic.currentTime = 0; } catch (e) {}
    });
});