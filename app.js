document.addEventListener('DOMContentLoaded', () => {
    // Application State
    const state = {
        activeTab: 'home',
        ownerPhone: '0433 897 966',
        ownerName: 'Reception',
        hostesses: [
            {
                id: 'elena',
                name: 'Elena',
                age: 24,
                nationality: 'Russian',
                bio: 'Elena exudes a timeless charm and sophisticated intelligence. Fluent in Russian and English, she is a brilliant conversationalist who thrives in black-tie affairs, high-end dinners, and exclusive social hosting environments.',
                images: ['assets/girl1_1.jpg', 'assets/girl1_2.jpg'],
                details: {
                    height: '176 cm',
                    eyes: 'Emerald Blue',
                    hair: 'Champagne Blonde',
                    languages: 'English, Russian',
                    bookingCode: 'C65-ELENA'
                }
            },
            {
                id: 'yasmine',
                name: 'Yasmine',
                age: 22,
                nationality: 'French',
                bio: 'Yasmine combines French elegance with an artistic soul. A graduate in classical literature, her quick wit and graceful posture make her the perfect counterpart for VIP gallery openings, theatrical events, or intimate fine dining.',
                images: ['assets/girl2_1.jpg', 'assets/girl2_2.jpg'],
                details: {
                    height: '170 cm',
                    eyes: 'Hazel Brown',
                    hair: 'Dark Chestnut',
                    languages: 'French, English, Italian',
                    bookingCode: 'C65-YASMINE'
                }
            },
            {
                id: 'mei',
                name: 'Mei',
                age: 25,
                nationality: 'Japanese',
                bio: 'Mei is the epitome of poise and classic refinement. Raised in Kyoto and Tokyo, she is skilled in traditional hospitality arts and contemporary business etiquette, making her an extraordinary guest for corporate events and dinners.',
                images: ['assets/girl3_1.jpg', 'assets/girl3_2.jpg'],
                details: {
                    height: '168 cm',
                    eyes: 'Dark Obsidian',
                    hair: 'Glossy Black',
                    languages: 'Japanese, English',
                    bookingCode: 'C65-MEI'
                }
            },
            {
                id: 'seraphina',
                name: 'Seraphina',
                age: 23,
                nationality: 'Spanish',
                bio: 'Seraphina is vivacious, warm, and passionate. Her magnetic presence and laughter captivate any room she enters. She is highly cultured, loves flamenco dance, travel, and is a stellar companion for upscale resort getaways.',
                images: ['assets/girl4_1.jpg', 'assets/girl4_2.jpg'],
                details: {
                    height: '172 cm',
                    eyes: 'Warm Amber',
                    hair: 'Espresso Waves',
                    languages: 'Spanish, English',
                    bookingCode: 'C65-SERA'
                }
            }
        ],
        // Track the current image index for each hostess
        currentImageIndex: {
            elena: 0,
            yasmine: 0,
            mei: 0,
            seraphina: 0
        }
    };

    // DOM Elements
    const elements = {
        tabBtns: document.querySelectorAll('.tab-btn'),
        pages: document.querySelectorAll('.page-view'),
        girlsGrid: document.getElementById('girls-grid'),
        ctaExplore: document.getElementById('cta-explore'),
        bookingModal: document.getElementById('booking-modal'),
        closeModal: document.getElementById('close-modal'),
        modalHostessName: document.getElementById('modal-hostess-name'),
        modalHostessNameConfirm: document.getElementById('modal-hostess-name-confirm'),
        modalBookingCode: document.getElementById('modal-booking-code'),
        modalCallBtn: document.getElementById('modal-call-btn'),
        modalOwnerName: document.getElementById('modal-owner-name')
    };

    // Tab Navigation Logic
    function switchTab(tabId) {
        state.activeTab = tabId;

        // Update tab buttons style
        elements.tabBtns.forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update pages display
        elements.pages.forEach(page => {
            if (page.id === `${tabId}-page`) {
                page.classList.add('active');
                // Scroll to top of window
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                page.classList.remove('active');
            }
        });

        // If switching to girls, render them
        if (tabId === 'girls') {
            renderGirls();
        }
    }

    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    if (elements.ctaExplore) {
        elements.ctaExplore.addEventListener('click', () => {
            switchTab('girls');
        });
    }

    // Dynamic Girls Render Logic
    function renderGirls() {
        if (!elements.girlsGrid) return;
        elements.girlsGrid.innerHTML = '';

        state.hostesses.forEach(girl => {
            const card = document.createElement('div');
            card.className = 'girl-card';
            card.id = `card-${girl.id}`;

            // Create image slides HTML
            let imagesHtml = '';
            girl.images.forEach((imgUrl, idx) => {
                imagesHtml += `
                    <img src="${imgUrl}" 
                         alt="${girl.name} - Photo ${idx + 1}" 
                         class="slide-img ${idx === state.currentImageIndex[girl.id] ? 'active' : ''}" 
                         data-index="${idx}">
                `;
            });

            // Create indicators HTML
            let indicatorsHtml = '';
            girl.images.forEach((_, idx) => {
                indicatorsHtml += `
                    <div class="indicator ${idx === state.currentImageIndex[girl.id] ? 'active' : ''}" 
                         data-slide="${idx}"></div>
                `;
            });

            card.innerHTML = `
                <div class="card-slider">
                    <button class="slider-btn prev" aria-label="Previous image">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    ${imagesHtml}
                    <button class="slider-btn next" aria-label="Next image">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                    <div class="slider-indicators">
                        ${indicatorsHtml}
                    </div>
                </div>
                <div class="girl-info">
                    <div class="girl-header">
                        <h3 class="girl-name">${girl.name}</h3>
                        <span class="girl-age-nat">${girl.nationality}, ${girl.age}</span>
                    </div>
                    <p class="girl-bio">${girl.bio}</p>
                    <div class="girl-details-list">
                        <div class="detail-item"><strong>Height:</strong> ${girl.details.height}</div>
                        <div class="detail-item"><strong>Hair:</strong> ${girl.details.hair}</div>
                        <div class="detail-item"><strong>Eyes:</strong> ${girl.details.eyes}</div>
                        <div class="detail-item"><strong>Languages:</strong> ${girl.details.languages}</div>
                    </div>
                    <button class="book-btn" data-id="${girl.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Call Owner to Book ${girl.name}
                    </button>
                </div>
            `;

            // Slider click events
            const slider = card.querySelector('.card-slider');
            const prevBtn = slider.querySelector('.prev');
            const nextBtn = slider.querySelector('.next');
            const indicators = slider.querySelectorAll('.indicator');
            const slideImages = slider.querySelectorAll('.slide-img');

            function updateSliderImage(newIdx) {
                state.currentImageIndex[girl.id] = newIdx;
                
                // Toggle active slide
                slideImages.forEach((img, i) => {
                    if (i === newIdx) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });

                // Toggle active indicator
                indicators.forEach((ind, i) => {
                    if (i === newIdx) {
                        ind.classList.add('active');
                    } else {
                        ind.classList.remove('active');
                    }
                });
            }

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let idx = state.currentImageIndex[girl.id] - 1;
                if (idx < 0) idx = girl.images.length - 1;
                updateSliderImage(idx);
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let idx = state.currentImageIndex[girl.id] + 1;
                if (idx >= girl.images.length) idx = 0;
                updateSliderImage(idx);
            });

            indicators.forEach(ind => {
                ind.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(ind.dataset.slide, 10);
                    updateSliderImage(idx);
                });
            });

            // Booking Modal Button Handler
            const bookBtn = card.querySelector('.book-btn');
            bookBtn.addEventListener('click', () => {
                openBookingModal(girl);
            });

            elements.girlsGrid.appendChild(card);
        });
    }

    // Booking Modal logic
    function openBookingModal(girl) {
        if (!elements.bookingModal) return;
        
        elements.modalHostessName.textContent = girl.name;
        elements.modalHostessNameConfirm.textContent = girl.name;
        elements.modalBookingCode.textContent = girl.details.bookingCode;
        elements.modalOwnerName.textContent = state.ownerName;
        elements.modalCallBtn.href = `tel:${state.ownerPhone.replace(/\s+/g, '')}`;
        elements.modalCallBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Owner (${state.ownerPhone})
        `;

        elements.bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling background
    }

    function closeBookingModal() {
        if (!elements.bookingModal) return;
        elements.bookingModal.classList.remove('active');
        document.body.style.overflow = ''; // Resume scrolling background
    }

    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', closeBookingModal);
    }

    if (elements.bookingModal) {
        elements.bookingModal.addEventListener('click', (e) => {
            if (e.target === elements.bookingModal) {
                closeBookingModal();
            }
        });
    }

    // Listen to escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });

    // Make global functions/state accessible for testing if necessary
    window.app = { state, switchTab };
});
