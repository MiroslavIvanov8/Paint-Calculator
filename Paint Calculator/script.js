document.getElementById('add-wall').addEventListener('click', function() {
    const wallsContainer = document.getElementById('walls-container');

    const newWallGroup = document.createElement('div');
    newWallGroup.className = 'input-group wall-group';

    // Create Width Input
    const widthLabel = document.createElement('label');
    widthLabel.textContent = 'Width (meters):';
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.name = 'width';
    widthInput.className = 'width';
    widthInput.step = '0.01';
    widthInput.required = true;

    // Create Height Input
    const heightLabel = document.createElement('label');
    heightLabel.textContent = 'Height (meters):';
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.name = 'height';
    heightInput.className = 'height';
    heightInput.step = '0.01';
    heightInput.required = true;

    // Append all elements to the newWallGroup
    newWallGroup.appendChild(widthLabel);
    newWallGroup.appendChild(widthInput);
    newWallGroup.appendChild(heightLabel);
    newWallGroup.appendChild(heightInput);

    // Append the newWallGroup to the wallsContainer
    wallsContainer.appendChild(newWallGroup);
});

document.getElementById('area-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const widths = document.querySelectorAll('.width');
    const heights = document.querySelectorAll('.height');

    let totalWallArea = 0;

    for (let i = 0; i < widths.length; i++) {
        const width = parseFloat(widths[i].value.replace(',', '.'));
        const height = parseFloat(heights[i].value.replace(',', '.'));

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            document.getElementById('result').innerText = "Please enter valid values for all walls.";
            return;
        }

        // Calculate wall area for each wall
        const wallArea = width * height;

        totalWallArea += wallArea;
    }

    const excludeArea = parseFloat(document.getElementById('exclude-area').value.replace(',', '.'));
    const coats = parseInt(document.getElementById('coats').value);
    const litersPerSqM = parseFloat(document.getElementById('liters-per-sqm').value.replace(',', '.'));

    if (isNaN(excludeArea) || isNaN(coats) || isNaN(litersPerSqM) || excludeArea < 0 || coats < 1 || litersPerSqM <= 0) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    // Total area to paint excluding windows/doors
    const totalAreaPerCoat = totalWallArea - excludeArea;

    // Total area for all coats
    const totalArea = totalAreaPerCoat * coats;

    // Calculate total liters of paint needed
    let totalLiters = totalArea * litersPerSqM;

    // Add 10% extra material
    totalLiters += totalLiters * 0.1;

    // Clear previous results
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    // Create elements to display the results
    const litersText = document.createElement('p');
    litersText.textContent = `You will need ${totalLiters.toFixed(2)} litres of paint`;

    const areaText = document.createElement('p');
    areaText.textContent = `Based on your total area of ${totalArea.toFixed(2)}m² and +10% extra material.`;

    const coverageText = document.createElement('p');
    coverageText.textContent = `This is based on a coverage of ${(1 / litersPerSqM).toFixed(2)}m² per litre of paint. Always check the coverage on the tin before buying.`;

    const extraText = document.createElement('p');
    extraText.textContent = `+10% Our calculation may include more than 10% as we round up to whole tins.`;

    // Append the result elements to the result container
    resultElement.appendChild(litersText);
    resultElement.appendChild(areaText);
    resultElement.appendChild(coverageText);
    resultElement.appendChild(extraText);
});
