const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var t1 = gsap.timeline();

    t1.from("#nav", {
        y: '10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: .2,
        delay: -1
        })
        .from("#herofooter", {
            y: -10,
            ease: Expo.easeInOut,
            duration: 1.5,
            opacity: 0,
            delay: -1
            })
}

var timeout;

function circleShrink(){
    var xscale = 1;  //defalut position of x axis circle
    var yscale = 1;  //defalut position of y axis circle

    var xprev = 0;   // saving previous postion of x axis from point a to b
    var yprev = 0;   // saving previous postion of y axis from point a to b;   
    
    window.addEventListener("mousemove", function(details){

        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);
       
        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`
        }, 100)
    });
}

function circleMouseFollower(xscale, yscale){
    document.addEventListener('mousemove', function(details){
        console.log(details.clientX,details.clientY)
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`
    })
}

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX; 

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = rotate - details.clientX;
        rotate = details.clientX; 

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: 1-diff,
            left: details.clientX-400,
            rotate: gsap.utils.clamp(-20, 20, diffrot)
        });
    });
});

circleMouseFollower();
firstPageAnim();
circleShrink();