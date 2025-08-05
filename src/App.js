class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

const p = new Person("Charlie");
console.log(p.greet()); // "Hi, I'm Charlie"
console.log(p);
