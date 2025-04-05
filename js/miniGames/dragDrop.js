// js/miniGames/dragDrop.js
import * as dom from '../domElements.js';
import { shuffleArray } from '../utils.js';
import { nextQuestion } from '../gameLogic.js';

let draggedItem = null; // Module-scoped variable for the dragged item

// Main function to set up the drag and drop interface
export function implementDragAndDropSequence(type, items) {
     console.log(`Starting Drag and Drop for ${type} with items: ${items.join(', ')}`);
     dom.miniGameArea.innerHTML = '';
     dom.miniGameArea.classList.remove('hidden');

     const title = document.createElement('h3');
     title.textContent = 'Mini-Game: Order the Items!';
     dom.miniGameArea.appendChild(title);

     const instruction = document.createElement('p');
     instruction.textContent = 'Drag the items from the top box into the bottom boxes in the correct order.';
     dom.miniGameArea.appendChild(instruction);

     const sourceContainer = document.createElement('div');
     sourceContainer.id = 'drag-source-container';
     dom.miniGameArea.appendChild(sourceContainer);
     // Add drop listener to source container to allow returning items
     sourceContainer.addEventListener('dragover', handleDragOver);
     sourceContainer.addEventListener('dragleave', handleDragLeave); // Reuse handler
     sourceContainer.addEventListener('drop', handleDrop);


     const dropZoneContainer = document.createElement('div');
     dropZoneContainer.id = 'drop-zone-container';
     dom.miniGameArea.appendChild(dropZoneContainer);

     const shuffledItems = shuffleArray([...items]);
     shuffledItems.forEach(item => {
         const div = document.createElement('div');
         div.classList.add('draggable-item');
         div.textContent = item;
         div.draggable = true;
         div.dataset.item = item;
         div.addEventListener('dragstart', handleDragStart);
         div.addEventListener('dragend', handleDragEnd);
         sourceContainer.appendChild(div);
     });

     items.forEach((_, index) => {
         const div = document.createElement('div');
         div.classList.add('drop-zone');
         div.dataset.index = index;
         div.addEventListener('dragover', handleDragOver);
         div.addEventListener('dragleave', handleDragLeave);
         div.addEventListener('drop', handleDrop);
         dropZoneContainer.appendChild(div);
     });

     const checkButton = document.createElement('button');
     checkButton.textContent = 'Check Order';
     dom.miniGameArea.appendChild(checkButton);
     checkButton.addEventListener('click', () => checkDragDropOrder(items)); // Pass correct order
}

// Drag and Drop Event Handlers (Keep these within this module)
function handleDragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.setData('text/plain', event.target.dataset.item);
    setTimeout(() => { /* Optionally style original position */ }, 0);
}

function handleDragEnd() {
     draggedItem = null;
     document.querySelectorAll('.drop-zone.drag-over, #drag-source-container.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
}

function handleDragOver(event) {
    event.preventDefault();
    // Check if the target is a valid drop target (empty drop zone or the source container)
    const target = event.target;
     if ((target.classList.contains('drop-zone') && !target.hasChildNodes()) || target.id === 'drag-source-container') {
         target.classList.add('drag-over');
     }
}

function handleDragLeave(event) {
    event.target.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    const target = event.target;
    target.classList.remove('drag-over');

    if (draggedItem && target.classList.contains('drop-zone') && !target.hasChildNodes()) {
        // Drop onto an empty drop zone
        target.appendChild(draggedItem);
        draggedItem = null;
    } else if (draggedItem && target.id === 'drag-source-container') {
         // Drop back onto the source container
         target.appendChild(draggedItem);
         draggedItem = null;
    } else if (draggedItem && target.classList.contains('draggable-item')) {
         // Allow dropping onto another draggable item to swap (more complex logic)
         // Or simply append back to the source container if dropped on filled zone
         document.getElementById('drag-source-container').appendChild(draggedItem);
         draggedItem = null;
    }
}


function checkDragDropOrder(correctOrder) {
    const dropZones = dom.miniGameArea.querySelectorAll('#drop-zone-container .drop-zone');
    let userOrder = [];
    let allZonesFilled = true;

    dropZones.forEach(zone => {
        zone.classList.remove('correct-order', 'incorrect-order');
        const droppedItem = zone.querySelector('.draggable-item');
        if (droppedItem) {
            userOrder.push(droppedItem.dataset.item);
        } else {
            allZonesFilled = false;
            userOrder.push(null);
        }
    });

    const feedbackPara = dom.miniGameArea.querySelector('p');
    if (!allZonesFilled) {
        feedbackPara.textContent = 'Please place all items in the boxes.';
        feedbackPara.className = '';
        return;
    }

    let isOrderCorrect = true;
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            isOrderCorrect = false;
            dropZones[i].classList.add('incorrect-order');
        } else {
             dropZones[i].classList.add('correct-order');
        }
    }

    if (isOrderCorrect) {
        feedbackPara.textContent = 'Correct Order! Well Done!';
        feedbackPara.className = 'feedback-correct'; // Assign class for potential styling
        dom.miniGameArea.querySelector('button').disabled = true;
        dom.miniGameArea.querySelectorAll('.draggable-item').forEach(item => item.draggable = false);
        setTimeout(nextQuestion, 2000); // Use imported function
    } else {
        feedbackPara.textContent = 'Some items are not in the correct order. Try rearranging them!';
        feedbackPara.className = 'feedback-incorrect'; // Assign class for potential styling
    }
}