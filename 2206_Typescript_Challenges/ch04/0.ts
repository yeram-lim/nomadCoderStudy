abstract class User {
  constructor (
    private firstName: string,
    private lastName: string,
    public nickName: string
  ) {}

  // 추상 메서드
  abstract getNickName(): void 

  // 메서드
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

class Player extends User {
  // getFullName() {
      // console.log()
  // }
}

// const nico = new User("nico", "las", "니꼬"); // 추상 클래스로 인스턴스 생성 불가
const nico = new Player("nico", "las", "니꼬");

// nico.firstName // 에러 -> private 요소이기 때문
