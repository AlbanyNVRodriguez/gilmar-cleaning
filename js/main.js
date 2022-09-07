import validateForm from "./module/validateForm.js";
import { observer } from "./module/observer.js";

document.addEventListener("DOMContentLoaded", function(){
    observer();
    // SEND EMAIL
    document.querySelector(".form-email").addEventListener("submit", e=>{
        e.preventDefault();
        validateForm(e.target);
    })
})
