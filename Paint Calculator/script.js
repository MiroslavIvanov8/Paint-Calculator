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

document.getElementById('area-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const wallWidths = document.querySelectorAll('.wall-group .width');
    const wallHeights = document.querySelectorAll('.wall-group .height');
    const areaWidths = document.querySelectorAll('.exclude-area-group .width');
    const areaHeights = document.querySelectorAll('.exclude-area-group .height');
    const checkboxEl = document.querySelector('.checkbox-input');

    let totalWallArea = 0;
    let totalExcludeArea = 0;

    for (let i = 0; i < wallWidths.length; i++) {
        const width = parseFloat(wallWidths[i].value.replace(',', '.').trim());
        const height = parseFloat(wallHeights[i].value.replace(',', '.').trim());

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            document.getElementById('result').innerText = "Please enter valid values for all walls.";
            return;
        }

        const wallArea = width * height;
        totalWallArea += wallArea;
    }

    for (let i = 0; i < areaWidths.length; i++) {
        const width = parseFloat(areaWidths[i].value.replace(',', '.').trim());
        const height = parseFloat(areaHeights[i].value.replace(',', '.').trim());

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            continue;
        }

        const excludeArea = width * height;
        totalExcludeArea += excludeArea;
    }

    const coats = parseInt(document.getElementById('coats').value);
    const litersPerSqM = 0.1;

    if (isNaN(coats) || coats < 1 || litersPerSqM <= 0) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    const totalAreaPerCoat = totalWallArea - totalExcludeArea;

    if (totalAreaPerCoat <= 0) {
        document.getElementById('result').innerText = "Excluded areas cannot be greater than the total wall area.";
        return;
    }

    const totalArea = totalAreaPerCoat * coats;
    let totalLiters = totalArea * litersPerSqM;

    if (checkboxEl.checked) {
        totalLiters += totalLiters * 0.10;
    }

    checkboxEl.addEventListener('click', () => {
        if (checkboxEl.checked) {
            totalLiters += totalLiters * 0.10;
        } else {
            totalLiters -= totalLiters * 0.10;
        }
        appendResultText(totalLiters, totalAreaPerCoat, litersPerSqM, checkboxEl.checked);
    });

    appendResultText(totalLiters, totalAreaPerCoat, litersPerSqM, checkboxEl.checked);
});

function appendResultText(totalLiters, totalAreaPerCoat, litersPerSqM, isCheckboxChecked) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    const roundedLiters = Math.ceil(totalLiters * 10) / 10;
    const litersText = document.createElement('p');
    litersText.textContent = `You will need ${roundedLiters} litres of paint`;

    const areaText = document.createElement('p');
    areaText.textContent = isCheckboxChecked ?
        `Based on your total area of ${totalAreaPerCoat.toFixed(2)}m² and +10% extra material.` :
        `Based on your total area of ${totalAreaPerCoat.toFixed(2)}m².`;

    const coverageText = document.createElement('p');
    coverageText.textContent = `This is based on a coverage of ${(1 / litersPerSqM).toFixed(2)}m² per litre of paint. Always check the coverage on the tin before buying.`;

    const extraText = document.createElement('p');
    extraText.textContent = `+10% Our calculation may include more than 10% as we round up to whole tins.`;

    resultElement.appendChild(litersText);
    resultElement.appendChild(areaText);
    resultElement.appendChild(coverageText);
    resultElement.appendChild(extraText);
}

function updateWallNumbers() {
    const wallGroups = document.querySelectorAll('.wall-group');
    wallGroups.forEach((group, index) => {
        const wallNumberText = group.querySelector('p strong');
        wallNumberText.textContent = `Wall ${index + 1}`;
    });
}

function updateAreaNumbers() {
    const areaGroups = document.querySelectorAll('.exclude-area-group');
    areaGroups.forEach((group, index) => {
        const areaNumberText = group.querySelector('p strong');
        areaNumberText.textContent = `Area ${index + 1}`;
    });
}
