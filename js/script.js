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
    const nameInput = nameField.value;
    const emailInput = document.getElementById('email').value;
    const cardNumberInput = document.getElementById('cc-num').value;
    const zipCode = document.getElementById('zip').value;
    const cvv = document.getElementById('cvv').value;

    const nameRegex = /^\w+$/i.test(nameInput);
    const emailRegex = /^\w+@\w+.com$/i.test(emailInput);
    const totalPriceRegex = /^Total: \$0$/.test(totalPrice.textContent);
    const cardNumberInputRegex = /^\d{13,16}$/.test(cardNumberInput);    
    const zipCodeRegex = /^\d{5}$/.test(zipCode);    
    const cvvRegex = /^\d{3}$/.test(cvv);

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
            nameField.parentElement.className = 'not-valid hint';
        }
        if(!emailRegex){
            document.getElementById('email').parentElement.className = 'not-valid hint';
        }
        if (totalPriceRegex) {
            field.className += ' not-valid hint';
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

