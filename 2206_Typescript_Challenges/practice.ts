// function add(a: number, b: number) {
//   return a + b
// }

// const add = (a: number, b: number) => {
//   return a + b
// }

type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;

