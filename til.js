// =========================================================
//  Saytning uch tili: o'zbek (asosiy), rus, ingliz
//
//  Matnni o'zgartirish: pastdagi lug'atdan kalitni topib, uchta
//  tildagi qiymatini ham yangilang. HTML dagi element shu kalitni
//  "data-i18n" belgisi bilan ko'rsatadi.
//
//  Belgilar:
//    data-i18n="kalit"        — element ichidagi matn
//    data-i18n-html="kalit"   — ichida havola yoki <br> bo'lgan matn
//    data-i18n-aria="kalit"   — aria-label
//    data-i18n-title="kalit"  — title (sichqoncha ustiga kelganda)
// =========================================================
(function () {
  var STORAGE_KEY = 'sayt-tili';
  var STANDART = 'uz';

  var MATNLAR = {
    // ================= O'ZBEK =================
    uz: {
      'meta.title': 'Prestigious declarants — nufuzli deklarantlar',
      'meta.desc': "Prestigious declarants — chegaradan olib kiriladigan yuklar uchun bojxona hujjatlarini tayyorlaymiz.",
      'html.lang': 'uz',

      'brand.sub': 'Deklarantlar jamoasi',
      'nav.bosh': 'Bosh sahifa',
      'nav.xizmatlar': 'Xizmatlar',
      'nav.jamoa': 'Jamoa',
      'nav.ishlar': 'Ishlarimiz',
      'nav.fikrlar': 'Fikrlar',
      'nav.hamkorlar': 'Hamkorlar',
      'nav.savollar': 'Savollar',
      'nav.aloqa': 'Aloqa',
      'topbar.cta': "Bog'lanish",
      'topbar.menu': 'Menyu',
      'topbar.theme': "Qorong'i / yorug' rejim",
      'topbar.lang': 'Tilni tanlash',

      'hero.badge': '2+ yil tajriba · 50+ mijoz',
      'hero.eyebrow': 'Jamoa rahbari',
      'hero.h1': 'Rahbar ismi',
      'hero.kasb': 'Deklarant',
      'hero.namuna': "Rahbar rasmi — namuna",
      'hero.lead': "Chegaradan olib kiriladigan yuklar uchun bojxona hujjatlarini tayyorlaymiz — yukingiz kechikmasdan, ortiqcha xarajatsiz o'tishi uchun.",
      'hero.btn1': "Xizmatlarni ko'rish",
      'hero.trusted': 'Kimlar bilan ishlaymiz',
      'hero.t1': 'Logistika kompaniyalari',
      'hero.t2': 'Import qiluvchilar',
      'hero.t3': 'Bojxona omborlari',
      'hero.t4': 'Sertifikat markazlari',
      'hero.float1': 'Yillik<br>tajriba',
      'hero.float2': 'Qayta murojaat',

      'stat.1': 'yil tajriba',
      'stat.2': 'mijoz',
      'stat.3': 'qayta murojaat',
      'stat.4': "jamoa a'zosi",

      'xiz.badge': 'Xizmatlar',
      'xiz.h2': 'Nima bilan yordam beramiz',
      'xiz.sub': "Yukingiz chegaradan muammosiz o'tishi uchun kerak bo'ladigan barcha hujjat ishlarini o'z zimmamizga olamiz.",
      'xiz.1t': 'Bojxona deklaratsiyasini rasmiylashtirish',
      'xiz.1p': "Yuk bo'yicha deklaratsiyani to'ldirish va bojxona organiga taqdim etish.",
      'xiz.2t': 'Yuk hujjatlarini tayyorlash',
      'xiz.2p': "Shartnoma, invoys, qadoqlash varaqasi va transport hujjatlarini tekshirib, to'g'ri holatga keltirish.",
      'xiz.3t': 'TIF TN kodini aniqlash',
      'xiz.3p': "Tovaringizga mos kodni to'g'ri tanlash — bu boj stavkasi va keraksiz jarimalardan saqlaydi.",
      'xiz.4t': "Bojxona to'lovlarini hisoblash",
      'xiz.4p': 'Boj, aksiz va QQS summasini oldindan hisoblab beramiz — xarajatni yuk kelishidan avval bilasiz.',
      'xiz.5t': 'Sertifikat va ruxsatnomalar',
      'xiz.5p': "Muvofiqlik sertifikati va boshqa ruxsat hujjatlarini rasmiylashtirishda yo'l ko'rsatamiz.",
      'xiz.6t': 'Maslahat va kuzatuv',
      'xiz.6p': "Import jarayonining har bosqichida bog'lanib turamiz, savollaringizga javob beramiz.",

      'jamoa.badge': 'Jamoa',
      'jamoa.h2': 'Ish ustida turgan jamoa',
      'jamoa.sub': "Hujjatlaringiz bilan besh kishilik jamoa shug'ullanadi — bir kishiga bog'lanib qolmaysiz, ish to'xtamaydi.",
      'jamoa.boss.ism': 'Rahbar ismi',
      'jamoa.boss.rol': 'Rahbar · deklarant',
      'jamoa.boss.matn': "Rahbar haqidagi ma'lumot va rasm tez orada qo'shiladi.",
      'jamoa.gulom.rol': 'Deklarant',
      'jamoa.gulom.matn': "Yuk hujjatlarini tayyorlash va deklaratsiyani rasmiylashtirish bilan shug'ullanadi.",
      'jamoa.ism': 'Xodim ismi',
      'jamoa.rol': 'Lavozim',
      'jamoa.matn': "Xodim haqidagi qisqa ma'lumot keyin to'ldiriladi.",
      'jamoa.soon': "Ma'lumot tayyorlanmoqda",

      'ish.badge': 'Ishlarimiz',
      'ish.h2': 'Bajargan ishlarimizdan namunalar',
      'ish.sub': "Turli yuklar bo'yicha bajargan ishlarimiz shu yerda joylanadi.",
      'ish.nom': 'Ish nomi',
      'ish.izoh': "Qisqa izoh: qanday yuk edi, qaysi hujjatlar tayyorlandi va natija qanday bo'ldi.",
      'ish.chip': 'Tayyorlanmoqda',

      'fikr.badge': 'Mijozlar fikri',
      'fikr.h2': 'Mijozlar nima deydi',
      'fikr.sub': "Mijozlarimizning 80% i qayta murojaat qiladi. Ularning o'z so'zlari shu yerda chiqadi.",
      'fikr.matn': 'Bu yerga mijozning haqiqiy fikri yoziladi — 1–2 qisqa gap.',
      'fikr.ism': 'Mijoz ismi',
      'fikr.who': 'Kompaniya yoki kasbi',

      'hamkor.badge': 'Hamkorlar',
      'hamkor.h2': 'Hamkorlarimiz',
      'hamkor.sub': "Ish jarayonida bir necha yo'nalishdagi kompaniyalar bilan birgalikda ishlaymiz.",
      'hamkor.nom': 'Kompaniya nomi',
      'hamkor.1': 'Logistika kompaniyasi',
      'hamkor.2': 'Transport-ekspeditsiya xizmati',
      'hamkor.3': 'Sertifikatlashtirish markazi',
      'hamkor.4': 'Bojxona ombori',
      'hamkor.5': 'Bank — valyuta nazorati',
      'hamkor.6': "Sug'urta kompaniyasi",

      'savol.badge': 'Savol-javob',
      'savol.h2': "Ko'p beriladigan savollar",
      'savol.sub': "Mijozlar eng ko'p so'raydigan savollarga qisqa javoblar.",
      'savol.q1': 'Bojxona rasmiylashtirish uchun qanday hujjatlar kerak?',
      'savol.a1': "Odatda tashqi savdo shartnomasi, invoys, qadoqlash varaqasi va transport hujjati (CMR yoki TIR) kerak bo'ladi. Ba'zi tovarlar uchun kelib chiqish sertifikati ham talab qilinadi. Aniq ro'yxatni yukingiz turiga qarab aytib beramiz.",
      'savol.q2': 'Rasmiylashtirish qancha vaqt oladi?',
      'savol.a2': "Hujjatlar to'liq va to'g'ri bo'lsa, deklaratsiya bir ish kuni ichida topshiriladi. Sertifikat yoki qo'shimcha tekshiruv kerak bo'lsa, muddat uzayadi — buni hujjatlarni ko'rgach oldindan aytamiz.",
      'savol.q3': 'Xizmat narxi qanday belgilanadi?',
      'savol.a3': "Narx yuk turiga, hujjatlar hajmiga va ish shoshilinchligiga qarab kelishiladi. Avval hujjatlaringizni bepul ko'rib chiqamiz, keyin aniq summani aytamiz — kutilmagan qo'shimcha to'lov bo'lmaydi.",
      'savol.q4': "TIF TN kodi noto'g'ri tanlansa nima bo'ladi?",
      'savol.a4': "Kod boj stavkasini belgilaydi. Noto'g'ri kod ortiqcha to'lov, jarima yoki yukning bojxonada to'xtab qolishiga olib keladi. Shu sababli kodni tovar tavsifi va tarkibiga qarab tekshirib tanlaymiz.",
      'savol.q5': "Bojxona to'lovlarini yuk kelishidan oldin bilsam bo'ladimi?",
      'savol.a5': "Ha. Invoys va tovar nomi bo'lsa, boj, aksiz va QQS summasini oldindan hisoblab beramiz. Shunda xarajatni yuk yo'lga chiqmasdan rejalashtirasiz.",
      'savol.q6': 'Boshqa viloyatdan turib ishlash mumkinmi?',
      'savol.a6': "Mumkin. Hujjatlarni Telegram orqali yuborsangiz kifoya — qolgan ishni o'zimiz bajaramiz. Kelishingiz shart emas.",
      'savol.q7': "Yuk bojxonada to'xtab qolsa yordam berasizmi?",
      'savol.a7': "Ha. To'xtash sababini aniqlab, qaysi hujjat yetishmayotganini yoki qayerda xato borligini topamiz va tuzatilgan hujjatni tayyorlab beramiz.",

      'aloqa.badge': 'Aloqa',
      'aloqa.h2': "Bog'lanish",
      'aloqa.sub': "Qulay usulni tanlang — qo'ng'iroq qiling yoki Telegramda yozing.",
      'aloqa.note': 'Savolingiz bormi — yozing, javob beramiz.',

      'footer.bolimlar': "Bo'limlar",
      'footer.aloqa': 'Aloqa',
      'footer.tagline': "Bojxona hujjatlari — ishonchli qo'llarda.",
      'footer.rights': 'Prestigious declarants — nufuzli deklarantlar'
    },

    // ================= RUS =================
    ru: {
      'meta.title': 'Prestigious declarants — команда декларантов',
      'meta.desc': 'Prestigious declarants — готовим таможенные документы для грузов, ввозимых через границу.',
      'html.lang': 'ru',

      'brand.sub': 'Команда декларантов',
      'nav.bosh': 'Главная',
      'nav.xizmatlar': 'Услуги',
      'nav.jamoa': 'Команда',
      'nav.ishlar': 'Наши работы',
      'nav.fikrlar': 'Отзывы',
      'nav.hamkorlar': 'Партнёры',
      'nav.savollar': 'Вопросы',
      'nav.aloqa': 'Контакты',
      'topbar.cta': 'Связаться',
      'topbar.menu': 'Меню',
      'topbar.theme': 'Тёмный / светлый режим',
      'topbar.lang': 'Выбор языка',

      'hero.badge': '2+ года опыта · 50+ клиентов',
      'hero.eyebrow': 'Руководитель команды',
      'hero.h1': 'Имя руководителя',
      'hero.kasb': 'Декларант',
      'hero.namuna': 'Фото руководителя — образец',
      'hero.lead': 'Готовим таможенные документы для грузов, ввозимых через границу, — чтобы ваш груз прошёл без задержек и лишних расходов.',
      'hero.btn1': 'Посмотреть услуги',
      'hero.trusted': 'С кем мы работаем',
      'hero.t1': 'Логистические компании',
      'hero.t2': 'Импортёры',
      'hero.t3': 'Таможенные склады',
      'hero.t4': 'Центры сертификации',
      'hero.float1': 'Года<br>опыта',
      'hero.float2': 'Повторных обращений',

      'stat.1': 'года опыта',
      'stat.2': 'клиентов',
      'stat.3': 'повторных обращений',
      'stat.4': 'человека в команде',

      'xiz.badge': 'Услуги',
      'xiz.h2': 'Чем мы помогаем',
      'xiz.sub': 'Берём на себя всю документальную работу, которая нужна, чтобы ваш груз прошёл таможню без проблем.',
      'xiz.1t': 'Оформление таможенной декларации',
      'xiz.1p': 'Заполнение декларации по грузу и подача её в таможенный орган.',
      'xiz.2t': 'Подготовка документов на груз',
      'xiz.2p': 'Проверяем и приводим в порядок контракт, инвойс, упаковочный лист и транспортные документы.',
      'xiz.3t': 'Определение кода ТН ВЭД',
      'xiz.3p': 'Правильный подбор кода для вашего товара — от него зависит ставка пошлины и отсутствие штрафов.',
      'xiz.4t': 'Расчёт таможенных платежей',
      'xiz.4p': 'Заранее рассчитываем пошлину, акциз и НДС — вы знаете расходы до прихода груза.',
      'xiz.5t': 'Сертификаты и разрешения',
      'xiz.5p': 'Подсказываем, как оформить сертификат соответствия и другие разрешительные документы.',
      'xiz.6t': 'Консультация и сопровождение',
      'xiz.6p': 'Остаёмся на связи на каждом этапе импорта и отвечаем на ваши вопросы.',

      'jamoa.badge': 'Команда',
      'jamoa.h2': 'Кто работает над вашими документами',
      'jamoa.sub': 'Вашими документами занимается команда из пяти человек — вы не зависите от одного специалиста, работа не останавливается.',
      'jamoa.boss.ism': 'Имя руководителя',
      'jamoa.boss.rol': 'Руководитель · декларант',
      'jamoa.boss.matn': 'Информация и фото руководителя будут добавлены в ближайшее время.',
      'jamoa.gulom.rol': 'Декларант',
      'jamoa.gulom.matn': 'Занимается подготовкой документов на груз и оформлением декларации.',
      'jamoa.ism': 'Имя сотрудника',
      'jamoa.rol': 'Должность',
      'jamoa.matn': 'Краткая информация о сотруднике будет добавлена позже.',
      'jamoa.soon': 'Информация готовится',

      'ish.badge': 'Наши работы',
      'ish.h2': 'Примеры выполненных работ',
      'ish.sub': 'Здесь будут размещены наши работы по разным видам грузов.',
      'ish.nom': 'Название работы',
      'ish.izoh': 'Краткое описание: какой был груз, какие документы подготовлены и каким был результат.',
      'ish.chip': 'Готовится',

      'fikr.badge': 'Отзывы',
      'fikr.h2': 'Что говорят клиенты',
      'fikr.sub': '80% наших клиентов обращаются повторно. Здесь появятся их собственные слова.',
      'fikr.matn': 'Здесь будет настоящий отзыв клиента — 1–2 короткие фразы.',
      'fikr.ism': 'Имя клиента',
      'fikr.who': 'Компания или профессия',

      'hamkor.badge': 'Партнёры',
      'hamkor.h2': 'Наши партнёры',
      'hamkor.sub': 'В работе мы сотрудничаем с компаниями из нескольких направлений.',
      'hamkor.nom': 'Название компании',
      'hamkor.1': 'Логистическая компания',
      'hamkor.2': 'Транспортно-экспедиторские услуги',
      'hamkor.3': 'Центр сертификации',
      'hamkor.4': 'Таможенный склад',
      'hamkor.5': 'Банк — валютный контроль',
      'hamkor.6': 'Страховая компания',

      'savol.badge': 'Вопрос-ответ',
      'savol.h2': 'Частые вопросы',
      'savol.sub': 'Короткие ответы на вопросы, которые задают чаще всего.',
      'savol.q1': 'Какие документы нужны для таможенного оформления?',
      'savol.a1': 'Обычно требуются внешнеторговый контракт, инвойс, упаковочный лист и транспортный документ (CMR или TIR). Для некоторых товаров нужен также сертификат происхождения. Точный список подскажем по вашему виду груза.',
      'savol.q2': 'Сколько времени занимает оформление?',
      'savol.a2': 'Если документы полные и корректные, декларация подаётся в течение одного рабочего дня. Если нужен сертификат или дополнительная проверка, срок увеличивается — мы скажем об этом заранее, посмотрев документы.',
      'savol.q3': 'Как определяется стоимость услуги?',
      'savol.a3': 'Цена зависит от вида груза, объёма документов и срочности работы. Сначала бесплатно смотрим ваши документы, затем называем точную сумму — неожиданных доплат не будет.',
      'savol.q4': 'Что будет, если код ТН ВЭД выбран неверно?',
      'savol.a4': 'Код определяет ставку пошлины. Неверный код приводит к переплате, штрафу или задержке груза на таможне. Поэтому мы подбираем код по описанию и составу товара и проверяем его.',
      'savol.q5': 'Можно ли узнать таможенные платежи до прихода груза?',
      'savol.a5': 'Да. Если есть инвойс и наименование товара, мы заранее рассчитаем пошлину, акциз и НДС. Так вы спланируете расходы ещё до отправки груза.',
      'savol.q6': 'Можно ли работать из другого региона?',
      'savol.a6': 'Да. Достаточно отправить документы в Telegram — остальное сделаем сами. Приезжать не нужно.',
      'savol.q7': 'Поможете, если груз задержали на таможне?',
      'savol.a7': 'Да. Выясним причину задержки, найдём, какого документа не хватает или где допущена ошибка, и подготовим исправленный документ.',

      'aloqa.badge': 'Контакты',
      'aloqa.h2': 'Свяжитесь с нами',
      'aloqa.sub': 'Выберите удобный способ — позвоните или напишите в Telegram.',
      'aloqa.note': 'Есть вопрос — напишите, мы ответим.',

      'footer.bolimlar': 'Разделы',
      'footer.aloqa': 'Контакты',
      'footer.tagline': 'Таможенные документы — в надёжных руках.',
      'footer.rights': 'Prestigious declarants — команда декларантов'
    },

    // ================= INGLIZ =================
    en: {
      'meta.title': 'Prestigious declarants — customs declarants',
      'meta.desc': 'Prestigious declarants — we prepare customs documents for goods imported across the border.',
      'html.lang': 'en',

      'brand.sub': 'Team of customs declarants',
      'nav.bosh': 'Home',
      'nav.xizmatlar': 'Services',
      'nav.jamoa': 'Team',
      'nav.ishlar': 'Our work',
      'nav.fikrlar': 'Reviews',
      'nav.hamkorlar': 'Partners',
      'nav.savollar': 'FAQ',
      'nav.aloqa': 'Contact',
      'topbar.cta': 'Get in touch',
      'topbar.menu': 'Menu',
      'topbar.theme': 'Dark / light mode',
      'topbar.lang': 'Choose language',

      'hero.badge': '2+ years of experience · 50+ clients',
      'hero.eyebrow': 'Head of the team',
      'hero.h1': 'Name of the head',
      'hero.kasb': 'Customs declarant',
      'hero.namuna': "Head's photo — placeholder",
      'hero.lead': 'We prepare customs documents for goods imported across the border — so your cargo clears without delays or extra cost.',
      'hero.btn1': 'See services',
      'hero.trusted': 'Who we work with',
      'hero.t1': 'Logistics companies',
      'hero.t2': 'Importers',
      'hero.t3': 'Customs warehouses',
      'hero.t4': 'Certification centres',
      'hero.float1': 'Years of<br>experience',
      'hero.float2': 'Returning clients',

      'stat.1': 'years of experience',
      'stat.2': 'clients',
      'stat.3': 'returning clients',
      'stat.4': 'people in the team',

      'xiz.badge': 'Services',
      'xiz.h2': 'How we can help',
      'xiz.sub': 'We take care of all the paperwork needed for your cargo to clear customs without trouble.',
      'xiz.1t': 'Filing the customs declaration',
      'xiz.1p': 'Completing the declaration for your cargo and submitting it to the customs authority.',
      'xiz.2t': 'Preparing cargo documents',
      'xiz.2p': 'We check and put in order the contract, invoice, packing list and transport documents.',
      'xiz.3t': 'Determining the HS code',
      'xiz.3p': 'Choosing the right code for your goods — it sets the duty rate and keeps you clear of penalties.',
      'xiz.4t': 'Calculating customs payments',
      'xiz.4p': 'We calculate duty, excise and VAT in advance — you know the cost before the cargo arrives.',
      'xiz.5t': 'Certificates and permits',
      'xiz.5p': 'We guide you through obtaining the certificate of conformity and other permits.',
      'xiz.6t': 'Advice and follow-up',
      'xiz.6p': 'We stay in touch at every stage of the import and answer your questions.',

      'jamoa.badge': 'Team',
      'jamoa.h2': 'The team behind your documents',
      'jamoa.sub': 'A team of five works on your documents — you never depend on one person and the work never stops.',
      'jamoa.boss.ism': 'Name of the head',
      'jamoa.boss.rol': 'Head of the team · declarant',
      'jamoa.boss.matn': "The head of the team's details and photo will be added shortly.",
      'jamoa.gulom.rol': 'Customs declarant',
      'jamoa.gulom.matn': 'Prepares cargo documents and files the customs declaration.',
      'jamoa.ism': 'Team member name',
      'jamoa.rol': 'Position',
      'jamoa.matn': 'A short description of this team member will be added later.',
      'jamoa.soon': 'Details coming soon',

      'ish.badge': 'Our work',
      'ish.h2': 'Examples of completed work',
      'ish.sub': 'Our work on different types of cargo will be shown here.',
      'ish.nom': 'Project name',
      'ish.izoh': 'Short note: what the cargo was, which documents were prepared and what the outcome was.',
      'ish.chip': 'Coming soon',

      'fikr.badge': 'Reviews',
      'fikr.h2': 'What clients say',
      'fikr.sub': '80% of our clients come back. Their own words will appear here.',
      'fikr.matn': 'A real client review goes here — one or two short sentences.',
      'fikr.ism': 'Client name',
      'fikr.who': 'Company or profession',

      'hamkor.badge': 'Partners',
      'hamkor.h2': 'Our partners',
      'hamkor.sub': 'In our work we cooperate with companies from several fields.',
      'hamkor.nom': 'Company name',
      'hamkor.1': 'Logistics company',
      'hamkor.2': 'Freight forwarding service',
      'hamkor.3': 'Certification centre',
      'hamkor.4': 'Customs warehouse',
      'hamkor.5': 'Bank — currency control',
      'hamkor.6': 'Insurance company',

      'savol.badge': 'FAQ',
      'savol.h2': 'Frequently asked questions',
      'savol.sub': 'Short answers to the questions clients ask most often.',
      'savol.q1': 'Which documents are needed for customs clearance?',
      'savol.a1': 'Usually a foreign trade contract, an invoice, a packing list and a transport document (CMR or TIR). Some goods also require a certificate of origin. We will tell you the exact list for your type of cargo.',
      'savol.q2': 'How long does clearance take?',
      'savol.a2': 'If the documents are complete and correct, the declaration is filed within one working day. If a certificate or an additional inspection is needed it takes longer — we tell you in advance, once we have seen the documents.',
      'savol.q3': 'How is the price set?',
      'savol.a3': 'The price depends on the type of cargo, the amount of paperwork and how urgent the job is. We first review your documents free of charge and then give you an exact figure — with no surprise charges.',
      'savol.q4': 'What happens if the HS code is wrong?',
      'savol.a4': 'The code sets the duty rate. A wrong code means overpayment, a fine, or cargo held at customs. That is why we select the code from the description and composition of the goods and double-check it.',
      'savol.q5': 'Can I know the customs payments before the cargo arrives?',
      'savol.a5': 'Yes. With the invoice and the name of the goods we calculate duty, excise and VAT in advance, so you can plan the cost before the cargo even ships.',
      'savol.q6': 'Can you work with me from another region?',
      'savol.a6': 'Yes. Just send the documents over Telegram — we handle the rest. There is no need to travel.',
      'savol.q7': 'Will you help if the cargo is held at customs?',
      'savol.a7': 'Yes. We find the reason for the hold, identify the missing document or the mistake, and prepare the corrected paperwork.',

      'aloqa.badge': 'Contact',
      'aloqa.h2': 'Get in touch',
      'aloqa.sub': 'Pick whatever suits you — call us or write on Telegram.',
      'aloqa.note': 'If you have a question, write to us — we will answer.',

      'footer.bolimlar': 'Sections',
      'footer.aloqa': 'Contact',
      'footer.tagline': 'Customs paperwork in safe hands.',
      'footer.rights': 'Prestigious declarants — customs declarants'
    }
  };

  // ---------- Kalitga mos matnni olish ----------
  function matn(til, kalit) {
    var lugat = MATNLAR[til] || MATNLAR[STANDART];
    if (kalit in lugat) return lugat[kalit];
    return MATNLAR[STANDART][kalit] || '';
  }

  // ---------- Tilni qo'yish ----------
  function tilniQoy(til) {
    if (!MATNLAR[til]) til = STANDART;

    document.documentElement.setAttribute('lang', matn(til, 'html.lang'));

    // Oddiy matnlar
    [].forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      el.textContent = matn(til, el.getAttribute('data-i18n'));
    });

    // Ichida havola yoki <br> bo'lgan matnlar
    [].forEach.call(document.querySelectorAll('[data-i18n-html]'), function (el) {
      el.innerHTML = matn(til, el.getAttribute('data-i18n-html'));
    });

    // Belgilar
    [].forEach.call(document.querySelectorAll('[data-i18n-aria]'), function (el) {
      el.setAttribute('aria-label', matn(til, el.getAttribute('data-i18n-aria')));
    });
    [].forEach.call(document.querySelectorAll('[data-i18n-title]'), function (el) {
      el.setAttribute('title', matn(til, el.getAttribute('data-i18n-title')));
    });

    // Sahifa sarlavhasi va tavsifi
    document.title = matn(til, 'meta.title');
    var tavsif = document.querySelector('meta[name="description"]');
    if (tavsif) tavsif.setAttribute('content', matn(til, 'meta.desc'));

    // Tanlangan til tugmasi belgilanadi
    [].forEach.call(document.querySelectorAll('.lang-btn'), function (tugma) {
      var oz = tugma.getAttribute('data-til') === til;
      tugma.classList.toggle('faol', oz);
      tugma.setAttribute('aria-pressed', oz ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, til);
    } catch (e) {
      /* localStorage ishlamasa, e'tibor bermaymiz */
    }
  }

  function boshlangichTil() {
    try {
      var saqlangan = localStorage.getItem(STORAGE_KEY);
      if (saqlangan && MATNLAR[saqlangan]) return saqlangan;
    } catch (e) {}
    return STANDART;
  }

  // script.js shu funksiyalardan foydalanadi
  window.Til = {
    qoy: tilniQoy,
    boshlangich: boshlangichTil,
    matn: matn
  };
})();
