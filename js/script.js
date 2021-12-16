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
//color.style.backgroundColor = 'purple';
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