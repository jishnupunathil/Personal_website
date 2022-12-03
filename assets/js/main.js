/**
* Template Name: DevFolio - v4.9.1
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


//validation

var nameErr = document.getElementById('name-error');
var emailErr = document.getElementById('email-err');
var msgErr = document.getElementById('msg-error');
var subErr = document.getElementById('sub-error');
function validateName() {
    var name = document.getElementById('txtname').value;
    if (name.length == 0) {
        nameErr.innerHTML = 'Name required';
        nameErr.style.color = 'red';
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameErr.innerHTML = 'Enter full name';
        nameErr.style.borderColor = 'red';
        nameErr.style.color = 'red';
        return false;
    }
    nameErr.innerHTML = "Valid name";
    nameErr.style.color = 'green';
    return true;
}
function validateEmail() {
    var email = document.getElementById('txtemail').value;
    if (email.length == 0) {
        emailErr.innerHTML = 'Email required';
        emailErr.style.color = 'red'
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailErr.innerHTML = 'Enter a valid email';
        emailErr.style.color = 'red';
        return false;
    }
    emailErr.innerHTML = "Valid Email";
    emailErr.style.color = 'green';
    return true;
}
function validateSub() {
    var subject = document.getElementById('txtsub').value;
    if (subject.length == 0) {
        subErr.innerHTML = "Please Enter the Subject";
        subErr.style.color = 'red';
        return false;
    }
    subErr.innerHTML = "Subject is valid";
    subErr.style.color = 'green';
    return true;
}
function validateMsg() {
    var msg = document.getElementById('txtmsg').value;
    if (msg.length < 10) {
        msgErr.innerHTML = 'Please add more content in the message';
        msgErr.style.color = 'red';
        return false;
    }
    msgErr.innerHTML = "Message is valid";
    msgErr.style.color = 'green';
    return true;
}

function validateForm() {
  if (!validateName() || !validateEmail() || !validateMsg() || !validateSub()) {
      return false;
  }
  return true
}


//Submission
// $("#submit-form").submit((e) => {
//   if(validateForm()){
//   e.preventDefault()
//   $.ajax({
//       url: "https://script.google.com/macros/s/AKfycbzuDWwqd07qJi90DEr6JWYqBdlYME4o6uq51NllATd3y6iFUzOpTYTZLhkU1BjK_GOB/exec",
//       data: $("#submit-form").serialize(),
//       method: "POST",
//       headers: {
//         "Content-Type": "text/plain"
//     },
//       success: function (response) {
//           alert("Form submitted successfully")
//           window.location.reload()f
//           //window.location.href="https://google.com"
//       },
//       error: function (err) {
//           alert("Something Error")

//       }
//   })
// }
// })