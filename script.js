// =========================================================
//  Sayt skriptlari
//  1) Qorong'i / yorug' rejim (tanlov brauzer xotirasida saqlanadi)
//  2) Hero rasmi topilmasa — o'rniga ism harflari ko'rsatiladi
//  3) Menyuda hozir ko'rilayotgan bo'lim belgilanadi
//  4) Scroll qilganda bo'limlar pastdan ko'tarilib chiqadi
//  5) Telefonda menyu: faol havola ko'rinib turadi, o'ng chetda ishora
// =========================================================
(function () {
  var STORAGE_KEY = 'sayt-rejimi';

  // JS ishlayapti — CSS paydo bo'lish animatsiyasini yoqadi
  document.documentElement.classList.add('js');

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
    // Telefon brauzerining yuqori paneli sayt foni rangida bo'lsin
    var panelRangi = document.querySelector('meta[name="theme-color"]');
    if (panelRangi) {
      panelRangi.setAttribute(
        'content',
        getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
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
          var havola = xarita[y.target.id];
          if (havola) {
            havola.classList.add('faol');
            havolaniKorsat(havola);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    bolimlar.forEach(function (b) {
      kuzatuvchi.observe(b);
    });
  }

  // ---------- 5. Telefonda menyu ----------
  // Faol havola menyu sig'masa ham ko'rinib tursin (o'rtaga suriladi)
  function havolaniKorsat(h) {
    var nav = h.parentNode;
    if (nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollLeft = h.offsetLeft - (nav.clientWidth - h.offsetWidth) / 2;
  }

  // Menyu sig'masa — o'ng chetda ishora; oxiriga surilganda ishora yo'qoladi
  function menyuIshorasi() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    function yangila() {
      nav.classList.toggle('suriladi', nav.scrollWidth > nav.clientWidth + 1);
      nav.classList.toggle('oxirida', nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 2);
    }

    nav.addEventListener('scroll', yangila, { passive: true });
    window.addEventListener('resize', yangila);
    yangila();
  }

  // ---------- 4. Bo'limlarning paydo bo'lishi ----------
  // Ro'yxat style.css dagi "Jonlanish" qismi bilan bir xil bo'lishi kerak
  var JONLI = '.section-head, .stats, .grid > *, .faq, .contact .wrap';

  function paydoBolish() {
    var elementlar = [].slice.call(document.querySelectorAll(JONLI));
    var harakatsiz =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (harakatsiz || !('IntersectionObserver' in window)) {
      elementlar.forEach(function (e) {
        e.classList.add('korindi');
      });
      return;
    }

    // Bir qatordagi kartalar ketma-ket chiqsin
    [].forEach.call(document.querySelectorAll('.grid'), function (grid) {
      [].forEach.call(grid.children, function (karta, i) {
        karta.style.setProperty('--kechikish', (i % 3) * 0.07 + 's');
      });
    });

    var kuzatuvchi = new IntersectionObserver(
      function (yozuvlar) {
        yozuvlar.forEach(function (y) {
          if (!y.isIntersecting) return;
          y.target.classList.add('korindi');
          kuzatuvchi.unobserve(y.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    elementlar.forEach(function (e) {
      kuzatuvchi.observe(e);
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
    paydoBolish();
    menyuIshorasi();
  });
})();
