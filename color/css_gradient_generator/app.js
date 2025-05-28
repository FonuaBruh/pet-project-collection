document.addEventListener('DOMContentLoaded', function() {
    const gradientPreview = document.getElementById('gradientPreview');
    const gradientType = document.getElementById('gradientType');
    const angle = document.getElementById('angle');
    const angleValue = document.getElementById('angleValue');
    const colorStops = document.getElementById('colorStops');
    const addColorBtn = document.getElementById('addColor');
    const cssCode = document.getElementById('cssCode');
    const copyCodeBtn = document.getElementById('copyCode');

    const initialColors = [
        { color: '#ff0000', position: 0 },
        { color: '#0000ff', position: 100 }
    ];

    function updateGradient() {
        const stops = Array.from(document.querySelectorAll('.color-stop')).map(stop => {
            return {
                color: stop.querySelector('input[type="color"]').value,
                position: parseInt(stop.querySelector('input[type="range"]').value)
            };
        });

        let gradient;
        if (gradientType.value === 'linear') {
            gradient = `linear-gradient(${angle.value}deg, ${stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`;
        } else {
            gradient = `radial-gradient(circle, ${stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`;
        }

        gradientPreview.style.background = gradient;
        cssCode.value = `background: ${gradient};`;
    }

    function addColorStop(color = '#00ff00', position = 50) {
        const stopElement = document.createElement('div');
        stopElement.className = 'color-stop';
        
        stopElement.innerHTML = `
            <input type="color" value="${color}">
            <input type="range" min="0" max="100" value="${position}">
            <span class="position-value">${position}%</span>
            <button class="remove-color">×</button>
        `;
        
        colorStops.appendChild(stopElement);
        
        const colorInput = stopElement.querySelector('input[type="color"]');
        const positionInput = stopElement.querySelector('input[type="range"]');
        const positionValue = stopElement.querySelector('.position-value');
        const removeBtn = stopElement.querySelector('.remove-color');
        
        colorInput.addEventListener('input', updateGradient);
        positionInput.addEventListener('input', function() {
            positionValue.textContent = `${this.value}%`;
            updateGradient();
        });
        
        removeBtn.addEventListener('click', function() {
            stopElement.remove();
            updateGradient();
        });
    }

    initialColors.forEach(stop => addColorStop(stop.color, stop.position));
    updateGradient();

    gradientType.addEventListener('change', updateGradient);
    angle.addEventListener('input', function() {
        angleValue.textContent = `${this.value}°`;
        updateGradient();
    });
    
    addColorBtn.addEventListener('click', function() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        addColorStop(randomColor, 50);
        updateGradient();
    });
    
    copyCodeBtn.addEventListener('click', function() {
        cssCode.select();
        document.execCommand('copy');
        
        const originalText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = 'Скопировано!';
        setTimeout(() => {
            copyCodeBtn.textContent = originalText;
        }, 2000);
    });
});