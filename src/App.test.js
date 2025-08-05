function speak() {
  return `Hello, ${this.name}`;
}

const user = {
  name: "Bob",
  greet: speak
};

console.log(user.greet()); // "Hello, Bob"b
