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
}

const keyQueue = new CharQueue(20);
const binds = new Map();

// Listen for key inputs and check them against queue
document.addEventListener("keyup", (e) => {
  keyQueue.enqueue(e.key);

  for (const [key, value] of binds) {
    if (keyQueue.lastMatches(key)) {
      binds.get(key)();
    }
  }
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
