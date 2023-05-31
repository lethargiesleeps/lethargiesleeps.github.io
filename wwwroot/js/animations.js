let id = null;
function fadeOut(container) {
    
    let opacity = 1.0;
    clearInterval(id);
    id = setInterval(frame, 100);
    
    function frame() {
        if(opacity == 0) {
            clearInterval(id);
        }
        else {
            opacity -= 0.02;
            container.style.opacity = opacity;
            
        }
    }

}