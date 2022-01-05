const nameField = document.getElementById('name');
nameField.focus();

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



const form = document.getElementsByClassName('container')[0].children[0];

form.addEventListener('submit',(e)=>{
    const nameInput = nameField;
    const emailInput = document.getElementById('email');
    const cardNumberInput = document.getElementById('cc-num');
    const zipCode = document.getElementById('zip');
    const cvv = document.getElementById('cvv');

    if (payWith.value === 'paypal' || payWith.value === 'bitcoin') {
        cardNumberInput.value = '1234567890123';
        zipCode.value = '12345';
        cvv.value = '123';
    }
    
    const nameRegex = /^\w+$/i.test(nameInput.value);
    const emailRegex = /^\w+@\w+.com$/i.test(emailInput.value);
    const totalPriceRegex = /^Total: \$0$/.test(totalPrice.textContent);
    const cardNumberInputRegex = /^\d{13,16}$/.test(cardNumberInput.value);    
    const zipCodeRegex = /^\d{5}$/.test(zipCode.value);    
    const cvvRegex = /^\d{3}$/.test(cvv.value);

    if(!nameRegex
    || !emailRegex 
    || totalPriceRegex 
    || !cardNumberInputRegex
    || !zipCodeRegex
    || !cvvRegex
    ){
        e.preventDefault();
        alert('something is wrong');
        if(!nameRegex){
            nameField.parentElement.className = 'not-valid';
            nameField.parentElement.lastElementChild.style.display = 'initial';
        }
        else if (nameRegex) {
            nameField.parentElement.className = 'valid';
            nameField.parentElement.lastElementChild.style.display = '';
        }
        if(!emailRegex){
            emailInput.parentElement.className = 'not-valid';
            emailInput.parentElement.lastElementChild.style.display = 'initial';    
        }
        else if (emailRegex) {
            emailInput.parentElement.className = 'valid';
            emailInput.parentElement.lastElementChild.style.display = 'none';
        }
        if (totalPriceRegex) {
            field.classList.remove('valid');
            field.className += ' not-valid';
            field.lastElementChild.style.display = 'initial';
        }
        else if (!totalPriceRegex) {
            field.classList.remove('not-valid');
            field.className += ' valid';
            field.lastElementChild.style.display = '';
        }
        if (payWith.value === 'credit-card') {
            alert('credit');
            if (!cardNumberInputRegex) {
                cardNumberInput.parentElement.className = 'not-valid';
                cardNumberInput.parentElement.lastElementChild.style.display = 'initial';
            }
            else if (cardNumberInputRegex) {
                cardNumberInput.parentElement.className = 'valid';
                cardNumberInput.parentElement.lastElementChild.style.display = '';
            }

            if (!zipCodeRegex) {
                zipCode.parentElement.className = 'not-valid';
                zipCode.parentElement.lastElementChild.style.display = 'initial';
            }
            else if (zipCodeRegex) {
                zipCode.parentElement.className = 'valid';
                zipCode.parentElement.lastElementChild.style.display = '';
            }

            if (!cvvRegex) {
                cvv.parentElement.className = 'not-valid';
                cvv.parentElement.lastElementChild.style.display = 'initial';
            }
            else if (cvvRegex) {
                cvv.parentElement.className = 'valid';
                cvv.parentElement.lastElementChild.style.display = '';
            }
        }
        else{
            alert(payWith.value);
        }
    }
    else{
       alert('it worked');
    }
});

const fieldDiv = document.getElementById('activities-box');
const label = fieldDiv.children;

for(let i = 0; i < label.length; i++){
    const inputCheckbox = label[i].firstChild.nextSibling;

    inputCheckbox.addEventListener('focus',(e)=>{
    const testLabel = e.target.parentElement;
    testLabel.className = 'focus';
    });

    inputCheckbox.addEventListener('blur',(e)=>{
        const testLabel = e.target.parentElement;
        testLabel.className = '';
    });
}

// if (payWith.value === 'paypal') {
//     alert('rock ya shit');
// }

console.log(payWith.value);