/************************************************
Gurbakhash Sandhu
Project 7 - Interactive Form

v1 - 12-15-21

v2 - ???
*************************************************/

const nameField = document.getElementById('name');
// puts the focus effect on the Name input field when page loads
nameField.focus();

const fieldDiv = document.getElementById('activities-box');
const label = fieldDiv.children;

const otherJob = document.getElementById('other-job-role');
otherJob.style.display = 'none';

const jobRole = document.getElementById('title');

/**
 * displays an input field for user to type in a specifc if 
 * they chose "other" for the Job Role field
 */
jobRole.addEventListener('change',(e)=>{
    const roleSelected = e.target.value;
    if(roleSelected === 'other'){
        otherJob.style.display = '';
    }
    else{
        otherJob.style.display = 'none';
    }
});

const color = document.getElementById('color');
//disables the color input field by default 
color.disabled = true;


const designs = document.getElementById('design');

/**
 * targets the design field and changes the color avaiblity for shirts depending
 * on the design that is chosen by the user
 */
designs.addEventListener('change',(e)=>{
    const designChoice = e.target.value;
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
// sets initial cost for total
let totalCost = 0;

/**
 * checks for changes to the activities and updates price total when the user
 *  selects or deselects a workshop 
 * If the user selects a workshop that has a schedule conflict with other workshops, 
 * the other workshops will be disabled  
 */
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

/**
 * checks to see what the payment the user will be using and displays that information 
 * for that payment type and hides all others
 */
payWith.addEventListener('change',(e)=>{
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

/**
 * this is the same for the following 6 arrow functions
 * @param {input field} name - takes in an input field and checks if its value matches the regex function
 * @returns - true or false 
 */
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

/**
 * `errorCatching`
 * function that allows you to easily adjust when error messages are shown for selected 
 * input field
 * @param {input field} field - input field for which you want to target 
 * @param {text} classType - choose class that you want parent of input field to have
 * @param {text} displayType - choose whether you wouyld like the last element of the parent element to be displayed
 * 
 */
const errorCatching = (field,classType = 'not-valid',displayType = 'initial') => {
    field.parentElement.className = classType;
    field.parentElement.lastElementChild.style.display = displayType;
}


const form = document.getElementsByClassName('container')[0].children[0];

/**
 * form validation
 * checks if certain user input fields meet the requirments when user attempts to submit
 * form and if not all input fields meet the requirments, provides the user with an error 
 * for which ones need to be fixed
 */
form.addEventListener('submit',(e)=>{
    /**
     * gives the credit card number, zipcode, and cvv input fields for when the user is 
     * using paypal or bitcoin so that they will pass the form validation
     */
    if (payWith.value === 'paypal' || payWith.value === 'bitcoin') {
        cardNumberInput.value = '1234567890123456';
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
            errorCatching(nameField);
        }
        else if (names) {
            errorCatching(nameField,'valid','');
        }
        if(!emails && emailInput.value === ''){
            errorCatching(emailInput);
            emailInput.parentElement.lastElementChild.previousElementSibling.style.display = '';   
        }
        else if (!emails) {
            errorCatching(emailInput,undefined,'');
            emailInput.parentElement.lastElementChild.previousElementSibling.style.display = 'initial';
        }
        else if (emails){
            errorCatching(emailInput,'valid','');
            emailInput.parentElement.lastElementChild.previousElementSibling.style.display = ''; 
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
                errorCatching(cardNumberInput);
            }
            else if (cardNumbers) {
                errorCatching(cardNumberInput,'valid','');
            }

            if (!zipCodes) {
                errorCatching(zipCode);
            }
            else if (zipCodes) {
                errorCatching(zipCode,'valid','');
            }

            if (!cvvS) {
                errorCatching(cvv);
            }
            else if (cvvS) {
                errorCatching(cvv,'valid','');
            }
        }
    }
});


/**
 * applies a focus & blur effects to the 7 activites that can be registered for based
 * on where the user is currently tabbed on or last clicked. 
 * This is to help with accessibility
 */
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

/**
 * gives the user live error messages for the card number input field  
 */
cardNumberInput.addEventListener('keyup',(e)=>{
    const cardNumbers = cardNumberInputRegex(cardNumberInput);
    if (!cardNumbers) {
        errorCatching(cardNumberInput);
    }
    else if (cardNumbers) {
        errorCatching(cardNumberInput,'valid','');
    }
})