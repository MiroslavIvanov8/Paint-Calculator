document.getElementById('area-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values and normalize them
    const length = parseFloat(document.getElementById('length').value.replace(',', '.'));
    const width = parseFloat(document.getElementById('width').value.replace(',', '.'));
    const height = parseFloat(document.getElementById('height').value.replace(',', '.'));
    const coats = parseInt(document.getElementById('coats').value);

    if(isNaN(length) || isNaN(width) || isNaN(height) || isNaN(coats) || length <= 0 || width <= 0 || height <= 0 || coats < 1) {
        document.getElementById('result').innerText = "Please enter valid dimensions and select the number of coats.";
        return;
    }

    // Calculate wall area (2 * (L + W) * H)
    const wallArea = 2 * (length + width) * height;

    // Calculate ceiling area (L * W)
    const ceilingArea = length * width;

    // Total area for one coat
    const totalAreaPerCoat = wallArea + ceilingArea;

    // Total area for all coats
    const totalArea = totalAreaPerCoat * coats;

    // Display the result
    document.getElementById('result').innerText = `Total painting area for ${coats} coat(s) is ${totalArea.toFixed(2)} square meters.`;
});
