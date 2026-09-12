# Kompyuter ko'rinishidagi xatolar — tekshiruv va tuzatish qaydnomasi

**Sana:** 2026-yil 12-sentabr
**Sayt:** https://gulomiy.uz
**Commit:** `8472512` — "Kompyuter ko'rinishidagi xatolar tuzatildi"
**O'zgargan fayl:** faqat `style.css` (21 qator qo'shildi, 3 qator o'zgardi)

---

## 1. Muammo qanday qo'yilgan edi

"gulomiy.uz saytining kompyuter ko'rinishi juda yomon holatda."

Telefon ko'rinishi yaxshi ishlayotgan edi, kompyuterda esa sayt tartibsiz ko'rinardi.

## 2. Qanday tekshirildi

Sayt brauzerda ochilib, quyidagi holatlarda ko'rildi:

- **Ekran o'lchamlari:** 1280 × 800, 1440 × 900, 1920 × 1080 (kompyuter) va 390 × 844 (telefon, buzilmaganini tekshirish uchun)
- **Rejimlar:** qorong'i va yorug' — ikkalasi ham
- **Bo'limlar:** hero, statistika, xizmatlar, jamoa, ishlarimiz, fikrlar, hamkorlar, savol-javob, aloqa, futer — hammasi ketma-ket surib ko'rildi
- **O'lchov:** elementlarning haqiqiy joylashuvi brauzerda raqam bilan o'lchandi (qaysi element qayerdan boshlanib qayerda tugashi)

## 3. Topilgan xatolar

### Xato 1 — Suzuvchi deklaratsiya varag'i matn ustidan o'tib ketardi *(eng katta muammo)*

**Nima bo'lgan:** Orqa fondagi "deklaratsiya varag'i" bezagi ekranga mahkamlangan
(`position:fixed`) va sahifa surilgan sayin o'ng chetdan chap chetga suzib o'tardi.
Uning yo'li aynan matn ustunining o'rtasidan o'tardi, shaffofligi esa `0.85` — ya'ni
deyarli to'la ko'rinadigan, sariq ramkali varaq sarlavhalarni yopib qo'yardi.

**Qayerda ko'rinardi:** eng yomoni — "Ko'p beriladigan savollar" bo'limida. Sarlavha va
uning ostidagi izoh varaq ostida qolib, o'qib bo'lmasdi. Shuningdek "Mijozlar nima deydi",
"Ish ustida turgan jamoa" va "Bajargan ishlarimizdan namunalar" sarlavhalarida ham.

**Nega faqat kompyuterda:** telefon uchun (`max-width:700px`) varaqni kichraytirib,
xiralashtiradigan alohida qoida yozilgan edi. Kompyuter uchun bunday himoya yo'q edi.

**Yorug' rejimda yanada yomonroq** ko'rinardi — oq fonda varaq ramkasi keskin ajralib turardi.

### Xato 2 — Karta ustiga sichqoncha kelganda haddan tashqari kattalashardi

**Nima bo'lgan:** `transform: translateY(-12px) scale(1.1)` — karta 1,1 barobar kattalashardi.

**Nima uchun yomon:** karta eni 373px, kartalar orasidagi masofa esa atigi 18px. 1,1 barobar
kattalashganda karta har tomonga ~18px kengayib, qo'shni kartaning chetini bosib qolardi.
Bundan tashqari `scale` matnni cho'zgani uchun harflar xiralashib ko'rinardi.

**Nega faqat kompyuterda:** bu qoida `@media(hover:hover) and (pointer:fine)` ichida —
ya'ni faqat sichqonchali qurilmalarda ishlaydi. Telefonda umuman ishlamaydi.

### Xato 3 — Menyudan bo'limga o'tganda sarlavha yuqori panel ostida qolardi

**Nima bo'lgan:** `scroll-margin-top: 76px` qilib qo'yilgan, yuqori panelning o'zi esa
77px balandlikda. Ya'ni zaxira joy panelning balandligidan 1px kam edi — menyudan
bo'limga bosilganda sarlavha panelga tiqilib, nafas oladigan joy qolmasdi.

### Xato 4 — Savol-javob ustuni juda tor edi

**Nima bo'lgan:** `.faq{max-width:780px}`, sahifaning umumiy eni esa 1200px.
O'ng tomonda ~420px bo'sh joy qolib, bo'lim bir chetga qiyshaygandek ko'rinardi.

---

## 4. Qilingan tuzatishlar

Hammasi faqat `style.css` ichida. **Yangi fayl, yangi rang, yangi kutubxona qo'shilmadi.**

### 4.1. Varaq endi o'ng chetda, matndan tashqarida

Yangi qoida qo'shildi (`@media(max-width:700px)` blokidan oldin):

```css
/* Kompyuterda hujjat sahifa o'rtasidan o'tmasin:
   o'ng chetda, matn ustunidan tashqarida turadi va faqat pastga siljib to'ladi */
@media(min-width:1025px){
  .hujjat{top:132px}
  .hujjat-varaq{
    left:auto;
    /* Matn ustuni (1200px) chetidan tashqarida; joy tor bo'lsa chetdan chiqib turadi */
    right:max(-84px, calc(50% - 736px));
    width:128px;
    opacity:.24;
    transform:translateY(calc(var(--p) * 150px)) rotate(calc(5deg - var(--p) * 9deg));
  }
}
/* Keng ekranda chetda joy ko'p — biroz aniqroq ko'rinsin */
@media(min-width:1500px){
  .hujjat-varaq{opacity:.45}
}
```

**Nima o'zgardi:**

- Chapdan-o'ngga suzib o'tish **butunlay to'xtatildi** — varaq doim o'ng chetda turadi
- O'rniga sahifa surilgan sayin **pastga siljiydi** (`translateY`) va satrlari to'ladi —
  ya'ni "hujjat to'ldirilmoqda" degan asosiy g'oya saqlanib qoldi
- Shaffoflik `0.85` → `0.24` (keng ekranlarda `0.45`) — orqa fon bezagi darajasiga tushdi,
  saytdagi boshqa stikerlar (`0.07`) bilan bir uslubga keldi
- Eni 148px → 128px

**`right:max(-84px, calc(50% - 736px))` nima qiladi:** varaqni matn ustunidan tashqarida
ushlab turadi. Ekran keng bo'lsa chetdagi bo'sh yo'lakka joylashadi; ekran tor bo'lsa
varaqning bir qismi ekran chetidan chiqib turadi — lekin matnga baribir tegmaydi.

### 4.2. Karta hover yumshatildi

```css
/* eski */  transform:translateY(-12px) scale(1.1);
/* yangi */ transform:translateY(-6px) scale(1.02);
```

### 4.3. Sarlavha uchun zaxira joy oshirildi

```css
/* eski */  scroll-margin-top:76px;
/* yangi */ scroll-margin-top:104px;
```

### 4.4. Savol-javob ustuni kengaytirildi

```css
/* eski */  .faq{max-width:780px;display:grid;gap:12px}
/* yangi */ .faq{max-width:900px;display:grid;gap:12px}
```

---

## 5. Tuzatishdan keyin tekshirilganlar

| Tekshiruv | Natija |
|---|---|
| 1280px — varaq matnga tegmasligi | ✅ varaqning chap cheti 1219px da, matn esa 1210px da tugaydi |
| 1440px — varaq matnga tegmasligi | ✅ varaq 1317–1452px, matn ustuni 112–1312px |
| 1920px | ✅ varaq chetdagi bo'sh yo'lakda |
| Qorong'i rejim | ✅ toza |
| Yorug' rejim | ✅ toza, sarlavhalar to'liq o'qiladi |
| Menyudan "Savollar" ga o'tish | ✅ sarlavha paneldan 113px pastda, tiqilmaydi |
| 390px telefon | ✅ buzilmagan, gorizontal siljish yo'q (`scrollWidth` = 390) |

---

## 6. Hali qilinmagan / kelgusida ko'rish mumkin

1. **Telefonda varaq hali ham matnni kesib o'tadi.** 390px ekranda uni surib qo'yadigan
   bo'sh joy yo'q. Yechim: telefonda varaqni butunlay yashirish yoki shaffofligini
   `0.4` dan `0.15` ga tushirish. Hozircha tegilmadi — so'ralmagan.
2. **Namuna matnlar hali o'z joyida:** "Rahbar ismi", "Xodim ismi", "Kompaniya nomi",
   "Mijoz ismi", "Ish nomi". Haqiqiy ma'lumot kelganda almashtiriladi.
3. **Rahbar rasmi yo'q** — hozir "PD" harflari ko'rsatilmoqda.

---

## 7. Xulosa bir gapda

Kompyuterda saytni buzayotgan asosiy narsa — orqa fondagi deklaratsiya varag'i sahifaning
o'rtasidan suzib o'tib, sarlavhalarni yopib qo'yayotgani edi. Varaq o'ng chetga ko'chirilib
xiralashtirildi, qo'shimcha ravishda karta hover effekti yumshatildi, sarlavha zaxira joyi
va savol-javob ustuni kengaytirildi.
