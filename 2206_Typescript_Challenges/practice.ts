let a : unknown;

if(typeof a === "number") {
  let b = a + 1
}

if(typeof a === "string") {
  let b = a.toUpperCase();
}

function hello() {
  console.log('x')
} //return이 없으므로 void

function hi() : never {
  throw new Error("xx")
}