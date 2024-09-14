const inputBorder = document.querySelectorAll('input')
const mortgageAmount = document.getElementById('mortgageAmount')
const unitLabel = document.querySelectorAll('.unit-label')
const button = document.querySelector('button')
const clearAll = document.getElementById('clearAll')


/* ## Clear All ## */ 
clearAll.addEventListener('click', (e) => {
    window.location.reload();
})

/* ## Input Amount ## */
function amountMove() {
    unitLabel[0].style.backgroundColor = '#D9DB31';
    inputBorder[0].style.border = '1px solid #d7da2f';
    unitLabel[0].style.color = '#6b94a8';
}

function amountOut() {
    unitLabel[0].style.backgroundColor = '#E3F4FC';
    inputBorder[0].style.border = '1px solid #8c9aa0';
}


/* ## Input Term ## */
function termMove() {
    unitLabel[1].style.backgroundColor = '#D9DB31';
    inputBorder[1].style.border = '1px solid #d7da2f';
    unitLabel[1].style.color = '#6b94a8';
}

function termOut() {
    unitLabel[1].style.backgroundColor = '#E3F4FC';
    inputBorder[1].style.border = '1px solid #8c9aa0';
}


/* ## Input Rate ## */
function rateMove() {
    unitLabel[2].style.backgroundColor = '#D9DB31';
    inputBorder[2].style.border = '1px solid #d7da2f';
    unitLabel[2].style.color = '#6b94a8';
}

function rateOut() {
    unitLabel[2].style.backgroundColor = '#E3F4FC';
    inputBorder[2].style.border = '1px solid #8c9aa0';
}


/* ## Radio Option ## */
document.addEventListener('DOMContentLoaded', function () {
    const radios = document.querySelectorAll('input[name="mortagageType"]');
    
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            radios.forEach(r => {
                const label = r.parentElement;
                label.classList.remove('selected');
            });
            
            const selectedLabel = this.parentElement;
            selectedLabel.classList.add('selected');
        });
    });
});

/* ## Required ## */
button.addEventListener('click', (e) => {
    const amount = document.getElementById('mortgageAmount').value;
    const term = document.getElementById('term').value
    const rate = document.getElementById('rate').value
    const required = document.querySelectorAll('.required')


    /* ## Field is Required ## */
    if(amount === "") {
        required[0].style.display = 'block';
        unitLabel[0].style.backgroundColor = '#D63526';
        unitLabel[0].style.color = '#ffffff';
        inputBorder[0].style.border = '1px solid #ff0000';
    } else { 
        required[0].style.display = 'none';
        unitLabel[0].style.color = '#6b94a8';
    }

    if(term === "") {
        required[1].style.display = 'block';
        unitLabel[1].style.backgroundColor = '#D63526';
        unitLabel[1].style.color = '#ffffff';
        inputBorder[1].style.border = '1px solid #ff0000';
    } else { 
        required[1].style.display = 'none';
        unitLabel[1].style.color = '#6b94a8';
    }

    if(rate === "") {
        required[2].style.display = 'block';
        unitLabel[2].style.backgroundColor = '#D63526';
        unitLabel[2].style.color = '#ffffff';
        inputBorder[2].style.border = '1px solid #ff0000';
    } else { 
        required[2].style.display = 'none';
        unitLabel[2].style.color = '#6b94a8';
    }

    if(!document.getElementById("repayment").checked && !document.getElementById("interestOnly").checked) {
        required[3].style.display = 'block';
    } else { 
        required[3].style.display = 'none';
    }
})


/* ## Button Submit ## */
document.addEventListener('submit', (e) => {

    e.preventDefault();

    const amount = document.getElementById('mortgageAmount').value;
    const term = document.getElementById('term').value
    const rate = document.getElementById('rate').value
    const monthlyValue = document.getElementById('monthlyValue')
    const totalRepay = document.getElementById('totalRepay')


    function calcularParcelaMensal(amount, rate, term) {
        // Conversão da taxa anual para a taxa mensal
        rate = rate / 100 / 12;
    
        // Número total de pagamentos (meses)
        term = term * 12;
    
        // Aplicação da fórmula de amortização
        let parcelaMensal = amount * (rate * Math.pow(1 + rate, term)) / 
                            (Math.pow(1 + rate, term) - 1);
    
        return parcelaMensal;
    }
    
    
    let parcela = calcularParcelaMensal(amount, rate, term);
    let total = (parcela) * (term * 12)

    parcela = parcela.toLocaleString("en-US", {style: "currency", currency: "USD"});
    total = total.toLocaleString("en-US", {style: "currency", currency: "USD"});

    monthlyValue.innerHTML = `£${parcela.slice(1)}`
    totalRepay.innerHTML = `£${total.slice(1)}`

    

    if(monthlyValue !== "") {

        const empty = document.querySelector('.empty')
        const results = document.querySelector('.results')

        empty.classList.remove('active')
        results.classList.add('active')
    }

    

})



