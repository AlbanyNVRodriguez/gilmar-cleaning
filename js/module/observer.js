function observer(){
    let mainSections = document.querySelectorAll(".main-section");
    let callback = entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.remove("hidden");
            window.addEventListener("visibilitychange", ()=>{
                if(document.visibilityState === "visible" &&  entry.isIntersecting) 
                entry.target.classList.remove("hidden");
            })
        })
    }
    let observator = new IntersectionObserver(callback, { threshold: 0.2 });
    mainSections.forEach(element => observator.observe(element));
}

export {
    observer
}