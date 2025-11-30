

/////////////// AUTOMATIC SLIDER/////////////
const slider= document.querySelector('.slider-track');
const slidesimg =document.querySelectorAll('.slide');
let slidecounter=0;
const slideInterval=3000; // time interval
//method for making the images slide
function nextSlide(){
    slidecounter++;
    if(slidecounter>slidesimg.length-1){
        slidecounter=0;
}
slider.style.transform=`translateX(-${slidecounter*100}%)`;
captionslider();
}   
setInterval(nextSlide,slideInterval);

///////// CAPTION UPDATER///////////
// updating the caption per slide
let captions =document.getElementsByClassName("slider-caption")
function captionslider(){
for(let i =0; i< slidesimg.length;i++){
    captions[i].style.display = "none";
}
captions[slidecounter].style.display ="block";
}
 /////// NAVBAR HIDING WHEN SCROLLING DOWN////////
//navbar hidding//
const navbar=document.querySelector('#navBar');
var lastscrollpos=0;

window.addEventListener('scroll',()=>{
    //where we are in the page
    var scrollTap = window.pageYOffset;
// if scrolling down
 if(scrollTap > lastscrollpos){
    navbar.style.transition = "all .4s ease";
    navbar.style.transform = "translateY(-100%)";
 } else {
    navbar.style.transition = "all .6s ease";
    navbar.style.transform = "translateY(0)"; // This is what shows it when scrolling up
 }
 lastscrollpos = scrollTap;
}); 

/////////// CAROUSEL SWIPE /////////////

//where to go carousel
const track = document.querySelector('.gallery');

// Mouse down
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

// Mouse up
window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage || 0;
};

// Mouse move
window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextUnconstrained = (parseFloat(track.dataset.prevPercentage) || 0) + percentage;

    const nextPercentage = Math.min(0, Math.max(nextUnconstrained, -100));

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`
        },
        {
            duration: 1200,
            fill: "forwards"
        }
    );
};

// toggle category  
const buttons = document.querySelectorAll('.category-btn');
const cards = document.querySelectorAll('.attraction-card');

// Show all cards by default
cards.forEach(card => card.style.display = 'block');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Toggle 'active' class on this button
        button.classList.toggle('active');

        // Show/hide cards based on active buttons
        const activeCategories = Array.from(buttons)
            .filter(btn => btn.classList.contains('active'))
            .map(btn => btn.getAttribute('data-category'));

        cards.forEach(card => {
            if (activeCategories.length === 0) {
                // If no button is active, show all
                card.style.display = 'block';
            } else if (activeCategories.includes(card.getAttribute('data-category'))) {
                card.style.display = 'block';
                card.style.color='#3b82f6';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// fade in animation

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});


// contact info function
// CONTACT FORM SUBMISSION
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent form from submitting normally
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const response = document.querySelector('.prompt-message');

    // Validate fields
    if (name === "" || email === "" || message === "") {
        response.textContent = "Please fill in all fields.";
        response.style.color = "red";
    } else {
        response.textContent = "Thank you for your message! We'll get back to you soon.";
        response.style.color = "green";
        document.getElementById('inquiryForm').reset();

        // Optional alert
        // alert("Thank you for your message! We'll get back to you soon.");
        
        // Remove message after 5 seconds
        setTimeout(() => {
            response.textContent = "";
        }, 5000);
    }
});


