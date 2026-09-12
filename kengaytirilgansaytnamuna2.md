
---

# QO'SHIMCHA: brauzer keshi muammosi (o'sha kuni topildi)

## Muammo

Tuzatishlardan keyin sayt kompyuterda **butunlay buzilib** ko'rindi:

- Orqa fondagi belgilar (stikerlar) va deklaratsiya varag'i butun ekranni to'ldiradigan
  darajada kattalashib ketgan
- UZ / RU / EN tugmalari oddiy to'rtburchak ramkaga aylangan (bezaksiz)
- Til tugmalari ikki marta ko'rinadi, ☰ tugmasi yo'q
- Rahbar rasmi ulkan holda chiqib, kartalarni bosib qolgan

## Sabab

Jonli saytdagi `style.css` **to'g'ri** edi — tekshirildi:

| Tekshiruv | Natija |
|---|---|
| Jonli fayl hajmi | 28 397 bayt — mahalliy fayl bilan bir xil |
| `.stiker`, `.hujjat-varaq`, `.lang-btn`, `.burger`, `.jamoa-grid` | hammasi joyida |
| Yangi `min-width:1025px` qoidasi | joyida |

Demak muammo serverda emas — **brauzer eski `style.css` faylini xotirasida saqlab qolgan**.
Buzilgan klasslarning hammasi (`.stiker`, `.hujjat`, `.lang-btn`, `.burger`) sayt jamoa
saytiga aylantirilganda **yangi qo'shilgan** klasslar. Eski CSS faylida ular umuman yo'q —
shuning uchun ular bezaksiz, o'lchamsiz holda chiqqan. Eski klasslar (`.topbar`, `.nav`,
`.btn`, `.card`) esa ishlagan.

**Nega kesh yangilanmagan:** server (Caddy) `Cache-Control` sarlavhasini yubormaydi.
Faqat `Etag` va `Last-Modified` bor. Bunday holda brauzer o'zi qaror qiladi va faylni
qayta so'ramasdan soatlab eski nusxadan foydalanishi mumkin.

## Yechim

`index.html` da fayl manzillariga versiya raqami qo'shildi:

```html
<link rel="stylesheet" href="style.css?v=20260912">
<script src="til.js?v=20260912"></script>
<script src="script.js?v=20260912"></script>
```

Manzil o'zgargani uchun brauzer buni **yangi fayl** deb biladi va eski nusxani ishlatmaydi.

**Kelgusida:** `style.css`, `script.js` yoki `til.js` jiddiy o'zgarganda `?v=` dagi sanani
yangilash kerak (masalan `?v=20261001`). Shunda barcha mijozlar yangi faylni oladi.

**Muqobil (server tomonda):** Caddy sozlamasiga `Cache-Control` qo'shish ham mumkin,
lekin u repozitoriyda emas, serverda turadi.

## Tekshirildi

- `style.css?v=20260912`, `til.js?v=20260912`, `script.js?v=20260912` — uchalasi 200 OK
- CSS ishlayapti: `.stiker` eni 120px, `.lang-btn` yumaloqligi 999px
- JS ishlayapti: til almashtirish moduli yuklandi

## Eslatma: `rahbar.jpg` topilmayapti (404)

Bu kutilgan holat — rahbarning rasmi hali qo'shilmagan. Skript buni sezib, o'rniga
"PD" harflarini ko'rsatadi. Rasm qo'shilganda o'zi tuzaladi.
