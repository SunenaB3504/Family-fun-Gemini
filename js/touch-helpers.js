/**
 * Helper functions for touch interactions on Android tablets
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        console.log("Initializing touch helpers for Android tablet");
        
        // Add touch classes to body for CSS targeting
        document.body.classList.add('touch-device');
        
        // Track touch positions
        let touchStartX = 0;
        let touchStartY = 0;
        let touchElement = null;
        
        // Find all draggable items
        const setupTouchDraggable = function() {
            const draggables = document.querySelectorAll('.draggable-item');
            const dropZones = document.querySelectorAll('.drop-zone');
            
            // Add touch handlers to draggable items
            draggables.forEach(item => {
                // Touch start - remember element and position
                item.addEventListener('touchstart', function(e) {
                    touchElement = this;
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    this.classList.add('dragging');
                    e.preventDefault(); // Prevent default touch actions
                }, { passive: false });
                
                // Touch move - move the element
                item.addEventListener('touchmove', function(e) {
                    if (!touchElement) return;
                    
                    const touchX = e.touches[0].clientX;
                    const touchY = e.touches[0].clientY;
                    
                    // Calculate new position
                    const deltaX = touchX - touchStartX;
                    const deltaY = touchY - touchStartY;
                    
                    // Move the element
                    this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    e.preventDefault(); // Prevent scrolling while dragging
                }, { passive: false });
                
                // Touch end - check if over drop zone
                item.addEventListener('touchend', function(e) {
                    if (!touchElement) return;
                    
                    const itemRect = this.getBoundingClientRect();
                    let dropTarget = null;
                    
                    // Check if over any drop zone
                    dropZones.forEach(zone => {
                        const zoneRect = zone.getBoundingClientRect();
                        
                        // Simple collision detection
                        if (itemRect.left < zoneRect.right && 
                            itemRect.right > zoneRect.left &&
                            itemRect.top < zoneRect.bottom &&
                            itemRect.bottom > zoneRect.top) {
                            dropTarget = zone;
                        }
                    });
                    
                    // Handle drop
                    if (dropTarget && dropTarget.children.length === 0) {
                        // Reset transform
                        this.style.transform = '';
                        
                        // Move to drop zone
                        const oldParent = this.parentNode;
                        dropTarget.appendChild(this);
                        
                        // Trigger custom drop event for game logic
                        const dropEvent = new CustomEvent('item-dropped', {
                            detail: {
                                item: this,
                                source: oldParent,
                                target: dropTarget
                            }
                        });
                        document.dispatchEvent(dropEvent);
                    } else {
                        // Reset transform
                        this.style.transform = '';
                    }
                    
                    this.classList.remove('dragging');
                    touchElement = null;
                });
            });
            
            // Listen for dynamically added draggable items
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1 && node.classList.contains('draggable-item')) {
                                setupTouchDraggable();
                            }
                        });
                    }
                });
            });
            
            // Start observing the document
            observer.observe(document.body, { 
                childList: true,
                subtree: true
            });
        };
        
        // Initialize draggable setup
        setupTouchDraggable();
    }
});
