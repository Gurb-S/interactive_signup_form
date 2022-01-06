const nameField = document.getElementById('name');
nameField.focus();

const fieldDiv = document.getElementById('activities-box');
const label = fieldDiv.children;

const otherJob = document.getElementById('other-job-role');
otherJob.style.display = 'none';

const jobRole = document.getElementById('title');

jobRole.addEventListener('click',(e)=>{
    const roleSelected = e.target.value;
    console.log(roleSelected);
    if(roleSelected === 'other'){
        otherJob.style.display = '';
    }
    else{
        otherJob.style.display = 'none';
    }
});

const color = document.getElementById('color');
color.disabled = true;

const designs = document.getElementById('design');
designs.addEventListener('click',(e)=>{
    const designChoice = e.target.value;
    console.log(e.target);
    const options = color.children;
    color.value = 'Select a design theme above';
    if(designChoice === 'js puns'){
        for(let i = 1;i < 7; i++){
            if(i <= 3){
                options[i].style.display = '';
                color.disabled = false;
            }
            else if(i >= 4){
                options[i].style.display = 'none';
                color.disabled = false;
            }   
        }
    }
    else if(designChoice === 'heart js'){
        for(let i = 1;i < 7; i++){
            if(i <= 3){
                options[i].style.display = 'none';
                color.disabled = false;
            }
            else if(i >= 4){
                options[i].style.display = '';
                color.disabled = false;
            }   
        }
    }
});

const field = document.getElementById('activities');
const totalPrice = document.getElementById('activities-cost');
let totalCost = 0;

field.addEventListener('change',(e)=>{
    const costAsString = e.target.dataset.cost;
    const costInt = parseInt(costAsString);
    const checkbox = e.target.checked;
    if(checkbox){
        totalCost += costInt;
    }
    else if(!checkbox && totalPrice.textContent !== 'Total: $0'){
        totalCost -= costInt;
    }
    console.log(e.target.dataset.dayAndTime);
    const dateReal = e.target.dataset.dayAndTime;
    const allSameDates = [];
    for(let i = 1; i < label.length; i++){
        const inputCheckbox = label[i].firstChild.nextSibling;
        const date = inputCheckbox.dataset.dayAndTime;
        if (checkbox && dateReal === date && !inputCheckbox.checked) {
            allSameDates.push(inputCheckbox.parentElement);
            for(let i = 0; i < allSameDates.length; i++){
                allSameDates[i].className = 'disabled';
                inputCheckbox.disabled = 'true';
            }
        }
        if (!checkbox && dateReal === date) {
            inputCheckbox.parentElement.className = '';
            inputCheckbox.disabled = '';
        }
    }
    totalPrice.textContent = `Total: $${totalCost}`;
});

const payWith = document.getElementById('payment');
payWith.value = 'credit-card';

const creditCardInfo = document.getElementById('credit-card');

const paypal = document.getElementById('paypal');
paypal.style.display = 'none';

const bitcoin = document.getElementById('bitcoin');
bitcoin.style.display = 'none';

payWith.addEventListener('click',(e)=>{
    const paymentChoice = e.target.value;
    if(paymentChoice === 'credit-card'){
        creditCardInfo.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
    else if(paymentChoice === 'paypal'){
        creditCardInfo.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
    }
    else if(paymentChoice === 'bitcoin'){
        creditCardInfo.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
    }
});


const nameRegex = name => /^\w+$/i.test(name.value);
const emailRegex = email => /^\w+@\w+.com$/i.test(email.value);
const totalPriceRegex = price => /^Total: \$0$/.test(price.textContent);
const cardNumberInputRegex = cardNumber => /^\d{13,16}$/.test(cardNumber.value);
const zipCodeRegex = zipCode =>/^\d{5}$/.test(zipCode.value);
const cvvRegex = cvvS => /^\d{3}$/.test(cvvS.value);

const nameInput = nameField;
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

const form = document.getElementsByClassName('container')[0].children[0];

form.addEventListener('submit',(e)=>{

    if (payWith.value === 'paypal' || payWith.value === 'bitcoin') {
        cardNumberInput.value = '1234567890123';
        zipCode.value = '12345';
        cvv.value = '123';
    }

    const names = nameRegex(nameInput);
    const emails = emailRegex(emailInput);
    const prices = totalPriceRegex(totalPrice);
    const cardNumbers = cardNumberInputRegex(cardNumberInput);
    const zipCodes = zipCodeRegex(zipCode);
    const cvvS = cvvRegex(cvv);

    if(!names
    || !emails
    || prices 
    || !cardNumbers
    || !zipCodeRegex
    || !cvvS
    ){
        e.preventDefault();
        if(!names){
            nameField.parentElement.className = 'not-valid';
            nameField.parentElement.lastElementChild.style.display = 'initial';
        }
        else if (names) {
            nameField.parentElement.className = 'valid';
            nameField.parentElement.lastElementChild.style.display = '';
        }
        if(!emails && emailInput.value === ''){
            emailInput.parentElement.className = 'not-valid';
            emailInput.parentElement.lastElementChild.style.display = 'initial'; 
            emailInput.parentElement.lastElementChild.previousElementSibling.style.display = 'none';   
        }
        else if (!emails) {
            emailInput.parentElement.className = 'not-valid';
            emailInput.parentElement.lastElementChild.previousElementSibling.style.display = 'initial';
            emailInput.parentElement.lastElementChild.style.display = 'none';
        }
        else if (emails){
            emailInput.parentElement.className = 'valid';
            emailInput.parentElement.lastElementChild.style.display = 'none';
            emailInput.parentElement.lastElementChild.previousElementSibling.style.display = 'none'; 
        }
        if (prices) {
            field.classList.remove('valid');
            field.className += ' not-valid';
            field.lastElementChild.style.display = 'initial';
        }
        else if (!prices) {
            field.classList.remove('not-valid');
            field.className += ' valid';
            field.lastElementChild.style.display = '';
        }
        if (payWith.value === 'credit-card') {
            if (!cardNumbers) {
                cardNumberInput.parentElement.className = 'not-valid';
                cardNumberInput.parentElement.lastElementChild.style.display = 'initial';
            }
            else if (cardNumbers) {
                cardNumberInput.parentElement.className = 'valid';
                cardNumberInput.parentElement.lastElementChild.style.display = '';
            }

            if (!zipCodes) {
                zipCode.parentElement.className = 'not-valid';
                zipCode.parentElement.lastElementChild.style.display = 'initial';
            }
            else if (zipCodes) {
                zipCode.parentElement.className = 'valid';
                zipCode.parentElement.lastElementChild.style.display = '';
            }

            if (!cvvS) {
                cvv.parentElement.className = 'not-valid';
                cvv.parentElement.lastElementChild.style.display = 'initial';
            }
            else if (cvvS) {
                cvv.parentElement.className = 'valid';
                cvv.parentElement.lastElementChild.style.display = '';
            }
        }
    }
});



for(let i = 0; i < label.length; i++){
    const inputCheckbox = label[i].firstChild.nextSibling;

    inputCheckbox.addEventListener('focus',(e)=>{
        const testLabel = e.target.parentElement;
        testLabel.className = ' focus';
    });

    inputCheckbox.addEventListener('blur',(e)=>{
        const testLabel = e.target.parentElement;
        testLabel.className = '';
    });
}

cardNumberInput.addEventListener('keyup',(e)=>{
    const cardNumbers = cardNumberInputRegex(cardNumberInput);
    if (!cardNumbers) {
        cardNumberInput.parentElement.className = 'not-valid';
        cardNumberInput.parentElement.lastElementChild.style.display = 'initial';
    }
    else if (cardNumbers) {
        cardNumberInput.parentElement.className = 'valid';
        cardNumberInput.parentElement.lastElementChild.style.display = '';
    }
})