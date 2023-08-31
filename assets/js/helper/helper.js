const addClass = function(n){
    let classes = n.split(' ');
    classes.forEach(i => {
        this.classList.add(i)
    })
}
Object.prototype.addClass = addClass;

function alert(message, status){

    // :Comprobamos que no exista la alerta
    const alert = document.querySelector('.alert');
    if(alert){
        alert.remove();
    }

    const body = document.querySelector('body');
    const createAlert = document.createElement('div');
    createAlert.addClass('alert');
    if(status){
        createAlert.addClass(status);
    }
    createAlert.textContent = message;
    body.append(createAlert);
    setTimeout(() => {
        createAlert.remove();
    }, 3000);
}
function validateEmail(email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(email)){
        return true;
    }
    return false;
}

export {
    alert,
    validateEmail
}