/* Wordtrail Grammar: curriculum data (stages 0 to 15, A1 to C2).
   Step types:
   learn  { title, body, items?: [{t, s, say}] }
   choice { q, opts:[...], a:index, why }
   pick   { q, words:[...], targets:[indexes], why }
   build  { q, bank:[...], answer:[...], join?:' ' | '', why }            */
window.GA_LEVELS = [
  {
    id: 'S0', glyph: 'Aa', en: 'STAGE 0 · A1', bn: 'শুরুর ভিত্তি (Foundations)',
    desc: 'অক্ষর, আওয়াজ আর বাক্যের গোড়ার কথা শিখে নিজের ভিত গড়ে নাও।',
    lessons: [
      {
        id: 'L1-1', title: 'A থেকে E', sub: 'প্রথম পাঁচটি অক্ষর',
        steps: [
          { type: 'learn', title: 'ইংরেজি অক্ষর',
            body: 'ইংরেজিতে মোট ২৬টি অক্ষর (letter) আছে। আজ প্রথম ৫টি শিখব। প্রতিটির ওপর ট্যাপ করলে আওয়াজ শুনতে পারবে।',
            items: [
              { t: 'A', s: 'Apple · আপেল', say: 'A. Apple' },
              { t: 'B', s: 'Ball · বল', say: 'B. Ball' },
              { t: 'C', s: 'Cat · বিড়াল', say: 'C. Cat' },
              { t: 'D', s: 'Dog · কুকুর', say: 'D. Dog' },
              { t: 'E', s: 'Egg · ডিম', say: 'E. Egg' }
            ] },
          { type: 'learn', title: 'বড় হাতের আর ছোট হাতের',
            body: 'প্রতিটি অক্ষরের দুটি রূপ আছে: বড় হাতের (Capital) আর ছোট হাতের (small)। নামের শুরুতে আর বাক্যের শুরুতে বড় হাতের অক্ষর লিখতে হয়।',
            items: [
              { t: 'A a', s: 'বড় · ছোট', say: 'Capital A, small a' },
              { t: 'B b', s: 'বড় · ছোট', say: 'Capital B, small b' },
              { t: 'C c', s: 'বড় · ছোট', say: 'Capital C, small c' },
              { t: 'D d', s: 'বড় · ছোট', say: 'Capital D, small d' },
              { t: 'E e', s: 'বড় · ছোট', say: 'Capital E, small e' }
            ] },
          { type: 'choice', q: 'Apple শব্দটি কোন অক্ষর দিয়ে শুরু?', opts: ['A', 'B', 'C'], a: 0,
            why: 'Apple-এর প্রথম অক্ষর A।' },
          { type: 'choice', q: 'Dog শব্দটি কোন অক্ষর দিয়ে শুরু?', opts: ['B', 'D', 'E'], a: 1,
            why: 'Dog-এর প্রথম অক্ষর D।' },
          { type: 'choice', q: 'নিচের কোনটি বড় হাতের B?', opts: ['b', 'd', 'B'], a: 2,
            why: 'বড় হাতের অক্ষর B, আর ছোট হাতের b।' },
          { type: 'pick', q: 'ছোট হাতের অক্ষরগুলো বেছে নাও।', words: ['A', 'c', 'E', 'b', 'D'], targets: [1, 3],
            why: 'c আর b ছোট হাতের অক্ষর।' },
          { type: 'build', q: 'অক্ষর সাজিয়ে শব্দ বানাও: বিড়াল', bank: ['C', 'A', 'T'], answer: ['C', 'A', 'T'], join: '',
            why: 'C-A-T মিলে Cat, মানে বিড়াল।' }
        ]
      },
      {
        id: 'L1-2', title: 'F থেকে J', sub: 'পরের পাঁচটি অক্ষর',
        steps: [
          { type: 'learn', title: 'আরও পাঁচটি অক্ষর',
            body: 'আগের মতোই ট্যাপ করে আওয়াজ শোনো। শব্দের প্রথম আওয়াজ ধরতে পারলেই অক্ষর চেনা যায়।',
            items: [
              { t: 'F', s: 'Fish · মাছ', say: 'F. Fish' },
              { t: 'G', s: 'Goat · ছাগল', say: 'G. Goat' },
              { t: 'H', s: 'Hat · টুপি', say: 'H. Hat' },
              { t: 'I', s: 'Ink · কালি', say: 'I. Ink' },
              { t: 'J', s: 'Jam · জেলি', say: 'J. Jam' }
            ] },
          { type: 'choice', q: 'Hat শব্দটি কোন অক্ষর দিয়ে শুরু?', opts: ['H', 'G', 'J'], a: 0,
            why: 'Hat-এর প্রথম অক্ষর H।' },
          { type: 'choice', q: 'কোন শব্দটি G দিয়ে শুরু?', opts: ['Fish', 'Goat', 'Jam'], a: 1,
            why: 'Goat = G + oat। G দিয়ে শুরু।' },
          { type: 'choice', q: 'Jam-এর প্রথম অক্ষর কোনটি?', opts: ['I', 'J', 'H'], a: 1,
            why: 'Jam শুরু হয় J দিয়ে।' },
          { type: 'pick', q: 'যেসব শব্দ F দিয়ে শুরু, সেগুলো বেছে নাও।', words: ['Fish', 'Goat', 'Fan', 'Hat', 'Fox'], targets: [0, 2, 4],
            why: 'Fish, Fan আর Fox — তিনটিই F দিয়ে শুরু।' },
          { type: 'build', q: 'অক্ষর সাজিয়ে শব্দ বানাও: টুপি', bank: ['H', 'A', 'T'], answer: ['H', 'A', 'T'], join: '',
            why: 'H-A-T মিলে Hat, মানে টুপি।' }
        ]
      }
    ]
  },
  {
    id: 'S1', glyph: 'Cat', en: 'STAGE 1 · A1–A2', bn: 'পদ প্রকরণ (Parts of Speech)',
    desc: 'নাম শব্দ, সর্বনাম, ক্রিয়া, বিশেষণ আর আরও — ইংরেজি বাক্যের আটটি অংশ চিনে নাও।',
    lessons: [
      {
        id: 'L2-1', title: 'Noun কী?', sub: 'সবকিছুর একটা নাম আছে',
        steps: [
          { type: 'learn', title: 'সবকিছুর একটা নাম আছে',
            body: 'তোমার নাম আছে, তোমার বইয়ের নাম আছে, তোমার স্কুলেরও নাম আছে। ইংরেজিতে এই নাম-শব্দগুলোকে বলে Noun।',
            items: [
              { t: 'boy', s: 'ছেলে', say: 'boy' },
              { t: 'cat', s: 'বিড়াল', say: 'cat' },
              { t: 'school', s: 'স্কুল', say: 'school' },
              { t: 'book', s: 'বই', say: 'book' }
            ] },
          { type: 'learn', title: 'চার রকম Noun',
            body: 'মানুষ, প্রাণী, জায়গা আর জিনিস — এই চারটির যেকোনো একটির নাম হলেই সেটা Noun।',
            items: [
              { t: 'teacher', s: 'মানুষের নাম', say: 'teacher' },
              { t: 'dog', s: 'প্রাণীর নাম', say: 'dog' },
              { t: 'park', s: 'জায়গার নাম', say: 'park' },
              { t: 'pen', s: 'জিনিসের নাম', say: 'pen' }
            ] },
          { type: 'choice', q: 'কোনটি Noun?', opts: ['run', 'dog', 'big'], a: 1,
            why: 'dog একটি প্রাণীর নাম, তাই এটি Noun। run হলো কাজ, big মানে বড়।' },
          { type: 'choice', q: 'school কীসের নাম?', opts: ['মানুষ', 'জায়গা', 'প্রাণী'], a: 1,
            why: 'school একটি জায়গা, তাই এটি জায়গার নাম।' },
          { type: 'choice', q: 'কোনটি জিনিসের নাম?', opts: ['pen', 'mother', 'park'], a: 0,
            why: 'pen একটি জিনিস। mother মানুষ, park জায়গা।' },
          { type: 'pick', q: 'বাক্যটিতে Noun গুলো বেছে নাও: The girl has a ball.', words: ['The', 'girl', 'has', 'a', 'ball'], targets: [1, 4],
            why: 'girl (মেয়ে) আর ball (বল) — দুটিই নাম।' },
          { type: 'build', q: 'বাক্য সাজাও: বিড়ালটি দুধ খায়।', bank: ['milk', 'The', 'drinks', 'cat'], answer: ['The', 'cat', 'drinks', 'milk'],
            why: 'The cat drinks milk. এখানে cat আর milk দুটিই Noun।' }
        ]
      },
      {
        id: 'L2-2', title: 'একটি আর অনেক', sub: 'Noun-এর শেষে s',
        steps: [
          { type: 'learn', title: 'একটি হলে, অনেক হলে',
            body: 'একটি জিনিস হলে Noun যেমন থাকে তেমনই থাকে। অনেক হলে সাধারণত শেষে s যোগ করি।',
            items: [
              { t: 'cat → cats', s: 'একটি বিড়াল → অনেক বিড়াল', say: 'cat. cats' },
              { t: 'book → books', s: 'একটি বই → অনেক বই', say: 'book. books' },
              { t: 'pen → pens', s: 'একটি কলম → অনেক কলম', say: 'pen. pens' }
            ] },
          { type: 'learn', title: 'কখন es?',
            body: 'শব্দের শেষে s, x, ch বা sh থাকলে s নয়, es যোগ করতে হয়।',
            items: [
              { t: 'box → boxes', s: 'বাক্স', say: 'box. boxes' },
              { t: 'bus → buses', s: 'বাস', say: 'bus. buses' },
              { t: 'dish → dishes', s: 'থালা', say: 'dish. dishes' },
              { t: 'watch → watches', s: 'ঘড়ি', say: 'watch. watches' }
            ] },
          { type: 'choice', q: 'দুটি dog = ?', opts: ['dog', 'dogs', 'doges'], a: 1,
            why: 'একাধিক হলে শেষে s: dogs।' },
          { type: 'choice', q: 'অনেক book = ?', opts: ['books', 'bookes', 'book'], a: 0,
            why: 'book-এর শেষে s যোগ করে books।' },
          { type: 'choice', q: 'অনেক box = ?', opts: ['boxs', 'boxes', 'box'], a: 1,
            why: 'box-এর শেষে x আছে, তাই es যোগ করে boxes।' },
          { type: 'pick', q: 'অনেক বোঝায় এমন শব্দ বেছে নাও।', words: ['cat', 'pens', 'bus', 'boxes', 'dogs'], targets: [1, 3, 4],
            why: 'pens, boxes আর dogs — তিনটিই অনেক বোঝাচ্ছে। cat আর bus একটি করে।' },
          { type: 'build', q: 'বাক্য সাজাও: আমার দুটি বই আছে।', bank: ['books', 'I', 'two', 'have'], answer: ['I', 'have', 'two', 'books'],
            why: 'I have two books. two-এর পরে books, কারণ দুটি বই।' }
        ]
      },
      {
        id: 'L3-1', title: 'I আর you', sub: 'আমি আর তুমি',
        steps: [
          { type: 'learn', title: 'নামের বদলে ছোট শব্দ',
            body: 'বারবার নাম বলতে ভালো লাগে না। তাই নামের বদলে ছোট শব্দ ব্যবহার করি। এই শব্দকে বলে Pronoun (সর্বনাম)।',
            items: [
              { t: 'I', s: 'আমি', say: 'I' },
              { t: 'you', s: 'তুমি / তোমরা', say: 'you' }
            ] },
          { type: 'learn', title: 'I am, you are',
            body: 'I-এর সাথে am বসে। you-এর সাথে are বসে।',
            items: [
              { t: 'I am happy.', s: 'আমি খুশি।', say: 'I am happy.' },
              { t: 'You are kind.', s: 'তুমি দয়ালু।', say: 'You are kind.' }
            ] },
          { type: 'choice', q: '"আমি" ইংরেজিতে কী?', opts: ['you', 'I', 'it'], a: 1,
            why: '"আমি" = I।' },
          { type: 'choice', q: '"তুমি" ইংরেজিতে কী?', opts: ['you', 'he', 'I'], a: 0,
            why: '"তুমি" = you।' },
          { type: 'choice', q: 'শূন্যস্থান পূরণ করো: ___ am happy.', opts: ['You', 'I', 'She'], a: 1,
            why: 'am বসে I-এর সাথে: I am happy.' },
          { type: 'choice', q: 'শূন্যস্থান পূরণ করো: ___ are my friend.', opts: ['I', 'You', 'It'], a: 1,
            why: 'are বসে you-এর সাথে: You are my friend.' },
          { type: 'pick', q: 'Pronoun গুলো বেছে নাও: I see you.', words: ['I', 'see', 'you'], targets: [0, 2],
            why: 'I আর you দুটিই Pronoun। see একটি কাজ।' },
          { type: 'build', q: 'বাক্য সাজাও: আমি খুশি।', bank: ['happy', 'I', 'am'], answer: ['I', 'am', 'happy'],
            why: 'I am happy.' }
        ]
      },
      {
        id: 'L3-2', title: 'he, she, it', sub: 'ছেলে, মেয়ে আর জিনিস',
        steps: [
          { type: 'learn', title: 'ছেলে, মেয়ে আর জিনিস',
            body: 'ছেলের জায়গায় he, মেয়ের জায়গায় she বসে। প্রাণী বা জিনিসের জায়গায় বসে it।',
            items: [
              { t: 'he', s: 'সে (ছেলে)', say: 'he' },
              { t: 'she', s: 'সে (মেয়ে)', say: 'she' },
              { t: 'it', s: 'এটা (জিনিস বা প্রাণী)', say: 'it' }
            ] },
          { type: 'learn', title: 'he is, she is, it is',
            body: 'he, she আর it — এই তিনটির সাথেই is বসে।',
            items: [
              { t: 'He is a boy.', s: 'সে একটি ছেলে।', say: 'He is a boy.' },
              { t: 'She is a girl.', s: 'সে একটি মেয়ে।', say: 'She is a girl.' },
              { t: 'It is a pen.', s: 'এটি একটি কলম।', say: 'It is a pen.' }
            ] },
          { type: 'choice', q: 'Rafi is a boy. ___ is kind.', opts: ['He', 'She', 'It'], a: 0,
            why: 'Rafi ছেলে, তাই He।' },
          { type: 'choice', q: 'Mina is my sister. ___ is tall.', opts: ['He', 'She', 'It'], a: 1,
            why: 'Mina মেয়ে, তাই She।' },
          { type: 'choice', q: 'The pen is red. ___ is red.', opts: ['He', 'She', 'It'], a: 2,
            why: 'pen একটি জিনিস, তাই It।' },
          { type: 'choice', q: 'The cat is small. ___ is small.', opts: ['It', 'She', 'He'], a: 0,
            why: 'cat একটি প্রাণী, তাই It।' },
          { type: 'pick', q: 'Pronoun টি বেছে নাও: She is a girl.', words: ['She', 'is', 'a', 'girl'], targets: [0],
            why: 'She হলো Pronoun। girl একটি Noun।' },
          { type: 'build', q: 'বাক্য সাজাও: সে একটি মেয়ে।', bank: ['girl', 'She', 'a', 'is'], answer: ['She', 'is', 'a', 'girl'],
            why: 'She is a girl.' }
        ]
      }
    ]
  },
  { id: 'S2', glyph: 'SVO', en: 'STAGE 2 · A1–A2', bn: 'বাক্যের গড়ন (Sentence Basics)', desc: 'বাক্য কীভাবে সাজাতে হয়, প্রশ্ন আর না-বোধক বাক্য কীভাবে বানাতে হয় তা শেখো।', lessons: [],
    topics: ['Subject, predicate, object, complement', 'Basic word order (SVO)', 'Four sentence types', 'Negative sentences', 'Yes/no questions and wh-questions', 'Imperatives', 'There is / there are, and it as a dummy subject', 'Short answers and short responses'] },
  { id: 'S3', glyph: 'Was', en: 'STAGE 3 · A1–B1', bn: 'কাল (Tenses)', desc: 'অতীত, বর্তমান আর ভবিষ্যৎ — কাজের সময় বোঝানোর সব নিয়ম ধাপে ধাপে।', lessons: [],
    topics: ['To be, have/has/had, do/does/did', 'Present simple', 'Present continuous', 'Stative verbs', 'Past simple', 'Past continuous', 'Future forms', 'Present perfect simple', 'Present perfect vs past simple', 'Present perfect continuous', 'Past perfect simple and continuous', 'Future continuous, future perfect, future perfect continuous', 'Used to, would, be used to, get used to', 'Time expressions and sequence words'] },
  { id: 'S4', glyph: 'Can', en: 'STAGE 4 · A2–B2', bn: 'মোডাল ক্রিয়া (Modal Verbs)', desc: 'can, must, should-এর মতো শব্দ দিয়ে সামর্থ্য, অনুমতি, উপদেশ আর সম্ভাবনা বোঝাও।', lessons: [],
    topics: ['Ability: can, could, be able to', 'Permission and requests', 'Obligation, necessity, prohibition', 'Advice: should, ought to, had better', 'Possibility and probability', 'Past modals', 'Related forms: need, dare, would rather'] },
  { id: 'S5', glyph: '?', en: 'STAGE 5 · A2–B1', bn: 'প্রশ্ন (Questions in Depth)', desc: 'Wh-প্রশ্ন, question tag আর ভদ্রভাবে প্রশ্ন করার উপায় শেখো।', lessons: [],
    topics: ['Wh-question formation', 'Question tags', 'Indirect questions', 'Negative questions', 'Echo questions and short replies'] },
  { id: 'S6', glyph: '[ ]', en: 'STAGE 6 · B1–B2', bn: 'বাক্যাংশ ও উপবাক্য (Phrases and Clauses)', desc: 'ছোট ছোট বাক্য জুড়ে বড় আর জটিল বাক্য বানানো শেখো।', lessons: [],
    topics: ['Types of phrases', 'Independent and dependent clauses', 'Sentence structures', 'Noun clauses', 'Relative clauses', 'Adverbial clauses', 'Linking words'] },
  { id: 'S7', glyph: 'If', en: 'STAGE 7 · B1–B2', bn: 'শর্ত ও ইচ্ছা (Conditionals and Wishes)', desc: 'যদি-তাহলে ধরনের বাক্য আর আফসোস বা ইচ্ছা প্রকাশের নিয়ম।', lessons: [],
    topics: ['Zero conditional', 'First conditional', 'Second conditional', 'Third conditional', 'Mixed conditionals', 'Unless, as long as, provided that, in case, otherwise, supposing', 'Wish, if only, would rather, it is time'] },
  { id: 'S8', glyph: 'By', en: 'STAGE 8 · B1–B2', bn: 'কর্মবাচ্য (Passive Voice and Causatives)', desc: 'কাজটি কে করল তার চেয়ে কাজটি কী হলো — সেটা বোঝানোর পদ্ধতি।', lessons: [],
    topics: ['Passive in all tenses', 'Passive with modals', 'Passive with two objects and reporting verbs', 'By-agent: when to use it and when to omit it', 'Causatives'] },
  { id: 'S9', glyph: '" "', en: 'STAGE 9 · B1–B2', bn: 'পরোক্ষ উক্তি (Reported Speech)', desc: 'অন্যের বলা কথা নিজের ভাষায় জানানোর নিয়ম।', lessons: [],
    topics: ['Statements: backshift and changes', 'Questions and commands', 'Reporting verbs', 'When backshift is not needed'] },
  { id: 'S10', glyph: 'To', en: 'STAGE 10 · B1–C1', bn: 'ক্রিয়ার বিশেষ রূপ (Non-Finite Verb Forms)', desc: 'Infinitive, gerund, participle আর phrasal verb-এর ব্যবহার।', lessons: [],
    topics: ['Infinitives', 'Gerunds', 'Verbs followed by gerund, infinitive, or both', 'Participles', 'Perfect infinitives and perfect gerunds', 'Phrasal verbs', 'Prepositional verbs and phrasal-prepositional verbs'] },
  { id: 'S11', glyph: 'S+V', en: 'STAGE 11 · B1–C1', bn: 'মিল ও নির্ভুলতা (Agreement and Accuracy)', desc: 'কর্তা আর ক্রিয়ার মিল, আর সাধারণ ভুল এড়ানোর কৌশল।', lessons: [],
    topics: ['Subject-verb agreement', 'Pronoun-antecedent agreement', 'Parallel structure', 'Misplaced and dangling modifiers', 'Comparative structures', 'So, such, too, enough, very', 'Quantifiers in depth', 'Reflexive vs reciprocal forms'] },
  { id: 'S12', glyph: 'Not', en: 'STAGE 12 · C1–C2', bn: 'উন্নত গঠন (Advanced Structures)', desc: 'জোর দেওয়া, আনুষ্ঠানিক আর সাহিত্যিক ইংরেজির উঁচু স্তরের গঠন।', lessons: [],
    topics: ['Inversion for emphasis', 'Cleft sentences', 'Subjunctive', 'Ellipsis and substitution', 'Fronting and emphasis', 'Nominalization', 'Hedging and formal vs informal grammar', 'Discourse markers and cohesion'] },
  { id: 'S13', glyph: ';', en: 'STAGE 13 · B1–B2', bn: 'যতিচিহ্ন ও বানান (Punctuation and Spelling)', desc: 'কমা, অ্যাপোস্ট্রফি, উদ্ধৃতিচিহ্ন আর বানানের নিয়ম।', lessons: [],
    topics: ['Full stop, comma, question and exclamation marks', 'Apostrophe', 'Colon, semicolon, dash, hyphen, brackets', 'Quotation marks and direct speech', 'Capitalization rules', 'Spelling rules', 'Abbreviations and numbers'] },
  { id: 'S14', glyph: 'its', en: 'STAGE 14 · B1–C2', bn: 'শব্দের সঠিক ব্যবহার (Usage and Vocabulary)', desc: 'গুলিয়ে ফেলা শব্দ, collocation, idiom আর আনুষ্ঠানিক-অনানুষ্ঠানিক ভাষা।', lessons: [],
    topics: ['Commonly confused words', 'Collocations', 'Idioms', 'Register: formal, neutral, informal', 'American vs British differences'] },
  { id: 'S15', glyph: 'Pen', en: 'STAGE 15 · B1–C2', bn: 'লেখা ও বলায় প্রয়োগ (Writing and Speaking)', desc: 'শেখা গ্রামার কাজে লাগিয়ে অনুচ্ছেদ, ইমেল, রচনা লেখা আর কথা বলা।', lessons: [],
    topics: ['Writing correct paragraphs', 'Emails and letters', 'Narrative, descriptive, argumentative essays', 'Editing and proofreading', 'Speaking: stress, intonation, self-correction'] }
];
