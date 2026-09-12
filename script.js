// =========================================================
//  Sayt skriptlari
//  1) Qorong'i / yorug' rejim (tanlov brauzer xotirasida saqlanadi)
//  2) Hero rasmi topilmasa — o'rniga ism harflari ko'rsatiladi
//  3) Menyuda hozir ko'rilayotgan bo'lim belgilanadi
//  4) Scroll qilganda bo'limlar pastdan ko'tarilib chiqadi
//  5) Telefonda ☰ menyusi: ochish, yopish, havola bosilganda yopilishi
//  6) Til: UZ / RU / EN tugmalari (matnlar til.js faylida)
//  7) Orqa fondagi deklaratsiya hujjati: sahifa surilgan sayin siljiydi va to'ladi
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
          if (havola) havola.classList.add('faol');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    bolimlar.forEach(function (b) {
      kuzatuvchi.observe(b);
    });
  }

  // ---------- 5. Telefonda ☰ menyusi ----------
  function menyuTugmasi() {
    var tugma = document.getElementById('burger');
    var menyu = document.getElementById('menyu');
    if (!tugma || !menyu) return;

    function yop() {
      menyu.classList.remove('ochiq');
      tugma.setAttribute('aria-expanded', 'false');
    }

    tugma.addEventListener('click', function () {
      var ochiq = menyu.classList.toggle('ochiq');
      tugma.setAttribute('aria-expanded', ochiq ? 'true' : 'false');
    });

    // Bo'lim tanlansa menyu yopiladi
    [].forEach.call(menyu.querySelectorAll('a'), function (h) {
      h.addEventListener('click', yop);
    });

    // Menyudan tashqariga bosilsa yoki Esc bosilsa — yopiladi
    document.addEventListener('click', function (e) {
      if (!menyu.classList.contains('ochiq')) return;
      if (menyu.contains(e.target) || tugma.contains(e.target)) return;
      yop();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') yop();
    });

    // Ekran kengaysa (kompyuter ko'rinishi) — yopiq holatga qaytadi
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) yop();
    });
  }

  // ---------- 7. Deklaratsiya hujjatining siljishi ----------
  // Sahifa qanchaga surilgani 0…1 oralig'ida "--p" ga yoziladi.
  // Qolganini CSS bajaradi: varaq o'ngdan chapga siljiydi, satrlari to'ladi.
  function hujjatSiljishi() {
    var hujjat = document.getElementById('hujjat');
    if (!hujjat) return;

    var harakatsiz =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (harakatsiz) return; // CSS da o'rtacha holatda qotib turadi

    var kutilmoqda = false;

    function yangila() {
      kutilmoqda = false;
      var yol = document.documentElement.scrollHeight - window.innerHeight;
      var p = yol > 0 ? window.scrollY / yol : 0;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      hujjat.style.setProperty('--p', p.toFixed(4));
    }

    function sora() {
      if (kutilmoqda) return;
      kutilmoqda = true;
      window.requestAnimationFrame(yangila);
    }

    window.addEventListener('scroll', sora, { passive: true });
    window.addEventListener('resize', sora);
    yangila();
  }

  // ---------- 6. Til tugmalari ----------
  function tilTugmalari() {
    if (!window.Til) return;
    window.Til.qoy(window.Til.boshlangich());

    [].forEach.call(document.querySelectorAll('.lang-btn'), function (tugma) {
      tugma.addEventListener('click', function () {
        window.Til.qoy(tugma.getAttribute('data-til'));
      });
    });
  }

  // ---------- 4. Bo'limlarning paydo bo'lishi ----------
  // Ro'yxat style.css dagi "Jonlanish" qismi bilan bir xil bo'lishi kerak
  var JONLI = '.section-head, .stats, .grid > *, .jamoa-grid > *, .faq, .contact-card';

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
    [].forEach.call(document.querySelectorAll('.grid, .jamoa-grid'), function (grid) {
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
    tilTugmalari();
    rasmniTekshir();
    menyuKuzatuvi();
    paydoBolish();
    menyuTugmasi();
    hujjatSiljishi();
  });
})();
