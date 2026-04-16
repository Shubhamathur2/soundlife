// Hero accordion hover interaction

document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.hero-section.first-acc li');
  let currentIndex = 0;
  let interval;

  function setActive(index) {
    items.forEach(i => i.classList.remove('active-element'));
    items[index].classList.add('active-element');
    currentIndex = index;
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % items.length;
      setActive(nextIndex);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  // Hover functionality
  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      stopAutoSlide();
      setActive(index);
    });

    item.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  });

  // Init
  setActive(0); // ensure only first is active
  startAutoSlide();
});

// FAQ TOGGLE EFFECT

document.addEventListener("DOMContentLoaded", function(){

const pills = document.querySelectorAll(".faq-pill");
const groups = document.querySelectorAll("[data-group]");

if(!pills.length || !groups.length) return;

pills.forEach(p=>{
 p.onclick=()=>{
  pills.forEach(x=>x.classList.remove("active"));
  p.classList.add("active");
  groups.forEach(g=>g.style.display="none");

  const activeGroup = document.querySelector('[data-group="'+p.dataset.tab+'"]');

  if(!activeGroup) return;

  activeGroup.style.display="block";
  initAccordion(activeGroup);
 };
});

function initAccordion(scope){

 if(!scope) return; // 🟢 prevents null error

 const qs = scope.querySelectorAll(".faq-q");
 const as = scope.querySelectorAll(".faq-a");

 if(!qs.length) return;

 qs.forEach(q=>closeItem(q,false));

 openItem(qs[0],false);

 qs.forEach(q=>{
  q.onclick=()=>{
    if(q.classList.contains("open")){
      closeItem(q,true);
      return;
    }
    qs.forEach(other=>closeItem(other,true));
    openItem(q,true);
  };
 });

 function openItem(q, animate){
   const a = q.nextElementSibling;
   if(!a) return;

   q.classList.add("open");
   q.classList.remove("closed");

   a.classList.add("open");
   a.style.maxHeight = a.scrollHeight + "px";

   const icon = q.querySelector(".faq-icon");
   if(icon) icon.textContent="-";

   if(q.classList.contains("last")){
     a.classList.add("open");
   }
 }

 function closeItem(q, animate){
   const a = q.nextElementSibling;
   if(!a) return;

   q.classList.remove("open");
   q.classList.add("closed");

   a.style.maxHeight = "0px";
   a.classList.remove("open");

   const icon = q.querySelector(".faq-icon");
   if(icon) icon.textContent="+";
 }

}

const defaultGroup = document.querySelector('[data-group="new"]');
if(defaultGroup){
  initAccordion(defaultGroup);
}

});


// Technology Category slider 
(function () {
  function initTechSlider() {
    // document.querySelectorAll('.techSwiper').forEach(function (slider) {
      const slider = document.querySelector('.techSwiper');
      // Prevent double initialization (Shopify section reload safe)
      if (slider.classList.contains('swiper-initialized')) return;

      var swiper = new Swiper(slider, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      freeMode: true,
      allowSlideNext: true,
      allowSlidePrev: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: '.tech-next',
        prevEl: '.tech-prev',
      },
      breakpoints: {
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.5, 
            spaceBetween: 24,
          }
        }
    });

  //     new Swiper(slider, {
  //       slidesPerView: 1.2,
  //       spaceBetween: 16,
  //       loop: true,
  //       // watchOverflow: true,
  //       loopAdditionalSlides: 4,
  // watchOverflow: true, // important for loop

  //       // ✅ ADD NAVIGATION (LEFT & RIGHT)
  //       navigation: {
  //         nextEl: slider.querySelector('.tech-next'),
  //         prevEl: slider.querySelector('.tech-prev'),
  //       },

  //       // Pagination (already correct)
  //       pagination: {
  //         el: slider.querySelector('.swiper-pagination'),
  //         clickable: true,
  //       },

  //       breakpoints: {
  //         640: {
  //           slidesPerView: 1.5,
  //         },
  //         768: {
  //           slidesPerView: 2,
  //           spaceBetween: 20,
  //         },
  //         1024: {
  //           slidesPerView: 2.5, // same as your design
  //           spaceBetween: 24,
  //         }
  //       }
  //     });
    // });
  }

  document.addEventListener('DOMContentLoaded', initTechSlider);
  document.addEventListener('shopify:section:load', initTechSlider);
})();

// testimonial slider 
document.addEventListener('DOMContentLoaded', function () {
  const testiSwiper = new Swiper('.testiSwiper', {
    slidesPerView: 3,
    spaceBetween: 8,
    loop: true,
    centeredSlides: true,

    pagination: {
      el: '.testiSwiper .swiper-pagination',
      clickable: true
    },

    navigation: {
      nextEl: '.testiSwiper .swiper-button-next',
      prevEl: '.testiSwiper .swiper-button-prev'
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: true
      },
      768: {
        slidesPerView: 2,
        centeredSlides: true
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: true
      }
    }
  });
});

// Home Sticky section  

document.addEventListener('DOMContentLoaded', function () {

  const bar = document.querySelector('.sticky-hearing-bar');
  const openBtn = document.querySelector('.hear-difference-btn');
  const popup = document.getElementById('hearPopup');
  const closeBtn = document.querySelector('.hear-popup-close');

  /* Move bar after scroll */
  function handleScroll() {
    if (!bar) return;

    if (window.scrollY > 20) {
      bar.classList.remove('is-top');
      bar.classList.add('is-bottom');
    } else {
      bar.classList.add('is-top');
      bar.classList.remove('is-bottom');
    }
  }

  if (bar) {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on load
  }

  /* Popup open */
  if (openBtn && popup) {
    openBtn.addEventListener('click', function () {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  /* Popup close */
  if (closeBtn && popup) {
    closeBtn.addEventListener('click', function () {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  if (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

});

document.addEventListener('DOMContentLoaded', function (){
  const qrSection = document.querySelector('.qr-section');
  const qrPopup = document.querySelector('.qr-popup');
  const closeBtn = document.querySelector('.qr-popup-close');

  qrSection.addEventListener('click', function () {
    qrPopup.classList.add('active');
  });

  closeBtn.addEventListener('click', function () {
    qrPopup.classList.remove('active');
  });
})

document.addEventListener("DOMContentLoaded", function () {

  const scrollTopBtn = document.querySelector(".scroll-to-top");

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});



function initDiscountApply() {
  document.addEventListener('click', handleDiscountActions);
}

function handleDiscountActions(e) {
  const applyBtn = e.target.closest('#apply-discount-btn');
  const removeBtn = e.target.closest('[data-discount-remove]');

  if (applyBtn) {
    e.preventDefault();
    const discountInput = document.getElementById('cart-drawer-discount');
    const discountCode = discountInput ? discountInput.value.trim() : '';

    if (!discountCode) return;

    applyCartDiscount(discountCode, applyBtn);
  }

  if (removeBtn) {
    e.preventDefault();
    removeCartDiscount(removeBtn);
  }
}

function applyCartDiscount(code, button) {
  button.disabled = true;

  fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      discount: code
    })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to apply discount');
      return data;
    })
    .then(() => refreshCartDrawer())
    .then(() => {
      const input = document.getElementById('cart-drawer-discount');
      if (input) input.value = '';
    })
    .catch((error) => {
      console.error('Error applying discount:', error);
      alert('Unable to apply discount code. Please try again.');
    })
    .finally(() => {
      button.disabled = false;
    });
}

function removeCartDiscount(button) {
  button.disabled = true;

  fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      discount: ''
    })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to remove discount');
      return data;
    })
    .then(() => refreshCartDrawer())
    .catch((error) => {
      console.error('Error removing discount:', error);
      alert('Unable to remove discount code. Please try again.');
    })
    .finally(() => {
      button.disabled = false;
    });
}

function refreshCartDrawer() {
  return fetch(window.location.pathname + '?sections=cart-drawer')
    .then((response) => response.json())
    .then((data) => {
      const cartDrawer = document.querySelector('cart-drawer');
      if (!cartDrawer || !data['cart-drawer']) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(data['cart-drawer'], 'text/html');
      const newContent = doc.querySelector('cart-drawer');

      if (newContent) {
        cartDrawer.innerHTML = newContent.innerHTML;
      }
    });
}

initDiscountApply();


// Stat Counter 

document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (el) => {
    let target = el.getAttribute("data-count");

    // Extract number (remove +, %, etc.)
    let numericValue = parseInt(target.replace(/[^0-9]/g, ""));
    let suffix = target.replace(/[0-9]/g, "");

    let count = 0;
    let speed = Math.ceil(numericValue / 100); // control speed

    const updateCount = () => {
      count += speed;

      if (count >= numericValue) {
        el.innerText = numericValue + suffix;
      } else {
        el.innerText = count + suffix;
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  };

  // Intersection Observer (trigger on scroll)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
/////////////***************** 10 Days Free Trial Tabs section *************** *////////////
 (function () {
    function initTabs(section) {
      if (!section) return;

      const buttons = section.querySelectorAll('.soundlife-tab-btn');
      const contents = section.querySelectorAll('.soundlife-tab-content');

      if (!buttons.length || !contents.length) return;

      buttons.forEach((btn) => {
        btn.removeEventListener('click', btn._tabHandler || (() => {}));

        const handler = function () {
          const index = this.dataset.index;

          if (!index) return;

          // Remove active
          buttons.forEach((b) => b.classList.remove('active'));
          contents.forEach((c) => c.classList.remove('active'));

          // Activate button
          this.classList.add('active');

          // Find content
          const target = section.querySelector(`.soundlife-tab-content[data-index="${index}"]`);

          if (!target) return;

          target.classList.add('active');
        };

        btn._tabHandler = handler;
        btn.addEventListener('click', handler);
      });
    }

    document.querySelectorAll('.soundlife-tabs').forEach(initTabs);

    document.addEventListener('shopify:section:load', function (e) {
      initTabs(e.target);
    });
  })();