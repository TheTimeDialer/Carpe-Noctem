class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}



const phrases = [
'Little angels? No, fallen stars.',
'It\'s useless… ',
'no point in trying to change anything.',
'Change...',
'That\'s what I want.',
'More than anything else, you see,',
'I desire change in the most extreme form.',
'I can\'t begin to wonder what creations will manifest',
'in the new multiverse I brood,',
'and the thought exudes a strong feeling',
'of excitement on me.',
'-=*=-=*=-=*=-=*=-=*=-=*=-=*=-=*=-=*=-',
'The wetlands that contain the gate to my great realm',
'shall be explored once more, I daresay.',
'But this time,',
'security of my majestic landmarks won\'t be the job of weaklings',
'No, not at all.',
'My minutemen will guide any interlopers into the afterlife,',
'no exceptions.',
'I implore you, fallen stars.',
'Come be fodder to my system of cogs',
'and observe as the reality you know falls out of existence.',
'--'
];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1500);
  });
  counter = (counter + 1) % phrases.length;
};

next();