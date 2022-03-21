/**
 * Template Name: Restaurantly - v3.7.0
 * Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */


 let _data_src = "https://hairstudiovida.com";
 let _data_src_sub = "-";
 
 (function () {
   "use strict";
 
 
   /**
    * Easy selector helper function
    */
   const select = (el, all = false) => {
     el = el.trim();
     if (all) {
       return [...document.querySelectorAll(el)];
     } else {
       return document.querySelector(el);
     }
   };
   /**
    * Easy event listener function
    */
   const on = (type, el, listener, all = false) => {
     let selectEl = select(el, all);
     if (selectEl) {
       if (all) {
         selectEl.forEach((e) => e.addEventListener(type, listener));
       } else {
         selectEl.addEventListener(type, listener);
       }
     }
   };
 
   let data_src = "https://info.bedribahru.com/";
   let data_src_sub = ".php";
 
   _data_src = data_src;
   _data_src_sub = data_src_sub;
   /**
    * Easy on scroll event listener
    */
   const onscroll = (el, listener) => {
     el.addEventListener("scroll", listener);
   };
 
   //Load Menu
   $.ajax({
     url: data_src + "api/service/get/all" + data_src_sub,
     success: function (result) {
       var service_container = document.getElementById("service_list_container");
       var titles = [];
       for (let service of result["data"]) {
         if (titles.indexOf(service["category"]["name"]) === -1) {
           titles.push(service["category"]["name"]);
         }
         //if (service['images'].length === 0) continue;
 
         let div_a = document.createElement("div");
         div_a.classList.add(
           "col-lg-6",
           "menu-item",
           "filter-" + replaceAll(" ", "_", service["category"]["name"]).trim()
         );
         //let image = document.createElement('img');
         //image.classList.add('menu-img');
         // image.alt = service['name'];
         // image.style.maxHidth = '300px';
         //  image.style.maxHeight = '500px';
         // image.src = "http://info.bedribahru.com/" + service['images'][0]['path'];
         let div_b = document.createElement("div");
         div_b.classList.add("menu-content");
         let a = document.createElement("a");
         let div_c = document.createElement("div");
         div_c.classList.add("menu-ingredients");
         div_c.innerText = service["description"];
         a.innerText = service["name"];
         let span_a = document.createElement("span");
         span_a.innerText = "$" + service["price"];
         div_b.appendChild(a);
         div_b.appendChild(span_a);
         //div_a.appendChild(image);
         div_a.appendChild(div_b);
         div_a.appendChild(div_c);
         service_container.appendChild(div_a);
       }
 
       service_container.style.height = "8265px";
 
       var container = document.getElementById("menu-flters");
       for (let title of titles) {
         let li = document.createElement("li");
         li.setAttribute(
           "data-filter",
           ".filter-" + replaceAll(" ", "_", title).trim()
         );
         li.innerText = title;
         container.appendChild(li);
       }
       //Initiate Menu
       let menuContainer = select(".menu-container");
       if (menuContainer) {
         let menuIsotope = new Isotope(menuContainer, {
           itemSelector: ".menu-item",
           layoutMode: "fitRows",
         });
 
         let menuFilters = select("#menu-flters li", true);
 
         on(
           "click",
           "#menu-flters li",
           function (e) {
             e.preventDefault();
             menuFilters.forEach(function (el) {
               el.classList.remove("filter-active");
             });
             this.classList.add("filter-active");
 
             menuIsotope.arrange({
               filter: this.getAttribute("data-filter"),
             });
             menuIsotope.on("arrangeComplete", function () {
               AOS.refresh();
             });
           },
           true
         );
       }
     },
   });
 
   
   //Load Gallery
   $.ajax({
     url: data_src + "api/image/get/all" + data_src_sub,
     success: function (result) {
       let happy_list = document.getElementById("happy_customers");
       let index = 0;
       for (let image of result["data"]) {
         let div_a = document.createElement("div");
         div_a.classList.add("col-lg-3", "col-md-4", "d-none");
         div_a.id = "lazy_image_" + index + "_";
         let div_b = document.createElement("div");
         div_b.classList.add("gallery-item");
         div_b.classList.add("h-100");
 
         let a = document.createElement("span");
         a.classList.add("gallery-lightbox");
         a.setAttribute("data-gall", "gallery-item");
         let image_ = document.createElement("img");
         image_.setAttribute('data-src', data_src + image["path"]);
         image_.classList.add("img-fluid");
         image_.classList.add("lazy_load");
         image_.id = "lazy_image_" + index++;
         a.appendChild(image_);
         div_b.appendChild(a);
         div_a.appendChild(div_b);
         happy_list.appendChild(div_a);
       }
       $('.lazy_load').lazy(
         {
             afterLoad: function(element) {
                  element[0].classList.remove("d-none");
                  $('#' + element[0].id + "_").removeClass('d-none');
             }
         }
       );
     },
   });
 
   
   //Load Admin Info
   $.ajax({
     url: data_src + "api/admin/info" + data_src_sub,
     success: function (result) {
       let data = result["data"];
       let members_list = document.getElementById("members_list");
 
       let image = document.createElement("img");
       image.src = data_src + data["profile"];
       image.classList.add("img-fluid");
       //image.style.maxWidth = '300px';
       //image.style.maxHeight = '400px';
       image.alt = data["first_name"] + " " + data["middle_name"];
       let mi_div = document.createElement("div");
       mi_div.classList.add("member-info");
       let mi_div_c = document.createElement("div");
       mi_div_c.classList.add("member-info-content");
       let mi_div_c_h4 = document.createElement("h4");
       mi_div_c_h4.innerText = data["first_name"] + " " + data["middle_name"];
       let mi_div_c_span = document.createElement("span");
       mi_div_c_span.innerText = data["role"]["name"];
 
       mi_div_c.appendChild(mi_div_c_h4);
       mi_div_c.appendChild(mi_div_c_span);
 
       let mi_div_social = document.createElement("div");
       mi_div_social.classList.add("social");
 
       let tw = document.createElement("a");
       let tw_i = document.createElement("i");
       tw.classList.add("bi");
       tw_i.classList.add("bi-twitter");
       tw.appendChild(tw_i);
       let tw_link = data["twitter"].replace("@", "");
       tw.href = "https://twitter.com/" + tw_link;
       tw.setAttribute("target", "_blank");
       let insta = document.createElement("a");
       let insta_i = document.createElement("i");
       insta.classList.add("bi");
       insta_i.classList.add("bi-instagram");
       insta.appendChild(insta_i);
       let insta_link = data["instagram"].replace("@", "");
       insta.href = "https://instagram.com/" + insta_link;
       insta.setAttribute("target", "_blank");
       let fb = document.createElement("a");
       let fb_i = document.createElement("i");
       fb.classList.add("bi");
       fb_i.classList.add("bi-facebook");
       fb.appendChild(fb_i);
       let fb_link = data["facebook"].replace("@", "");
       fb.href = "https://facebook.com/" + fb_link;
       fb.setAttribute("target", "_blank");
       let link = document.createElement("a");
       let link_i = document.createElement("i");
       link.classList.add("bi");
       link_i.classList.add("bi-linkedin");
       link.appendChild(link_i);
       let linked_link = data["linkedin"].replace("@", "");
       link.href = "https://linkedin.com/" + linked_link;
       link.setAttribute("target", "_blank");
 
       if (data["instagram"] != "*-*empty*-*") {
         mi_div_social.appendChild(insta);
       }
       if (data["facebook"] != "*-*empty*-*") {
         mi_div_social.appendChild(fb);
       } 
       if (data["linkedin"] != "*-*empty*-*") {
         mi_div_social.appendChild(link);
       }
       if (data["twitter"] != "*-*empty*-*") {
         mi_div_social.appendChild(tw);
       }
 
       mi_div.appendChild(mi_div_c);
       mi_div.appendChild(mi_div_social);
 
       members_list.appendChild(image);
       members_list.appendChild(mi_div);
     },
   });
 
   /**
    * Navbar links active state on scroll
    */
   let navbarlinks = select("#navbar .scrollto", true);
   const navbarlinksActive = () => {
     let position = window.scrollY + 200;
     navbarlinks.forEach((navbarlink) => {
       if (!navbarlink.hash) return;
       let section = select(navbarlink.hash);
       if (!section) return;
       if (
         position >= section.offsetTop &&
         position <= section.offsetTop + section.offsetHeight
       ) {
         navbarlink.classList.add("active");
       } else {
         navbarlink.classList.remove("active");
       }
     });
   };
 
   window.addEventListener("load", navbarlinksActive);
   onscroll(document, navbarlinksActive);
 
   /**
    * Scrolls to an element with header offset
    */
   const scrollto = (el) => {
     let header = select("#header");
     let offset = header.offsetHeight;
 
     let elementPos = select(el).offsetTop;
     window.scrollTo({
       top: elementPos - offset,
       behavior: "smooth",
     });
   };
 
   /**
    * Toggle .header-scrolled class to #header when page is scrolled
    */
   let selectHeader = select("#header");
   let selectTopbar = select("#topbar");
   if (selectHeader) {
     const headerScrolled = () => {
       if (window.scrollY > 100) {
         selectHeader.classList.add("header-scrolled");
         if (selectTopbar) {
           selectTopbar.classList.add("topbar-scrolled");
         }
       } else {
         selectHeader.classList.remove("header-scrolled");
         if (selectTopbar) {
           selectTopbar.classList.remove("topbar-scrolled");
         }
       }
     };
     window.addEventListener("load", headerScrolled);
     onscroll(document, headerScrolled);
   }
 
   /**
    * Back to top button
    */
   let backtotop = select(".back-to-top");
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add("active");
       } else {
         backtotop.classList.remove("active");
       }
     };
     window.addEventListener("load", toggleBacktotop);
     onscroll(document, toggleBacktotop);
   }
 
   /**
    * Mobile nav toggle
    */
   on("click", ".mobile-nav-toggle", function (e) {
     select("#navbar").classList.toggle("navbar-mobile");
     this.classList.toggle("bi-list");
     this.classList.toggle("bi-x");
   });
 
   /**
    * Mobile nav dropdowns activate
    */
   on(
     "click",
     ".navbar .dropdown > a",
     function (e) {
       if (select("#navbar").classList.contains("navbar-mobile")) {
         e.preventDefault();
         this.nextElementSibling.classList.toggle("dropdown-active");
       }
     },
     true
   );
 
   /**
    * Scrool with ofset on links with a class name .scrollto
    */
   on(
     "click",
     ".scrollto",
     function (e) {
       if (select(this.hash)) {
         e.preventDefault();
 
         let navbar = select("#navbar");
         if (navbar.classList.contains("navbar-mobile")) {
           navbar.classList.remove("navbar-mobile");
           let navbarToggle = select(".mobile-nav-toggle");
           navbarToggle.classList.toggle("bi-list");
           navbarToggle.classList.toggle("bi-x");
         }
         scrollto(this.hash);
       }
     },
     true
   );
 
   /**
    * Scroll with ofset on page load with hash links in the url
    */
   window.addEventListener("load", () => {
     if (window.location.hash) {
       if (select(window.location.hash)) {
         scrollto(window.location.hash);
       }
     }
   });
 
   /**
    * Preloader
    */
   let preloader = select("#preloader");
   if (preloader) {
     window.addEventListener("load", () => {
       preloader.remove();
     });
   }
 
   /**
    * Initiate glightbox
    */
   const glightbox = GLightbox({
     selector: ".glightbox",
   });
 
   /**
    * Events slider
    */
   new Swiper(".events-slider", {
     speed: 600,
     loop: true,
     autoplay: {
       delay: 5000,
       disableOnInteraction: false,
     },
     slidesPerView: "auto",
     pagination: {
       el: ".swiper-pagination",
       type: "bullets",
       clickable: true,
     },
   });
 
   /**
    * Testimonials slider
    */
   new Swiper(".testimonials-slider", {
     speed: 600,
     loop: true,
     autoplay: {
       delay: 5000,
       disableOnInteraction: false,
     },
     slidesPerView: "auto",
     pagination: {
       el: ".swiper-pagination",
       type: "bullets",
       clickable: true,
     },
     breakpoints: {
       320: {
         slidesPerView: 1,
         spaceBetween: 20,
       },
 
       1200: {
         slidesPerView: 3,
         spaceBetween: 20,
       },
     },
   });
 
   /**
    * Initiate gallery lightbox
    */
   const galleryLightbox = GLightbox({
     selector: ".gallery-lightbox",
   });
 
   /**
    * Animation on scroll
    */
   window.addEventListener("load", () => {
     AOS.init({
       duration: 1000,
       easing: "ease-in-out",
       once: true,
       mirror: false,
     });
   });
 
 
 })();
 
   function removeError(obj) {
     obj.innerText = "";
     obj.style.display = "none";
   }
   
   function submitFeedback() {
     let btn = document.getElementById("feedback_submit_btn");
     let form = document.getElementById("feedback_form");
     let name = document.getElementById("feedback_name");
     let email = document.getElementById("feedback_email");
     let subject = document.getElementById("feedback_subject");
     let message = document.getElementById("feedback_message");
     let loader = document.getElementById("fb_loader");
     let error = document.getElementById("fb_error_msg");
     let success = document.getElementById("fb_success_msg");
 
     btn.classList.add('d-none');
   
     email.onclick = () => {
       removeError(error);
     };
     subject.onclick = () => {
       removeError(error);
     };
     message.onclick = () => {
       removeError(error);
     };
     name.onclick = () => {
       removeError(error);
     };
     error.style.display = "none";
     loader.style.display = "block";
     removeError(error);
 
     if (
       name.value === "" ||
       email.value === "" ||
       subject.value === "" ||
       message.value === ""
     ) {
       error.innerText = "Please fill the required input!";
       error.style.display = "block";
       loader.style.display = "none";
       
       btn.classList.remove('d-none');
     } else if (!validateEmail(email.value)) {
       error.innerText = "Please provide a valid email!";
       error.style.display = "block";
       loader.style.display = "none";
 
       
       btn.classList.remove('d-none');
     } else {
       $.post({
         url: _data_src + "api/feedback/create" + _data_src_sub,
         data: {
           email: email.value,
           fullname: name.value,
           subject: subject.value,
           message: message.value,
         },
         success: function (result) {
           if (result["status"] === 200) {
             email.value = "";
             name.value = "";
             subject.value = "";
             message.value = "";
   
             success.style.display = "block";
             loader.style.display = "none";
             form.classList.add("d-none");
           } else {
             error.innerText = "Something went wrong! Please try again later!";
             error.style.display = "block";
             loader.style.display = "none";
           }
           
           btn.classList.remove('d-none');
           setTimeout(() => {
             form.classList.remove("d-none");  
             error.style.display = "none";
           }, 1000);
         },
         error: function (err){
             error.innerText = "Something went wrong! Please try again later!";
             error.style.display = "block";
             loader.style.display = "none";
             btn.classList.remove('d-none');
         }
       });
     }
   }
   
   function validateEmail(email) {
     let re = /\S+@\S+\.\S+/;
     return re.test(email);
   }
   
   function replaceAll(find, replace, str) {
     while (str.indexOf(find) > -1) {
       str = str.replace(find, replace);
     }
     return str;
   }