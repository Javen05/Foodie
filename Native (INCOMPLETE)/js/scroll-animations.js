const observer = new IntersectionObserver((entries) => { 
    entries.forEach((entry) => {  

        if(entry.target.classList.contains('show')) { 
            entry.target.classList.remove('show');

        } else {

        if(entry.intersectionRatio > 0) {

            if (entry.target.classList.contains('hidden')) {
                entry.target.classList.add("show");
            } else {
            entry.target.classList.add('show2');
            }

        }}
    });
});
    
const hiddenElements = document.querySelectorAll('.hidden, .hidden2');
hiddenElements.forEach((element) => {
    observer.observe(element);
});
