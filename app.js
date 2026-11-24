/* Grammar Adventure: app logic (no dependencies). */
(function () {
  'use strict';

  var LEVELS = window.GA_LEVELS;
  var app = document.getElementById('app');
  var KEY = 'ga_progress_v1';

  /* ---------- progress (localStorage with in-memory fallback) ---------- */
  var mem = { lessons: {} };
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var p = JSON.parse(raw); if (p && p.lessons) return p; }
    } catch (e) { /* storage unavailable */ }
    return mem;
  }
  var progress = load();
  function save() {
    mem = progress;
    try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) { /* ignore */ }
  }

  /* ---------- helpers ---------- */
  var ALL = [];
  LEVELS.forEach(function (lv) { lv.lessons.forEach(function (ls) { ls.levelId = lv.id; ALL.push(ls); }); });

  var BN = '০১২৩৪৫৬৭৮৯';
  function bn(n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }
  function speak(text) {
    try {
      var s = window.speechSynthesis;
      if (!s) return;
      s.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      s.speak(u);
    } catch (e) { /* speech not available */ }
  }
  var toastTimer = null;
  function toast(msg) {
    var old = document.getElementById('toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = msg;
    document.body.appendChild(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.remove(); }, 2600);
  }

  function lesson(id) { return ALL.filter(function (l) { return l.id === id; })[0]; }
  function level(id) { return LEVELS.filter(function (l) { return l.id === id; })[0]; }
  function isDone(id) { return !!progress.lessons[id]; }
  function starsOf(id) { return progress.lessons[id] ? progress.lessons[id].stars : 0; }
  function isUnlocked(id) {
    /* Any level can be skipped to: the first lesson of every level is open.
       Inside a level, lessons still go in order. */
    var idx = ALL.map(function (l) { return l.id; }).indexOf(id);
    if (idx < 0) return false;
    if (idx === 0) return true;
    return ALL[idx - 1].levelId !== ALL[idx].levelId || isDone(ALL[idx - 1].id);
  }
  function totalStars() {
    var n = 0;
    ALL.forEach(function (l) { n += starsOf(l.id); });
    return n;
  }
  function nextLesson() { return ALL.filter(function (l) { return !isDone(l.id); })[0] || null; }
  function levelStates() {
    var found = false;
    return LEVELS.map(function (lv) {
      if (!lv.lessons.length) return 'soon';
      if (lv.lessons.every(function (l) { return isDone(l.id); })) return 'done';
      if (!found) { found = true; return 'current'; }
      return 'open';
    });
  }

  /* ---------- icons ---------- */
  function svg(inner, extra) {
    return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + inner + '</svg>';
  }
  var I = {
    star: function (on) {
      return '<svg class="star' + (on ? ' on' : '') + '" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 3 14.8 9 21 9.6 16.2 13.8 17.7 20 12 16.7 6.3 20 7.8 13.8 3 9.6 9.2 9"></polygon></svg>';
    },
    check: svg('<path d="M5 12l5 5 9-10"></path>'),
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"></path>'),
    back: svg('<path d="M15 5l-7 7 7 7"></path>'),
    speaker: svg('<path d="M4 9v6h4l5 4V5L8 9H4z"></path><path d="M16.5 9a4 4 0 0 1 0 6"></path>'),
    flag: svg('<path d="M5 21V4"></path><path d="M5 4h12l-3 4 3 4H5"></path>'),
    trophy: svg('<path d="M8 4h8v5a4 4 0 0 1-8 0z"></path><path d="M8 6H5v2a3 3 0 0 0 3 3"></path><path d="M16 6h3v2a3 3 0 0 1-3 3"></path><path d="M12 13v4"></path><path d="M9 20h6"></path><path d="M10 17h4"></path>')
  };

  /* ---------- state ---------- */
  var view = { name: 'home' };
  var S = null;           // lesson session
  var focusHeading = false;

  function go(v) {
    view = v;
    focusHeading = true;
    render();
    try { window.scrollTo(0, 0); } catch (e) { /* ignore */ }
  }

  /* ---------- home ---------- */
  var STATUS = { done: 'সম্পন্ন', current: 'এখন এখানে', open: 'খোলা', locked: 'লক করা', soon: 'শীঘ্রই আসছে' };
  var RADII = ['50%', '42% 58% 55% 45% / 50% 42% 58% 50%', '58% 42% 46% 54% / 46% 56% 44% 54%'];
  var TREES = ['#7FD1B9', '#FFB4A8', '#C9B8FF'];

  function topbar() {
    return '<header class="topbar"><div class="brand"><span class="logo">Aa</span><span class="brand-name">Wordtrail Grammar</span></div>' +
      '<div class="stars-pill" aria-label="মোট তারা ' + bn(totalStars()) + '">' + I.star(true) + '<span>' + bn(totalStars()) + '</span></div></header>';
  }

  function trail(states) {
    var n = LEVELS.length;
    return LEVELS.map(function (lv, i) {
      var left = i % 2 === 0;
      var xn = left ? 22 : 78, nx = left ? 78 : 22;
      var s = states[i], cur = s === 'current';
      var size = cur ? 84 : 68, gap = cur ? 62 : 54;
      var rowH = cur ? 340 : (i === n - 1 ? 150 : 190);
      var doneCls = s === 'done' ? ' done' : '';
      var d = 'M ' + xn + ' 0 C ' + xn + ' 50, ' + nx + ' 50, ' + nx + ' 100';
      var seg = i < n - 1
        ? '<svg class="tr-seg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="tr-base' + doneCls + '" d="' + d + '"></path><path class="tr-dash' + doneCls + '" d="' + d + '"></path></svg>'
        : '';
      var tree = (!cur && i < n - 1)
        ? '<svg class="tr-tree" style="left:' + (left ? '7%' : '82%') + '" viewBox="0 0 44 52" aria-hidden="true"><circle cx="22" cy="20" r="16" fill="' + TREES[i % 3] + '"></circle><rect x="19" y="32" width="6" height="18" rx="3" fill="#7A5A3A"></rect></svg>'
        : '';
      var badge = s === 'done' ? '<span class="tr-badge ok">' + I.check + '</span>'
        : (s === 'locked' || s === 'soon') ? '<span class="tr-badge lk">' + I.lock + '</span>' : '';
      var node = '<button class="tr-node st-' + s + '" style="left:' + xn + '%;width:' + size + 'px;height:' + size + 'px;border-radius:' + (cur ? '50%' : RADII[i % 3]) + ';font-size:' + (cur ? 28 : 22) + 'px" data-action="level" data-id="' + lv.id + '" aria-label="' + esc(lv.bn) + ' — ' + STATUS[s] + '">' + esc(lv.glyph) + badge + '</button>';
      var pos = left ? 'left:calc(22% + ' + gap + 'px);right:4%' : 'left:4%;right:calc(22% + ' + gap + 'px)';
      var label = '<div class="tr-label ' + (left ? 'l' : 'r') + '" style="' + pos + '"><span class="tr-en">' + esc(lv.en) + '</span><h3>' + esc(lv.bn) + '</h3><span class="pill st-' + s + '">' + STATUS[s] + '</span></div>';
      var card = cur
        ? '<div class="tr-card"><p>' + esc(lv.desc) + '</p><span class="tr-meta">' + bn(lv.lessons.length) + 'টি পাঠ · প্রায় ৫ মিনিট করে</span><button class="btn sm" data-action="start-level" data-id="' + lv.id + '">পাঠ শুরু করো</button></div>'
        : '';
      return '<div class="tr-row" style="min-height:' + rowH + 'px">' + seg + tree + node + label + card + '</div>';
    }).join('');
  }

  function home() {
    var states = levelStates();
    var next = nextLesson();
    var started = ALL.some(function (l) { return isDone(l.id); });
    var label = !next ? 'আবার খেলো' : (started ? 'পরের পাঠ' : 'যাত্রা শুরু করো');
    var allBuilt = !next;
    return '<div class="wrap">' + topbar() +
      '<section class="hero"><h1>শূন্য থেকে <mark>মাস্টার</mark></h1>' +
      '<div class="chips" aria-hidden="true"><span class="c-art">The</span><span class="c-noun">cat</span><span class="c-verb">jumps</span><span class="c-adv">high.</span></div>' +
      '<p>প্রতিটি পাঠ ছোট, রঙিন আর খেলার মতো। কিছু জানার দরকার নেই, শুধু পথ ধরে এগোও।</p>' +
      '<button class="btn" data-action="continue">' + label + '</button></section>' +
      '<section class="trail-sec" aria-labelledby="trailH"><div class="sec-head"><span class="tag">তোমার অ্যাডভেঞ্চার ম্যাপ</span><h2 id="trailH">' + bn(LEVELS.length) + 'টি ধাপ, একটাই পথ</h2><p>যেকোনো ধাপে ট্যাপ করে সেখান থেকেই শুরু করতে পারো।</p></div>' +
      '<div class="flag"><span>' + I.flag + 'যাত্রা শুরু</span></div>' +
      '<div class="trail">' + trail(states) + '</div>' +
      '<div class="finish">' + I.trophy + '<h3>গন্তব্য: মাস্টার সার্টিফিকেট</h3><p>' +
      (allBuilt ? 'এখনকার সব পাঠ শেষ! বাকি ধাপগুলো তৈরি হচ্ছে।' : bn(LEVELS.length) + 'টি ধাপ শেষ করলে পাবে নিজের লেখা গল্প আর একটি সার্টিফিকেট।') +
      '</p></div></section></div>';
  }

  /* ---------- level screen ---------- */
  function levelScreen() {
    var lv = level(view.id);
    var st = levelStates()[LEVELS.indexOf(lv)];
    var items = !lv.lessons.length ? (lv.topics || []).map(function (t, k) {
      return '<li><button class="lesson" disabled><span class="num">' + bn(k + 1) + '</span>' +
        '<span class="txt"><strong>' + esc(t) + '</strong><span>শীঘ্রই আসছে</span></span>' +
        '<span class="mini-stars" style="font-size:22px">' + I.lock + '</span></button></li>';
    }).join('') : lv.lessons.map(function (ls, k) {
      var done = isDone(ls.id), open = isUnlocked(ls.id);
      var right = done
        ? '<span class="mini-stars" aria-label="' + bn(starsOf(ls.id)) + 'টি তারা">' + [1, 2, 3].map(function (n) { return I.star(n <= starsOf(ls.id)); }).join('') + '</span>'
        : (open ? '' : '<span class="mini-stars" style="font-size:22px">' + I.lock + '</span>');
      return '<li><button class="lesson' + (done ? ' done' : '') + '" data-action="lesson" data-id="' + ls.id + '"' + (open ? '' : ' disabled') + '>' +
        '<span class="num">' + (done ? I.check : bn(k + 1)) + '</span>' +
        '<span class="txt"><strong>' + esc(ls.title) + '</strong><span>' + esc(ls.sub) + '</span></span>' + right + '</button></li>';
    }).join('');
    return '<div class="wrap"><div class="back"><button class="icon-btn" data-action="home" aria-label="রোডম্যাপে ফিরে যাও">' + I.back + '</button><h2 id="stepH" tabindex="-1">' + esc(lv.bn) + '</h2></div>' +
      '<section class="lv-hero"><span class="tr-node st-' + st + '" aria-hidden="true">' + esc(lv.glyph) + '</span><div><span class="tr-en">' + esc(lv.en) + '</span><p>' + esc(lv.desc) + '</p></div></section>' +
      '<ol class="lessons">' + items + '</ol></div>';
  }

  /* ---------- lesson player ---------- */
  function initUi(st) {
    if (st.type === 'choice') return { sel: -1 };
    if (st.type === 'pick') return { sel: [] };
    if (st.type === 'build') {
      var bank = st.bank.map(function (t, k) { return { t: t, k: k }; });
      var sh, tries = 0;
      do { sh = shuffle(bank.slice()); tries++; }
      while (tries < 20 && sh.map(function (b) { return b.t; }).join('|') === st.answer.join('|'));
      return { bank: sh, used: [] };
    }
    return {};
  }

  function startLesson(id) {
    var ls = lesson(id);
    S = { lesson: ls, i: 0, mistakes: 0, phase: 'q', ok: false, msg: null, ui: initUi(ls.steps[0]) };
    go({ name: 'lesson' });
  }

  function joiner(st) { return st.join === undefined ? ' ' : st.join; }

  function stepBody(st) {
    var ui = S.ui, checked = S.phase === 'checked';
    var h = function (kind, title) {
      return '<span class="kind">' + kind + '</span><h2 id="stepH" tabindex="-1">' + esc(title) + '</h2>';
    };
    if (st.type === 'learn') {
      var items = (st.items || []).map(function (it) {
        return '<button class="item" data-action="say" data-say="' + esc(it.say) + '"><span class="t">' + esc(it.t) + '</span><span class="s">' + esc(it.s) + '</span><span class="sp">' + I.speaker + '</span></button>';
      }).join('');
      return h('নতুন কথা', st.title) + '<p class="lead">' + esc(st.body) + '</p>' + (items ? '<div class="items">' + items + '</div>' : '');
    }
    if (st.type === 'choice') {
      var opts = st.opts.map(function (o, k) {
        var cls = 'opt';
        if (checked) { if (k === st.a) cls += ' right'; else if (k === ui.sel) cls += ' wrong'; }
        else if (k === ui.sel) cls += ' sel';
        return '<button class="' + cls + '" data-action="opt" data-i="' + k + '"' + (checked ? ' disabled' : '') + '><span class="k">' + bn(k + 1) + '</span>' + esc(o) + '</button>';
      }).join('');
      return h('প্রশ্ন', st.q) + '<div class="opts">' + opts + '</div>';
    }
    if (st.type === 'pick') {
      var words = st.words.map(function (w, k) {
        var on = ui.sel.indexOf(k) > -1, tg = st.targets.indexOf(k) > -1, cls = 'word';
        if (checked) { if (on && tg) cls += ' right'; else if (on) cls += ' wrong'; else if (tg) cls += ' miss'; }
        else if (on) cls += ' sel';
        return '<button class="' + cls + '" data-action="tog" data-i="' + k + '"' + (checked ? ' disabled' : '') + ' aria-pressed="' + on + '">' + esc(w) + '</button>';
      }).join('');
      return h('বেছে নাও', st.q) + '<div class="wordrow">' + words + '</div>';
    }
    // build
    var placed = ui.used.map(function (k, pos) {
      var b = ui.bank.filter(function (x) { return x.k === k; })[0];
      return '<button class="word" data-action="rem" data-pos="' + pos + '"' + (checked ? ' disabled' : '') + '>' + esc(b.t) + '</button>';
    }).join('');
    var bankHtml = ui.bank.map(function (b) {
      var used = ui.used.indexOf(b.k) > -1;
      return '<button class="word' + (used ? ' used' : '') + '" data-action="add" data-k="' + b.k + '"' + (used || checked ? ' disabled' : '') + '>' + esc(b.t) + '</button>';
    }).join('');
    return h('সাজিয়ে লেখো', st.q) +
      '<div class="slots' + (checked ? (S.ok ? ' right' : ' wrong') : '') + '">' + (placed || '<span class="hint">নিচের শব্দে ট্যাপ করে এখানে সাজাও</span>') + '</div>' +
      '<div class="wordrow">' + bankHtml + '</div>';
  }

  function stepFoot(st) {
    var last = S.i === S.lesson.steps.length - 1;
    if (st.type === 'learn') {
      return '<div class="p-foot"><button class="btn block" data-action="next">' + (last ? 'শেষ করো' : 'এগিয়ে চলো') + '</button></div>';
    }
    var ui = S.ui, can = false;
    if (st.type === 'choice') can = ui.sel >= 0;
    if (st.type === 'pick') can = ui.sel.length > 0;
    if (st.type === 'build') can = ui.used.length > 0;
    if (S.phase === 'q') {
      return '<div class="p-foot"><div role="status" aria-live="polite"></div><button class="btn block" data-action="check"' + (can ? '' : ' disabled') + '>যাচাই করো</button></div>';
    }
    return '<div class="p-foot"><div role="status" aria-live="polite"><div class="fb ' + (S.ok ? 'ok' : 'bad') + '"><strong>' + esc(S.msg.h) + '</strong>' + esc(S.msg.b) + '</div></div>' +
      '<button class="btn block" data-action="next">' + (last ? 'শেষ করো' : 'পরের ধাপ') + '</button></div>';
  }

  function lessonScreen() {
    var st = S.lesson.steps[S.i], total = S.lesson.steps.length;
    var pct = Math.round((S.i + (S.phase === 'checked' ? 1 : 0)) / total * 100);
    return '<div class="player"><div class="p-top"><button class="icon-btn" data-action="quit" aria-label="পাঠ বন্ধ করো">' + I.close + '</button>' +
      '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="পাঠের অগ্রগতি"><div class="bar-fill" style="width:' + pct + '%"></div></div></div>' +
      '<main class="p-body">' + stepBody(st) + '</main>' + stepFoot(st) + '</div>';
  }

  var OKS = ['দারুণ! একদম ঠিক।', 'ঠিক ধরেছ!', 'চমৎকার!', 'শাবাশ!'];
  var BADS = ['আরেকটু হলেই হতো!', 'ঠিক আছে, এবার জেনে নাও।'];

  function check() {
    var st = S.lesson.steps[S.i], ui = S.ui, ok = false, ans = '', j = joiner(st);
    if (st.type === 'choice') { ok = ui.sel === st.a; ans = st.opts[st.a]; }
    if (st.type === 'pick') {
      var a = ui.sel.slice().sort().join(','), b = st.targets.slice().sort().join(',');
      ok = a === b;
      ans = st.targets.map(function (i) { return st.words[i]; }).join(', ');
    }
    if (st.type === 'build') {
      var built = ui.used.map(function (k) { return ui.bank.filter(function (x) { return x.k === k; })[0].t; }).join(j);
      ans = st.answer.join(j);
      ok = built === ans;
      if (ok) speak(j === '' ? ans.toLowerCase() : ans);
    }
    S.phase = 'checked';
    S.ok = ok;
    if (!ok) S.mistakes++;
    S.msg = ok ? { h: pickOne(OKS), b: st.why } : { h: pickOne(BADS), b: 'সঠিক উত্তর: ' + ans + '। ' + st.why };
    focusHeading = false;
    render();
  }

  function next() {
    S.i++;
    if (S.i >= S.lesson.steps.length) { finish(); return; }
    S.phase = 'q';
    S.ui = initUi(S.lesson.steps[S.i]);
    focusHeading = true;
    render();
    try { window.scrollTo(0, 0); } catch (e) { /* ignore */ }
  }

  function finish() {
    var m = S.mistakes;
    var stars = m === 0 ? 3 : (m <= 2 ? 2 : 1);
    var id = S.lesson.id;
    if (!progress.lessons[id] || progress.lessons[id].stars < stars) progress.lessons[id] = { stars: stars };
    save();
    S.stars = stars;
    go({ name: 'result' });
  }

  function resultScreen() {
    var ls = S.lesson, stars = S.stars;
    var head = stars === 3 ? 'অসাধারণ!' : (stars === 2 ? 'খুব ভালো!' : 'ভালো চেষ্টা!');
    var sub = S.mistakes === 0 ? 'একটাও ভুল হয়নি।' : bn(S.mistakes) + 'টি ভুল হয়েছে। আবার খেললে আরও তারা পাবে।';
    var idx = ALL.indexOf(ls);
    var nxt = ALL[idx + 1];
    var lv = level(ls.levelId);
    var lvDone = lv.lessons.every(function (l) { return isDone(l.id); });
    var note = lvDone ? '<p class="lead"><strong>' + esc(lv.bn) + '</strong> ধাপ সম্পন্ন!</p>' : '';
    var actions = nxt
      ? '<button class="btn" data-action="lesson" data-id="' + nxt.id + '">পরের পাঠ: ' + esc(nxt.title) + '</button>'
      : '<p class="lead">এখনকার সব পাঠ শেষ! আরও ধাপ শীঘ্রই আসছে।</p>';
    return '<div class="player"><main class="p-body result">' +
      '<div class="big-stars" role="img" aria-label="' + bn(stars) + 'টি তারা পেয়েছ">' + [1, 2, 3].map(function (n) { return I.star(n <= stars); }).join('') + '</div>' +
      '<h2 id="stepH" tabindex="-1">' + head + '</h2><p class="lead">' + sub + '</p>' + note +
      '<div class="actions">' + actions +
      '<button class="btn ghost" data-action="lesson" data-id="' + ls.id + '">আবার খেলো</button>' +
      '<button class="btn ghost" data-action="home">রোডম্যাপে ফিরি</button></div></main></div>';
  }

  /* ---------- render + events ---------- */
  function render() {
    var html = '';
    if (view.name === 'home') html = home();
    else if (view.name === 'level') html = levelScreen();
    else if (view.name === 'lesson') html = lessonScreen();
    else html = resultScreen();
    app.innerHTML = html;
    if (focusHeading) {
      var h = document.getElementById('stepH');
      if (h) { try { h.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      focusHeading = false;
    }
  }

  function firstOpenLesson(levelId) {
    var lv = level(levelId);
    return lv.lessons.filter(function (l) { return !isDone(l.id); })[0] || lv.lessons[0];
  }

  app.addEventListener('click', function (e) {
    var t = e.target.closest('[data-action]');
    if (!t || t.disabled) return;
    var a = t.getAttribute('data-action');
    var id = t.getAttribute('data-id');

    if (a === 'say') { speak(t.getAttribute('data-say')); return; }
    if (a === 'home' || a === 'quit') { go({ name: 'home' }); return; }
    if (a === 'continue') { var n = nextLesson(); startLesson(n ? n.id : ALL[0].id); return; }
    if (a === 'lesson') { startLesson(id); return; }
    if (a === 'start-level') { startLesson(firstOpenLesson(id).id); return; }
    if (a === 'level') {
      go({ name: 'level', id: id });
      return;
    }

    if (!S) return;
    var st = S.lesson.steps[S.i];
    if (a === 'next') { next(); return; }
    if (a === 'check') { check(); return; }
    if (S.phase !== 'q') return;

    if (a === 'opt') { S.ui.sel = +t.getAttribute('data-i'); focusHeading = false; render(); return; }
    if (a === 'tog') {
      var k = +t.getAttribute('data-i'), p = S.ui.sel.indexOf(k);
      if (p > -1) S.ui.sel.splice(p, 1); else S.ui.sel.push(k);
      focusHeading = false; render(); return;
    }
    if (a === 'add') {
      var kk = +t.getAttribute('data-k');
      if (S.ui.used.indexOf(kk) === -1) S.ui.used.push(kk);
      focusHeading = false; render(); return;
    }
    if (a === 'rem') {
      S.ui.used.splice(+t.getAttribute('data-pos'), 1);
      focusHeading = false; render(); return;
    }
  });

  render();
})();
