// ===== DATA =====
const ELEMENTS = {
  fire:     {name:'Fire',     emoji:'🔥',color:'#e85c2a',bg:'#1e0a04',border:'#8a3010'},
  water:    {name:'Water',    emoji:'💧',color:'#2a8be8',bg:'#04101e',border:'#1060a0'},
  earth:    {name:'Earth',    emoji:'🌍',color:'#9a7a3a',bg:'#100c04',border:'#604020'},
  air:      {name:'Air',      emoji:'🌀',color:'#7ab8e8',bg:'#081018',border:'#407090'},
  lightning:{name:'Lightning',emoji:'⚡',color:'#e8d02a',bg:'#180e00',border:'#907010'},
  ice:      {name:'Ice',      emoji:'❄️',color:'#a8ddf0',bg:'#081018',border:'#4090b0'},
  nature:   {name:'Nature',   emoji:'🌿',color:'#3ab84a',bg:'#041008',border:'#207830'},
  shadow:   {name:'Shadow',   emoji:'🌑',color:'#9060e0',bg:'#08041e',border:'#602090'},
  light:    {name:'Light',    emoji:'✨',color:'#f0d060',bg:'#181004',border:'#a07820'},
  metal:    {name:'Metal',    emoji:'⚙️',color:'#9ab0c0',bg:'#0c1014',border:'#506070'}
};

const CARDS = [
  {id:'ember_drake',  name:'Ember Drake',   el:'fire',     hp:80, atk:18,def:8,  icon:'🐉',
   ab:[{id:'a1',n:'Flame Bite',  ic:'🔥',d:'Searing bite.',            c:1,dmg:[15,20],t:'dmg',e:null},
       {id:'a2',n:'Fire Breath', ic:'💨',d:'Scorches & burns enemy.',  c:2,dmg:[22,30],t:'dmg',e:{burn:2}},
       {id:'a3',n:'Ember Shield',ic:'🛡',d:'Gains a fire ward.',       c:1,dmg:[0,0],  t:'buff',e:{shield:10}},
       {id:'a4',n:'Inferno',     ic:'🌋',d:'Massive fire eruption.',   c:3,dmg:[35,45],t:'dmg',e:{burn:3}}]},
  {id:'tidal_sprite', name:'Tidal Sprite',  el:'water',    hp:90, atk:14,def:12, icon:'🧜',
   ab:[{id:'b1',n:'Water Jet',   ic:'💧',d:'Sharp water bolt.',        c:1,dmg:[12,18],t:'dmg',e:null},
       {id:'b2',n:'Hydro Heal',  ic:'💚',d:'Restores your HP.',        c:2,dmg:[-20,-15],t:'heal',e:null},
       {id:'b3',n:'Torrent',     ic:'🌊',d:'Crashing wave + slow.',    c:2,dmg:[20,28],t:'dmg',e:{slow:1}},
       {id:'b4',n:'Tidal Wave',  ic:'🌊',d:'Massive flood strike.',    c:3,dmg:[30,40],t:'dmg',e:{slow:2}},
       {id:'b5',n:'Mist Veil',   ic:'🌫',d:'Dodge next attack.',       c:2,dmg:[0,0],  t:'buff',e:{evade:1}}]},
  {id:'stone_golem',  name:'Stone Golem',   el:'earth',    hp:130,atk:12,def:20, icon:'🗿',
   ab:[{id:'c1',n:'Rock Smash',  ic:'🪨',d:'Heavy boulder hit.',       c:1,dmg:[14,20],t:'dmg',e:null},
       {id:'c2',n:'Earth Armor', ic:'🛡',d:'Fortifies defense.',       c:1,dmg:[0,0],  t:'buff',e:{shield:18}},
       {id:'c3',n:'Tremor',      ic:'🌋',d:'Shakes foe\'s footing.',   c:2,dmg:[18,25],t:'dmg',e:{stun:1}},
       {id:'c4',n:'Boulder Toss',ic:'💥',d:'Crushes the target.',      c:2,dmg:[22,30],t:'dmg',e:null}]},
  {id:'storm_hawk',   name:'Storm Hawk',    el:'lightning',hp:70, atk:20,def:8,  icon:'🦅',
   ab:[{id:'d1',n:'Talon Strike',ic:'⚡',d:'Fast lightning swipe.',    c:1,dmg:[16,22],t:'dmg',e:null},
       {id:'d2',n:'Thunderclap', ic:'💥',d:'Stuns with loud boom.',    c:2,dmg:[20,26],t:'dmg',e:{stun:1}},
       {id:'d3',n:'Static Field',ic:'🌩',d:'Charges for next hit.',    c:1,dmg:[0,0],  t:'buff',e:{charge:5}},
       {id:'d4',n:'Bolt Storm',  ic:'⛈',d:'Multiple lightning hits.', c:3,dmg:[40,50],t:'dmg',e:null},
       {id:'d5',n:'Discharge',   ic:'💫',d:'Area electric burst.',     c:2,dmg:[28,36],t:'dmg',e:null}]},
  {id:'frost_wisp',   name:'Frost Wisp',    el:'ice',      hp:75, atk:16,def:10, icon:'🧊',
   ab:[{id:'e1',n:'Ice Shard',   ic:'❄️',d:'Sharp ice projectile.',    c:1,dmg:[14,19],t:'dmg',e:null},
       {id:'e2',n:'Freeze Ray',  ic:'🌨',d:'Freezes the target.',      c:2,dmg:[18,24],t:'dmg',e:{freeze:1}},
       {id:'e3',n:'Blizzard',    ic:'🌪',d:'Frigid storm.',            c:3,dmg:[30,40],t:'dmg',e:{freeze:2}},
       {id:'e4',n:'Ice Armor',   ic:'🛡',d:'Crystalline ice ward.',    c:1,dmg:[0,0],  t:'buff',e:{shield:12}}]},
  {id:'vine_wraith',  name:'Vine Wraith',   el:'nature',   hp:100,atk:15,def:14, icon:'🌱',
   ab:[{id:'f1',n:'Thorn Lash',  ic:'🌿',d:'Whips with thorns.',       c:1,dmg:[13,18],t:'dmg',e:null},
       {id:'f2',n:'Entangle',    ic:'🪢',d:'Roots the enemy.',         c:2,dmg:[10,15],t:'dmg',e:{stun:1}},
       {id:'f3',n:'Nature\'s Mend',ic:'🌸',d:'Heals with life force.', c:2,dmg:[-25,-18],t:'heal',e:null},
       {id:'f4',n:'Spore Burst', ic:'🍄',d:'Poisons the enemy.',       c:2,dmg:[15,20],t:'dmg',e:{poison:3}},
       {id:'f5',n:'Ancient Grove',ic:'🌳',d:'Massive nature surge.',   c:3,dmg:[28,38],t:'dmg',e:null}]},
  {id:'shade_reaper', name:'Shade Reaper',  el:'shadow',   hp:85, atk:17,def:9,  icon:'🌑',
   ab:[{id:'g1',n:'Shadow Strike',ic:'🌑',d:'Dark, silent blow.',      c:1,dmg:[16,21],t:'dmg',e:null},
       {id:'g2',n:'Soul Drain',  ic:'💜',d:'Steals HP from foe.',      c:2,dmg:[20,26],t:'dmg',e:{lifesteal:0.5}},
       {id:'g3',n:'Void Step',   ic:'🌀',d:'Phases through attack.',   c:2,dmg:[0,0],  t:'buff',e:{evade:1}},
       {id:'g4',n:'Eclipse Blast',ic:'💥',d:'Dark energy explosion.',  c:3,dmg:[35,44],t:'dmg',e:null}]},
  {id:'solar_phoenix',name:'Solar Phoenix', el:'light',    hp:95, atk:16,def:11, icon:'🦜',
   ab:[{id:'h1',n:'Radiant Beam',ic:'✨',d:'Searing ray of light.',    c:1,dmg:[15,20],t:'dmg',e:null},
       {id:'h2',n:'Holy Mend',   ic:'💫',d:'Heals with pure light.',   c:2,dmg:[-22,-16],t:'heal',e:null},
       {id:'h3',n:'Blinding Flash',ic:'⚡',d:'Blinds the enemy.',      c:2,dmg:[12,18],t:'dmg',e:{blind:2}},
       {id:'h4',n:'Resurrection',ic:'🌅',d:'Major healing surge.',     c:3,dmg:[-35,-28],t:'heal',e:null},
       {id:'h5',n:'Solar Flare', ic:'☀️',d:'Brilliant solar burst.',   c:3,dmg:[38,48],t:'dmg',e:null}]},
  {id:'gale_djinn',   name:'Gale Djinn',    el:'air',      hp:78, atk:15,def:9,  icon:'🌪',
   ab:[{id:'i1',n:'Wind Slash',  ic:'🌀',d:'Cutting air blade.',       c:1,dmg:[13,19],t:'dmg',e:null},
       {id:'i2',n:'Cyclone',     ic:'🌪',d:'Spinning wind fury + slow.',c:2,dmg:[20,27],t:'dmg',e:{slow:1}},
       {id:'i3',n:'Air Barrier', ic:'🛡',d:'Wind cushions blows.',     c:1,dmg:[0,0],  t:'buff',e:{shield:8}},
       {id:'i4',n:'Tempest Roar',ic:'⛈',d:'Howling storm blast.',     c:3,dmg:[32,42],t:'dmg',e:null}]},
  {id:'iron_titan',   name:'Iron Titan',    el:'metal',    hp:120,atk:14,def:22, icon:'🤖',
   ab:[{id:'j1',n:'Iron Fist',   ic:'⚙️',d:'Heavy metal punch.',       c:1,dmg:[15,22],t:'dmg',e:null},
       {id:'j2',n:'Steel Guard', ic:'🛡',d:'Near-impenetrable wall.',  c:2,dmg:[0,0],  t:'buff',e:{shield:25}},
       {id:'j3',n:'Gear Grinder',ic:'⚙️',d:'Crushes with gears.',      c:2,dmg:[20,28],t:'dmg',e:{bleed:2}},
       {id:'j4',n:'Overdrive',   ic:'💥',d:'Full power overload.',     c:3,dmg:[40,52],t:'dmg',e:null},
       {id:'j5',n:'Rivet Storm', ic:'🔩',d:'Sprays metal shards.',     c:2,dmg:[22,30],t:'dmg',e:null}]}
];

const ENEMIES = [
  {name:'Cinder Rat',    icon:'🐀',hp:50, atk:10,def:3, el:'fire',     gold:20,xp:15},
  {name:'Sea Jellyfish', icon:'🪼',hp:60, atk:8, def:6, el:'water',    gold:22,xp:16},
  {name:'Dirt Crawler',  icon:'🐛',hp:70, atk:9, def:8, el:'earth',    gold:25,xp:18},
  {name:'Zap Sparrow',   icon:'🐦',hp:45, atk:14,def:4, el:'lightning',gold:28,xp:20},
  {name:'Frost Bat',     icon:'🦇',hp:55, atk:11,def:5, el:'ice',      gold:26,xp:19},
  {name:'Thorn Bush',    icon:'🌵',hp:65, atk:8, def:10,el:'nature',   gold:24,xp:17},
  {name:'Dark Shade',    icon:'👻',hp:58, atk:13,def:5, el:'shadow',   gold:30,xp:22},
  {name:'Glowbug',       icon:'✨',hp:52, atk:10,def:7, el:'light',    gold:27,xp:20},
  {name:'Wind Sprite',   icon:'💨',hp:48, atk:12,def:4, el:'air',      gold:26,xp:18},
  {name:'Rust Golem',    icon:'🤖',hp:80, atk:11,def:14,el:'metal',    gold:32,xp:24},
  {name:'Flame Wyrm',    icon:'🐲',hp:90, atk:16,def:8, el:'fire',     gold:40,xp:30},
  {name:'Tsunami Seal',  icon:'🦭',hp:95, atk:14,def:12,el:'water',    gold:42,xp:32},
  {name:'Quake Troll',   icon:'👹',hp:110,atk:13,def:16,el:'earth',    gold:45,xp:35},
  {name:'Thunder Eagle', icon:'🦅',hp:85, atk:18,def:7, el:'lightning',gold:48,xp:36},
  {name:'Ice Leviathan', icon:'🐋',hp:100,atk:15,def:11,el:'ice',      gold:44,xp:33},
  {name:'Dragon King',   icon:'🐉',hp:160,atk:22,def:15,el:'fire',     gold:100,xp:80,boss:true},
  {name:'Ocean Titan',   icon:'🌊',hp:170,atk:18,def:20,el:'water',    gold:110,xp:85,boss:true},
  {name:'Quake Lord',    icon:'🌋',hp:180,atk:20,def:22,el:'earth',    gold:120,xp:90,boss:true},
  {name:'Storm Tyrant',  icon:'⛈', hp:155,atk:25,def:12,el:'lightning',gold:105,xp:82,boss:true},
  {name:'Shadow Emperor',icon:'🌑',hp:175,atk:21,def:18,el:'shadow',   gold:130,xp:100,boss:true}
];

const CHAPTERS = [
  {title:'Chapter I — The Ember Trials', stages:[
    {name:'Cinder Fields',        diff:'Easy',   ei:0},
    {name:'Sea Cave',             diff:'Easy',   ei:1},
    {name:'Dusty Plateau',        diff:'Easy',   ei:2},
    {name:'Boss: Flame Wyrm',     diff:'Boss',   ei:10, boss:true}
  ]},
  {title:'Chapter II — Tempest Peaks', stages:[
    {name:'Lightning Ridge',      diff:'Medium', ei:3},
    {name:'Frost Hollow',         diff:'Medium', ei:4},
    {name:'Tangled Bog',          diff:'Medium', ei:5},
    {name:'Boss: Tsunami Seal',   diff:'Boss',   ei:11, boss:true}
  ]},
  {title:'Chapter III — The Shadow Realm', stages:[
    {name:'Haunted Vale',         diff:'Hard',   ei:6},
    {name:'Radiant Temple',       diff:'Hard',   ei:7},
    {name:'Sky Fortress',         diff:'Hard',   ei:8},
    {name:'Boss: Quake Lord',     diff:'Boss',   ei:12, boss:true}
  ]},
  {title:'Chapter IV — Final Ascent', stages:[
    {name:'Thunder Peaks',        diff:'Hard',   ei:13},
    {name:'Ice Wastes',           diff:'Hard',   ei:14},
    {name:'Dragon\'s Maw',        diff:'Elite',  ei:9},
    {name:'Final Boss: Dragon King',diff:'Final',ei:15,boss:true}
  ]}
];

// ===== STATE =====
let S = {
  player: null,
  gold: 100,
  gems: 3,
  activeCard: null,
  collection: [],
  done: [],
  unlocked: ['0_0'],
  battleState: null,
  winStreak: 0
};

function saveS() { try { localStorage.setItem('elem2', JSON.stringify(S)); } catch(e){} }
function loadS() {
  try {
    const d = JSON.parse(localStorage.getItem('elem2')||'null');
    if(d && d.player) {
      S = d;
      if(!S.unlocked) S.unlocked = ['0_0'];
      if(!S.unlocked.includes('0_0')) S.unlocked.unshift('0_0');
      if(!S.winStreak) S.winStreak = 0;
    }
  } catch(e){}
}

function initCollection() {
  const picks = shuffle([...CARDS]).slice(0,3);
  S.collection = picks.map(c => ({id:c.id, level:1, xp:0}));
  S.activeCard = S.collection[0].id;
}

function getCard(id) { return CARDS.find(c=>c.id===id); }
function getOwned(id) { return S.collection.find(c=>c.id===id); }

function stats(id, level) {
  const t = getCard(id); if(!t) return {hp:100,atk:10,def:10};
  const l = level||1;
  return { hp: t.hp + (l-1)*8, atk: t.atk + (l-1)*3, def: t.def + (l-1)*2 };
}
function upgCost(l) { return 30 + l*25; }
function xpNext(l)  { return 20 + l*15; }
function abilUnlock(i) { return [1,1,2,3,4][i]||4; }

// ===== SCREENS =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function logout() { S.player=null; saveS(); showScreen('auth-screen'); }

// AUTH
function authGoogle() {
  S.player = {type:'google', name:'Guardian_'+Math.floor(Math.random()*9000+1000)};
  if(!S.collection.length) initCollection();
  saveS(); goMenu();
}
function authGuest() {
  S.player = {type:'guest', name:'Guest Wanderer'};
  if(!S.collection.length) initCollection();
  saveS(); goMenu();
}

// MENU
function goMenu() {
  const ac = S.activeCard ? getCard(S.activeCard) : null;
  document.getElementById('greeting').textContent = `Welcome back, ${S.player.name}`;
  document.getElementById('gold-display').textContent = S.gold;
  document.getElementById('gem-display').textContent = S.gems;
  document.getElementById('active-card-name').textContent = ac ? `${ac.icon} ${ac.name}` : 'None — select one in Collection';
  const wrap = document.getElementById('card-preview');
  wrap.innerHTML = '';
  S.collection.slice(0,5).forEach(c=>{
    const t = getCard(c.id); if(!t) return;
    const el = ELEMENTS[t.el];
    const d = document.createElement('div');
    d.className = 'mini-card';
    d.style.cssText = `background:${el.bg};border-color:${el.border};${c.id===S.activeCard?'outline:2px solid '+el.color:''}`;
    d.title = t.name; d.textContent = t.icon;
    d.onclick = ()=>openDetail(t.id);
    wrap.appendChild(d);
  });
  showScreen('menu-screen');
}

// CAMPAIGN
function goToCampaign() {
  renderCampaign();
  showScreen('campaign-screen');
}

function renderCampaign() {
  const body = document.getElementById('campaign-body');
  body.innerHTML = '';
  let total=0, done=0;

  CHAPTERS.forEach((ch, ci)=>{
    total += ch.stages.length;
    const chDiv = document.createElement('div');
    chDiv.className = 'chapter';
    chDiv.innerHTML = `<div class="chapter-title">${ch.title}</div>`;
    const row = document.createElement('div');
    row.className = 'stage-row';

    ch.stages.forEach((st, si)=>{
      const key = `${ci}_${si}`;
      const isDone = S.done.includes(key);
      const isUnlocked = S.unlocked.includes(key);
      if(isDone) done++;

      const btn = document.createElement('button');
      const stateClass = isDone ? 'completed' : isUnlocked ? 'available' : 'locked';
      btn.className = `stage-btn ${stateClass}${st.boss?' boss':''}`;
      btn.innerHTML = `<span class="stage-name">${st.boss?'⚔ ':''}${st.name}</span><span class="stage-diff">${isDone?'✓ Done':st.diff}</span>`;

      if(isUnlocked) {
        btn.onclick = ()=>launchBattle(st.ei, st.name, ci, si);
      }
      row.appendChild(btn);
    });

    chDiv.appendChild(row);
    body.appendChild(chDiv);
  });

  document.getElementById('camp-progress').textContent = `${done}/${total}`;
}

// COLLECTION
function showCollection() {
  renderCollection();
  showScreen('collection-screen');
}

function renderCollection() {
  const grid = document.getElementById('coll-grid');
  grid.innerHTML = '';
  CARDS.forEach(t=>{
    const owned = getOwned(t.id);
    const el = ELEMENTS[t.el];
    const lvl = owned ? owned.level : 0;
    const st = stats(t.id, lvl||1);
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = `background:${owned?el.bg:'#090909'};border-color:${owned?el.border:'#181818'};opacity:${owned?1:0.38};`;
    const isActive = t.id === S.activeCard;
    card.innerHTML = `
      ${isActive?`<div class="card-selected-ring" style="border-color:${el.color}"></div>`:''}
      <div class="card-level">Lv ${lvl||'?'}</div>
      <div class="card-icon">${t.icon}</div>
      <div class="card-name" style="color:${owned?el.color:'#444'}">${t.name}</div>
      <div class="card-element" style="color:${owned?el.color:'#333'}">${el.emoji} ${el.name}</div>
      <div class="card-stats">
        <div class="stat"><div class="stat-val">${st.hp}</div><div class="stat-lbl">HP</div></div>
        <div class="stat"><div class="stat-val">${st.atk}</div><div class="stat-lbl">ATK</div></div>
        <div class="stat"><div class="stat-val">${st.def}</div><div class="stat-lbl">DEF</div></div>
      </div>
    `;
    if(owned) card.onclick = ()=>openDetail(t.id);
    grid.appendChild(card);
  });
}

// DETAIL MODAL
function openDetail(id) {
  const t = getCard(id); const owned = getOwned(id);
  if(!t||!owned) return;
  const el = ELEMENTS[t.el]; const lvl = owned.level;
  const st = stats(id, lvl); const xpn = xpNext(lvl); const cost = upgCost(lvl);

  document.getElementById('detail-box').style.borderColor = el.border;
  document.getElementById('detail-header').innerHTML = `
    <div class="detail-icon">${t.icon}</div>
    <div class="detail-name">${t.name}</div>
    <div class="detail-element">${el.emoji} ${el.name} &nbsp;·&nbsp; Level ${lvl}</div>
    <div style="font-size:0.72rem;color:var(--muted);margin-top:0.3rem">XP ${owned.xp} / ${xpn}</div>
    <div class="xp-bar-wrap"><div class="xp-bar-bg"><div class="xp-bar" style="width:${Math.round(owned.xp/xpn*100)}%"></div></div></div>
  `;

  const abHtml = t.ab.map((a,i)=>{
    const unlk = lvl >= abilUnlock(i);
    return `<div class="ability-row ${!unlk?'locked':''}">
      <div class="ability-icon">${a.ic}</div>
      <div class="ability-info">
        <div class="ability-name">${a.n}${!unlk?' 🔒':''}</div>
        <div class="ability-desc">${a.d}</div>
      </div>
      <div class="ability-cost">${a.c}⚡</div>
      ${unlk?`<div class="ability-tooltip"><strong>Damage:</strong> ${a.dmg[0]}-${a.dmg[1]} | <strong>Cost:</strong> ${a.c} Mana | ${a.e?'<strong>Effect:</strong> '+Object.keys(a.e).join(', '):'No special effect'}</div>`:''}
    </div>`;
  }).join('');

  const isActive = id === S.activeCard;
  document.getElementById('detail-body').innerHTML = `
    <div class="detail-stats">
      <div class="detail-stat"><div class="detail-stat-val" style="color:var(--hp-green)">${st.hp}</div><div class="detail-stat-lbl">HP</div></div>
      <div class="detail-stat"><div class="detail-stat-val" style="color:#f08060">${st.atk}</div><div class="detail-stat-lbl">ATK</div></div>
      <div class="detail-stat"><div class="detail-stat-val" style="color:#60a0f0">${st.def}</div><div class="detail-stat-lbl">DEF</div></div>
    </div>
    <div class="abilities-title">Abilities (hover to preview)</div>
    ${abHtml}
    <div class="upgrade-section">
      <div style="font-size:0.82rem;color:var(--muted)">Upgrade to Level ${lvl+1}</div>
      <div style="font-size:0.78rem;margin:0.3rem 0">Cost: <span class="gold-display">💰 ${cost} Gold</span> &nbsp;(you have ${S.gold})</div>
      <button class="upgrade-btn" onclick="doUpgrade('${id}')" ${S.gold>=cost&&lvl<10?'':'disabled'}>
        ${lvl>=10?'Max Level':S.gold>=cost?'✦ Upgrade':'Not enough Gold'}
      </button>
      <div style="font-size:0.72rem;color:var(--muted);margin-top:0.35rem">+8 HP · +3 ATK · +2 DEF per level</div>
      <button class="select-btn" style="background:${isActive?'#2a2040':'#0d0d18'};border-color:${isActive?'#8060c0':el.border};"
        onclick="doSelect('${id}')">
        ${isActive?'✓ Active Card (selected)':'⚔ Select for Battle'}
      </button>
    </div>
  `;
  document.getElementById('card-detail').classList.add('open');
}
function closeDetail() { document.getElementById('card-detail').classList.remove('open'); }

function doUpgrade(id) {
  const owned = getOwned(id); if(!owned||owned.level>=10) return;
  const cost = upgCost(owned.level);
  if(S.gold < cost) return;
  S.gold -= cost; owned.level++; owned.xp = 0;
  saveS(); notify(`${getCard(id).name} upgraded to Lv ${owned.level}!`);
  openDetail(id); goMenu();
}
function doSelect(id) {
  S.activeCard = id; saveS(); closeDetail();
  notify(`${getCard(id).icon} ${getCard(id).name} selected!`);
  renderCollection(); goMenu();
}

// ===== BATTLE =====
let B = {};
let abilityDebounce = false;

function quickBattle() {
  if(!S.activeCard) { notify('Select a card in Collection first!'); return; }
  launchBattle(Math.floor(Math.random()*10), 'Quick Battle', null, null);
}

function launchBattle(ei, title, ci, si) {
  if(!S.activeCard) { notify('Select a card in Collection first!'); goToCampaign(); return; }
  const t = getCard(S.activeCard);
  const owned = getOwned(S.activeCard);
  const lvl = owned ? owned.level : 1;
  const st = stats(t.id, lvl);
  const enemy = ENEMIES[ei];
  
  // Difficulty scaling: scale enemy stats by player level
  const enemyScaling = 1 + (lvl - 1) * 0.15;
  const scaledEnemy = {
    ...enemy,
    hp: Math.round(enemy.hp * enemyScaling),
    atk: Math.round(enemy.atk * enemyScaling),
    def: Math.round(enemy.def * enemyScaling)
  };
  
  const el = ELEMENTS[t.el];
  const availAb = t.ab.filter((_,i)=>lvl>=abilUnlock(i));

  B = {
    p: { name:t.name, icon:t.icon, hp:st.hp, maxHp:st.hp, atk:st.atk, def:st.def,
         mana:3, maxMana:5, shield:0, st:{}, abilities:availAb, el, lvl, cardId:t.id, lastAbilityUsed: null, comboTurns: 0 },
    e: { name:scaledEnemy.name, icon:scaledEnemy.icon, hp:scaledEnemy.hp, maxHp:scaledEnemy.hp,
         atk:scaledEnemy.atk, def:scaledEnemy.def, shield:0, st:{}, el:ELEMENTS[scaledEnemy.el], baseEnemy: enemy, difficulty: 'normal', healthThreshold: 0.33 },
    turn:1, pTurn:true, over:false,
    camp: ci!==null ? {ci,si,ei} : null
  };

  // Calculate enemy difficulty
  if(B.e.maxHp > st.hp * 1.5) B.e.difficulty = 'hard';
  if(B.e.maxHp > st.hp * 2) B.e.difficulty = 'extreme';

  document.getElementById('battle-title').textContent = title;
  document.getElementById('battle-over').classList.remove('show');
  document.getElementById('battle-log').innerHTML = '';
  abilityDebounce = false;
  renderBattle();
  showScreen('battle-screen');
  addLog('log-system', `⚔ ${t.icon} ${t.name} vs ${scaledEnemy.icon} ${scaledEnemy.name} — Fight!`);
}

function renderBattle() {
  updateHP('e', B.e); updateHP('p', B.p);
  renderMana(); renderChips('e', B.e.st); renderChips('p', B.p.st);
  renderAbils(); document.getElementById('turn-badge').textContent = `Turn ${B.turn}`;
}

function updateHP(pre, c) {
  const pct = Math.max(0, Math.round(c.hp/c.maxHp*100));
  const bar = document.getElementById(`${pre}-hp-bar`);
  bar.style.width = pct+'%';
  bar.style.background = pct>50?'var(--hp-green)':pct>25?'var(--hp-yellow)':'var(--hp-red)';
  document.getElementById(`${pre}-hp-text`).textContent = `${Math.max(0,Math.round(c.hp))}/${c.maxHp}`;
  document.getElementById(`${pre}-icon`).textContent = c.icon;
  document.getElementById(`${pre}-name`).textContent = c.name;
}

function renderMana() {
  const pips = document.getElementById('mana-pips'); pips.innerHTML = '';
  for(let i=0;i<B.p.maxMana;i++){
    const p=document.createElement('div'); p.className='pip'+(i<B.p.mana?' filled':''); pips.appendChild(p);
  }
}

function renderChips(pre, st) {
  const wrap = document.getElementById(`${pre}-chips`); wrap.innerHTML = '';
  const icons={burn:'🔥',poison:'☠️',freeze:'❄️',stun:'💫',slow:'🐢',blind:'👁',bleed:'💉',shield:'🛡',evade:'💨',charge:'⚡'};
  Object.entries(st).forEach(([k,v])=>{
    if(v<=0)return;
    const c=document.createElement('div'); c.className='chip';
    c.textContent=`${icons[k]||'?'} ${k} ${v}`; wrap.appendChild(c);
  });
}

function renderAbils() {
  const bar = document.getElementById('ability-bar'); bar.innerHTML = '';
  B.p.abilities.forEach(a=>{
    const canUse = B.p.mana>=a.c && B.pTurn && !B.over;
    const btn = document.createElement('button');
    btn.className='battle-ability-btn';
    btn.style.borderColor = canUse ? B.p.el.border : '#252525';
    btn.disabled = !canUse;
    btn.innerHTML = `<div class="ba-icon">${a.ic}</div><span class="ba-name">${a.n}</span><div class="ba-cost">${a.c}⚡</div>
      <div class="ability-preview">${a.d}<br><strong>${a.dmg[0]}-${a.dmg[1]} dmg</strong></div>`;
    btn.onclick = ()=>useAbil(a);
    bar.appendChild(btn);
  });
}

function useAbil(a) {
  // Debounce to prevent spam-clicking
  if(abilityDebounce || !B.pTurn || B.over || B.p.mana<a.c) return;
  abilityDebounce = true;
  setTimeout(() => { abilityDebounce = false; }, 300);

  B.p.mana -= a.c;
  const mult = 1+(B.p.lvl-1)*0.1;
  
  // Combo system: +15% damage if using same element ability
  let comboBonus = 1;
  if(B.p.lastAbilityUsed === a.id && B.p.comboTurns < 2) {
    comboBonus = 1.15;
    B.p.comboTurns++;
    addLog('log-system', `🔥 COMBO! +15% damage!`);
  } else {
    B.p.lastAbilityUsed = a.id;
    B.p.comboTurns = 0;
  }

  if(a.t==='heal') {
    const h = Math.round((-a.dmg[0] + -a.dmg[1])/2 * mult);
    B.p.hp = Math.min(B.p.maxHp, B.p.hp+h);
    addLog('log-heal', `${B.p.icon} ${a.n}: Restored ${h} HP!`);
  } else if(a.t==='buff') {
    applyFx(B.p, a.e);
    addLog('log-player', `${B.p.icon} ${a.n}: Buff applied!`);
  } else {
    let dmg = Math.round((a.dmg[0]+a.dmg[1])/2 * mult * comboBonus) + Math.round(B.p.atk/2);
    if(B.p.st.charge){dmg+=B.p.st.charge;B.p.st.charge=0;}
    const red = Math.max(1, dmg - Math.round(B.e.def/3));
    let fin = red;
    if(B.e.shield>0){const abs=Math.min(B.e.shield,fin);B.e.shield-=abs;fin-=abs;}
    B.e.hp -= fin;
    
    // Damage flash animation
    const combatant = document.querySelector('#e-icon').parentElement.parentElement;
    combatant.classList.add('damage-flash');
    setTimeout(() => combatant.classList.remove('damage-flash'), 150);
    
    let msg = `${B.p.icon} ${a.n}: ${fin} dmg`;
    if(a.e){applyFx(B.e,a.e);}
    if(a.e&&a.e.lifesteal){const s=Math.round(fin*a.e.lifesteal);B.p.hp=Math.min(B.p.maxHp,B.p.hp+s);msg+=` (+${s} HP)`;}
    addLog('log-player', msg);
  }

  renderBattle();
  if(B.e.hp<=0){endCombat(true);return;}
  B.pTurn=false;
  document.getElementById('turn-indicator').classList.add('show');
  setTimeout(enemyTurn, 950);
}

function enemyTurn() {
  if(B.over)return;
  if(B.e.st.stun>0){B.e.st.stun--;addLog('log-system',`${B.e.icon} is stunned — skips turn.`);endTick();return;}
  if(B.e.st.freeze>0){B.e.st.freeze--;addLog('log-system',`${B.e.icon} is frozen — skips turn.`);endTick();return;}

  // Basic enemy AI
  const eHpPct = B.e.hp / B.e.maxHp;
  const pHpPct = B.p.hp / B.p.maxHp;
  
  // Heal if low and ability available (placeholder for future abilities)
  if(eHpPct < 0.3 && B.e.difficulty !== 'normal' && Math.random() < 0.4) {
    addLog('log-enemy', `${B.e.icon} focuses on defense!`);
    B.e.shield = Math.round(B.e.atk * 1.5);
  }

  const dmg = B.e.atk + Math.floor(Math.random()*5);
  const red = Math.max(1, dmg - Math.round(B.p.def/3));

  if(B.p.st.evade>0){
    B.p.st.evade--;
    addLog('log-enemy',`${B.e.icon} attacks — EVADED!`);
  } else {
    let fin=red;
    if(B.p.shield>0){const abs=Math.min(B.p.shield,fin);B.p.shield-=abs;fin-=abs;if(B.p.shield<=0)delete B.p.st.shield;}
    B.p.hp-=fin;
    
    // Damage flash for player
    const pCombatant = document.querySelector('#p-icon').parentElement.parentElement;
    pCombatant.classList.add('damage-flash');
    setTimeout(() => pCombatant.classList.remove('damage-flash'), 150);
    
    addLog('log-enemy',`${B.e.icon} attacks for ${fin} dmg!`);
  }
  document.getElementById('turn-indicator').classList.remove('show');
  endTick();
}

function endTick() {
  // DoT damage
  if(B.e.st.burn>0){const d=Math.max(3,Math.round(B.e.atk*0.12));B.e.hp-=d;B.e.st.burn--;addLog('log-system',`🔥 Burn: ${d} dmg`);}
  if(B.e.st.poison>0){B.e.hp-=5;B.e.st.poison--;addLog('log-system',`☠️ Poison: 5 dmg`);}
  if(B.e.st.bleed>0){B.e.hp-=4;B.e.st.bleed--;}
  if(B.p.st.burn>0){B.p.hp-=4;B.p.st.burn--;}
  if(B.p.st.poison>0){B.p.hp-=3;B.p.st.poison--;}
  
  // Mana regen reduced from +2 to +1
  B.p.mana=Math.min(B.p.maxMana,B.p.mana+1);
  B.turn++; B.pTurn=true;
  renderBattle();
  if(B.e.hp<=0){endCombat(true);return;}
  if(B.p.hp<=0){endCombat(false);return;}
}

function applyFx(target, fx) {
  if(!fx)return;
  Object.entries(fx).forEach(([k,v])=>{
    if(k==='shield') target.shield=(target.shield||0)+v;
    else target.st[k]=(target.st[k]||0)+v;
  });
}

function endCombat(won) {
  B.over=true;
  document.getElementById('battle-over').classList.add('show');

  if(won) {
    S.winStreak++;
    const enemy = ENEMIES[B.camp?B.camp.ei:0];
    let gold = enemy.gold||30; 
    let xp = enemy.xp||20;
    
    // Bonus rewards every 5 wins
    if(S.winStreak % 5 === 0) {
      gold = Math.round(gold * 1.5);
      xp = Math.round(xp * 1.5);
      notify(`🎉 5-Win Streak Bonus! +50% rewards!`);
    }
    
    S.gold += gold;
    const owned = getOwned(S.activeCard);
    if(owned) {
      owned.xp += xp;
      while(owned.xp >= xpNext(owned.level) && owned.level<10) {
        owned.xp -= xpNext(owned.level); owned.level++;
        notify(`${getCard(S.activeCard).name} leveled up to Lv ${owned.level}!`);
      }
    }
    if(B.camp) {
      const {ci,si} = B.camp; const key=`${ci}_${si}`;
      if(!S.done.includes(key)) S.done.push(key);
      const nextSi = si+1;
      if(nextSi < CHAPTERS[ci].stages.length) {
        const nk=`${ci}_${nextSi}`; if(!S.unlocked.includes(nk)) S.unlocked.push(nk);
      } else {
        const nextCi=ci+1;
        if(nextCi < CHAPTERS.length){const nk=`${nextCi}_0`;if(!S.unlocked.includes(nk))S.unlocked.push(nk);}
      }
      // 30% chance new card drop (guaranteed every 5 wins)
      if(Math.random()<0.3 || S.winStreak % 5 === 0){
        const have=S.collection.map(c=>c.id);
        const avail=CARDS.filter(c=>!have.includes(c.id));
        if(avail.length){const nc=avail[Math.floor(Math.random()*avail.length)];S.collection.push({id:nc.id,level:1,xp:0});notify(`🎁 New card unlocked: ${nc.icon} ${nc.name}!`);}
      }
    }
    saveS();
    document.getElementById('result-title').textContent='⚔ Victory!';
    document.getElementById('result-title').style.color='var(--hp-green)';
    document.getElementById('result-reward').textContent=`+${gold} Gold · +${xp} XP ${S.winStreak > 1 ? `(${S.winStreak} streak)` : ''}`;
  } else {
    S.winStreak = 0;
    saveS();
    document.getElementById('result-title').textContent='💀 Defeated';
    document.getElementById('result-title').style.color='var(--hp-red)';
    document.getElementById('result-reward').textContent='No rewards — try again!';
  }
  renderAbils();
}

function endBattle() {
  document.getElementById('battle-over').classList.remove('show');
  document.getElementById('turn-indicator').classList.remove('show');
  if(B.camp){renderCampaign();showScreen('campaign-screen');}
  else goMenu();
}

function fleeBattle() {
  if(B.over){endBattle();return;}
  S.winStreak = 0;
  saveS();
  B.over=true;
  if(B.camp){renderCampaign();showScreen('campaign-screen');}
  else goMenu();
}

function addLog(cls,msg) {
  const log=document.getElementById('battle-log');
  const p=document.createElement('p'); p.className=cls; p.textContent=msg;
  log.appendChild(p);
  
  // Cap battle log at ~15 messages
  const messages = log.querySelectorAll('p');
  if(messages.length > 15) {
    messages[0].remove();
  }
  
  log.scrollTop=log.scrollHeight;
}

function notify(msg) {
  const n=document.getElementById('notif'); n.textContent=msg; n.style.display='block';
  setTimeout(()=>n.style.display='none',2600);
}

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

// ===== BOOT =====
loadS();
if(S.player) goMenu();
