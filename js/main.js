window.addEventListener("DOMContentLoaded", function(){
	let scrollTop=0;
	let winW=0;

	let header=document.getElementsByTagName("header");
	let desktopLi=document.querySelectorAll("header #desktop ul li");
	let mobileMune=document.getElementById("mobile");
	let topBtn=document.querySelector(".to_top a");
	let tabBtn=document.querySelector("header .tab");
	let dim=document.querySelector(".dim");
	let body=document.getElementsByTagName("body");
	let sec2Contents=document.querySelectorAll("#sec2 .contents ul li");
	let sec2Desc;

	function tabRemove(){ 
		tabBtn.classList.remove("active");
		mobileMune.classList.remove("active");
		dim.classList.remove("active");
		body.item(0).classList.remove("fixed");
	}

	function headerActive(){
		if(!header.item(0).classList.contains("fixed")){
			header.item(0).classList.add("active");
			}
	}

	function headerInactive(){
		if(!header.item(0).classList.contains("fixed")){
			header.item(0).classList.remove("active");
			}
	}
	
	const mainSwiper = new Swiper(".mainSwiper", {
		effect: "fade",
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	const trigger=new ScrollTrigger.default({
		trigger: {
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			}
		}
	});
	
	trigger.add("#start, #sec1, #sec2, #sec3, #sec4, #sec5");

	window.addEventListener("resize", function(){
		winW=window.innerWidth;
		if(winW>940 && tabBtn.classList.contains("active")){
			tabRemove();
		}
	});

	window.addEventListener("scroll", function(){
		scrollTop=window.scrollY;
		if(scrollTop > 50){
			header.item(0).classList.add("active", "fixed");
			
			topBtn.classList.add("fixed");
		}
		else{
			header.item(0).classList.remove("active", "fixed");
			topBtn.classList.remove("fixed");
		}
		
	});

	for(let i=0; i<desktopLi.length; i++){
		
		desktopLi[i].addEventListener("mouseover", function(e){
			e.currentTarget.classList.add("active");
			headerActive();

		});
		desktopLi[i].addEventListener("mouseleave", function(e){
			e.currentTarget.classList.remove("active");
			headerInactive();
		});

		desktopLi[i].addEventListener("focusin", function(e){
			e.currentTarget.classList.add("active");
			headerActive();
		});

		desktopLi[i].addEventListener("focusout", function(e){
			e.currentTarget.classList.remove("active");
			headerInactive();
		});
	}

	for(let i=0; i<sec2Contents.length; i++){
		
		sec2Contents[i].addEventListener("mouseenter", function(e){
			sec2Desc=e.currentTarget.lastElementChild;
			gsap.fromTo(sec2Desc, {display: "none", opacity: 0}, {display: "flex", opacity: 1, duration: 0.3});
		});
		sec2Contents[i].addEventListener("mouseleave", function(e){
			gsap.fromTo(sec2Desc, {display: "flex", opacity: 1}, {display: "none", opacity: 0, duration: 0.3});
		});
	}

	topBtn.addEventListener("click", function(e){
		e.preventDefault();
		gsap.to(window, {scrollTo: 0, duration: 0.3});
	});

	tabBtn.addEventListener("click", function(e){
		e.preventDefault();
		if(!e.currentTarget.classList.contains("active")){
		e.currentTarget.classList.add("active");
		mobileMune.classList.add("active");
		dim.classList.add("active");
		body.item(0).classList.add("fixed");
		}
		else{
			tabRemove();
		}
	});

	dim.addEventListener("click", function(){
		tabRemove();
	});
});