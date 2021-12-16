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