const canvas = document.getElementById('animation-canvas');
const context = canvas.getContext('2d');
const scrollPrompt = document.getElementById('scroll-prompt');

// The sequence contains frames 1 to 200
const frameCount = 200;

// Function to generate the correct file path given an index
const currentFrame = index => {
    // Generates values like 001, 002, 010, 100, etc.
    const paddedIndex = index.toString().padStart(3, '0');
    return `eecp images/ezgif-frame-${paddedIndex}.jpg`;
};

// Preload the images so they display smoothly when scrolling
const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

// Create main image element for drawing onto canvas
const img = new Image();
img.src = currentFrame(1);

// Draw the first frame as soon as it loads
img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
};

// Update the canvas with latest frame based on index
const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
};

// Listen to scroll events to progress the animation
window.addEventListener('scroll', () => {
    // Calculate scroll progress percentage
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    // Convert scroll fraction to an index frame
    // Math.ceil ensures we get at least 1, and Math.min caps it at frameCount (200)
    let frameIndex = Math.ceil(scrollFraction * frameCount);
    
    // Boundary checks
    if (frameIndex < 1) frameIndex = 1;
    if (frameIndex > frameCount) frameIndex = frameCount;

    // Hide scroll prompt once user starts scrolling
    if (scrollTop > 50) {
        scrollPrompt.style.opacity = '0';
    } else {
        scrollPrompt.style.opacity = '1';
    }

    // Schedule the canvas update
    requestAnimationFrame(() => updateImage(frameIndex));
});

// Start preloading
preloadImages();
