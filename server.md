# Kompyuter va server sozlamalari

Oxirgi yangilanish: 2026-09-12

Bu fayl — kompyuterda va serverda qilingan barcha ishlarning yozuvi. Biror narsa buzilsa yoki esdan chiqsa, shu yerdan qarang.

---

## 1. Sayt: gulomiy.uz

### Holat: ISHLAYAPTI

| Nima | Qiymat |
|---|---|
| Manzil | https://gulomiy.uz |
| Sayt nomi | Raxmonov G'ulombek — Deklarant |
| Javob kodi | 200 (normal) |
| Sahifa hajmi | ~16.8 KB |
| Ochilish vaqti | ~0.75 soniya |

### Zanjir: domendan saytgacha

Sayt ishlashi uchun uchta alohida xizmat birga ishlaydi:

```
Domen (Ahost)  →  DNS (Cloudflare)  →  Server (Hetzner)
   manzil           ma'lumotnoma          uyning o'zi
```

| Bosqich | Kim | Tafsilot |
|---|---|---|
| **Domen** | Ahost | `gulomiy.uz` shu yerda ro'yxatdan o'tgan |
| **DNS** | Cloudflare | Nom serverlari: `donovan.ns.cloudflare.com`, `jill.ns.cloudflare.com` |
| **Server** | Hetzner | IP: `89.167.82.57` (reverse DNS: `static.57.82.167.89.clients.your-server.de`) |
| **Veb-server** | Caddy | Serverda ishlab turgan dastur |
| **SSL** | Let's Encrypt | `12.09.2026` dan `11.12.2026` gacha |

### Texnik detallar

- **HTTP/2** yoqilgan, **HTTP/3** ham e'lon qilingan (tez ishlaydi)
- `http://` → `https://` avtomatik yo'naltiriladi (kod 308) — to'g'ri sozlangan
- Mobil qurilmalar uchun `viewport` mavjud — telefonda normal ko'rinadi
- Cloudflare proksi **o'chiq** ("DNS only" rejimi) — trafik to'g'ridan-to'g'ri Hetzner serveriga boradi

### Diqqat: hal qilinmagan masalalar

1. **`www.gulomiy.uz` ishlamaydi.** DNS da `www` yozuvi yo'q. Kimdir brauzerga `www.gulomiy.uz` yozsa, sayt ochilmaydi.
   **Yechim:** Cloudflare panelida DNS bo'limiga `www` uchun CNAME yozuvi qo'shish (`www` → `gulomiy.uz`).

2. **SSL sertifikat 11.12.2026 da tugaydi.** Caddy odatda uni o'zi yangilaydi, lekin dekabr boshida bir marta tekshirib qo'yish kerak.

3. **Cloudflare proksi o'chiq.** Yoqilsa: DDoS himoyasi, keshlash, serverning haqiqiy IP manzili yashiriladi. Majburiy emas, lekin foydali.

---

## 2. Kompyuterdagi dasturlar

Barchasi PATH da — istalgan papkadan chaqirsa ishlaydi.

| Dastur | Versiya | Joylashuvi |
|---|---|---|
| Node.js | v24.21.0 LTS | `D:\AI\dasturlar\nodejs` |
| npm | 11.19.0 | Node bilan birga |
| Git | 2.55.0 | `D:\AI\dasturlar\Git` |
| GitHub CLI (gh) | 2.100.0 | `D:\AI\dasturlar\gh` |
| Claude Code | 2.1.267 | `C:\Users\User\.local\bin` |
| Cursor | — | `%LOCALAPPDATA%\Programs\cursor` |
| Docker Engine | 29.8.0 | Ubuntu (WSL2) ichida |
| Docker Compose | v5.5.1 | Docker bilan birga |

### Qoida

Yangi dasturlar **`D:\AI\dasturlar`** ga o'rnatiladi — loyiha papkasiga emas. Sababi: `C:` diskda joy kam (~7.7 GB), va loyiha papkasi toza qolishi kerak.

---

## 3. Yo'l-yo'lakay hal qilingan muammolar

### "claude buyrug'i topilmadi"

**Sabab:** Claude Desktop ilovasi o'zining ichki `claude.exe` faylini saqlaydi, lekin uni PATH ga qo'shmaydi. Mustaqil CLI alohida o'rnatilishi kerak edi.
**Yechim:** `irm https://claude.ai/install.ps1 | iex` orqali o'rnatildi, so'ng `C:\Users\User\.local\bin` PATH ga qo'shildi.

### "npm ishga tushmadi — скрипты отключены"

**Sabab:** Windows sukut bo'yicha `.ps1` skriptlarini bloklaydi (`Restricted` rejimi). npm esa `npm.ps1` orqali ishlaydi.
**Yechim:** `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`. Bu faqat shu foydalanuvchi uchun, va internetdan yuklangan imzosiz skriptlar baribir bloklanadi.

### Git sozlamalari

`init.defaultBranch = main` (GitHub `main` ishlatadi, Git eski `master` nomini berardi) va `core.autocrlf = true` (Windows/Linux qator oxiri farqi muammosini oldini oladi).

---

## 4. Docker — nima uchun boshqacha o'rnatilgan

**Muammo:** Docker Desktop Windows 10 **22H2 (build 19045)** talab qiladi. Bu kompyuterda **build 19041** (versiya 2004). Ya'ni Docker Desktop o'rnatib bo'lmaydi.

**Yechim:** Docker Engine WSL2 ichidagi Ubuntu 24.04 ga o'rnatildi. Natija bir xil, ustiga kam joy egallaydi.

| Nima | Qiymat |
|---|---|
| Distributiv | Ubuntu-24.04 (WSL2) |
| Foydalanuvchi | `azimjon` |
| Disk fayli | `D:\AI\dasturlar\docker\wsl\ext4.vhdx` |
| Zaxira nusxa | `D:\AI\dasturlar\docker\ubuntu-zaxira.tar` |

### BUZMANG: uchta muhim tuzatish

Bu uchtasi bo'lmasa Docker umuman ishlamaydi.

**1. Statik DNS.** WSL ning o'z DNS serveri (`172.25.0.1`) bu tizimda javob bermaydi — Ubuntu ichida internet yo'q edi.
`/etc/wsl.conf` da `generateResolvConf = false`, `/etc/resolv.conf` da `1.1.1.1` va `8.8.8.8`. Fayl `chattr +i` bilan qulflangan.

**2. iptables-legacy.** Eski WSL2 yadrosi (5.10.16.3) `nftables` ni qo'llab-quvvatlamaydi — Docker demoni ishga tushmasdi.
`update-alternatives --set iptables /usr/sbin/iptables-legacy`

**3. Avtomatik ishga tushirish.** Bu WSL versiyasida `systemd` yo'q.
`/etc/profile.d/docker-autostart.sh` terminal ochilganda Docker ni ishga tushiradi. `/etc/sudoers.d/docker-wsl` da `azimjon` uchun faqat shu buyruqqa parolsiz ruxsat bor.

### Windows dan Docker ishlatish

`D:\AI\dasturlar\docker\bin\docker.cmd` — ko'prik fayl. PowerShell da `docker` deb yozsangiz, buyruq Ubuntu ga uzatiladi, joriy papka avtomatik o'giriladi.

**Cheklov:** `-v` da Windows absolut yo'li ishlamaydi.

| Yozuv | Ishlaydimi |
|---|---|
| `docker run -v D:\AI\vibecoding:/app ...` | Yo'q |
| `docker run -v .:/app ...` | Ha |
| `docker run -v /mnt/d/AI/vibecoding:/app ...` | Ha |

---

## 5. Ishchi stol yorliqlari

`C:\Users\User\Desktop\Vibecoding` papkasida:

| Yorliq | Nima qiladi |
|---|---|
| 1 - Claude Code | Terminal ochib, loyiha papkasida Claude ni ishga tushiradi |
| 2 - Cursor muharrir | Loyihani Cursor da ochadi |
| 3 - Terminal | PowerShell (node, npm, git, gh shu yerda) |
| 4 - Git Bash | Git Bash terminali |
| 5 - Loyiha papkasi | `D:\AI\vibecoding` |
| 6 - Docker o'rnatish fayllari | `D:\AI\dasturlar\docker` |
| 7 - Ubuntu + Docker terminal | Ubuntu ochadi, Docker o'zi ishga tushadi |

---

## 6. Foydali buyruqlar

**Sayt ishlayaptimi:**
```
curl -I https://gulomiy.uz
```

**DNS tekshirish:**
```
nslookup gulomiy.uz 8.8.8.8
```

**Docker holati (Windows PowerShell):**
```
docker ps
```

**Ubuntu ga kirish:**
```
wsl -d Ubuntu-24.04
```

**Ubuntu ni zaxiradan tiklash (agar buzilsa):**
```
wsl --unregister Ubuntu-24.04
wsl --import Ubuntu-24.04 D:\AI\dasturlar\docker\wsl D:\AI\dasturlar\docker\ubuntu-zaxira.tar --version 2
```

---

## 7. Hali qilinmagan ishlar

| Ish | Muhimligi |
|---|---|
| `www.gulomiy.uz` uchun DNS yozuvi qo'shish | O'rtacha — hozir bu manzil ochilmaydi |
| `gh auth login` — GitHub ga ulanish | GitHub ga kod yuborishni boshlaganda |
| Python o'rnatish | Kursda kerak bo'lsa (ataylab o'rnatilmagan) |
| Windows ni 22H2 ga yangilash | Past — hozirgi versiya 2021-yildan beri xavfsizlik yangilanishi olmaydi |
| `C:` diskni bo'shatish | Past — hozir 7.7 GB bo'sh |
