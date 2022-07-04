// 클래스
// abstract class User { // 추상 클래스로는 인스턴스를 만들 수 없다.
//   constructor(
//     protected firstName: string,
//     protected lastName: string,
//   ) {}
//   abstract sayHi(name: string): string
//   abstract fullName(): string
// }

// class Player extends User {
//   fullName() {
//     return `${this.firstName} ${this.lastName}`
//   }
//   sayHi(name: string): string {
//       return `Hello, ${name}. My name is ${this.fullName()}`
//   }
// }

// 인터페이스
interface User {
  firstName: string,
  lastName: string,
  sayHi(name: string): string,
  fullName(): string,
}

class Player implements User {
  constructor(
    public firstName: string,
    public lastName: string
  ) {}
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  sayHi(name: string): string {
      return `Hello, ${name}. My name is ${this.fullName()}`
  }
}
