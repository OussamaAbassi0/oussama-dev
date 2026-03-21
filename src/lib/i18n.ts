/* ══════════════════════════════════════════════════════════
   TRADUCTIONS COMPLÈTES DU SITE
   Langues : FR / EN / AR / ES / NL (Dutch)
══════════════════════════════════════════════════════════ */

export type SiteLang = "fr" | "en" | "ar" | "es" | "nl";

export const LANGS: { code: SiteLang; label: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "fr", label: "Français",  flag: "🇫🇷", dir: "ltr" },
  { code: "en", label: "English",   flag: "🇬🇧", dir: "ltr" },
  { code: "ar", label: "العربية",   flag: "🇸🇦", dir: "rtl" },
  { code: "es", label: "Español",   flag: "🇪🇸", dir: "ltr" },
  { code: "nl", label: "Nederlands",flag: "🇳🇱", dir: "ltr" },
];

export interface Translations {
  /* ── Navbar ────────────────────────────── */
  nav: {
    lab: string; roi: string; blog: string; start: string; liveLab: string;
    menuRapide: string; quickLinks: string;
  };

  /* ── Hero ──────────────────────────────── */
  hero: {
    badge: string; headline1: string; words: string[];
    subtitle: string; subtitleBold: string;
    cta: string; ctaSecondary: string;
    hint: string; scroll: string;
    stat1: string; stat2: string; stat3: string;
    availability: string;
  };

  /* ── How it works ──────────────────────── */
  how: {
    label: string; title1: string; title2: string; subtitle: string;
    step1Title: string; step1Desc: string; step1Cta: string;
    step2Title: string; step2Desc: string; step2Cta: string;
    step3Title: string; step3Desc: string; step3Cta: string;
    stepLabel: string;
    reassure1: string; reassure2: string; reassure3: string; reassure4: string;
  };

  /* ── Before / After ────────────────────── */
  ba: {
    label: string; title: string; subtitle: string;
    before: string; after: string; hint: string;
    topic1: string; topic2: string; topic3: string; topic4: string;
  };

  /* ── Case Studies ──────────────────────── */
  cases: {
    label: string; title1: string; title2: string; subtitle: string;
    before: string; solution: string; results: string; roi: string;
  };

  /* ── Lab sections ──────────────────────── */
  lab: {
    leadLabel: string; leadTitle: string; leadSub: string;
    workflowLabel: string; workflowTitle: string; workflowSub: string;
    roiLabel: string; roiTitle: string; roiSub: string;
    blueprintLabel: string; blueprintTitle: string;
    auditLabel: string; auditTitle: string;
  };

  /* ── Gallery ───────────────────────────── */
  gallery: {
    label: string; title1: string; title2: string; subtitle: string;
    cta: string; custom: string; customCta: string;
    wantThis: string; delivery: string; saving: string;
  };

  /* ── Quiz ──────────────────────────────── */
  quiz: {
    label: string; title1: string; title2: string; subtitle: string;
    start: string; free: string; noSignup: string; instant: string;
    result: string; restartCta: string; startRoadmap: string;
  };

  /* ── Timeline ──────────────────────────── */
  timeline: {
    label: string; title1: string; title2: string; subtitle: string;
    guarantee: string; guaranteeDesc: string;
  };

  /* ── Testimonials ──────────────────────── */
  testi: { label: string; title1: string; title2: string; };

  /* ── Blog ──────────────────────────────── */
  blog: {
    label: string; title1: string; title2: string; subtitle: string;
    readMore: string; viewAll: string; available: string;
  };

  /* ── FAQ ───────────────────────────────── */
  faq: {
    label: string; title1: string; title2: string;
    question: string; questionCta: string;
    q1: string; a1: string;
    q2: string; a2: string;
    q3: string; a3: string;
    q4: string; a4: string;
    q5: string; a5: string;
    q6: string; a6: string;
  };

  /* ── About ─────────────────────────────── */
  about: {
    label: string; title: string; titleAccent: string;
    desc1: string; desc2: string; cta: string; available: string;
  };

  /* ── CTA Section ───────────────────────── */
  cta: {
    label: string; title1: string; title2: string; subtitle: string;
    namePlaceholder: string; emailPlaceholder: string;
    problemPlaceholder: string; toolsPlaceholder: string;
    send: string; sending: string; success: string; successDesc: string;
    name: string; email: string; problem: string; tools: string; budget: string;
  };

  /* ── Footer ────────────────────────────── */
  footer: {
    lost: string; based: string; automate: string; start: string;
  };
}

const t: Record<SiteLang, Translations> = {
  /* ════════════════════════════════════════════════════════
     FRANÇAIS
  ════════════════════════════════════════════════════════ */
  fr: {
    nav: {
      lab:"Lab", roi:"ROI", blog:"Blog", start:"Démarrer →", liveLab:"LIVE LAB",
      menuRapide:"Menu Rapide...", quickLinks:"Navigation rapide",
    },
    hero: {
      badge:"Lab interactif · Testez en direct",
      headline1:"Votre business peut",
      words:["Automatisez.", "Scalez.", "Dominez."],
      subtitle:"Je suis Oussama — spécialiste IA et automatisation. Mon but n'est pas de vous vendre du code.",
      subtitleBold:"Mon but est de vous faire gagner du temps et de l'argent.",
      cta:"Voir ce que je peux faire pour vous →",
      ctaSecondary:"ou démarrer un projet directement →",
      hint:"Navigation rapide :",
      scroll:"SCROLL",
      stat1:"Leads générés automatiquement",
      stat2:"Économisées / mois",
      stat3:"Satisfaction client",
      availability:"créneaux restants",
    },
    how: {
      label:"// Comment ça marche",
      title1:"3 étapes simples.", title2:"Zéro jargon technique.",
      subtitle:"Que vous soyez dirigeant, commercial ou responsable RH — ce processus est fait pour vous.",
      step1Title:"Testez les outils",
      step1Desc:"Essayez gratuitement le chercheur de prospects, le calculateur de ROI ou le générateur de workflow. Aucune inscription requise — les résultats sont immédiats.",
      step1Cta:"Tester maintenant",
      step2Title:"Décrivez votre projet",
      step2Desc:"Remplissez le formulaire de brief en 2 minutes. Pas de jargon technique — expliquez simplement votre problème avec vos mots.",
      step2Cta:"Remplir le brief",
      step3Title:"Recevez une analyse sous 24h",
      step3Desc:"Oussama vous répond avec une solution concrète, un chiffrage et un plan d'action. Pas de promesses vagues — des résultats mesurables.",
      step3Cta:"Démarrer",
      stepLabel:"ÉTAPE",
      reassure1:"Aucune inscription requise", reassure2:"Résultats en temps réel",
      reassure3:"100% gratuit à tester",      reassure4:"Réponse sous 24h garantie",
    },
    ba: {
      label:"// Transformation concrète", title:"La différence est ", subtitle:"Comparez votre quotidien avant et après l'automatisation. Glissez le curseur pour révéler la transformation.",
      before:"AVANT", after:"APRÈS", hint:"← Glissez le curseur pour révéler →",
      topic1:"Gestion des emails", topic2:"Prospection commerciale", topic3:"Recrutement RH", topic4:"Reporting & KPIs",
    },
    cases: {
      label:"// Résultats clients réels", title1:"Des chiffres vrais.", title2:"Des clients satisfaits.",
      subtitle:"Pas de témoignages inventés. Voici 3 cas clients avec les chiffres avant et après.",
      before:"AVANT", solution:"SOLUTION", results:"RÉSULTATS", roi:"ROI atteint en",
    },
    lab: {
      leadLabel:"// Playground #01 — Smart Lead Engine", leadTitle:"The Live B2B", leadSub:"Tapez votre cible ou choisissez un secteur ci-dessous. Le moteur scrape, enrichit et livre 3 vrais leads avec signal d'intent en temps réel.",
      workflowLabel:"// Playground #02 — Interactive Builder", workflowTitle:"The n8n Magic", workflowSub:"Construisez l'automatisation vous-même. Connectez les nœuds dans l'ordre, regardez l'IA travailler en temps réel.",
      roiLabel:"// Playground #03 — ROI Calculator", roiTitle:"Combien perdez-vous", roiSub:"Ajustez les sliders selon votre situation réelle.",
      blueprintLabel:"// Playground #05 — Live Blueprint", blueprintTitle:"Décrivez votre process",
      auditLabel:"// Playground #04 — Audit Machine", auditTitle:"Analysez votre site",
    },
    gallery: {
      label:"// Bibliothèque d'automatisations", title1:"Choisissez votre workflow.", title2:"On s'occupe du reste.",
      subtitle:"6 automatisations prêtes à déployer. Cliquez sur celle qui vous correspond — le formulaire se pré-remplit automatiquement.",
      cta:"Je veux ça →", custom:"Votre besoin n'est pas dans la liste ?", customCta:"Décrire mon besoin sur mesure →",
      wantThis:"Je veux ça →", delivery:"Livraison", saving:"Économie",
    },
    quiz: {
      label:"// Diagnostic personnalisé", title1:"Où en êtes-vous ?", title2:"Obtenez votre Roadmap IA",
      subtitle:"5 questions. 2 minutes. Une roadmap d'automatisation taillée pour votre profil.",
      start:"Démarrer le diagnostic →", free:"✓ Gratuit", noSignup:"✓ Sans inscription", instant:"✓ Résultat immédiat",
      result:"Résultat", restartCta:"↺ Refaire le quiz", startRoadmap:"Démarrer ma roadmap avec Oussama →",
    },
    timeline: {
      label:"// Processus de livraison", title1:"De votre brief à la mise en production", title2:"en 6 jours.",
      subtitle:"Un processus clair, structuré et sans surprise. Vous savez exactement ce qui se passe chaque jour.",
      guarantee:"Garantie satisfaction 30 jours",
      guaranteeDesc:"Si le workflow ne fonctionne pas comme convenu à la livraison, je corrige gratuitement jusqu'à ce que ce soit parfait. Aucun risque pour vous.",
    },
    testi: { label:"// Ils témoignent", title1:"Ce que disent", title2:"mes clients." },
    blog: {
      label:"// Blog & Ressources", title1:"Conseils concrets.", title2:"Résultats prouvés.",
      subtitle:"Des articles basés sur de vrais projets. Pas de théorie — des systèmes qui tournent en production.",
      readMore:"Lire l'article →", viewAll:"Voir tous les articles →",
      available:"Articles disponibles en",
    },
    faq: {
      label:"// Questions fréquentes", title1:"Tout ce que vous voulez savoir", title2:"avant de nous contacter",
      question:"Vous avez une question spécifique à votre situation ?", questionCta:"Poser ma question →",
      q1:"Je ne suis pas développeur. Puis-je quand même travailler avec vous ?",
      a1:"Absolument — et c'est même mon client idéal. Mon rôle est de traduire votre problème métier en solution technique. Vous n'avez pas besoin de comprendre le code. Vous décrivez le problème, je construis la solution.",
      q2:"Combien de temps prend une automatisation ?",
      a2:"Un workflow simple prend 2 à 5 jours. Un système plus complexe avec IA et multi-agents, 2 à 4 semaines. Je livre toujours en plusieurs étapes pour que vous voyez des résultats rapidement.",
      q3:"Est-ce que ça fonctionne avec mes outils existants (Excel, Gmail, HubSpot...) ?",
      a3:"Dans 95% des cas, oui. Les outils que j'utilise se connectent à plus de 400 applications : Gmail, Google Sheets, HubSpot, Slack, Notion, Stripe, Jira, LinkedIn...",
      q4:"Quel est le coût d'une automatisation ?",
      a4:"Un workflow simple commence à partir de 500€. Un système complet avec IA et multi-agents se situe entre 2 000€ et 8 000€. Le ROI est calculable dès le départ.",
      q5:"Qu'est-ce que l'IA peut vraiment automatiser pour mon business ?",
      a5:"Trier et répondre aux emails, qualifier des leads automatiquement, extraire des données de documents, générer des rapports, analyser des avis clients, poster sur les réseaux sociaux...",
      q6:"Que se passe-t-il si l'automatisation tombe en panne après livraison ?",
      a6:"Je fournis une documentation complète et une période de support de 30 jours. Les outils utilisés ont des systèmes d'alertes intégrés qui vous préviennent en cas de problème.",
    },
    about: {
      label:"// À propos",
      title:"Je suis Oussama,", titleAccent:"développeur passionné par l'IA",
      desc1:"Mon but n'est pas de vous vendre du code.",
      desc2:"Mon but est de vous faire gagner du temps et de l'argent. Je conçois des systèmes d'automatisation qui travaillent pendant que vous dormez.",
      cta:"Tester mes outils ⚡", available:"Disponible",
    },
    cta: {
      label:"// Démarrer un projet", title1:"Décrivez votre projet.", title2:"Je reviens sous 24h.",
      subtitle:"Pas de devis automatique. Je lis chaque message personnellement.",
      namePlaceholder:"Votre prénom", emailPlaceholder:"votre@email.com",
      problemPlaceholder:"Décrivez votre problème ou besoin...",
      toolsPlaceholder:"Gmail, HubSpot, Slack...",
      send:"Envoyer mon brief →", sending:"Envoi en cours...",
      success:"Message envoyé !", successDesc:"Je vous réponds sous 24h avec une analyse et un plan d'action.",
      name:"Prénom", email:"Email", problem:"Votre problème / besoin", tools:"Outils utilisés", budget:"Budget estimé",
    },
    footer: {
      lost:"EN LISANT CETTE PAGE, VOUS AVEZ PERDU",
      based:"Basé sur 35€/h · Automatisez avant que ça continue →",
      automate:"Automatisez avant que ça continue →",
      start:"Démarrer un projet",
    },
  },

  /* ════════════════════════════════════════════════════════
     ENGLISH
  ════════════════════════════════════════════════════════ */
  en: {
    nav: {
      lab:"Lab", roi:"ROI", blog:"Blog", start:"Get started →", liveLab:"LIVE LAB",
      menuRapide:"Quick Menu...", quickLinks:"Quick navigation",
    },
    hero: {
      badge:"Interactive Lab · Test live",
      headline1:"Your business can",
      words:["Automate.", "Scale.", "Dominate."],
      subtitle:"I'm Oussama — AI & automation specialist. My goal is not to sell you code.",
      subtitleBold:"My goal is to save you time and money.",
      cta:"See what I can do for you →",
      ctaSecondary:"or start a project directly →",
      hint:"Quick navigation:",
      scroll:"SCROLL",
      stat1:"Leads generated automatically",
      stat2:"Hours saved / month",
      stat3:"Client satisfaction",
      availability:"slots remaining",
    },
    how: {
      label:"// How it works",
      title1:"3 simple steps.", title2:"Zero technical jargon.",
      subtitle:"Whether you're a CEO, sales director or HR manager — this process is made for you.",
      step1Title:"Test the tools",
      step1Desc:"Try the lead finder, ROI calculator or workflow generator for free. No signup required — results are immediate.",
      step1Cta:"Test now",
      step2Title:"Describe your project",
      step2Desc:"Fill in the brief form in 2 minutes. No technical jargon — just explain your problem in your own words.",
      step2Cta:"Fill the brief",
      step3Title:"Receive an analysis within 24h",
      step3Desc:"Oussama gets back to you with a concrete solution, a quote and an action plan. No vague promises — measurable results.",
      step3Cta:"Get started",
      stepLabel:"STEP",
      reassure1:"No signup required", reassure2:"Real-time results",
      reassure3:"100% free to test",   reassure4:"Reply guaranteed within 24h",
    },
    ba: {
      label:"// Concrete transformation", title:"The difference is ", subtitle:"Compare your daily life before and after automation. Drag the slider to reveal the transformation.",
      before:"BEFORE", after:"AFTER", hint:"← Drag slider to reveal →",
      topic1:"Email management", topic2:"Sales prospecting", topic3:"HR recruitment", topic4:"Reporting & KPIs",
    },
    cases: {
      label:"// Real client results", title1:"Real numbers.", title2:"Satisfied clients.",
      subtitle:"No made-up testimonials. Here are 3 client cases with before and after numbers.",
      before:"BEFORE", solution:"SOLUTION", results:"RESULTS", roi:"ROI reached in",
    },
    lab: {
      leadLabel:"// Playground #01 — Smart Lead Engine", leadTitle:"The Live B2B", leadSub:"Type your target or choose a sector below. The engine scrapes, enriches and delivers 3 real leads with real-time intent signals.",
      workflowLabel:"// Playground #02 — Interactive Builder", workflowTitle:"The n8n Magic", workflowSub:"Build the automation yourself. Connect the nodes in order, watch the AI work in real time.",
      roiLabel:"// Playground #03 — ROI Calculator", roiTitle:"How much are you losing", roiSub:"Adjust the sliders to match your real situation.",
      blueprintLabel:"// Playground #05 — Live Blueprint", blueprintTitle:"Describe your process",
      auditLabel:"// Playground #04 — Audit Machine", auditTitle:"Analyze your website",
    },
    gallery: {
      label:"// Automation library", title1:"Choose your workflow.", title2:"We handle the rest.",
      subtitle:"6 ready-to-deploy automations. Click the one that fits you — the form pre-fills automatically.",
      cta:"I want this →", custom:"Your need isn't in the list?", customCta:"Describe my custom need →",
      wantThis:"I want this →", delivery:"Delivery", saving:"Saving",
    },
    quiz: {
      label:"// Personalized diagnosis", title1:"Where are you?", title2:"Get your AI Roadmap",
      subtitle:"5 questions. 2 minutes. An automation roadmap tailored to your profile.",
      start:"Start the diagnosis →", free:"✓ Free", noSignup:"✓ No signup", instant:"✓ Instant result",
      result:"Result", restartCta:"↺ Retake the quiz", startRoadmap:"Start my roadmap with Oussama →",
    },
    timeline: {
      label:"// Delivery process", title1:"From your brief to production", title2:"in 6 days.",
      subtitle:"A clear, structured process with no surprises. You know exactly what happens each day.",
      guarantee:"30-day satisfaction guarantee",
      guaranteeDesc:"If the workflow doesn't work as agreed at delivery, I fix it for free until it's perfect. Zero risk for you.",
    },
    testi: { label:"// Testimonials", title1:"What my", title2:"clients say." },
    blog: {
      label:"// Blog & Resources", title1:"Practical advice.", title2:"Proven results.",
      subtitle:"Articles based on real projects. No theory — systems running in production.",
      readMore:"Read article →", viewAll:"View all articles →",
      available:"Articles available in",
    },
    faq: {
      label:"// Frequently asked questions", title1:"Everything you want to know", title2:"before contacting us",
      question:"Do you have a specific question about your situation?", questionCta:"Ask my question →",
      q1:"I'm not a developer. Can I still work with you?",
      a1:"Absolutely — and that's actually my ideal client. My role is to translate your business problem into a technical solution. You don't need to understand the code. You describe the problem, I build the solution.",
      q2:"How long does an automation take?",
      a2:"A simple workflow takes 2 to 5 days. A more complex system with AI and multi-agents, 2 to 4 weeks. I always deliver in stages so you see results quickly.",
      q3:"Does it work with my existing tools (Excel, Gmail, HubSpot...)?",
      a3:"In 95% of cases, yes. The tools I use connect to 400+ applications: Gmail, Google Sheets, HubSpot, Slack, Notion, Stripe, Jira, LinkedIn...",
      q4:"How much does an automation cost?",
      a4:"A simple workflow starts at €500. A complete system with AI and multi-agents ranges from €2,000 to €8,000. ROI is calculable from the start.",
      q5:"What can AI really automate for my business?",
      a5:"Sorting and replying to emails, automatically qualifying leads, extracting data from documents, generating reports, analyzing customer reviews, posting on social media...",
      q6:"What happens if the automation breaks after delivery?",
      a6:"I provide complete documentation and a 30-day support period. The tools used have built-in alert systems that notify you if there's a problem.",
    },
    about: {
      label:"// About",
      title:"I'm Oussama,", titleAccent:"passionate AI developer",
      desc1:"My goal is not to sell you code.",
      desc2:"My goal is to save you time and money. I design automation systems that work while you sleep.",
      cta:"Test my tools ⚡", available:"Available",
    },
    cta: {
      label:"// Start a project", title1:"Describe your project.", title2:"I'll get back to you within 24h.",
      subtitle:"No automatic quote. I read every message personally.",
      namePlaceholder:"Your first name", emailPlaceholder:"your@email.com",
      problemPlaceholder:"Describe your problem or need...",
      toolsPlaceholder:"Gmail, HubSpot, Slack...",
      send:"Send my brief →", sending:"Sending...",
      success:"Message sent!", successDesc:"I'll reply within 24h with an analysis and action plan.",
      name:"First name", email:"Email", problem:"Your problem / need", tools:"Tools used", budget:"Estimated budget",
    },
    footer: {
      lost:"WHILE READING THIS PAGE, YOU LOST",
      based:"Based on €35/h · Automate before it continues →",
      automate:"Automate before it continues →",
      start:"Start a project",
    },
  },

  /* ════════════════════════════════════════════════════════
     ARABIC
  ════════════════════════════════════════════════════════ */
  ar: {
    nav: {
      lab:"المختبر", roi:"العائد", blog:"المدونة", start:"ابدأ الآن ←", liveLab:"مباشر",
      menuRapide:"قائمة سريعة...", quickLinks:"تنقل سريع",
    },
    hero: {
      badge:"مختبر تفاعلي · اختبر مباشرة",
      headline1:"يمكن لعملك أن",
      words:["يتمتّع بالأتمتة.", "ينمو.", "يسود."],
      subtitle:"أنا أسامة — متخصص في الذكاء الاصطناعي والأتمتة. هدفي ليس بيعك الكود.",
      subtitleBold:"هدفي هو توفير وقتك ومالك.",
      cta:"اكتشف ما يمكنني فعله لك ←",
      ctaSecondary:"أو ابدأ مشروعاً مباشرة ←",
      hint:"التنقل السريع:",
      scroll:"التمرير",
      stat1:"عميل محتمل تم توليده تلقائياً",
      stat2:"ساعة موفّرة شهرياً",
      stat3:"رضا العملاء",
      availability:"أماكن متبقية",
    },
    how: {
      label:"// كيف يعمل",
      title1:"3 خطوات بسيطة.", title2:"صفر مصطلحات تقنية.",
      subtitle:"سواء كنت مديراً تنفيذياً أو مديراً تجارياً أو مسؤول موارد بشرية — هذه العملية مصممة لك.",
      step1Title:"اختبر الأدوات",
      step1Desc:"جرّب الباحث عن العملاء المحتملين أو حاسبة ROI أو منشئ سير العمل مجاناً. لا تسجيل مطلوب — النتائج فورية.",
      step1Cta:"اختبر الآن",
      step2Title:"صف مشروعك",
      step2Desc:"املأ نموذج الموجز في دقيقتين. لا مصطلحات تقنية — اشرح مشكلتك بكلماتك الخاصة.",
      step2Cta:"أكمل الموجز",
      step3Title:"احصل على تحليل خلال 24 ساعة",
      step3Desc:"يرد أسامة بحل ملموس وتسعيرة وخطة عمل. لا وعود مبهمة — نتائج قابلة للقياس.",
      step3Cta:"ابدأ",
      stepLabel:"الخطوة",
      reassure1:"لا تسجيل مطلوب", reassure2:"نتائج في الوقت الحقيقي",
      reassure3:"مجاني 100% للاختبار", reassure4:"رد مضمون خلال 24 ساعة",
    },
    ba: {
      label:"// التحول الملموس", title:"الفرق ", subtitle:"قارن يومك قبل وبعد الأتمتة. اسحب المؤشر للكشف عن التحول.",
      before:"قبل", after:"بعد", hint:"← اسحب المؤشر للكشف ←",
      topic1:"إدارة البريد الإلكتروني", topic2:"التنقيب التجاري", topic3:"التوظيف", topic4:"التقارير والمؤشرات",
    },
    cases: {
      label:"// نتائج عملاء حقيقيين", title1:"أرقام حقيقية.", title2:"عملاء راضون.",
      subtitle:"لا شهادات مخترعة. إليك 3 حالات عملاء بالأرقام قبل وبعد.",
      before:"قبل", solution:"الحل", results:"النتائج", roi:"تم تحقيق العائد في",
    },
    lab: {
      leadLabel:"// ملعب #01 — محرك العملاء", leadTitle:"صياد العملاء", leadSub:"اكتب هدفك أو اختر قطاعاً. المحرك يستخرج ويثري ويسلّم 3 عملاء محتملين حقيقيين في الوقت الحقيقي.",
      workflowLabel:"// ملعب #02 — منشئ تفاعلي", workflowTitle:"سحر n8n", workflowSub:"ابنِ الأتمتة بنفسك. اربط العقد بالترتيب وشاهد الذكاء الاصطناعي يعمل.",
      roiLabel:"// ملعب #03 — حاسبة ROI", roiTitle:"كم تخسر الآن؟", roiSub:"اضبط الشرائح وفقاً لوضعك الحقيقي.",
      blueprintLabel:"// ملعب #05 — المخطط المباشر", blueprintTitle:"صف عمليتك",
      auditLabel:"// ملعب #04 — آلة التدقيق", auditTitle:"حلّل موقعك",
    },
    gallery: {
      label:"// مكتبة الأتمتة", title1:"اختر سير عملك.", title2:"نحن نتولى الباقي.",
      subtitle:"6 أتمتات جاهزة للنشر. انقر على الذي يناسبك — يمتلئ النموذج تلقائياً.",
      cta:"أريد هذا ←", custom:"احتياجك غير موجود في القائمة؟", customCta:"صف احتياجي المخصص ←",
      wantThis:"أريد هذا ←", delivery:"التسليم", saving:"التوفير",
    },
    quiz: {
      label:"// تشخيص شخصي", title1:"أين أنت الآن؟", title2:"احصل على خارطة طريق الذكاء الاصطناعي",
      subtitle:"5 أسئلة. دقيقتان. خارطة طريق أتمتة مصممة لملفك الشخصي.",
      start:"ابدأ التشخيص ←", free:"✓ مجاني", noSignup:"✓ بدون تسجيل", instant:"✓ نتيجة فورية",
      result:"النتيجة", restartCta:"↺ أعد الاختبار", startRoadmap:"ابدأ خارطة الطريق مع أسامة ←",
    },
    timeline: {
      label:"// عملية التسليم", title1:"من موجزك إلى الإنتاج", title2:"في 6 أيام.",
      subtitle:"عملية واضحة ومنظمة بدون مفاجآت. ستعرف بالضبط ما يحدث كل يوم.",
      guarantee:"ضمان الرضا 30 يوماً",
      guaranteeDesc:"إذا لم يعمل سير العمل كما هو متفق عليه عند التسليم، أصلحه مجاناً حتى يصبح مثالياً. لا مخاطر عليك.",
    },
    testi: { label:"// شهادات العملاء", title1:"ما يقوله", title2:"عملائي." },
    blog: {
      label:"// المدونة والموارد", title1:"نصائح عملية.", title2:"نتائج مثبتة.",
      subtitle:"مقالات مبنية على مشاريع حقيقية. لا نظرية — أنظمة تعمل في الإنتاج.",
      readMore:"← اقرأ المقال", viewAll:"← عرض جميع المقالات",
      available:"المقالات متاحة بـ",
    },
    faq: {
      label:"// الأسئلة الشائعة", title1:"كل ما تريد معرفته", title2:"قبل التواصل معنا",
      question:"هل لديك سؤال محدد حول وضعك؟", questionCta:"← اطرح سؤالي",
      q1:"لست مطوراً. هل يمكنني العمل معك رغم ذلك؟",
      a1:"بالتأكيد — وهذا في الواقع عميلي المثالي. دوري هو ترجمة مشكلتك التجارية إلى حل تقني. لا تحتاج إلى فهم الكود. أنت تصف المشكلة، وأنا أبني الحل.",
      q2:"كم من الوقت تستغرق الأتمتة؟",
      a2:"يستغرق سير العمل البسيط 2 إلى 5 أيام. أما النظام الأكثر تعقيداً مع الذكاء الاصطناعي، فيستغرق من أسبوعين إلى 4 أسابيع.",
      q3:"هل يعمل مع أدواتي الحالية (Excel، Gmail، HubSpot...)؟",
      a3:"في 95% من الحالات، نعم. تتصل الأدوات التي أستخدمها بأكثر من 400 تطبيق.",
      q4:"ما هي تكلفة الأتمتة؟",
      a4:"يبدأ سير العمل البسيط من 500 يورو. ويتراوح النظام الكامل مع الذكاء الاصطناعي بين 2000 و8000 يورو.",
      q5:"ما الذي يمكن للذكاء الاصطناعي أتمتته فعلاً لعملي؟",
      a5:"فرز الرسائل والرد عليها، تأهيل العملاء المحتملين تلقائياً، استخراج البيانات من المستندات، إنشاء التقارير...",
      q6:"ماذا يحدث إذا توقفت الأتمتة بعد التسليم؟",
      a6:"أقدم وثائق كاملة وفترة دعم مدتها 30 يوماً. تحتوي الأدوات على أنظمة تنبيه تخطرك في حالة وجود مشكلة.",
    },
    about: {
      label:"// من أنا",
      title:"أنا أسامة،", titleAccent:"مطور شغوف بالذكاء الاصطناعي",
      desc1:"هدفي ليس بيعك الكود.",
      desc2:"هدفي هو توفير وقتك ومالك. أصمم أنظمة أتمتة تعمل بينما أنت نائم.",
      cta:"اختبر أدواتي ⚡", available:"متاح",
    },
    cta: {
      label:"// ابدأ مشروعاً", title1:"صف مشروعك.", title2:"سأرد خلال 24 ساعة.",
      subtitle:"لا عروض أسعار تلقائية. أقرأ كل رسالة شخصياً.",
      namePlaceholder:"اسمك الأول", emailPlaceholder:"بريدك@الإلكتروني.com",
      problemPlaceholder:"صف مشكلتك أو احتياجك...",
      toolsPlaceholder:"Gmail، HubSpot، Slack...",
      send:"← أرسل موجزي", sending:"جاري الإرسال...",
      success:"تم إرسال الرسالة!", successDesc:"سأرد خلال 24 ساعة بتحليل وخطة عمل.",
      name:"الاسم الأول", email:"البريد الإلكتروني", problem:"مشكلتك / احتياجك", tools:"الأدوات المستخدمة", budget:"الميزانية التقديرية",
    },
    footer: {
      lost:"أثناء قراءة هذه الصفحة، لقد خسرت",
      based:"بناءً على 35 يورو/ساعة · أتمتة قبل أن يستمر هذا ←",
      automate:"أتمتة قبل أن يستمر هذا ←",
      start:"ابدأ مشروعاً",
    },
  },

  /* ════════════════════════════════════════════════════════
     ESPAÑOL
  ════════════════════════════════════════════════════════ */
  es: {
    nav: {
      lab:"Lab", roi:"ROI", blog:"Blog", start:"Empezar →", liveLab:"EN VIVO",
      menuRapide:"Menú rápido...", quickLinks:"Navegación rápida",
    },
    hero: {
      badge:"Lab interactivo · Prueba en directo",
      headline1:"Tu negocio puede",
      words:["Automatizarse.", "Escalar.", "Dominar."],
      subtitle:"Soy Oussama — especialista en IA y automatización. Mi objetivo no es venderte código.",
      subtitleBold:"Mi objetivo es ahorrarte tiempo y dinero.",
      cta:"Ver lo que puedo hacer por ti →",
      ctaSecondary:"o empezar un proyecto directamente →",
      hint:"Navegación rápida:",
      scroll:"SCROLL",
      stat1:"Leads generados automáticamente",
      stat2:"Horas ahorradas / mes",
      stat3:"Satisfacción del cliente",
      availability:"plazas restantes",
    },
    how: {
      label:"// Cómo funciona",
      title1:"3 pasos simples.", title2:"Cero jerga técnica.",
      subtitle:"Seas director, comercial o responsable de RRHH — este proceso está hecho para ti.",
      step1Title:"Prueba las herramientas",
      step1Desc:"Prueba gratis el buscador de prospectos, la calculadora de ROI o el generador de workflow. Sin registro — los resultados son inmediatos.",
      step1Cta:"Probar ahora",
      step2Title:"Describe tu proyecto",
      step2Desc:"Rellena el formulario en 2 minutos. Sin jerga técnica — explica tu problema con tus propias palabras.",
      step2Cta:"Rellenar el brief",
      step3Title:"Recibe un análisis en 24h",
      step3Desc:"Oussama te responde con una solución concreta, un presupuesto y un plan de acción. Sin promesas vagas — resultados medibles.",
      step3Cta:"Empezar",
      stepLabel:"PASO",
      reassure1:"Sin registro requerido", reassure2:"Resultados en tiempo real",
      reassure3:"100% gratuito para probar", reassure4:"Respuesta garantizada en 24h",
    },
    ba: {
      label:"// Transformación concreta", title:"La diferencia es ", subtitle:"Compara tu día a día antes y después de la automatización. Desliza el cursor para revelar la transformación.",
      before:"ANTES", after:"DESPUÉS", hint:"← Desliza el cursor para revelar →",
      topic1:"Gestión de emails", topic2:"Prospección comercial", topic3:"Reclutamiento RRHH", topic4:"Reporting & KPIs",
    },
    cases: {
      label:"// Resultados reales de clientes", title1:"Cifras reales.", title2:"Clientes satisfechos.",
      subtitle:"Sin testimonios inventados. Aquí hay 3 casos de clientes con cifras antes y después.",
      before:"ANTES", solution:"SOLUCIÓN", results:"RESULTADOS", roi:"ROI alcanzado en",
    },
    lab: {
      leadLabel:"// Playground #01 — Motor de Leads", leadTitle:"El cazador de leads B2B", leadSub:"Escribe tu objetivo o elige un sector. El motor extrae, enriquece y entrega 3 leads reales con señales de intención en tiempo real.",
      workflowLabel:"// Playground #02 — Constructor Interactivo", workflowTitle:"La magia n8n", workflowSub:"Construye la automatización tú mismo. Conecta los nodos en orden, observa la IA trabajar en tiempo real.",
      roiLabel:"// Playground #03 — Calculadora ROI", roiTitle:"¿Cuánto estás perdiendo?", roiSub:"Ajusta los sliders según tu situación real.",
      blueprintLabel:"// Playground #05 — Blueprint en Vivo", blueprintTitle:"Describe tu proceso",
      auditLabel:"// Playground #04 — Máquina de Auditoría", auditTitle:"Analiza tu sitio web",
    },
    gallery: {
      label:"// Biblioteca de automatizaciones", title1:"Elige tu workflow.", title2:"Nosotros nos encargamos del resto.",
      subtitle:"6 automatizaciones listas para desplegar. Haz clic en la que te corresponda — el formulario se rellena automáticamente.",
      cta:"Quiero esto →", custom:"¿Tu necesidad no está en la lista?", customCta:"Describir mi necesidad personalizada →",
      wantThis:"Quiero esto →", delivery:"Entrega", saving:"Ahorro",
    },
    quiz: {
      label:"// Diagnóstico personalizado", title1:"¿Dónde estás?", title2:"Obtén tu Hoja de Ruta IA",
      subtitle:"5 preguntas. 2 minutos. Una hoja de ruta de automatización adaptada a tu perfil.",
      start:"Iniciar el diagnóstico →", free:"✓ Gratuito", noSignup:"✓ Sin registro", instant:"✓ Resultado inmediato",
      result:"Resultado", restartCta:"↺ Repetir el quiz", startRoadmap:"Iniciar mi hoja de ruta con Oussama →",
    },
    timeline: {
      label:"// Proceso de entrega", title1:"Desde tu brief hasta producción", title2:"en 6 días.",
      subtitle:"Un proceso claro, estructurado y sin sorpresas. Sabes exactamente qué pasa cada día.",
      guarantee:"Garantía de satisfacción 30 días",
      guaranteeDesc:"Si el workflow no funciona como se acordó en la entrega, lo corrijo gratis hasta que sea perfecto. Cero riesgo para ti.",
    },
    testi: { label:"// Testimonios", title1:"Lo que dicen", title2:"mis clientes." },
    blog: {
      label:"// Blog & Recursos", title1:"Consejos concretos.", title2:"Resultados probados.",
      subtitle:"Artículos basados en proyectos reales. Sin teoría — sistemas funcionando en producción.",
      readMore:"Leer el artículo →", viewAll:"Ver todos los artículos →",
      available:"Artículos disponibles en",
    },
    faq: {
      label:"// Preguntas frecuentes", title1:"Todo lo que quieres saber", title2:"antes de contactarnos",
      question:"¿Tienes una pregunta específica sobre tu situación?", questionCta:"Hacer mi pregunta →",
      q1:"No soy desarrollador. ¿Puedo trabajar contigo de todos modos?",
      a1:"Absolutamente — y de hecho es mi cliente ideal. Mi papel es traducir tu problema de negocio en una solución técnica. No necesitas entender el código. Tú describes el problema, yo construyo la solución.",
      q2:"¿Cuánto tiempo lleva una automatización?",
      a2:"Un workflow simple lleva de 2 a 5 días. Un sistema más complejo con IA y multi-agentes, de 2 a 4 semanas.",
      q3:"¿Funciona con mis herramientas existentes (Excel, Gmail, HubSpot...)?",
      a3:"En el 95% de los casos, sí. Las herramientas que uso se conectan a más de 400 aplicaciones.",
      q4:"¿Cuánto cuesta una automatización?",
      a4:"Un workflow simple empieza desde 500€. Un sistema completo con IA y multi-agentes va de 2.000€ a 8.000€.",
      q5:"¿Qué puede automatizar realmente la IA para mi negocio?",
      a5:"Ordenar y responder emails, calificar leads automáticamente, extraer datos de documentos, generar informes, analizar reseñas de clientes...",
      q6:"¿Qué pasa si la automatización falla después de la entrega?",
      a6:"Proporciono documentación completa y un período de soporte de 30 días. Las herramientas utilizadas tienen sistemas de alertas integrados.",
    },
    about: {
      label:"// Sobre mí",
      title:"Soy Oussama,", titleAccent:"desarrollador apasionado por la IA",
      desc1:"Mi objetivo no es venderte código.",
      desc2:"Mi objetivo es ahorrarte tiempo y dinero. Diseño sistemas de automatización que trabajan mientras duermes.",
      cta:"Probar mis herramientas ⚡", available:"Disponible",
    },
    cta: {
      label:"// Iniciar un proyecto", title1:"Describe tu proyecto.", title2:"Te respondo en 24h.",
      subtitle:"Sin presupuesto automático. Leo cada mensaje personalmente.",
      namePlaceholder:"Tu nombre", emailPlaceholder:"tu@email.com",
      problemPlaceholder:"Describe tu problema o necesidad...",
      toolsPlaceholder:"Gmail, HubSpot, Slack...",
      send:"Enviar mi brief →", sending:"Enviando...",
      success:"¡Mensaje enviado!", successDesc:"Te responderé en 24h con un análisis y plan de acción.",
      name:"Nombre", email:"Email", problem:"Tu problema / necesidad", tools:"Herramientas usadas", budget:"Presupuesto estimado",
    },
    footer: {
      lost:"MIENTRAS LEÍAS ESTA PÁGINA, PERDISTE",
      based:"Basado en 35€/h · Automatiza antes de que continúe →",
      automate:"Automatiza antes de que continúe →",
      start:"Iniciar un proyecto",
    },
  },

  /* ════════════════════════════════════════════════════════
     DUTCH / NEDERLANDS
  ════════════════════════════════════════════════════════ */
  nl: {
    nav: {
      lab:"Lab", roi:"ROI", blog:"Blog", start:"Beginnen →", liveLab:"LIVE LAB",
      menuRapide:"Snel menu...", quickLinks:"Snelle navigatie",
    },
    hero: {
      badge:"Interactief lab · Test live",
      headline1:"Uw bedrijf kan",
      words:["Automatiseren.", "Schalen.", "Domineren."],
      subtitle:"Ik ben Oussama — AI & automatiseringsspecialist. Mijn doel is niet om u code te verkopen.",
      subtitleBold:"Mijn doel is u tijd en geld te besparen.",
      cta:"Ontdek wat ik voor u kan doen →",
      ctaSecondary:"of start direct een project →",
      hint:"Snelle navigatie:",
      scroll:"SCROLL",
      stat1:"Leads automatisch gegenereerd",
      stat2:"Uren bespaard / maand",
      stat3:"Klanttevredenheid",
      availability:"plaatsen beschikbaar",
    },
    how: {
      label:"// Hoe het werkt",
      title1:"3 eenvoudige stappen.", title2:"Nul technisch jargon.",
      subtitle:"Of u nu directeur, salesmanager of HR-verantwoordelijke bent — dit proces is voor u gemaakt.",
      step1Title:"Test de tools",
      step1Desc:"Probeer de leadfinder, ROI-calculator of workflowgenerator gratis. Geen aanmelding vereist — resultaten zijn direct.",
      step1Cta:"Nu testen",
      step2Title:"Beschrijf uw project",
      step2Desc:"Vul het briefformulier in in 2 minuten. Geen technisch jargon — leg uw probleem eenvoudig uit met uw eigen woorden.",
      step2Cta:"Brief invullen",
      step3Title:"Ontvang een analyse binnen 24u",
      step3Desc:"Oussama reageert met een concrete oplossing, een offerte en een actieplan. Geen vage beloften — meetbare resultaten.",
      step3Cta:"Beginnen",
      stepLabel:"STAP",
      reassure1:"Geen aanmelding vereist", reassure2:"Realtime resultaten",
      reassure3:"100% gratis te testen",  reassure4:"Antwoord gegarandeerd binnen 24u",
    },
    ba: {
      label:"// Concrete transformatie", title:"Het verschil is ", subtitle:"Vergelijk uw dagelijks leven voor en na automatisering. Sleep de schuifregelaar om de transformatie te onthullen.",
      before:"VOOR", after:"NA", hint:"← Sleep de schuifregelaar om te onthullen →",
      topic1:"E-mailbeheer", topic2:"Commerciële prospectie", topic3:"HR-werving", topic4:"Rapportage & KPI's",
    },
    cases: {
      label:"// Echte klantresultaten", title1:"Echte cijfers.", title2:"Tevreden klanten.",
      subtitle:"Geen verzonnen getuigenissen. Hier zijn 3 klantcasussen met voor- en nacijfers.",
      before:"VOOR", solution:"OPLOSSING", results:"RESULTATEN", roi:"ROI bereikt in",
    },
    lab: {
      leadLabel:"// Playground #01 — Lead Engine", leadTitle:"De live B2B-leadjager", leadSub:"Typ uw doelgroep of kies een sector. De engine scrapet, verrijkt en levert 3 echte leads met intentiesignalen.",
      workflowLabel:"// Playground #02 — Interactieve builder", workflowTitle:"De n8n-magie", workflowSub:"Bouw de automatisering zelf. Verbind de knooppunten op volgorde, bekijk hoe AI in realtime werkt.",
      roiLabel:"// Playground #03 — ROI-calculator", roiTitle:"Hoeveel verliest u?", roiSub:"Pas de schuifregelaars aan op uw werkelijke situatie.",
      blueprintLabel:"// Playground #05 — Live Blueprint", blueprintTitle:"Beschrijf uw proces",
      auditLabel:"// Playground #04 — Auditapparaat", auditTitle:"Analyseer uw website",
    },
    gallery: {
      label:"// Automatiseringsbibliotheek", title1:"Kies uw workflow.", title2:"Wij regelen de rest.",
      subtitle:"6 kant-en-klare automatiseringen. Klik op de juiste voor u — het formulier wordt automatisch ingevuld.",
      cta:"Ik wil dit →", custom:"Uw behoefte staat niet in de lijst?", customCta:"Beschrijf mijn maatwerk →",
      wantThis:"Ik wil dit →", delivery:"Levering", saving:"Besparing",
    },
    quiz: {
      label:"// Persoonlijke diagnose", title1:"Waar staat u?", title2:"Ontvang uw AI-routekaart",
      subtitle:"5 vragen. 2 minuten. Een automatiseringsroutekaart op maat van uw profiel.",
      start:"Diagnose starten →", free:"✓ Gratis", noSignup:"✓ Geen aanmelding", instant:"✓ Onmiddellijk resultaat",
      result:"Resultaat", restartCta:"↺ Quiz opnieuw doen", startRoadmap:"Mijn routekaart starten met Oussama →",
    },
    timeline: {
      label:"// Leveringsproces", title1:"Van uw brief tot productie", title2:"in 6 dagen.",
      subtitle:"Een helder, gestructureerd proces zonder verrassingen. U weet precies wat er elke dag gebeurt.",
      guarantee:"30 dagen tevredenheidsgarantie",
      guaranteeDesc:"Als de workflow niet werkt zoals afgesproken bij levering, los ik het gratis op totdat het perfect is. Nul risico voor u.",
    },
    testi: { label:"// Getuigenissen", title1:"Wat mijn", title2:"klanten zeggen." },
    blog: {
      label:"// Blog & Bronnen", title1:"Praktisch advies.", title2:"Bewezen resultaten.",
      subtitle:"Artikelen gebaseerd op echte projecten. Geen theorie — systemen die in productie draaien.",
      readMore:"Artikel lezen →", viewAll:"Alle artikelen bekijken →",
      available:"Artikelen beschikbaar in",
    },
    faq: {
      label:"// Veelgestelde vragen", title1:"Alles wat u wilt weten", title2:"voordat u contact opneemt",
      question:"Heeft u een specifieke vraag over uw situatie?", questionCta:"Mijn vraag stellen →",
      q1:"Ik ben geen ontwikkelaar. Kan ik toch met u werken?",
      a1:"Absoluut — en dat is eigenlijk mijn ideale klant. Mijn rol is om uw zakelijk probleem te vertalen naar een technische oplossing. U hoeft de code niet te begrijpen. U beschrijft het probleem, ik bouw de oplossing.",
      q2:"Hoe lang duurt een automatisering?",
      a2:"Een eenvoudige workflow duurt 2 tot 5 dagen. Een complexer systeem met AI en multi-agents, 2 tot 4 weken.",
      q3:"Werkt het met mijn bestaande tools (Excel, Gmail, HubSpot...)?",
      a3:"In 95% van de gevallen wel. De tools die ik gebruik verbinden met 400+ applicaties.",
      q4:"Wat kost een automatisering?",
      a4:"Een eenvoudige workflow begint vanaf €500. Een compleet systeem met AI en multi-agents varieert van €2.000 tot €8.000.",
      q5:"Wat kan AI werkelijk automatiseren voor mijn bedrijf?",
      a5:"E-mails sorteren en beantwoorden, leads automatisch kwalificeren, gegevens uit documenten extraheren, rapporten genereren...",
      q6:"Wat gebeurt er als de automatisering uitvalt na levering?",
      a6:"Ik lever volledige documentatie en een ondersteuningsperiode van 30 dagen. De gebruikte tools hebben ingebouwde waarschuwingssystemen.",
    },
    about: {
      label:"// Over mij",
      title:"Ik ben Oussama,", titleAccent:"gepassioneerde AI-ontwikkelaar",
      desc1:"Mijn doel is niet om u code te verkopen.",
      desc2:"Mijn doel is u tijd en geld te besparen. Ik ontwerp automatiseringssystemen die werken terwijl u slaapt.",
      cta:"Mijn tools testen ⚡", available:"Beschikbaar",
    },
    cta: {
      label:"// Een project starten", title1:"Beschrijf uw project.", title2:"Ik reageer binnen 24u.",
      subtitle:"Geen automatische offerte. Ik lees elk bericht persoonlijk.",
      namePlaceholder:"Uw voornaam", emailPlaceholder:"uw@email.com",
      problemPlaceholder:"Beschrijf uw probleem of behoefte...",
      toolsPlaceholder:"Gmail, HubSpot, Slack...",
      send:"Mijn brief versturen →", sending:"Verzenden...",
      success:"Bericht verzonden!", successDesc:"Ik reageer binnen 24u met een analyse en actieplan.",
      name:"Voornaam", email:"E-mail", problem:"Uw probleem / behoefte", tools:"Gebruikte tools", budget:"Geschat budget",
    },
    footer: {
      lost:"TERWIJL U DEZE PAGINA LAS, VERLOOR U",
      based:"Gebaseerd op €35/u · Automatiseer voordat het doorgaat →",
      automate:"Automatiseer voordat het doorgaat →",
      start:"Een project starten",
    },
  },
};

export default t;
