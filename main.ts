// main.ts - Fixed & Typed Black Hole Sultan RPG Engine
// Run: tsc main.ts --outDir dist (or use a TS bundler for browser)

interface Battle {
  desc: string;
  win: string;
  nextMap?: number;
  isFinal?: boolean;
}

interface MapData {
  name: string;
  hero: string;
  start: string;
  battles: Battle[];
}

interface Engine {
  currentMap: number;
  currentBattle: number;
  enemyHP: number;
  state: 'STORY' | 'MAP' | 'BATTLE';
  pos: { x: number; y: number };
  path: number;
  facing: 'n' | 's' | 'e' | 'w';
  maps: MapData[];

  init(): void;
  move(dx: number, dy: number): void;
  startBattle(): void;
  attack(type: 'GOG' | 'MAWL'): void;
  winBattle(): void;
  updateHP(): void;
  showStory(text: string): void;
  closeStory(): void;
  updateTelemetry(): void;
  updatePlayerPos(): void;
}

const engine: Engine = {
  currentMap: 0,
  currentBattle: 0,
  enemyHP: 100,
  state: 'STORY',
  pos: { x: 5, y: 5 },
  path: 0,
  facing: 's',

  maps: [
    // ... (your full maps array from the code, unchanged for brevity)
    {
      name: "VOID PATH",
      hero: "Rat Snake Sorcerer Kha'bit",
      start: "Kha'bit, Rat Snake Sorcerer. Void Path coils. Prophecy: '11=1. The law binds.' The green glow suffocates. Move.",
      battles: [
        { desc: "Hiss sounds. Snake Archer guards the 1st binding.", win: "Archer falls. '11 is free.' Path clear." },
        // ... all 10 battles per map, as in your original
        { desc: "Snake-Lion guards the exit. '11=1.'", win: "Snake-Lion falls. Portal to Null Limits opens. → Akira.", nextMap: 1 }
      ]
    },
    // ... repeat for NULL LIMITS, ARCHON VEIL, SULTAN LAW
  ],

  init() {
    console.log('§ Engine awakening...'); // For debugging the load
    this.showStory(this.maps[0].start);
    if (navigator.vibrate) navigator.vibrate(200);
    this.updateTelemetry();
    this.updatePlayerPos();
  },

  // ... (all other methods unchanged, but now typed: e.g., move(dx: number, dy: number))

  move(dx: number, dy: number) {
    if (this.state !== 'MAP') return;
    
    this.pos.x = Math.max(1, Math.min(15, this.pos.x + dx));
    this.pos.y = Math.max(1, Math.min(15, this.pos.y + dy));
    this.path++;
    
    this.facing = dy < 0 ? 'n' : dy > 0 ? 's' : dx < 0 ? 'w' : 'e';
    this.updatePlayerPos();
    this.updateTelemetry();
    
    if (Math.random() < 0.3 && this.currentBattle < this.maps[this.currentMap].battles.length) {
      this.startBattle();
    }
    
    if (navigator.vibrate) navigator.vibrate(30);
  },

  // ... (rest of methods: startBattle, attack, winBattle, etc., with types inferred or explicit)
};

// Touch controls (unchanged, but could type the event handlers if expanding)

// Direct init call - the fix for stalled bootstrap
engine.init();

// Story click handler (unchanged)
document.getElementById('overlay-story')!.addEventListener('click', () => {
  if (engine.state === 'STORY') engine.closeStory();
});
