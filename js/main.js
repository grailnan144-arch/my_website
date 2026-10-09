// ==========================================
// ASSET CACHE-BUSTING
// ==========================================
// Bump this whenever images are replaced (e.g. re-cropped) so browsers
// fetch the fresh copy instead of the previous one from cache.
const ASSET_VERSION = "15";

function assetUrl(path) {
  if (!path) return path;
  const sep = path.indexOf("?") === -1 ? "?" : "&";
  return path + sep + "v=" + ASSET_VERSION;
}

// Collect only the image sources from a media list
function imageSrcs(items) {
  return (items || [])
    .filter(function (item) {
      return item.type === "image";
    })
    .map(function (item) {
      return item.src;
    });
}

// ==========================================
// AVIATION IMAGE SHOWCASE
// ==========================================
const aviationImages = [
  "images/aviation/aviation_1.jpg",
  "images/aviation/aviation_2.jpg",
  "images/aviation/aviation_3.jpg",
  "images/aviation/aviation_4.jpg",
  "images/aviation/aviation_5.jpg",
  "images/aviation/aviation_6.jpg",
  "images/aviation/aviation_7.jpg",
  "images/aviation/aviation_8.jpg",
  "images/aviation/aviation_9.jpg",
  "images/aviation/aviation_10.jpg",
  "images/aviation/aviation_11.jpg",
  "images/aviation/aviation_12.jpg",
  "images/aviation/aviation_13.jpg",
  "images/aviation/aviation_14.jpg",
  "images/aviation/aviation_15.jpg",
  "images/aviation/aviation_16.jpg",
  "images/aviation/aviation_17.jpg",
  "images/aviation/aviation_18.jpg",
  "images/aviation/aviation_19.jpg",
];

let aviationIndex = 0;
let isAnimating = false;
let animLockTimer = null;

// Apply a 3D cylinder transition on the given media element
function animateGalleryImage(img, direction) {
  if (!img) return;

  const cls = direction === "next" ? "slide-next" : "slide-prev";

  img.classList.remove("slide-next", "slide-prev");
  void img.offsetWidth;
  img.classList.add(cls);

  isAnimating = true;

  // Safety net: never leave the gallery locked if animationend never fires
  clearTimeout(animLockTimer);
  animLockTimer = setTimeout(function () {
    img.classList.remove("slide-next", "slide-prev");
    isAnimating = false;
  }, 900);

  img.addEventListener("animationend", function handler() {
    img.removeEventListener("animationend", handler);
    clearTimeout(animLockTimer);
    img.classList.remove("slide-next", "slide-prev");
    isAnimating = false;
  });
}

// Open the aviation gallery modal
function openAviationGallery() {
  aviationIndex = 0;
  const m = document.getElementById("aviationModal");
  const img = document.getElementById("aviationImage");
  const t = document.getElementById("aviationTotal");
  const i = document.getElementById("aviationIndex");

  if (t) t.textContent = aviationImages.length;
  if (i) i.textContent = 1;
  if (img) img.src = assetUrl(aviationImages[0]);
  if (m) {
    m.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close the aviation gallery modal
function closeAviationGallery() {
  const m = document.getElementById("aviationModal");
  if (m) {
    m.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Show the previous aviation image
function prevAviation() {
  if (isAnimating) return;
  aviationIndex =
    (aviationIndex - 1 + aviationImages.length) % aviationImages.length;
  const img = document.getElementById("aviationImage");
  const i = document.getElementById("aviationIndex");
  if (i) i.textContent = aviationIndex + 1;
  if (img) img.src = assetUrl(aviationImages[aviationIndex]);
  animateGalleryImage(img, "prev");
}

// Show the next aviation image
function nextAviation() {
  if (isAnimating) return;
  aviationIndex = (aviationIndex + 1) % aviationImages.length;
  const img = document.getElementById("aviationImage");
  const i = document.getElementById("aviationIndex");
  if (i) i.textContent = aviationIndex + 1;
  if (img) img.src = assetUrl(aviationImages[aviationIndex]);
  animateGalleryImage(img, "next");
}

// ==========================================
// FRENCH FRIES IMAGE GALLERY
// ==========================================
const friesImages = [
  "images/fries/fries_1.png",
  "images/fries/fries_2.jpg",
  "images/fries/fries_3.jpg",
];

let friesIndex = 0;

// Show the current fries image and update the counter
function showFriesImage() {
  const img = document.getElementById("friesImage");
  const i = document.getElementById("friesIndex");
  const t = document.getElementById("friesTotal");
  if (t) t.textContent = friesImages.length;
  if (i) i.textContent = friesIndex + 1;
  if (img) img.src = assetUrl(friesImages[friesIndex]);
}

// Open the french fries gallery modal
function openFriesGallery() {
  friesIndex = 0;
  showFriesImage();
  const m = document.getElementById("friesModal");
  if (m) {
    m.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close the french fries gallery modal
function closeFriesGallery() {
  const m = document.getElementById("friesModal");
  if (m) {
    m.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Show the previous fries image
function prevFries() {
  if (isAnimating) return;
  friesIndex = (friesIndex - 1 + friesImages.length) % friesImages.length;
  showFriesImage();
  animateGalleryImage(document.getElementById("friesImage"), "prev");
}

// Show the next fries image
function nextFries() {
  if (isAnimating) return;
  friesIndex = (friesIndex + 1) % friesImages.length;
  showFriesImage();
  animateGalleryImage(document.getElementById("friesImage"), "next");
}

// ==========================================
// FAVORITES (COMING SOON) POPUP
// ==========================================
const favoritePopupData = {
  spidey: {
    title: "Spider-Man",
    accent: "spidey",
    iconHtml: '<i class="fa-solid fa-spider"></i>',
    placeholderText: "Spider-Man photos coming soon!",
  },
  bbq: {
    title: "Smoked BBQ",
    accent: "bbq",
    iconHtml:
      '<span class="fav-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12 a7 7 0 0 1 14 0 Z"/><path d="M7 13.5 h10"/><path d="M8.6 15.6 h6.8"/><path d="M8 18.8 L6.6 23 M16 18.8 L17.4 23"/><path d="M12 9 c1.5 -1.7 3 -1.7 4.5 0 c1.5 1.7 3 1.7 4.5 0"/></svg></span>',
    placeholderText: "Smoked BBQ photos coming soon!",
  },
  chips: {
    title: "Potato Chips",
    accent: "chips",
    iconHtml:
      '<span class="fav-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4.5 6.5 H19.5 L18.6 18.4 a2.6 2.6 0 0 1 -2.6 2.6 H8 a2.6 2.6 0 0 1 -2.6 -2.6 Z"/><path d="M4.5 6.5 H19.5 L18.9 4.1 a1.4 1.4 0 0 0 -1.35 -1.05 H6.45 a1.4 1.4 0 0 0 -1.35 1.05 Z"/><ellipse cx="12" cy="12.8" rx="5.2" ry="3.6"/><text x="12" y="11.3" text-anchor="middle" font-family="Outfit, sans-serif" font-size="2.2" font-weight="800" fill="currentColor" stroke="none">POTATO</text><text x="12" y="14.1" text-anchor="middle" font-family="Outfit, sans-serif" font-size="2.2" font-weight="800" fill="currentColor" stroke="none">CHIPS</text></svg></span>',
    placeholderText: "Potato Chips photos coming soon!",
  },
  fries: {
    title: "French Fries",
    accent: "fries",
    iconHtml:
      '<span class="fav-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 2.5 v9.5"/><path d="M9.5 1.5 v10.5"/><path d="M13 1.5 v10.5"/><path d="M16.5 2.5 v9.5"/><path d="M4.5 11 h15 l-1.8 10 H6.3 Z"/><path d="M7 18.6 h10"/></svg></span>',
    placeholderText: "French Fries photos coming soon!",
  },
};

// Real media galleries for the favorites popups (video / images + counter + nav)
const favoriteMediaItems = {
  spidey: [
    { type: "image", src: "images/spider/spider_1.webp" },
    { type: "image", src: "images/spider/spider_2.jpg" },
    { type: "image", src: "images/spider/spider_3.jpg" },
  ],
  bbq: [
    { type: "video", src: "videos/bbq_vid/bbq_1.mp4" },
    { type: "image", src: "images/bbq/bbq_1.jpg" },
    { type: "image", src: "images/bbq/bbq_2.jpg" },
    { type: "image", src: "images/bbq/bbq_3.jpg" },
  ],
  chips: [
    { type: "image", src: "images/potato/potato_1.png" },
    { type: "image", src: "images/potato/potato_2.jpg" },
    { type: "image", src: "images/potato/potato_3.png" },
  ],
};

let favIndex = 0;
let favItems = [];

// Render the current favorites media item (video or image) and update the counter
function showFavoriteItem(direction) {
  const m = document.getElementById("favoritesModal");
  const v = document.getElementById("favVideo");
  const img = document.getElementById("favImage");
  const i = document.getElementById("favIndex");
  const t = document.getElementById("favTotal");
  const stage = m ? m.querySelector(".fav-stage") : null;

  if (!favItems.length) return;

  if (t) t.textContent = favItems.length;
  if (i) i.textContent = favIndex + 1;

  const item = favItems[favIndex];
  if (!item) return;

  if (stage) stage.classList.toggle("has-video", item.type === "video");

  if (item.type === "image") {
    if (v) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch (err) {}
      v.style.display = "none";
    }
    if (img) {
      img.src = assetUrl(item.src);
      img.style.display = "block";
      if (direction) animateGalleryImage(img, direction);
    }
    return;
  }

  if (img) img.style.display = "none";
  if (v) {
    v.style.display = "block";
    if (direction) animateGalleryImage(v, direction);
    try {
      v.currentTime = 0;
    } catch (err) {}
    const p = v.play();
    if (p !== undefined) p.catch(function () {});
  }
}

// Open a favorites popup and fill in the title, icon, and media gallery
function openFavoritePopup(kind) {
  const data = favoritePopupData[kind];
  if (!data) return;

  const m = document.getElementById("favoritesModal");
  const icon = document.getElementById("favPopupIcon");
  const title = document.getElementById("favPopupTitle");
  const phIcon = document.getElementById("favPlaceholderIcon");
  const phText = document.getElementById("favPlaceholderText");
  const video = document.getElementById("favVideo");
  const img = document.getElementById("favImage");

  if (icon) icon.innerHTML = data.iconHtml;
  if (title) title.textContent = data.title;
  if (phIcon) phIcon.innerHTML = data.iconHtml;
  if (phText) phText.textContent = data.placeholderText;

  // Favorites with real media render a gallery; the rest show the placeholder
  favItems = favoriteMediaItems[kind] || [];
  const hasMedia = favItems.length > 0;

  if (m) m.classList.toggle("show-media", hasMedia);
  if (m) m.classList.toggle("show-placeholder", !hasMedia);
  if (m) m.classList.toggle("has-nav", hasMedia);

  if (hasMedia) {
    favIndex = 0;
    showFavoriteItem();
    // Pause the background music so both tracks never overlap
    const bg = document.getElementById("bgMusic");
    if (bg) bg.pause();
  } else {
    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (err) {}
      video.style.display = "none";
    }
    if (img) img.style.display = "none";
  }

  if (m) {
    m.dataset.accent = data.accent || "spidey";
    m.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close the favorites popup
function closeFavoritePopup() {
  const m = document.getElementById("favoritesModal");
  const video = document.getElementById("favVideo");
  const img = document.getElementById("favImage");
  const hadMedia = m && m.classList.contains("show-media");

  if (video) {
    video.pause();
    try {
      video.currentTime = 0;
    } catch (err) {}
  }
  if (img) img.style.display = "none";

  if (m) {
    m.classList.remove("active", "show-media", "show-placeholder", "has-nav");
    document.body.style.overflow = "";
  }

  // Resume the background music after the media popup closes
  if (hadMedia) {
    const bg = document.getElementById("bgMusic");
    if (bg) {
      const p = bg.play();
      if (p !== undefined) p.catch(function () {});
    }
  }
}

// Show the previous favorites media item (video / image)
function prevFavoriteMedia() {
  if (isAnimating || !favItems.length) return;
  favIndex = (favIndex - 1 + favItems.length) % favItems.length;
  showFavoriteItem("prev");
}

// Show the next favorites media item (video / image)
function nextFavoriteMedia() {
  if (isAnimating || !favItems.length) return;
  favIndex = (favIndex + 1) % favItems.length;
  showFavoriteItem("next");
}

// ==========================================
// MY FAVORITES LOADING TRANSITION (AIRPLANE)
// ==========================================
// Which images to warm up while the airplane loader is showing
const favLoaderImages = {
  aviation: function () {
    return aviationImages;
  },
  fries: function () {
    return friesImages;
  },
  music: function () {
    return imageSrcs(musicItems);
  },
  spidey: function () {
    return imageSrcs(favoriteMediaItems.spidey);
  },
  bbq: function () {
    return imageSrcs(favoriteMediaItems.bbq);
  },
  chips: function () {
    return imageSrcs(favoriteMediaItems.chips);
  },
};

let favLoaderTimer = null;
let favLoaderAction = null;

// Preload image URLs (cache-busted) so the popup content is ready when it opens
function preloadImages(list) {
  (list || []).forEach(function (src) {
    const im = new Image();
    im.src = assetUrl(src);
  });
}

// Show the themed airplane loader for ~3s, then reveal the requested section
function withFavoriteLoader(kind, action) {
  const loader = document.getElementById("favLoader");
  if (!loader) {
    action();
    return;
  }

  const getImages = favLoaderImages[kind];
  if (getImages) preloadImages(getImages());

  favLoaderAction = action;
  loader.classList.add("active");
  loader.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  clearTimeout(favLoaderTimer);
  favLoaderTimer = setTimeout(function () {
    loader.classList.remove("active");
    loader.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const fn = favLoaderAction;
    favLoaderAction = null;
    if (typeof fn === "function") fn();
  }, 3000);
}

// Entry point used by the "My Favorites" buttons
function openFavWithLoader(kind) {
  if (kind === "aviation") {
    withFavoriteLoader(kind, openAviationGallery);
  } else if (kind === "music") {
    withFavoriteLoader(kind, openMusicVideo);
  } else if (kind === "fries") {
    withFavoriteLoader(kind, openFriesGallery);
  } else {
    withFavoriteLoader(kind, function () {
      openFavoritePopup(kind);
    });
  }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener("keydown", function (e) {
  const aviationModal = document.getElementById("aviationModal");
  const musicModal = document.getElementById("musicModal");
  const favModal = document.getElementById("favoritesModal");
  const friesModal = document.getElementById("friesModal");
  const aviationOpen =
    aviationModal && aviationModal.classList.contains("active");
  const musicOpen = musicModal && musicModal.classList.contains("active");
  const favOpen = favModal && favModal.classList.contains("active");
  const favHasMedia = favOpen && favModal.classList.contains("show-media");
  const friesOpen = friesModal && friesModal.classList.contains("active");

  if (e.key === "Escape") {
    if (musicOpen) closeMusicVideo();
    else if (aviationOpen) closeAviationGallery();
    else if (friesOpen) closeFriesGallery();
    else if (favOpen) closeFavoritePopup();
    return;
  }

  if (aviationOpen && e.key === "ArrowLeft") {
    prevAviation();
    return;
  }
  if (aviationOpen && e.key === "ArrowRight") {
    nextAviation();
    return;
  }
  if (musicOpen && e.key === "ArrowLeft") {
    prevMusic();
    return;
  }
  if (musicOpen && e.key === "ArrowRight") {
    nextMusic();
    return;
  }
  if (friesOpen && e.key === "ArrowLeft") {
    prevFries();
    return;
  }
  if (friesOpen && e.key === "ArrowRight") {
    nextFries();
    return;
  }
  if (favHasMedia && e.key === "ArrowLeft") {
    prevFavoriteMedia();
    return;
  }
  if (favHasMedia && e.key === "ArrowRight") {
    nextFavoriteMedia();
    return;
  }
});

// ==========================================
// MUSIC BEATS VIDEO POPUP
// ==========================================
let musicSlowTimer = null;

// Show the loading overlay inside the video popup
function showMusicLoader(text) {
  const loader = document.getElementById("musicLoader");
  const label = document.getElementById("musicLoaderText");
  if (!loader) return;
  loader.classList.remove("hidden", "is-error");
  if (label) label.textContent = text || "Loading video…";
  clearTimeout(musicSlowTimer);
  musicSlowTimer = setTimeout(function () {
    const l = document.getElementById("musicLoaderText");
    const lo = document.getElementById("musicLoader");
    if (l && lo && !lo.classList.contains("hidden")) {
      l.textContent = "Still loading… large video file, please wait.";
    }
  }, 8000);
}

// Hide the loading overlay (video is ready)
function hideMusicLoader() {
  const loader = document.getElementById("musicLoader");
  clearTimeout(musicSlowTimer);
  if (loader) loader.classList.add("hidden");
}

// Report download progress while the video is loading
function updateMusicLoadProgress() {
  const v = document.getElementById("musicVideo");
  const label = document.getElementById("musicLoaderText");
  const loader = document.getElementById("musicLoader");
  if (!v || !label || !loader || loader.classList.contains("hidden")) return;
  try {
    if (isFinite(v.duration) && v.duration > 0 && v.buffered.length > 0) {
      const pct = Math.round(
        (v.buffered.end(v.buffered.length - 1) / v.duration) * 100,
      );
      if (pct > 0 && pct < 100)
        label.textContent = "Loading video… " + pct + "%";
    }
  } catch (err) {}
}

// Wire the video element to the loading overlay
(function bindMusicVideoEvents() {
  const v = document.getElementById("musicVideo");
  if (!v) return;
  v.addEventListener("loadeddata", hideMusicLoader);
  v.addEventListener("canplay", hideMusicLoader);
  v.addEventListener("playing", hideMusicLoader);
  v.addEventListener("progress", updateMusicLoadProgress);
  v.addEventListener("waiting", function () {
    showMusicLoader("Buffering…");
  });
  v.addEventListener("error", function () {
    clearTimeout(musicSlowTimer);
    const loader = document.getElementById("musicLoader");
    const label = document.getElementById("musicLoaderText");
    if (loader) {
      loader.classList.remove("hidden");
      loader.classList.add("is-error");
    }
    if (label) label.textContent = "Video failed to load. Please try again.";
  });
})();

// Start loading the video early when the user hovers/focuses the Music Beats button
document.addEventListener("DOMContentLoaded", function () {
  const musicBtn = document.querySelector("button.fav-card.music");
  const v = document.getElementById("musicVideo");
  if (!musicBtn || !v) return;
  const kick = function () {
    if (v.preload !== "auto") {
      v.preload = "auto";
      v.load();
    }
  };
  musicBtn.addEventListener("mouseenter", kick);
  musicBtn.addEventListener("focus", kick);
  musicBtn.addEventListener("touchstart", kick, { passive: true });
});

// Music Beats popup shows a video followed by the music pictures
const musicItems = [
  { type: "video", src: "videos/music_vid/video_1.mp4" },
  { type: "image", src: "images/music/music_1.jpg" },
  { type: "image", src: "images/music/music_2.jpg" },
  { type: "image", src: "images/music/music_3.jpg" },
  { type: "image", src: "images/music/music_4.jpg" },
  { type: "image", src: "images/music/music_5.jpg" },
  { type: "image", src: "images/music/music_6.jpg" },
];
let musicIndex = 0;

// Render the current music item (video or image) and update the counter
// direction ('prev'/'next') triggers the same 3D cylinder animation as aviation/fries
function showMusicItem(direction) {
  const v = document.getElementById("musicVideo");
  const img = document.getElementById("musicImage");
  const i = document.getElementById("musicIndex");
  const t = document.getElementById("musicTotal");

  if (t) t.textContent = musicItems.length;
  if (i) i.textContent = musicIndex + 1;

  const item = musicItems[musicIndex];

  if (item.type === "image") {
    if (v) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch (err) {}
      v.style.display = "none";
    }
    hideMusicLoader();
    if (img) {
      img.src = assetUrl(item.src);
      img.style.display = "block";
      if (direction) animateGalleryImage(img, direction);
    }
    return;
  }

  if (img) img.style.display = "none";
  if (v) {
    v.style.display = "block";
    if (direction) animateGalleryImage(v, direction);
    try {
      v.currentTime = 0;
    } catch (err) {}
    const loader = document.getElementById("musicLoader");
    if (loader && v.readyState >= 3) {
      hideMusicLoader();
    } else {
      showMusicLoader("Loading video…");
    }
    const p = v.play();
    if (p !== undefined) p.catch(function () {});
  }
}

// Open the music beats video popup and start playback
function openMusicVideo() {
  const m = document.getElementById("musicModal");
  if (!m) return;

  musicIndex = 0;

  const img = document.getElementById("musicImage");
  if (img) img.style.display = "none";

  m.classList.add("active");
  document.body.style.overflow = "hidden";

  // Pause the background music so both tracks never overlap
  const bg = document.getElementById("bgMusic");
  if (bg) bg.pause();

  showMusicItem();
}

// Close the music beats video popup and stop playback
function closeMusicVideo() {
  const m = document.getElementById("musicModal");
  if (!m || !m.classList.contains("active")) return;

  const v = document.getElementById("musicVideo");
  if (v) {
    v.pause();
    try {
      v.currentTime = 0;
    } catch (err) {}
  }

  m.classList.remove("active");
  document.body.style.overflow = "";

  // Resume the background music after the popup closes
  const bg = document.getElementById("bgMusic");
  if (bg) {
    const p = bg.play();
    if (p !== undefined) p.catch(function () {});
  }
}

// Show the previous music item (video / image)
function prevMusic() {
  if (isAnimating) return;
  musicIndex = (musicIndex - 1 + musicItems.length) % musicItems.length;
  showMusicItem("prev");
}

// Show the next music item (video / image)
function nextMusic() {
  if (isAnimating) return;
  musicIndex = (musicIndex + 1) % musicItems.length;
  showMusicItem("next");
}

// ==========================================
// BACKGROUND MUSIC
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  var bgMusic = document.getElementById("bgMusic");
  if (!bgMusic) return;

  function startPlay() {
    // Never start the background music while a video popup is open
    var mm = document.getElementById("musicModal");
    var fav = document.getElementById("favoritesModal");
    var favMedia = fav && fav.classList.contains("active") && fav.classList.contains("show-media");
    if ((mm && mm.classList.contains("active")) || favMedia) return;

    bgMusic.muted = false;
    var p = bgMusic.play();
    if (p !== undefined) {
      p.catch(function () {});
    }
    document.removeEventListener("click", startPlay);
    document.removeEventListener("touchstart", startPlay);
    document.removeEventListener("keydown", startPlay);
  }

  bgMusic.muted = false;
  var p0 = bgMusic.play();
  if (p0 !== undefined) {
    p0.catch(function () {
      document.addEventListener("click", startPlay);
      document.addEventListener("touchstart", startPlay);
      document.addEventListener("keydown", startPlay);
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      bgMusic.pause();
    } else {
      var mm = document.getElementById("musicModal");
      var fav = document.getElementById("favoritesModal");
      var videoPopupOpen = mm && mm.classList.contains("active");
      var favMediaOpen = fav && fav.classList.contains("active") && fav.classList.contains("show-media");
      if (!videoPopupOpen && !favMediaOpen) {
        bgMusic.play().catch(function () {});
      }
    }
  });

  window.addEventListener("beforeunload", function () {
    try {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    } catch (e) {}
  });
});
