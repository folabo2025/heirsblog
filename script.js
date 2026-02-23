/**
 * HOPS Schools - Main Script
 * Handles Navigation Menu, 15s Slider, Video Redirection, and Live Comments
 */

// --- 1. Navigation & Menu Logic ---
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.getElementById('menuIcon');

    if (!sideMenu || !overlay || !menuIcon) return;

    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    if (sideMenu.classList.contains('active')) {
        menuIcon.innerHTML = "✕";
        menuIcon.classList.add('open'); 
    } else {
        menuIcon.innerHTML = "☰";
        menuIcon.classList.remove('open');
    }
}

// --- 2. Image Slider Logic (15 Seconds) ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');

function showSlides() {
    if (slides.length === 0) return;
    slides.forEach(img => img.classList.remove('active'));
    currentSlide++;
    if (currentSlide > slides.length) { currentSlide = 1; }
    slides[currentSlide - 1].classList.add('active');
    setTimeout(showSlides, 125000);
}

// --- 3. Video Card Interaction ---
function openVideo(videoId) {
    window.location.href = 'watch/watch.html';
}

// --- 4. Interactive & Live Comment Section Logic ---

function collapseForm() {
    const hiddenFields = document.getElementById('hiddenFields');
    const commentForm = document.getElementById('mainCommentForm');
    if (hiddenFields) hiddenFields.classList.remove('show');
    if (commentForm) {
        commentForm.reset();
        const textarea = document.getElementById('userComment');
        if (textarea) textarea.style.height = "auto";
    }
}

function handleAutoExpand(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
}

/**
 * NEW: Logic to actually post the comment to the page
 */
function handleCommentSubmit(e) {
    e.preventDefault(); // Prevents page from refreshing

    const name = document.getElementById('userName').value;
    const commentText = document.getElementById('userComment').value;
    const commentsDisplay = document.querySelector('.comments-display');

    if (!name || !commentText) return;

    // Get first letter for the avatar
    const firstLetter = name.charAt(0).toUpperCase();

    // Create the HTML for the new comment
    const newCommentHTML = `
        <div class="comment-item" style="animation: fadeIn 0.5s ease;">
            <div class="user-avatar">${firstLetter}</div>
            <div class="comment-details">
                <div class="comment-header">
                    <strong>${name}</strong>
                    <span class="comment-date">Just now</span>
                </div>
                <p>${commentText}</p>
            </div>
        </div>
    `;

    // Add to the top of the comments list
    commentsDisplay.insertAdjacentHTML('afterbegin', newCommentHTML);

    // Update Comment Count (Optional)
    const countElement = document.querySelector('.comment-count');
    let currentCount = parseInt(countElement.innerText) || 0;
    countElement.innerText = (currentCount + 1) + " Comments";

    // Reset and collapse form
    collapseForm();
}

// --- 5. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // A. Overlay
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.onclick = toggleMenu;
    
    // B. Slider
    showSlides();

    // C. Comment Section Interaction
    const nameInput = document.getElementById('userName');
    const hiddenFields = document.getElementById('hiddenFields');
    const userComment = document.getElementById('userComment');
    const commentForm = document.getElementById('mainCommentForm');

    if (nameInput && hiddenFields) {
        nameInput.addEventListener('focus', () => {
            hiddenFields.classList.add('show');
        });
    }

    if (userComment) {
        userComment.addEventListener('input', handleAutoExpand);
    }

    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmit);
    }
});