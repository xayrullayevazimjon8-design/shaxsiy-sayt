# Kengaytirilgan sayt namunasi — bajarilgan ishlar

**Sayt:** https://gulomiy.uz
**Sana:** 2026-09-12
**Holat:** struktura va ko'rinish tayyor. Rasm va ba'zi ma'lumotlar namuna holatida — ular kelganda to'ldiriladi.

Bu fayl — saytda nima qilinganining to'liq qaydnomasi. Keyinroq "nima qilingan edi, qayerdan o'zgartiraman" degan savol chiqsa, shu faylga qarash kifoya.

---

## 1. Nima edi → nima bo'ldi

| | Oldin | Hozir |
|---|---|---|
| Sayt egasi | bitta deklarantning shaxsiy vizitkasi | 5 kishilik jamoa sayti |
| Nomi | Raxmonov G'ulombek | **Prestigious declarants** (nufuzli deklarantlar) |
| Til | faqat o'zbek | **o'zbek · rus · ingliz** |
| Menyu | 6 havola, telefonda yon tomonga suriladigan | **8 havola**, telefonda ☰ tugmasi ostidagi panel |
| Bo'limlar | 7 ta | **8 ta** (Jamoa qo'shildi) |
| Orqa fon | faqat rang | rang + **6 stiker** + **siljiydigan deklaratsiya hujjati** |
| Ohang | "men tayyorlayman" | "biz tayyorlaymiz" (jamoa nomidan) |

Dizayn namunasi sifatida **Redsun** uslubidagi Webflow shabloni olindi: o'rtada "pill" menyu, kichik yorliq-pill, burchagida strelkasi bor rasm kartalari, ajratib ko'rsatilgan karta, katta CTA bloki, ustunli futer. Ranglar o'zgarmadi — hozirgi iliq qahva/amber palitra saqlandi.

---

## 2. Sayt nomi

- Yuqori panelda va futerda **"Prestigious declarants"** yozuvi turadi.
- Bu yozuv **til almashtirilganda o'zgarmaydi** (maxsus shunday qilingan — `data-i18n` belgisi qo'yilmagan).
- Tagidagi kichik yozuv esa tarjima bo'ladi: *Deklarantlar jamoasi / Команда декларантов / Team of customs declarants*.
- Logotip harflari: `PD`.
- Sahifa sarlavhasi va havola kartasi (`og:title`, `og:site_name`, `og:image:alt`) ham yangi nomga o'tkazildi.
- `og:url` va `og:image` `github.io` manzilidan **https://gulomiy.uz** ga almashtirildi.

---

## 3. Sahifa strukturasi

Tartib bo'yicha:

| № | Bo'lim | ID (menyu havolasi) | Holat |
|---|---|---|---|
| 1 | Hero — rahbar ismi, rasmi, tugmalar | `#bosh` | rahbar ma'lumoti **namuna** |
| 2 | Statistika — 4 karta | `#statistika` | tayyor |
| 3 | Xizmatlar — 6 karta | `#xizmatlar` | tayyor |
| 4 | Jamoa — 5 kishi | `#jamoa` | 1 kishi tayyor, 4 ta **namuna** |
| 5 | Ishlarimiz — 3 karta | `#ishlarimiz` | **namuna** (joy ajratilgan) |
| 6 | Mijozlar fikri — 3 karta | `#fikrlar` | **namuna** (joy ajratilgan) |
| 7 | Hamkorlar — 6 karta | `#hamkorlar` | **namuna** (haqiqiy nomlar kutilmoqda) |
| 8 | Savol-javob — 7 savol | `#savollar` | tayyor |
| 9 | Bog'lanish | `#aloqa` | tayyor |
| 10 | Futer — ustunli | — | tayyor |

**Statistika kartalari:** `2+` yil tajriba · `50+` mijoz · `80%` qayta murojaat · `5` jamoa a'zosi.

---

## 4. Menyu

- Barcha 8 bo'lim nomi yozilgan: Bosh sahifa · Xizmatlar · Jamoa · Ishlarimiz · Fikrlar · Hamkorlar · Savollar · Aloqa.
- Nom bosilganda o'sha bo'limga **silliq siljib** o'tadi.
- Hozir ko'rilayotgan bo'lim menyuda **yorib** turadi (avtomatik).
- **1024px dan keng** ekranda: bitta qator "pill" menyu.
- **1024px dan tor** ekranda: ☰ tugmasi. Tugma bosilganda panel ochiladi; ichida bo'limlar, til tugmalari va "Bog'lanish" tugmasi bor. Panel havola bosilganda, tashqariga bosilganda yoki `Esc` bosilganda yopiladi.

---

## 5. Uch til — `til.js`

Saytdagi **barcha matn** `til.js` faylida, bitta lug'atda turadi. HTML ichida matn emas, **kalit** ko'rsatiladi.

**Belgilar:**

| Belgi | Nima uchun |
|---|---|
| `data-i18n="kalit"` | oddiy matn |
| `data-i18n-html="kalit"` | ichida `<br>` yoki havola bo'lgan matn |
| `data-i18n-aria="kalit"` | ko'zi ojizlar uchun izoh (`aria-label`) |
| `data-i18n-title="kalit"` | sichqoncha ustiga kelganda chiqadigan yozuv |

**Matnni o'zgartirish:** `til.js` dan kalitni topib, **uchta tildagi** qiymatini ham yangilash kerak. Masalan:

```js
'xiz.1t': 'Bojxona deklaratsiyasini rasmiylashtirish',   // uz bo'limida
'xiz.1t': 'Оформление таможенной декларации',            // ru bo'limida
'xiz.1t': 'Filing the customs declaration',              // en bo'limida
```

**Boshqa xususiyatlar:**
- Standart til — **o'zbek**. Tanlangan til brauzer xotirasida saqlanadi (`sayt-tili`), keyingi kirishda o'shanday ochiladi.
- Til almashtirilganda sahifa sarlavhasi, tavsifi va `<html lang>` belgisi ham o'zgaradi (bu Google uchun muhim).
- Jami **105 ta kalit**, uchta tilda ham to'liq — tekshirildi, bo'sh qolgan joy yo'q.

---

## 6. Jamoa bo'limi (5 kishi)

| Karta | Kim | Holat |
|---|---|---|
| Katta karta (ajratib ko'rsatilgan) | tashkilot rahbari | **bo'sh** — ism, rasm, lavozim kutilmoqda |
| 2-karta | **Raxmonov G'ulombek** — deklarant | rasmi, lavozimi, telefoni bor |
| 3, 4, 5-kartalar | xodimlar | **bo'sh** — ism, rasm, lavozim kutilmoqda |

Bo'sh kartalarda "Ma'lumot tayyorlanmoqda" yorlig'i turadi. Rasm qo'yilmagan joyda odam belgisi ko'rinadi.

---

## 7. Orqa fon

### 7.1. Stikerlar (6 ta)

Sohaga oid belgilar: **qadoq, yuk mashinasi, muhr, ombor, globus, tarozi**. Sahifa bo'ylab tarqatilgan, matn ortida, 5–10% shaffoflikda — o'qishga xalaqit bermaydi va bosilmaydi.

- HTML: `index.html` boshidagi `<div class="fon">` ichida.
- Joyini o'zgartirish: `style.css` dagi `.stiker-1` … `.stiker-6` (har birida `top`, `left`/`right`, o'lcham va burilish).
- Ko'proq/kamroq ko'rinishi: `.stiker{opacity:…}`.

### 7.2. Deklaratsiya hujjati (siljiydigan animatsiya)

Sahifa ochilganda **yuqori o'ng** burchakda **bo'sh varaq** turadi. Sahifa pastga tushgan sayin:

1. varaq **yuqori chap** burchakka siljiydi;
2. bir vaqtda satrlari ketma-ket **to'ladi**;
3. oxirida **muhr** bosiladi.

Qanday ishlaydi: `script.js` sahifa qanchaga surilganini `0…1` oralig'ida hisoblab, `--p` o'zgaruvchisiga yozadi. Qolganini CSS bajaradi — varaqning o'rni, burilishi va har bir satrning ko'rinishi shu bitta sondan chiqadi.

| Sozlash | Qayerda |
|---|---|
| Varaqning yo'li (o'ngdan chapga) | `style.css` → `.hujjat-varaq { left: calc(92% - var(--p) * 86%) }` |
| Balandligi | `.hujjat { top: … }` |
| O'lchami va shaffofligi | `.hujjat-varaq { width: … ; opacity: … }` |
| Qaysi satr qachon to'lishi | `index.html` dagi har bir satrda `style="--k:.14"` — `--k` kichik bo'lsa, ertaroq to'ladi |

Telefonda hujjat kichikroq va xiraroq. Qurilmada "harakatni kamaytirish" yoqilgan bo'lsa, hujjat qimirlamaydi (o'rtacha holatda turadi).

---

## 8. Savol-javob (7 savol)

1. Bojxona rasmiylashtirish uchun qanday hujjatlar kerak?
2. Rasmiylashtirish qancha vaqt oladi?
3. Xizmat narxi qanday belgilanadi?
4. TIF TN kodi noto'g'ri tanlansa nima bo'ladi?
5. Bojxona to'lovlarini yuk kelishidan oldin bilsam bo'ladimi?
6. Boshqa viloyatdan turib ishlash mumkinmi?
7. Yuk bojxonada to'xtab qolsa yordam berasizmi?

Javoblar uch tilda yozilgan, `til.js` dagi `savol.a1` … `savol.a7` kalitlarida. Bittasi ochilsa, qolganlari o'zi yopiladi.

---

## 9. Qorong'i / yorug' rejim

- Tugma yuqori panelda (oy / quyosh belgisi) — **saqlandi**.
- Standart holat — qorong'i. Tanlov brauzer xotirasida saqlanadi (`sayt-rejimi`).
- Barcha yangi elementlar (stikerlar, hujjat, jamoa kartalari, futer) **ikki rejimda ham** tekshirildi.

---

## 10. Fayllar

| Fayl | Vazifasi |
|---|---|
| `index.html` | sahifa tuzilishi |
| `style.css` | barcha ko'rinish, ranglar, moslashuvchanlik |
| `script.js` | rejim, menyu, til tugmalari, hujjat animatsiyasi, bo'limlarning paydo bo'lishi |
| `til.js` | **uch tildagi barcha matn** (yangi fayl) |
| `hero.jpg` | Raxmonov G'ulombekning rasmi (jamoa kartasida) |
| `rahbar.jpg` | **hali yo'q** — rahbar rasmi shu nom bilan kutilmoqda |
| `favicon.svg`, `apple-touch-icon.png` | brauzer yorlig'i belgisi |
| `og-image.jpg` | havola kartasi rasmi (Telegram, Facebook) |
| `server/serve.js` | mahalliy ko'rish uchun kichik server |
| `server.md` | server va domen sozlamalari qaydnomasi |

Kutubxona, framework, npm yo'q — sof HTML/CSS/JS.

---

## 11. Rasm va ma'lumot yuborish qo'llanmasi

### Rasmlar

Fayllarni loyiha papkasiga tashlang: `D:\AI\vibecoding\1-saytim (10.09.2026)\`
Nomlari **aynan shunday** bo'lsin — kod shu nomlarni kutadi:

| Fayl nomi | Kim | O'lcham |
|---|---|---|
| `rahbar.jpg` | tashkilot rahbari (hero + jamoa kartasi) | **vertikal**, ~900×1200 yoki kattaroq |
| `xodim-2.jpg` | 2-xodim | **kvadrat**, 600×600 yetadi |
| `xodim-3.jpg` | 3-xodim | kvadrat, 600×600 |
| `xodim-4.jpg` | 4-xodim | kvadrat, 600×600 |

Format: JPG, har biri 300 KB atrofida.

### Ma'lumotlar

Har bir xodim uchun shu tartibda yozib bering (o'zbekcha yozsangiz kifoya — rus va ingliz tiliga tarjima qilinadi):

```text
1. Ism familiya — Lavozim
   Qisqa tavsif (1-2 gap)
   Telefon / Telegram (xohlasangiz)
```

---

## 12. To'ldirilishi kerak bo'lgan joylar

- [ ] Rahbarning ismi, lavozimi, rasmi (`rahbar.jpg`) — hero va jamoa kartasi
- [ ] 3 xodimning ismi, lavozimi, rasmi va qisqa tavsifi
- [ ] Raxmonov G'ulombekning lavozimi va tavsifi (hozir taxminiy yozilgan — tekshirish kerak)
- [ ] "Ishlarimiz" — 3 ta haqiqiy ish: nomi, izohi, rasmi
- [ ] "Mijozlar fikri" — mijozlarning haqiqiy fikri (roziligi bilan)
- [ ] "Hamkorlar" — haqiqiy kompaniya nomlari
- [ ] Xodimlar bo'yicha statistika (aytilganda qo'shiladi)
- [ ] `og-image.jpg` — havola kartasi rasmini yangi nom bilan qayta tayyorlash
- [ ] `CLAUDE.md` dagi loyiha ta'rifi (hozir "shaxsiy sayt" deb yozilgan, endi jamoa sayti)

---

## 13. Tekshiruv natijalari

| Nima tekshirildi | Natija |
|---|---|
| 390px (telefon) | gorizontal siljish yo'q |
| 768px (planshet) | 2 ustunli kartalar, ☰ menyu ishlaydi |
| 1030px | menyu bitta qatorga sig'adi |
| 1280px | 4 statistika · 3 ustunli jamoa · 3 ustunli futer |
| Uch til | sarlavha, tavsif, menyu, savollar — hammasi almashadi; "Prestigious declarants" o'zgarmaydi |
| Ikki rejim | qorong'i va yorug' — barcha yangi element to'g'ri |
| Hujjat animatsiyasi | yuqorida `x≈977px` → o'rtada `x≈519px` → oxirida `x≈44px`, satrlar va muhr to'liq |
| Konsol | `rahbar.jpg` (hali yo'q) dan boshqa xato yo'q |

---

## 14. Ishga tushirish va chiqarish

**Kompyuterda ko'rish:**

```bash
node server/serve.js
```

Keyin brauzerda: http://localhost:4173

**Saytga chiqarish:** `main` shoxiga push qilinsa, GitHub Actions ishga tushadi va serverdagi `~/deploy.sh` orqali sayt yangilanadi. Batafsil: `server.md`.

### ⚠️ Hozir auto-deploy ishlamayapti

**Holat (2026-09-12):** kod GitHub'ga yuborilgan, lekin serverga tushmayapti — https://gulomiy.uz hali eski ko'rinishda.

**Xato:**

```text
fatal: could not read Username for 'https://github.com': No such device or address
Process exited with status 128
```

**Sababi:** repozitoriy **yopiq (private)**, serverdagi `~/deploy.sh` esa `https://` orqali `git pull` qiladi. Yopiq repodan tortib olish uchun parol yoki kalit kerak, serverda esa u yo'q. Oxirgi muvaffaqiyatli deploy — 2026-09-11, 20:04.

**Yechimlar (bittasini tanlash kerak):**

| Yechim | Nima qilinadi | Izoh |
|---|---|---|
| 1. Repoyni ochiq qilish | GitHub → Settings → General → Change visibility → Public | Eng tez yo'l. Repoda parol/token yo'q (ular GitHub Secrets da), sayt matni allaqachon hammaga ochiq |
| 2. Serverga SSH deploy kalit | Serverda kalit yaratib, uning ochiq qismini GitHub → Settings → Deploy keys ga qo'shish, so'ng `git remote set-url origin git@github.com:...` | Repo yopiq qoladi |
| 3. Fayllarni SSH bilan ko'chirish | `deploy.yml` da `git pull` o'rniga `scp-action` ishlatish | GitHub Actions da SSH kalit allaqachon bor; serverdagi sayt papkasi nomi kerak |

Yechimdan keyin deployni qayta ishga tushirish:

```bash
gh run rerun --failed
```

---

## 15. Ish qoidalari (eslatma)

- Yangi rang qo'shilmaydi — faqat `style.css` boshidagi CSS o'zgaruvchilaridan foydalaniladi.
- Har yangi element qorong'i va yorug' rejimda, hamda 390px kenglikda tekshiriladi.
- Faktlar o'ylab topilmaydi: telefon `+998 97 207 59 60`, Telegram `@Raxmonov_01082002`, `2+` yil, `50+` mijoz, `80%` qayta murojaat, `5` xodim.
- Parol, kalit, token hech qachon fayllarga yozilmaydi.
