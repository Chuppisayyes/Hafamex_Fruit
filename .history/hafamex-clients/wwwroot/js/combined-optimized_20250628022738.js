
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.getElementById("footer");
    const menu = document.getElementById("hf-menu-fixed");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          menu.classList.add("footer-mode");
        } else {
          menu.classList.remove("footer-mode");
        }
      });
    }, {
      threshold: 0.1
    });

    if (footer && menu) {
      observer.observe(footer);
    }
  });
/* ======================== SCROLL.JS ======================== */

document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


window.scrollHelper = {
    scrollDown: function () {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
};


/* ======================== SITE.JS ======================== */


window.initCounterAnimation = function () {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    let target = +counter.getAttribute("data-target");
    let count = 0;
    let speed = target / 100; // Điều chỉnh tốc độ đếm

    function updateCount() {
      count += speed;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    }
    updateCount();
  });
};


$(document).ready(function () {

  $('.back-to-top a').on('click', function (e) {
      e.preventDefault(); // 
      $('html, body').animate({
          scrollTop: 0
      }, {
          duration: 300, // Tăng thời gian lên 1.2 giây để mượt hơn
          easing: 'swing', // Sử dụng easing mặc định của jQuery, mượt tự nhiên
          step: function () {
              // Đảm bảo cuộn mượt trên mọi trình duyệt
              $(this).scrollTop(Math.floor($(this).scrollTop()));
          }
      });
  });

  function runCounter($element) {
      // Lấy giá trị text và loại bỏ dấu phẩy
      let rawValue = $element.text().replace(/,/g, '');
      let targetValue = parseInt(rawValue, 10); // Chuyển thành số nguyên

      $element.prop('Counter', 0).animate({
          Counter: targetValue
      }, {
          duration: 5000,
          easing: 'swing',
          step: function (now) {
              // Định dạng lại số với dấu phẩy khi hiển thị
              $(this).text(Math.ceil(now).toLocaleString('en-US'));
          }
      });
  }

  // Đánh dấu các phần tử chưa chạy
  $('.count').each(function () {
      $(this).data('counted', false);
  });

  $(window).on('scroll', function () {
      $('.count').each(function () {
          let $this = $(this);
          let elementTop = $this.offset().top;
          let viewportBottom = $(window).scrollTop() + $(window).height();

          if (elementTop < viewportBottom && !$this.data('counted')) {
              runCounter($this);
              $this.data('counted', true); // Đánh dấu đã chạy
          }
      });
  });

  // Kiểm tra ngay khi load
  $('.count').each(function () {
      let $this = $(this);
      let elementTop = $this.offset().top;
      let viewportBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < viewportBottom && !$this.data('counted')) {
          runCounter($this);
          $this.data('counted', true);
      }
  });
});


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animationClass = el.getAttribute('data-animate');
        el.classList.add(animationClass);
        el.style.opacity = 1; // Cho hiện ra luôn
        observer.unobserve(el); // Chỉ chạy 1 lần
      }
    });
  });

  document.querySelectorAll('.animate__animated').forEach(el => {
    observer.observe(el);
  });

/* ======================== YOUTUBE-LAZY.JS ======================== */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.youtube-wrapper').forEach(wrapper => {
        const videoId = wrapper.dataset.id;
        wrapper.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playlist=${videoId}&loop=1`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', '');
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
        });
    });
});
