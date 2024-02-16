window.addEventListener("DOMContentLoaded", function(){
	let bgVideo=document.getElementById("bgVideo");
	let header=document.getElementsByTagName("header");
	let desktopLi=document.querySelectorAll("header #desktop ul li");
	let mobileMenu=document.getElementById("mobile");
	let mobileLi=mobileMenu.firstElementChild.children;
	let topBtn=document.querySelector(".to_top a");
	let tabBtn=document.querySelector("header .tab");
	let dim=document.querySelector(".dim");
	let sec2Contents=document.querySelectorAll("#sec2 .contents ul li");
	let sec2Desc;
	let start=this.document.getElementById("start");
	let section=document.querySelectorAll("section");
	let pageList=[];
	pageList[0]=start;

	for(let i=0; i<section.length; i++){
		pageList.push(section[i]);
	}

	let scrollTop=0;
	let winW=0;
	let targety=0;
	let n=0;
	
	bgVideo.addEventListener("loadeddata", function(){
		bgVideo.muted=true;
		bgVideo.play();
	});
	
	bgVideo.addEventListener("ended", function(){
		bgVideo.play();
	});

	function tabRemove(){ 
		tabBtn.classList.remove("active");
		mobileMenu.classList.remove("active");
		dim.classList.remove("active");
		document.body.classList.remove("fixed");
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
			once: true,
			offset: {
				viewport: {
					x: 0,
					y: 0.25 // 윈도우 3/4 지점에서 발생
				}
			},
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			}
		},
		scroll: {
			callback: offset => scrollInteraction(offset.y)
		}
	});
	
	trigger.add("#start, #sec1, #sec2, #sec3, #sec4, #sec5");

	function scrollInteraction(t){
		if( t < pageList[1].offsetTop){
			n=0;
		}
		else if ( t < pageList[2].offsetTop){
			n=1;
		}
		else if ( t < pageList[3].offsetTop){
			n=2;
		}
		else if ( t < pageList[4].offsetTop){
			n=3;
		}
		else if ( t < pageList[5].offsetTop){
			n=4;
			if( window.innerHeight+t === document.body.scrollHeight){
				n=5;
			}
		}
		else {
			n=5;
		}
		
		for(let i=0; i<desktopLi.length; i++){
			if (i === n){
				if(!desktopLi[i].classList.contains("active")){
					desktopLi[i].classList.add("active");
				}
				
			}
			else {
				if(desktopLi[i].classList.contains("active")){
				desktopLi[i].classList.remove("active");
				}
			}
		}
	}

	for(let i=0; i<desktopLi.length; i++){
		desktopLi[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
	}
	for(let i=0; i<mobileLi.length; i++){
		mobileLi[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
			tabRemove();
		});
	}

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
		mobileMenu.classList.add("active");
		dim.classList.add("active");
		document.body.classList.add("fixed");
		}
		else{
			tabRemove();
		}
	});

	dim.addEventListener("click", function(){
		tabRemove();
	});
});