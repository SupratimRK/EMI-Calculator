function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value) || 0;

    if (isNaN(loanAmount) || isNaN(interestRate) || loanTerm === 0) {
        alert('Please enter valid input values.');
        return;
    }

    const monthlyInterestRate = interestRate / (12 * 100);
    const numberOfPayments = loanTerm;
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = emi * loanTerm;
    const principalAmount = loanAmount;
    const interestPaid = totalPayment - principalAmount;

    displayResult(emi.toFixed(2), principalAmount.toFixed(2), interestPaid.toFixed(2));
    displayChart(principalAmount, interestPaid);
}

function displayResult(emi, principalAmount, interestPaid) {
    const resultContainer = document.getElementById('result');
    const formattedEMI = formatCurrency(emi);
    const formattedPrincipal = formatCurrency(principalAmount);
    const formattedInterest = formatCurrency(interestPaid);

    const resultText = `
        <p>Principal Amount: <b>₹${formattedPrincipal}</b></p>
        <p>EMI Amount: <b>₹${formattedEMI}</b></p>
        <p>Interest Paid: <b>₹${formattedInterest}</b></p>
        <p>Made with 💙 by Supratim</p>
    `;

    resultContainer.innerHTML = resultText;
    resultContainer.style.display = 'block';
}

function displayChart(principalAmount, interestPaid) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal Amount', 'Interest Paid'],
            datasets: [{
                data: [principalAmount, interestPaid],
                backgroundColor: ['#b1f202', '#00aeff'],
            }],
        },
    });
}

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
