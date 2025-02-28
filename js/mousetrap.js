// custom queue type
class CharQueue {
  constructor(size) {
    this.queue = [];
    this.size = size;
  }

  enqueue(char) {
    this.queue.push(char);
    if (this.queue.length > this.size) {
      this.queue.shift();
    }
  }

  lastMatches(target) {
    const targetLength = target.length;
    if (this.queue.length < targetLength) return false;
    return this.queue.slice(-targetLength).join('') === target;
  }

  clear() {
    this.queue = [];
  }
}

const keyQueue = new CharQueue(20);
const binds = new Map();
// Timeout to clear keyQueue, to not keep old data around
let clearQueueTimeout = setTimeout(() => {}, 5);

// Listen for key inputs and check them against queue
document.addEventListener("keyup", (e) => {
  clearTimeout(clearQueueTimeout);
  keyQueue.enqueue(e.key);

  for (const [key, value] of binds) {
    if (keyQueue.lastMatches(key)) {
      value();
    }
  }
  clearQueueTimeout = setTimeout(() => { keyQueue.clear(); }, 1000);
})

const keyTrap = {
  bind(sequence, func) {
    binds.set(sequence, func);
  },

  unbind(sequence) {
    binds.delete(sequence);
  }
};

export default keyTrap;
