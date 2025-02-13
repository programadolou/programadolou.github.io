function revealText(noteElement) {
    let text = noteElement.querySelector(".hidden-text");

    if (!noteElement.classList.contains("open")) {
        noteElement.classList.add("open");
        text.style.display = "block"; // Ensure text is visible
        text.innerHTML = ""; // Reset text before typing animation

        typeText(text, () => {
            // Ensure the note expands to fit its content dynamically
            noteElement.style.height = text.scrollHeight + 40 + "px"; 
        });
        
    } else {
        noteElement.classList.remove("open");
        text.style.display = "none"; // Hide text when closing
        noteElement.style.height = "50px"; // Shrink back
    }
}

function typeText(element, callback) {
    let text = element.getAttribute("data-fulltext");
    element.innerHTML = ""; // Clear existing text before typing
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50); // Adjust speed of typing
        } else {
            if (callback) callback(); // Execute callback to adjust height
        }
    }

    type();
}
