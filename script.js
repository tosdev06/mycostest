function calculateCost() {
    // Get all input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const features = document.getElementById('features').value.trim();
    const pages = document.getElementById('pages').value.trim();
    const complexity = document.getElementById('complexity').value.trim();

    const frontendHours = document.getElementById('frontend-dev-hours').value.trim();
    const backendHours = document.getElementById('backend-dev-hours').value.trim();
    const designerHours = document.getElementById('designer-hours').value.trim();
    const qaHours = document.getElementById('qa-tester-hours').value.trim();
    const managerHours = document.getElementById('project-manager-hours').value.trim();

    const frontendRate = document.getElementById('frontend-rate').value.trim();
    const backendRate = document.getElementById('backend-rate').value.trim();
    const designerRate = document.getElementById('designer-rate').value.trim();
    const qaRate = document.getElementById('qa-rate').value.trim();
    const managerRate = document.getElementById('manager-rate').value.trim();

    const domainHosting = document.getElementById('domain-hosting').value.trim();
    const maintenance = document.getElementById('maintenance').value.trim();

    // Validate input fields
    if (!name || !email || !features || !pages || !complexity ||
        !frontendHours || !backendHours || !designerHours || !qaHours || !managerHours ||
        !frontendRate || !backendRate || !designerRate || !qaRate || !managerRate ||
        !domainHosting || !maintenance) {
        alert('Please fill in all fields.');
        return;
    }

    // Calculate costs
    const frontendCost = frontendHours * frontendRate;
    const backendCost = backendHours * backendRate;
    const designerCost = designerHours * designerRate;
    const qaCost = qaHours * qaRate;
    const managerCost = managerHours * managerRate;

    const developmentCost = frontendCost + backendCost + designerCost + qaCost + managerCost;
    const additionalCost = parseFloat(domainHosting) + parseFloat(maintenance);

    const totalCost = developmentCost + additionalCost;

    // Display the total cost
    document.getElementById('total-cost').textContent = '$' + totalCost.toFixed(2);
    
    // Display the result table
    const resultTableBody = document.getElementById('result-table').getElementsByTagName('tbody')[0];
    resultTableBody.innerHTML = `
        <tr><td>Name</td><td>${name}</td></tr>
        <tr><td>Email</td><td>${email}</td></tr>
        <tr><td>Features and Functionality</td><td>${features}</td></tr>
        <tr><td>Number of Pages</td><td>${pages}</td></tr>
        <tr><td>Complexity</td><td>${complexity}</td></tr>
        <tr><td>Front-end Developer Hours</td><td>${frontendHours}</td></tr>
        <tr><td>Back-end Developer Hours</td><td>${backendHours}</td></tr>
        <tr><td>Designer Hours</td><td>${designerHours}</td></tr>
        <tr><td>QA Tester Hours</td><td>${qaHours}</td></tr>
        <tr><td>Project Manager Hours</td><td>${managerHours}</td></tr>
        <tr><td>Front-end Developer Rate</td><td>$${frontendRate}/hour</td></tr>
        <tr><td>Back-end Developer Rate</td><td>$${backendRate}/hour</td></tr>
        <tr><td>Designer Rate</td><td>$${designerRate}/hour</td></tr>
        <tr><td>QA Tester Rate</td><td>$${qaRate}/hour</td></tr>
        <tr><td>Project Manager Rate</td><td>$${managerRate}/hour</td></tr>
        <tr><td>Domain and Hosting Cost</td><td>$${domainHosting}/year</td></tr>
        <tr><td>Maintenance Cost</td><td>$${maintenance}/year</td></tr>
    `;

    document.getElementById('result').classList.remove('hidden');
}

function downloadPDF() {
    const name = document.getElementById('name').value.trim();
    
    // Check if the result is already displayed
    if (document.getElementById('result').classList.contains('hidden')) {
        alert('Please estimate the cost before downloading the PDF.');
        return;
    }

    const resultContainer = document.getElementById('result');

    // Create a canvas including the company header
    html2canvas(resultContainer).then(canvas => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 size
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        // Add company header to the PDF
        const headerImgHeight = 40; // Adjust height as needed
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        
        // Save the PDF with user's name
        pdf.save(`${name}_cost_estimation.pdf`);
    });
}

