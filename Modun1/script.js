const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector("#menu");

menuBtn.addEventListener("click", ()=>{

    menu.classList.toggle("active");

});

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(item => {

    item.addEventListener("click", function(e){

        if(window.innerWidth <= 768){

            e.preventDefault();

            this.classList.toggle("active");
        }

    });

});