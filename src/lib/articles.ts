/* ══════════════════════════════════════════════════════════
   BASE DE DONNÉES DES ARTICLES — fr / en / ar / es
══════════════════════════════════════════════════════════ */

export interface Article {
  slug:      string;
  date:      string;
  readTime:  string;
  tag:       string;
  tagI18n?:  Record<string, string>;
  tagColor:  string;
  fr: { title: string; excerpt: string; content: string };
  en: { title: string; excerpt: string; content: string };
  ar: { title: string; excerpt: string; content: string };
  es: { title: string; excerpt: string; content: string };
}

export const ARTICLES: Article[] = [
  {
    slug:     "automatiser-prospection-b2b-n8n",
    date:     "2026-03-10",
    readTime: "7 min",
    tag:      "Automatisation",
    tagI18n:  { en:"Automation", ar:"أتمتة", es:"Automatización", nl:"Automatisering", fr:"Automatisation" },
    tagColor: "#00ffc8",
    fr: {
      title:   "Comment j'automatise la prospection B2B avec n8n en 5 étapes",
      excerpt: "340 leads qualifiés par semaine, zéro heure de recherche manuelle. Voici exactement le workflow que j'ai construit pour mes clients.",
      content: `
# Comment j'automatise la prospection B2B avec n8n en 5 étapes

La prospection commerciale est l'une des tâches les plus chronophages pour une équipe de vente. Un commercial passe en moyenne **3 heures par jour** à chercher des prospects, enrichir des données et rédiger des emails. Multipliez par 5 jours et par le nombre de commerciaux — le chiffre devient vertigineux.

Voici comment j'ai construit un système qui génère **340 leads qualifiés par semaine** en automatique pour un de mes clients.

## Étape 1 — Le déclencheur : scraping LinkedIn ciblé

Tout commence par une recherche LinkedIn Sales Navigator avec des filtres précis : secteur, taille d'entreprise, titre du décideur. n8n récupère automatiquement ces profils via un webhook toutes les 24h.

\`\`\`
Webhook → LinkedIn Sales Navigator → Extraction des profils
\`\`\`

**Résultat :** 50 à 80 nouveaux profils qualifiés chaque matin, sans intervention humaine.

## Étape 2 — Enrichissement via Apollo

Chaque profil passe par Apollo.io pour récupérer l'email professionnel vérifié, le numéro de téléphone direct et les données firmographiques (CA, effectifs, secteur précis).

**Taux de succès :** 78% des profils sont enrichis avec un email valide.

## Étape 3 — Scoring IA avec GPT-4o

C'est là que la magie opère. Chaque lead passe par GPT-4o qui analyse :
- La description LinkedIn du prospect
- Le secteur et la taille de l'entreprise
- Le poste et le niveau de décision
- Les signaux d'intent (recrutements récents, levées de fonds)

Il attribue un score de 0 à 100 et rédige une accroche personnalisée en une phrase.

## Étape 4 — Injection dans le CRM

Les leads scorés à 70+ sont automatiquement créés dans HubSpot avec :
- Toutes les données enrichies
- L'accroche personnalisée générée par l'IA
- Un tag de séquence à envoyer

## Étape 5 — Séquence email automatique

Les leads HubSpot déclenchent automatiquement une séquence de 3 emails espacés de 3 jours, avec relance si pas de réponse.

## Les résultats après 30 jours

| Métrique | Avant | Après |
|----------|-------|-------|
| Leads/semaine | 18 | 340 |
| Heures manuelles | 15h/sem | 0h |
| Taux de réponse | 4% | 11% |
| Coût par lead | 12€ | 0,8€ |

## Conclusion

Ce workflow n'est pas réservé aux grandes entreprises. Il tourne avec un abonnement n8n (20€/mois) + Apollo Starter (39€/mois). L'investissement en développement est récupéré en moins de 2 semaines.

Si vous voulez que je construise ce système pour votre équipe, [remplissez le brief ici](#cta).
      `,
    },
    en: {
      title:   "How I automate B2B prospecting with n8n in 5 steps",
      excerpt: "340 qualified leads per week, zero hours of manual research. Here's the exact workflow I built for my clients.",
      content: `
# How I automate B2B prospecting with n8n in 5 steps

Sales prospecting is one of the most time-consuming tasks for any sales team. A sales rep spends an average of **3 hours per day** searching for prospects, enriching data, and drafting emails. Multiply that by 5 days and by the number of reps — the number becomes staggering.

Here's how I built a system that generates **340 qualified leads per week** automatically for one of my clients.

## Step 1 — The trigger: targeted LinkedIn scraping

Everything starts with a LinkedIn Sales Navigator search with precise filters: industry, company size, decision-maker title. n8n automatically pulls these profiles via a webhook every 24 hours.

\`\`\`
Webhook → LinkedIn Sales Navigator → Profile Extraction
\`\`\`

**Result:** 50 to 80 new qualified profiles every morning, with zero human intervention.

## Step 2 — Enrichment via Apollo

Each profile goes through Apollo.io to retrieve a verified professional email, direct phone number, and firmographic data (revenue, headcount, precise industry).

**Success rate:** 78% of profiles are enriched with a valid email.

## Step 3 — AI scoring with GPT-4o

This is where the magic happens. Each lead goes through GPT-4o which analyzes:
- The prospect's LinkedIn description
- Industry and company size
- Position and decision-making level
- Intent signals (recent hires, funding rounds)

It assigns a score from 0 to 100 and writes a personalized one-sentence opening line.

## Step 4 — CRM injection

Leads scored 70+ are automatically created in HubSpot with all enriched data, the AI-generated hook, and a sequence tag.

## Step 5 — Automated email sequence

HubSpot leads automatically trigger a 3-email sequence spaced 3 days apart, with follow-ups if no reply.

## Results after 30 days

| Metric | Before | After |
|--------|--------|-------|
| Leads/week | 18 | 340 |
| Manual hours | 15h/week | 0h |
| Response rate | 4% | 11% |
| Cost per lead | €12 | €0.8 |

## Conclusion

This workflow isn't reserved for large enterprises. It runs on an n8n subscription (€20/month) + Apollo Starter (€39/month). The development investment is recovered in less than 2 weeks.

Want me to build this system for your team? [Fill in the brief here](#cta).
      `,
    },
    ar: {
      title:   "كيف أُؤتمت عملية البحث عن عملاء B2B باستخدام n8n في 5 خطوات",
      excerpt: "340 عميل محتمل مؤهل أسبوعياً، صفر ساعات بحث يدوي. إليك بالضبط سير العمل الذي بنيته لعملائي.",
      content: `
# كيف أُؤتمت عملية البحث عن عملاء B2B باستخدام n8n في 5 خطوات

يُعدّ البحث عن العملاء التجاريين من أكثر المهام استهلاكاً للوقت في أي فريق مبيعات. يقضي مندوب المبيعات في المتوسط **3 ساعات يومياً** في البحث عن العملاء المحتملين وإثراء البيانات وكتابة رسائل البريد الإلكتروني.

إليك كيف بنيت نظاماً يولّد **340 عميلاً مؤهلاً أسبوعياً** تلقائياً لأحد عملائي.

## الخطوة 1 — المشغّل: استخراج LinkedIn المستهدف

يبدأ كل شيء ببحث في LinkedIn Sales Navigator بفلاتر دقيقة. يقوم n8n تلقائياً بسحب هذه الملفات الشخصية كل 24 ساعة.

**النتيجة:** 50 إلى 80 ملفاً شخصياً مؤهلاً جديداً كل صباح، دون أي تدخل بشري.

## الخطوة 2 — الإثراء عبر Apollo

يمر كل ملف شخصي عبر Apollo.io للحصول على البريد الإلكتروني المهني، رقم الهاتف المباشر، والبيانات المؤسسية.

**معدل النجاح:** 78% من الملفات الشخصية يتم إثراؤها ببريد إلكتروني صالح.

## الخطوة 3 — تسجيل النقاط بالذكاء الاصطناعي مع GPT-4o

هنا تحدث السحر. يحلل GPT-4o كل عميل محتمل ويمنحه درجة من 0 إلى 100 ويكتب جملة افتتاحية مخصصة.

## الخطوة 4 — الإدخال في CRM

يتم إنشاء العملاء المحتملين الحاصلين على 70+ تلقائياً في HubSpot مع جميع البيانات.

## الخطوة 5 — تسلسل البريد الإلكتروني التلقائي

يُشغّل العملاء في HubSpot تلقائياً تسلسلاً من 3 رسائل إلكترونية مع متابعات.

## النتائج بعد 30 يوماً

| المقياس | قبل | بعد |
|---------|-----|-----|
| عملاء/أسبوع | 18 | 340 |
| ساعات يدوية | 15 ساعة | 0 |
| معدل الاستجابة | 4% | 11% |

هل تريد أن أبني هذا النظام لفريقك؟ [أكمل الاستمارة هنا](#cta).
      `,
    },
    es: {
      title:   "Cómo automatizo la prospección B2B con n8n en 5 pasos",
      excerpt: "340 leads calificados por semana, cero horas de investigación manual. Este es exactamente el workflow que construí para mis clientes.",
      content: `
# Cómo automatizo la prospección B2B con n8n en 5 pasos

La prospección comercial es una de las tareas que más tiempo consume para cualquier equipo de ventas. Un comercial pasa en promedio **3 horas al día** buscando prospectos, enriqueciendo datos y redactando emails.

Así es como construí un sistema que genera **340 leads calificados por semana** de forma automática para uno de mis clientes.

## Paso 1 — El disparador: scraping de LinkedIn dirigido

Todo comienza con una búsqueda en LinkedIn Sales Navigator con filtros precisos. n8n extrae automáticamente estos perfiles cada 24 horas.

**Resultado:** 50 a 80 nuevos perfiles calificados cada mañana, sin intervención humana.

## Paso 2 — Enriquecimiento vía Apollo

Cada perfil pasa por Apollo.io para obtener el email profesional verificado, teléfono directo y datos firmográficos.

**Tasa de éxito:** 78% de los perfiles se enriquecen con un email válido.

## Paso 3 — Puntuación IA con GPT-4o

Aquí ocurre la magia. GPT-4o analiza cada lead y le asigna una puntuación del 0 al 100 y escribe una frase de apertura personalizada.

## Paso 4 — Inyección en el CRM

Los leads con puntuación 70+ se crean automáticamente en HubSpot con todos los datos enriquecidos.

## Paso 5 — Secuencia de email automatizada

Los leads en HubSpot activan automáticamente una secuencia de 3 emails espaciados 3 días, con seguimientos.

## Resultados después de 30 días

| Métrica | Antes | Después |
|---------|-------|---------|
| Leads/semana | 18 | 340 |
| Horas manuales | 15h/sem | 0h |
| Tasa de respuesta | 4% | 11% |
| Coste por lead | 12€ | 0,8€ |

¿Quieres que construya este sistema para tu equipo? [Rellena el brief aquí](#cta).
      `,
    },
  },

  {
    slug:     "roi-automatisation-calcul-concret",
    date:     "2026-03-03",
    readTime: "5 min",
    tag:      "ROI",
    tagI18n:  { en:"ROI", ar:"عائد الاستثمار", es:"ROI", nl:"ROI", fr:"ROI" },
    tagColor: "#f5a623",
    fr: {
      title:   "ROI de l'automatisation : comment calculer ce que vous perdez vraiment",
      excerpt: "La plupart des dirigeants sous-estiment le coût de l'inaction. Voici la méthode exacte pour calculer votre manque à gagner chaque mois.",
      content: `
# ROI de l'automatisation : comment calculer ce que vous perdez vraiment

Quand je parle d'automatisation à un dirigeant, la première question est toujours : **"Combien ça coûte ?"**. La bonne question serait plutôt : **"Combien me coûte le fait de ne pas automatiser ?"**

## La formule de l'inaction

Le coût de l'inaction se calcule simplement :

\`\`\`
Coût annuel = Nombre de personnes × Heures perdues/semaine × 47 semaines × Taux horaire
\`\`\`

Exemple concret : une équipe de 5 personnes qui passe 8h/semaine sur des tâches répétitives, à 35€/heure :

\`\`\`
5 × 8 × 47 × 35 = 65 800 €/an
\`\`\`

**65 800 euros par an.** Partis en fumée. En tâches que personne n'aime faire.

## Les tâches les plus coûteuses par secteur

### Commerce / Marketing
- Tri et réponse aux emails : 2-4h/jour
- Mise à jour CRM manuelle : 1-2h/jour
- Reporting hebdomadaire : 4-6h/semaine
- Qualification de leads : 3-5h/jour

### RH / Recrutement
- Tri de CVs : 2-3 jours par offre
- Planification d'entretiens : 1-2h/offre
- Onboarding administratif : 4-6h/recrue

### E-commerce
- Réponses support : 2-4h/jour
- Gestion des retours : 1-2h/jour
- Mise à jour stocks/prix : 2-3h/semaine

## Ce que l'automatisation récupère réellement

D'après mes projets clients, une automatisation bien conçue récupère **65% des heures perdues**. Pas 100%, parce qu'il restera toujours des cas complexes qui nécessitent un humain. Mais 65%, c'est déjà considérable.

Sur notre exemple :
- Heures récupérées : **65% × 1 880h = 1 222h/an**
- Valeur récupérée : **1 222 × 35€ = 42 770€/an**

Pour un investissement one-off de 3 000€, le ROI est atteint en **25 jours**.

## Les 3 erreurs dans le calcul du ROI

**1. Ne compter que les coûts directs**
Le vrai coût inclut aussi : le coût de l'erreur humaine, le coût de l'opportunité manquée (votre équipe ne fait pas de prospection parce qu'elle répond aux emails), et le coût du turnover (les gens démissionnent des tâches répétitives).

**2. Surestimer la complexité technique**
L'automatisation n'est pas réservée aux entreprises tech. Si vous avez Gmail, un tableur Excel et un CRM, vous pouvez automatiser 80% de vos processus répétitifs.

**3. Attendre la "bonne" taille d'entreprise**
Je travaille avec des solopreneurs comme avec des équipes de 50 personnes. La taille ne change pas l'équation — seul le volume change.

## Calculez votre ROI maintenant

Utilisez notre [calculateur ROI interactif](#roi) pour obtenir votre estimation personnalisée en 30 secondes.
      `,
    },
    en: {
      title:   "Automation ROI: how to calculate what you're really losing",
      excerpt: "Most business leaders underestimate the cost of inaction. Here's the exact method to calculate your monthly revenue loss.",
      content: `
# Automation ROI: how to calculate what you're really losing

When I talk about automation with a business leader, the first question is always: **"How much does it cost?"**. The right question would be: **"How much does NOT automating cost me?"**

## The inaction formula

The cost of inaction is simple to calculate:

\`\`\`
Annual cost = Number of people × Hours lost/week × 47 weeks × Hourly rate
\`\`\`

Concrete example: a team of 5 people spending 8 hours/week on repetitive tasks, at €35/hour:

\`\`\`
5 × 8 × 47 × 35 = €65,800/year
\`\`\`

**€65,800 per year.** Gone. On tasks nobody enjoys.

## Most costly tasks by sector

### Sales / Marketing
- Sorting and replying to emails: 2-4h/day
- Manual CRM updates: 1-2h/day
- Weekly reporting: 4-6h/week
- Lead qualification: 3-5h/day

### HR / Recruitment
- CV screening: 2-3 days per job posting
- Interview scheduling: 1-2h per posting
- Administrative onboarding: 4-6h per hire

## What automation actually recovers

Based on my client projects, a well-designed automation recovers **65% of lost hours**.

On our example:
- Hours recovered: **65% × 1,880h = 1,222h/year**
- Value recovered: **1,222 × €35 = €42,770/year**

For a one-off investment of €3,000, ROI is reached in **25 days**.

## Calculate your ROI now

Use our [interactive ROI calculator](#roi) to get your personalized estimate in 30 seconds.
      `,
    },
    ar: {
      title:   "العائد على الاستثمار في الأتمتة: كيف تحسب ما تخسره فعلاً",
      excerpt: "معظم المديرين يقللون من تقدير تكلفة عدم التصرف. إليك الطريقة الدقيقة لحساب خسائرك الشهرية.",
      content: `
# العائد على الاستثمار في الأتمتة: كيف تحسب ما تخسره فعلاً

عندما أتحدث عن الأتمتة مع مدير تنفيذي، يكون السؤال الأول دائماً: **"كم تكلف؟"**. السؤال الصحيح يجب أن يكون: **"كم يكلفني عدم الأتمتة؟"**

## معادلة التقاعس

تكلفة التقاعس بسيطة الحساب:

\`\`\`
التكلفة السنوية = عدد الأشخاص × الساعات المُهدَرة/أسبوع × 47 أسبوع × الأجر بالساعة
\`\`\`

مثال ملموس: فريق من 5 أشخاص يقضون 8 ساعات/أسبوع في مهام متكررة، بمعدل 35 يورو/ساعة:

\`\`\`
5 × 8 × 47 × 35 = 65,800 يورو/سنة
\`\`\`

**65,800 يورو سنوياً.** ضائعة في مهام لا يحبها أحد.

## ما تسترده الأتمتة فعلاً

بناءً على مشاريعي مع العملاء، تسترد الأتمتة المصممة جيداً **65% من الساعات المُهدَرة**.

على مثالنا:
- الساعات المستردة: **65% × 1,880 ساعة = 1,222 ساعة/سنة**
- القيمة المستردة: **1,222 × 35 يورو = 42,770 يورو/سنة**

مقابل استثمار أولي بقيمة 3,000 يورو، يتحقق العائد في **25 يوماً**.

## احسب عائدك على الاستثمار الآن

استخدم [حاسبة ROI التفاعلية](#roi) للحصول على تقديرك الشخصي في 30 ثانية.
      `,
    },
    es: {
      title:   "ROI de la automatización: cómo calcular lo que realmente estás perdiendo",
      excerpt: "La mayoría de los directivos subestiman el coste de la inacción. Aquí está el método exacto para calcular tu pérdida mensual.",
      content: `
# ROI de la automatización: cómo calcular lo que realmente estás perdiendo

Cuando hablo de automatización con un directivo, la primera pregunta siempre es: **"¿Cuánto cuesta?"**. La pregunta correcta sería: **"¿Cuánto me cuesta NO automatizar?"**

## La fórmula de la inacción

El coste de la inacción se calcula de forma sencilla:

\`\`\`
Coste anual = Nº personas × Horas perdidas/semana × 47 semanas × Tarifa horaria
\`\`\`

Ejemplo concreto: un equipo de 5 personas que pasa 8h/semana en tareas repetitivas, a 35€/hora:

\`\`\`
5 × 8 × 47 × 35 = 65.800 €/año
\`\`\`

**65.800 euros al año.** Perdidos. En tareas que nadie disfruta.

## Lo que la automatización recupera realmente

Basándome en mis proyectos con clientes, una automatización bien diseñada recupera el **65% de las horas perdidas**.

En nuestro ejemplo:
- Horas recuperadas: **65% × 1.880h = 1.222h/año**
- Valor recuperado: **1.222 × 35€ = 42.770€/año**

Para una inversión única de 3.000€, el ROI se alcanza en **25 días**.

## Calcula tu ROI ahora

Usa nuestra [calculadora ROI interactiva](#roi) para obtener tu estimación personalizada en 30 segundos.
      `,
    },
  },

  {
    slug:     "agent-ia-multi-agents-architecture",
    date:     "2026-02-24",
    readTime: "9 min",
    tag:      "IA & Agents",
    tagI18n:  { en:"AI & Agents", ar:"ذكاء اصطناعي", es:"IA & Agentes", nl:"AI & Agents", fr:"IA & Agents" },
    tagColor: "#a78bfa",
    fr: {
      title:   "Systèmes multi-agents IA : l'architecture qui change tout pour les PME",
      excerpt: "Un agent IA seul est limité. Plusieurs agents qui se coordonnent, c'est une équipe autonome qui travaille 24h/24. Voici comment ça fonctionne.",
      content: `
# Systèmes multi-agents IA : l'architecture qui change tout pour les PME

Depuis l'émergence de GPT-4, tout le monde parle d'IA. Mais la plupart des entreprises utilisent l'IA comme un outil isolé — un chatbot ici, un résumé automatique là. Ce n'est pas de l'IA, c'est un couteau suisse digital.

La vraie révolution, c'est les **systèmes multi-agents** : plusieurs agents IA spécialisés qui se coordonnent pour accomplir des tâches complexes de manière autonome.

## Qu'est-ce qu'un système multi-agents ?

Imaginez une entreprise avec des équipes spécialisées : un commercial, un analyste, un rédacteur, un validateur. Chacun fait ce qu'il sait faire, et ils se passent le travail.

Un système multi-agents fonctionne exactement pareil, mais avec des agents IA :

- **Agent Recherche** : scrape et collecte des informations
- **Agent Analyse** : traite et structure les données
- **Agent Rédaction** : génère du contenu ou des emails
- **Agent Validation** : vérifie la qualité avant envoi
- **Agent Exécution** : déclenche les actions (CRM, email, Slack)

## Architecture concrète : le système de veille concurrentielle

Voici un système que j'ai déployé pour un client dans le secteur SaaS :

### Niveau 1 — Collecte (Agent Scraper)
Chaque nuit à 2h du matin, l'agent scrape :
- Les sites web des 15 concurrents
- Leurs pages LinkedIn
- Les avis G2 et Capterra récents
- Les annonces de recrutement (indicateur de croissance)

### Niveau 2 — Analyse (Agent Analyste)
L'agent analyse les changements détectés :
- Nouvelles fonctionnalités annoncées
- Changements de pricing
- Nouveaux marchés ciblés
- Évolution du messaging

### Niveau 3 — Synthèse (Agent Rédacteur)
Il génère un rapport de 1 page en markdown avec :
- Les 3 insights clés de la semaine
- L'impact potentiel pour notre client
- Les actions recommandées

### Niveau 4 — Distribution (Agent Exécuteur)
Le rapport est envoyé automatiquement :
- Par email au CEO et au CMO
- Posté dans le canal Slack #veille-concurrentielle
- Enregistré dans Notion avec tags et liens sources

## Les résultats pour mes clients

Ce système remplace une demi-journée de travail hebdomadaire pour 2 personnes. Le CEO reçoit son brief de veille concurrentielle chaque lundi matin à 7h, sans que personne n'ait eu à lever le petit doigt.

**Coût mensuel du système :** ~45€ (API OpenAI + infrastructure)
**Valeur remplacée :** ~2 000€/mois (8h × 2 personnes × 125€/h)
**ROI :** 4 400%

## Comment démarrer avec les agents IA

1. **Identifiez un processus répétitif** qui implique plusieurs étapes séquentielles
2. **Décomposez en tâches atomiques** — chaque tâche doit être confiable à 95%+ seule
3. **Choisissez votre orchestrateur** : n8n, LangGraph ou CrewAI selon la complexité
4. **Commencez petit** : 2-3 agents maximum pour le premier projet
5. **Mesurez et optimisez** : les agents s'améliorent avec le temps et les retours

## Conclusion

Les systèmes multi-agents ne sont plus du domaine de la recherche ou des grandes entreprises tech. Avec les bons outils et une bonne architecture, une PME peut déployer une équipe d'agents IA en moins de 2 semaines pour un budget accessible.

[Discutons de votre cas d'usage](#cta) — je peux vous montrer exactement ce qui est possible pour votre secteur.
      `,
    },
    en: {
      title:   "Multi-agent AI systems: the architecture that changes everything for SMEs",
      excerpt: "A single AI agent is limited. Multiple coordinating agents form an autonomous team working 24/7. Here's how it works.",
      content: `
# Multi-agent AI systems: the architecture that changes everything for SMEs

Since GPT-4 emerged, everyone talks about AI. But most companies use AI as an isolated tool — a chatbot here, an auto-summary there. That's not AI, that's a digital Swiss army knife.

The real revolution is **multi-agent systems**: multiple specialized AI agents that coordinate to accomplish complex tasks autonomously.

## What is a multi-agent system?

Think of a company with specialized teams: a salesperson, an analyst, a writer, a validator. Each does what they do best, and they hand off work to each other.

A multi-agent system works exactly the same, but with AI agents:
- **Research Agent**: scrapes and collects information
- **Analysis Agent**: processes and structures data
- **Writing Agent**: generates content or emails
- **Validation Agent**: checks quality before sending
- **Execution Agent**: triggers actions (CRM, email, Slack)

## Concrete results for my clients

This system replaces half a day of weekly work for 2 people. The CEO receives their competitive intelligence brief every Monday morning at 7am, without anyone lifting a finger.

**Monthly system cost:** ~€45 (OpenAI API + infrastructure)
**Value replaced:** ~€2,000/month
**ROI:** 4,400%

## How to start with AI agents

1. Identify a repetitive process with multiple sequential steps
2. Break it down into atomic tasks — each task must be reliably 95%+ accurate alone
3. Choose your orchestrator: n8n, LangGraph or CrewAI depending on complexity
4. Start small: 2-3 agents maximum for the first project

[Let's discuss your use case](#cta) — I can show you exactly what's possible for your industry.
      `,
    },
    ar: {
      title:   "أنظمة الوكلاء المتعددين بالذكاء الاصطناعي: المعمارية التي تغيّر كل شيء للشركات الصغيرة",
      excerpt: "الوكيل الذكي الواحد محدود. عدة وكلاء متنسقين يشكلون فريقاً مستقلاً يعمل 24/7. إليك كيف يعمل ذلك.",
      content: `
# أنظمة الوكلاء المتعددين بالذكاء الاصطناعي

منذ ظهور GPT-4، يتحدث الجميع عن الذكاء الاصطناعي. لكن معظم الشركات تستخدمه كأداة معزولة.

الثورة الحقيقية هي **أنظمة الوكلاء المتعددين**: عدة وكلاء ذكاء اصطناعي متخصصين يتنسقون لإنجاز مهام معقدة باستقلالية.

## ما هو نظام الوكلاء المتعددين؟

تخيّل شركة بفرق متخصصة: مندوب مبيعات، محلل، كاتب، مدقق. كل منهم يقوم بما يجيده، ويمررون العمل لبعضهم.

يعمل نظام الوكلاء المتعددين بنفس الطريقة:
- **وكيل البحث**: يجمع المعلومات
- **وكيل التحليل**: يعالج البيانات
- **وكيل الكتابة**: يولّد المحتوى
- **وكيل التنفيذ**: يطلق الإجراءات

## النتائج لعملائي

**التكلفة الشهرية للنظام:** ~45 يورو
**القيمة المستبدلة:** ~2,000 يورو/شهر
**العائد على الاستثمار:** 4,400%

[لنناقش حالتك الخاصة](#cta) — يمكنني أن أريك بالضبط ما هو ممكن في قطاعك.
      `,
    },
    es: {
      title:   "Sistemas multi-agente IA: la arquitectura que lo cambia todo para las PYMEs",
      excerpt: "Un solo agente IA es limitado. Varios agentes coordinándose forman un equipo autónomo que trabaja 24/7. Así es como funciona.",
      content: `
# Sistemas multi-agente IA: la arquitectura que lo cambia todo para las PYMEs

Desde la llegada de GPT-4, todo el mundo habla de IA. Pero la mayoría de las empresas la usan como una herramienta aislada.

La verdadera revolución son los **sistemas multi-agente**: varios agentes IA especializados que se coordinan para completar tareas complejas de forma autónoma.

## ¿Qué es un sistema multi-agente?

Imagina una empresa con equipos especializados: un comercial, un analista, un redactor, un validador. Cada uno hace lo que mejor sabe, y se pasan el trabajo.

Un sistema multi-agente funciona exactamente igual:
- **Agente de Investigación**: extrae y recopila información
- **Agente de Análisis**: procesa y estructura datos
- **Agente de Redacción**: genera contenido o emails
- **Agente de Ejecución**: desencadena acciones (CRM, email, Slack)

## Resultados para mis clientes

**Coste mensual del sistema:** ~45€
**Valor reemplazado:** ~2.000€/mes
**ROI:** 4.400%

[Hablemos de tu caso de uso](#cta) — puedo mostrarte exactamente qué es posible para tu sector.
      `,
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}

export type Lang = "fr" | "en" | "ar" | "es";
