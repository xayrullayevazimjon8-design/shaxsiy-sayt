// =========================================================
//  Sayt skriptlari
//  1) Qorong'i / yorug' rejim (tanlov brauzer xotirasida saqlanadi)
//  2) Hero rasmi topilmasa — o'rniga ism harflari ko'rsatiladi
//  3) Menyuda hozir ko'rilayotgan bo'lim belgilanadi
// =========================================================
(function () {
  var STORAGE_KEY = 'sayt-rejimi';

  // ---------- 1. Rejim ----------
  function rejimniQoy(rejim) {
    document.documentElement.setAttribute('data-theme', rejim);
    var tugma = document.querySelector('.theme-toggle');
    if (tugma) {
      tugma.setAttribute(
        'aria-label',
        rejim === 'light' ? "Qorong'i rejimga o'tish" : "Yorug' rejimga o'tish"
      );
    }
    try {
      localStorage.setItem(STORAGE_KEY, rejim);
    } catch (e) {
      /* localStorage ishlamasa, e'tibor bermaymiz */
    }
  }

  function boshlangichRejim() {
    try {
      var saqlangan = localStorage.getItem(STORAGE_KEY);
      if (saqlangan === 'light' || saqlangan === 'dark') return saqlangan;
    } catch (e) {}
    return 'dark'; // standart holat
  }

  // Sahifa chizilishidan oldin qo'yamiz — rang "miltillab" ketmasligi uchun
  document.documentElement.setAttribute('data-theme', boshlangichRejim());

  // ---------- 2. Hero rasmi ----------
  function rasmniTekshir() {
    var quti = document.getElementById('heroPhoto');
    if (!quti) return;
    var rasm = quti.querySelector('img');
    if (!rasm) return;

    function rasmYoq() {
      quti.classList.add('rasmsiz');
    }

    if (rasm.complete) {
      // Rasm yuklanib bo'lgan: eni 0 bo'lsa — demak fayl topilmagan
      if (!rasm.naturalWidth) rasmYoq();
    } else {
      rasm.addEventListener('error', rasmYoq);
    }
  }

  // ---------- 3. Menyudagi faol bo'lim ----------
  function menyuKuzatuvi() {
    var havolalar = [].slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    if (!havolalar.length || !('IntersectionObserver' in window)) return;

    var xarita = {};
    var bolimlar = [];

    havolalar.forEach(function (h) {
      var bolim = document.querySelector(h.getAttribute('href'));
      if (bolim) {
        xarita[bolim.id] = h;
        bolimlar.push(bolim);
      }
    });

    var kuzatuvchi = new IntersectionObserver(
      function (yozuvlar) {
        yozuvlar.forEach(function (y) {
          if (!y.isIntersecting) return;
          havolalar.forEach(function (h) {
            h.classList.remove('faol');
          });
          if (xarita[y.target.id]) xarita[y.target.id].classList.add('faol');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    bolimlar.forEach(function (b) {
      kuzatuvchi.observe(b);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var tugma = document.querySelector('.theme-toggle');
    if (tugma) {
      rejimniQoy(document.documentElement.getAttribute('data-theme'));
      tugma.addEventListener('click', function () {
        var hozirgi = document.documentElement.getAttribute('data-theme');
        rejimniQoy(hozirgi === 'light' ? 'dark' : 'light');
      });
    }
    rasmniTekshir();
    menyuKuzatuvi();
  });
})();
