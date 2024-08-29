document.getElementById('add-wall').addEventListener('click', function () {
    const wallsContainer = document.getElementById('walls-container');
    const wallGroups = document.querySelectorAll('.wall-group');
    const wallNumber = wallGroups.length + 1;

    const newWallGroup = document.createElement('div');
    newWallGroup.className = 'input-group wall-group';

    const wallNumberText = document.createElement('p');
    wallNumberText.innerHTML = `<strong>Wall ${wallNumber}</strong>`;

    const flexboxContainer = document.createElement('div');
    flexboxContainer.className = 'flexbox-container';

    const widthLabel = document.createElement('label');
    widthLabel.textContent = 'Width';
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.name = 'width';
    widthInput.className = 'width';
    widthInput.step = '0.01';
    widthInput.required = true;

    const widthUnitLabel = document.createElement('span');
    widthUnitLabel.className = 'unit-label';
    widthUnitLabel.textContent = getCurrentUnit();

    const heightLabel = document.createElement('label');
    heightLabel.textContent = 'Height';
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.name = 'height';
    heightInput.className = 'height';
    heightInput.step = '0.01';
    heightInput.required = true;

    const heightUnitLabel = document.createElement('span');
    heightUnitLabel.className = 'unit-label';
    heightUnitLabel.textContent = getCurrentUnit();

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', function () {
        wallsContainer.removeChild(newWallGroup);
        updateWallNumbers();
    });

    flexboxContainer.appendChild(widthLabel);
    flexboxContainer.appendChild(widthInput);
    flexboxContainer.appendChild(widthUnitLabel);
    flexboxContainer.appendChild(heightLabel);
    flexboxContainer.appendChild(heightInput);
    flexboxContainer.appendChild(heightUnitLabel);
    flexboxContainer.appendChild(deleteButton);

    newWallGroup.appendChild(wallNumberText);
    newWallGroup.appendChild(flexboxContainer);
    wallsContainer.appendChild(newWallGroup);
});

document.getElementById('add-area').addEventListener('click', function () {
    const areasContainer = document.getElementById('areas-container');
    const areaGroups = document.querySelectorAll('.exclude-area-group');
    const areaNumber = areaGroups.length + 1;

    const newAreaGroup = document.createElement('div');
    newAreaGroup.className = 'input-group exclude-area-group';

    const areaNumberText = document.createElement('p');
    areaNumberText.innerHTML = `<strong>Area ${areaNumber}</strong>`;

    const flexboxContainer = document.createElement('div');
    flexboxContainer.className = 'flexbox-container';

    const widthLabel = document.createElement('label');
    widthLabel.textContent = 'Width';
    const widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.name = 'width';
    widthInput.className = 'width';
    widthInput.step = '0.01';
    widthInput.required = true;

    const widthUnitLabel = document.createElement('span');
    widthUnitLabel.className = 'unit-label';
    widthUnitLabel.textContent = getCurrentUnit();

    const heightLabel = document.createElement('label');
    heightLabel.textContent = 'Height';
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.name = 'height';
    heightInput.className = 'height';
    heightInput.step = '0.01';
    heightInput.required = true;

    const heightUnitLabel = document.createElement('span');
    heightUnitLabel.className = 'unit-label';
    heightUnitLabel.textContent = getCurrentUnit();

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', function () {
        areasContainer.removeChild(newAreaGroup);
        updateAreaNumbers();
    });

    flexboxContainer.appendChild(widthLabel);
    flexboxContainer.appendChild(widthInput);
    flexboxContainer.appendChild(widthUnitLabel);
    flexboxContainer.appendChild(heightLabel);
    flexboxContainer.appendChild(heightInput);
    flexboxContainer.appendChild(heightUnitLabel);
    flexboxContainer.appendChild(deleteButton);

    newAreaGroup.appendChild(areaNumberText);
    newAreaGroup.appendChild(flexboxContainer);
    areasContainer.appendChild(newAreaGroup);
});

document.getElementById('area-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const wallWidths = document.querySelectorAll('.wall-group .width');
    const wallHeights = document.querySelectorAll('.wall-group .height');
    const areaWidths = document.querySelectorAll('.exclude-area-group .width');
    const areaHeights = document.querySelectorAll('.exclude-area-group .height');
    const checkboxEl = document.querySelector('.checkbox-input');
    
    // Determine the selected unit system
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
    const isMetric = selectedUnit === 'metric';

    // Define conversion factors
    const coveragePerLiterSqM = 10; // 1 liter covers 10 square meters (for metric)
    const coveragePerGallonSqFt = 350; // 1 gallon covers 350 square feet (for imperial)

    let totalWallArea = 0;
    let totalExcludeArea = 0;

    for (let i = 0; i < wallWidths.length; i++) {
        let width = parseFloat(wallWidths[i].value.replace(',', '.').trim());
        let height = parseFloat(wallHeights[i].value.replace(',', '.').trim());

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            document.getElementById('result').innerText = "Please enter valid values for all walls.";
            return;
        }

        // Keep dimensions in square feet if using imperial units
        if (isMetric) {
            // No conversion needed; keep dimensions in feet
        } else {
            // Convert dimensions to meters if using metric
            width *= 0.3048; // Convert feet to meters
            height *= 0.3048; // Convert feet to meters
        }

        const wallArea = width * height;
        totalWallArea += wallArea;
    }

    for (let i = 0; i < areaWidths.length; i++) {
        let width = parseFloat(areaWidths[i].value.replace(',', '.').trim());
        let height = parseFloat(areaHeights[i].value.replace(',', '.').trim());

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            continue; // Skip invalid entries
        }

        if (isMetric) {
            // No conversion needed; keep dimensions in feet
        } else {
            // Convert dimensions to meters if using metric
            width *= 0.3048;
            height *= 0.3048;
        }

        const excludeArea = width * height;
        totalExcludeArea += excludeArea;
    }

    const coats = parseInt(document.getElementById('coats').value);

    if (isNaN(coats) || coats < 1) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    // Total area to paint excluding areas
    const totalAreaPerCoat = totalWallArea - totalExcludeArea;

    if (totalAreaPerCoat <= 0) {
        document.getElementById('result').innerText = "Excluded areas cannot be greater than the total wall area.";
        return;
    }

    // Total area for all coats
    const totalArea = totalAreaPerCoat * coats;

    let totalPaintNeeded;

    // Calculate total paint needed based on the unit system
    if (isMetric) {
        // Calculate paint in liters for metric system
        totalPaintNeeded = totalArea / coveragePerLiterSqM;
    } else {
        // Calculate paint in gallons for imperial system
        totalPaintNeeded = totalArea / coveragePerGallonSqFt;
    }

    // Add 10% extra material if checkbox is checked
    if (checkboxEl.checked) {
        totalPaintNeeded += totalPaintNeeded * 0.10;
    }

    checkboxEl.addEventListener('click', (e) => {
        if(checkboxEl.checked){
            appendResultText(totalPaintNeeded + totalPaintNeeded * 0.10, totalAreaPerCoat, isMetric, checkboxEl.checked);
        } else {
            appendResultText(totalPaintNeeded, totalAreaPerCoat, isMetric,  checkboxEl.checked);
        }
    })

    appendResultText(totalPaintNeeded, totalAreaPerCoat, isMetric, checkboxEl.checked);
});

const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        
        function deleteChildren(className){
            const wallsGroup = document.querySelectorAll(`.${className}`);
            const widthInput = wallsGroup[0].querySelector('.flexbox-container input[name=width]');
            const heightInput = wallsGroup[0].querySelector('.flexbox-container input[name=height]');
    
            widthInput.value = '';
            heightInput.value = '';;
            
            for (let i = 1; i < wallsGroup.length; i++) {                
                wallsGroup[i].remove();            
            }        
        }

        const wallGroup = (e.target.closest('.wall-group'));
        const excludeGroup = (e.target.closest('.exclude-area-group')); 
        
        
        const currentTargetParent = e.target.parentNode.parentNode
        if(currentTargetParent === wallGroup){
            deleteChildren(wallGroup.classList[1]);
        } else {
            deleteChildren(excludeGroup.classList[1]);
        }
        
    })
})


const radioButtons = document.querySelectorAll('input[name="unit"]');
radioButtons.forEach((button) => {
    button.addEventListener('change', () => {
        const selectedValue = document.querySelector('input[name="unit"]:checked').value;
        updateUnitLabels(selectedValue);
    });
});

// Function to get the current selected unit
function getCurrentUnit() {
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
    return selectedUnit === 'metric' ? 'm' : 'ft';
}

// Function to update all unit labels on the page
function updateUnitLabels(selectedUnit) {
    const unitLabels = document.querySelectorAll('.unit-label');
    unitLabels.forEach(label => {
        label.textContent = selectedUnit === 'metric' ? 'm' : 'ft';
    });
}

//function to append the result text
function appendResultText(totalPaintNeeded, totalAreaPerCoat, isMetric, isExtraIncluded) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    const roundedPaintNeeded = Math.ceil(totalPaintNeeded * 10) / 10;
    const paintText = document.createElement('p');
    paintText.textContent = `You will need ${roundedPaintNeeded} ${isMetric ? 'litres' : 'gallons'} of paint${isExtraIncluded ? ' with +10% extra material.' : '.'}`;

    const areaText = document.createElement('p');
    areaText.textContent = `Based on your total area of ${totalAreaPerCoat.toFixed(2)} ${isMetric ? 'm²' : 'ft²'} per coat.`;

    const coverageText = document.createElement('p');
    coverageText.textContent = `This is based on a coverage of ${(isMetric ? 10 : 350)} ${isMetric ? 'm² per litre' : 'ft² per gallon'} of paint. Always check the coverage on the tin before buying.`;

    resultElement.appendChild(paintText);
    resultElement.appendChild(areaText);
    resultElement.appendChild(coverageText);

    
}

//function to append correct numbers to new walls 
function updateWallNumbers() {
    const wallGroups = document.querySelectorAll('.wall-group');
    wallGroups.forEach((group, index) => {
        const wallNumberText = group.querySelector('p strong');
        wallNumberText.textContent = `Wall ${index + 1}`;
    });
}

//function to append correct numbers to new exclude areas
function updateAreaNumbers() {
    const areaGroups = document.querySelectorAll('.exclude-area-group');
    areaGroups.forEach((group, index) => {
        const areaNumberText = group.querySelector('p strong');
        areaNumberText.textContent = `Area ${index + 1}`;
    });
}
