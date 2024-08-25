document.getElementById('add-wall').addEventListener('click', function() {
    const wallsContainer = document.getElementById('walls-container');
    const wallGroups = document.querySelectorAll('.wall-group');
    const wallNumber = wallGroups.length + 1;

    // Create the wall group container
    const newWallGroup = document.createElement('div');
    newWallGroup.className = 'input-group wall-group';

    // Create the Wall Number Text
    const wallNumberText = document.createElement('p');
    const wallNumberStrong = document.createElement('strong');
    wallNumberStrong.textContent = `Wall ${wallNumber}`;
    wallNumberText.appendChild(wallNumberStrong);

    // Create the flexbox container
    const flexboxContainer = document.createElement('div');
    flexboxContainer.className = 'wall-flexbox-container';

    // Create Width Input
    const widthLabel = document.createElement('label');
    widthLabel.textContent = 'Width';
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.name = 'width';
    widthInput.className = 'width';
    widthInput.step = '0.01';
    widthInput.required = true;

    // Create Height Input
    const heightLabel = document.createElement('label');
    heightLabel.textContent = 'Height';
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.name = 'height';
    heightInput.className = 'height';
    heightInput.step = '0.01';
    heightInput.required = true;

    // Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-wall';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    
    // Add event listener to delete the wall group
    deleteButton.addEventListener('click', function() {
        wallsContainer.removeChild(newWallGroup);
        updateWallNumbers(); // Update the wall numbers after deletion
    });

    // Append label, input fields, and delete button to the flexbox container
    flexboxContainer.appendChild(widthLabel);
    flexboxContainer.appendChild(widthInput);
    flexboxContainer.appendChild(heightLabel);
    flexboxContainer.appendChild(heightInput);
    flexboxContainer.appendChild(deleteButton);

    // Append the Wall Number and Flexbox Container to the new Wall Group
    newWallGroup.appendChild(wallNumberText);
    newWallGroup.appendChild(flexboxContainer);

    // Append the new Wall Group to the wallsContainer
    wallsContainer.appendChild(newWallGroup);
});

// Function to update wall numbers after a wall is deleted
function updateWallNumbers() {
    const wallGroups = document.querySelectorAll('.wall-group');
    wallGroups.forEach((group, index) => {
        const wallNumberText = group.querySelector('p strong');
        wallNumberText.textContent = `Wall ${index + 1}`;
    });
}

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
    const litersPerSqM = 0.1;

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
    resultElement.innerHTML = ''; // Clear previous results

    // Create elements to display the results
    const litersText = document.createElement('p');
    litersText.textContent = `You will need ${totalLiters.toFixed(2)} litres of paint`;

    const areaText = document.createElement('p');
    areaText.textContent = `Based on your total area of ${totalWallArea.toFixed(2)}m² and +10% extra material.`;

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
