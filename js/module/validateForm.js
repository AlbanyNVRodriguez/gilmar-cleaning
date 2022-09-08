export default function validateForm($form){
    let name = validateName($form.name.value),
    email = validateEmail($form.email.value),
    phone = validatePhone($form.phone.value),
    service = validateServices($form.radio.value),
    address = validateAddress($form.address.value),
    message = validateMessage($form.message.value);
    
    if( name && email && phone && service && address && message ){
        Array.from($form.children).forEach( element => element.classList.remove("error"));

        $form.querySelector(".loader").innerHTML = 
        `<img src="./img/loader.svg" alt="loader"><p>Sending...</p>`;
        $form.querySelector(".loader").classList.remove("hidden");

        // sendForm($form, { name, email, phone, service, address, message });
        sendFetch($form, { name, email, phone, service, address, message });
    }else{
        name ? $form.name.classList.remove("error") : $form.name.classList.add("error");
        email ? $form.email.classList.remove("error") : $form.email.classList.add("error");
        phone ? $form.phone.classList.remove("error") : $form.phone.classList.add("error");
        address ? $form.address.classList.remove("error") : $form.address.classList.add("error");
        message ? $form.message.classList.remove("error") : $form.message.classList.add("error");
    }
}
// -------------------------------
// VALIDATE NAME
function validateName(name){
    name = name.trim();
    return name.length > 3 && name != ""? name : false;
}
// VALIDATE EMAIL
function validateEmail(email){
    let regEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    email = email.trim();
    return email.length > 8 && email != "" && regEmail.test(email)? email : false;
}
// VALIDATE PHONE
function validatePhone(phone){
    return phone !== ""? phone : false;
}
// VALIDATE SERVICE
function validateServices(service){
    let services = [ "Residential Cleaning", "Commercial Cleaning" ];
    service = service.trim();
    return services.includes(service)? service : false;
}
// VALIDATE ADDRESS
function validateAddress(address){
    address = address.trim();
    return address.length > 5 && address != ""? address : false;
}
// VALIDATE MESSAGE
function validateMessage(message){
    message = message.trim();
    return message.length > 5 && message != ""? message : false;
}
// ------------------------------------
// SEND FORM
function sendForm($form, dates){
    let formData = new FormData();
        formData.append("name", dates.name);
        formData.append("email", dates.email);
        formData.append("phone", dates.phone);
        formData.append("service", dates.service);
        formData.append("address", dates.address);
        formData.append("message", dates.message);

    let XHR = new XMLHttpRequest();
    XHR.open("POST", "./assets/send_mail.php");
    XHR.addEventListener("readystatechange", function(){
        if(XHR.readyState !== 4) return;
        if(XHR.status >= 200 && XHR.status <300){
            let res = JSON.parse(XHR.responseText);
            console.log("correcto", res)
            $form.querySelector(".loader").innerHTML = 
            `<img src="./img/ico - sendEmail.png" alt="send..."><p>${res.message}</p>`;
            setTimeout(function(){
                $form.querySelector(".loader").classList.add("hidden");
            }, 3000);
            $form.reset();
        }else{
            let res = JSON.parse(XHR.responseText);
            $form.querySelector(".loader").innerHTML = `
            <img src="./img/ico - error.png" alt="error..."><p>${res.message}</p>`;
            setTimeout(function(){
                $form.querySelector(".loader").classList.add("hidden");
            }, 3000);
        }
    });
    XHR.send(formData)
}
// SEND FORM
const sendFetch = async ($form, dates) => {
    let formData = new FormData();
        formData.append("name", dates.name);
        formData.append("email", dates.email);
        formData.append("phone", dates.phone);
        formData.append("service", dates.service);
        formData.append("address", dates.address);
        formData.append("message", dates.message);

    let res = await fetch("./assets/send_mail.php", {method: "POST", body: formData});
    let json = await res.json();

    if(res.ok){
        $form.querySelector(".loader").innerHTML = `<img src="./img/ico - sendEmail.png" alt="send..."><p>${json.message}</p>`;
        setTimeout(function(){
            $form.querySelector(".loader").classList.add("hidden");
        }, 3000);
        $form.reset();
    }else{
        $form.querySelector(".loader").innerHTML = `
        <img src="./img/ico - error.png" alt="error..."><p>${json.message}</p>`;
        setTimeout(function(){
            $form.querySelector(".loader").classList.add("hidden");
        }, 3000);
    }
}