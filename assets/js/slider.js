document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.video-slider');
    
    sliders.forEach(slider => {
        const container = slider.parentElement;
        const leftNav = container.querySelector('.slider-nav.left');
        const rightNav = container.querySelector('.slider-nav.right');
        const items = slider.querySelectorAll('.video-item');
        let currentIndex = 0;
        
        // Calculate the number of items visible at once
        const getVisibleItems = () => {
            const itemWidth = items[0].offsetWidth;
            const containerWidth = container.offsetWidth - 80; // Account for padding
            return Math.floor(containerWidth / itemWidth);
        };
        
        // Update slider position
        const updateSlider = () => {
            const visibleItems = getVisibleItems();
            const maxIndex = items.length - visibleItems;
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
            
            // Calculate offset based on item width and gap
            const itemWidth = items[0].offsetWidth;
            const gap = 45; // Match the gap in CSS
            const offset = currentIndex * -(itemWidth + gap);
            slider.style.transform = `translateX(${offset}px)`;
            
            // Update navigation buttons
            leftNav.style.opacity = currentIndex === 0 ? '0.5' : '1';
            rightNav.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        };
        
        // Event listeners for navigation
        leftNav.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        rightNav.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            const maxIndex = items.length - visibleItems;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', updateSlider);
        
        // Initial setup
        updateSlider();
    });
}); 