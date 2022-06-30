// 3.0
function add(a: number, b: number) {
  return a + b
}

// const add = (a: number, b: number) => {
//   return a + b
// }

// type Add = (a: number, b: number) => number;

// const add: Add = (a, b) => a + b;

// 3.2
// type SuperPrint = {
//   <T>(arr: T[]): T //무엇이는 return할 수 있다.
// }

// const superPrint: SuperPrint = (arr) => arr[0]

// superPrint([1, 2, 3, 4])
// superPrint([true, false, true])
// superPrint(['true', 'false', 'true']) // 모두 가능
// superPrint([1, 2, true, false,'true', 'false', 'true']) 
