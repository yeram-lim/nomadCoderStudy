type Player = {
  readonly name: string, //값 변경은 못한다.
  age?: number
}

const yeram : Player = {
  name: "yeram"
}

const sehyeon : Player = {
  name: "sehyeon",
  age: 26
}

// yeram.name = "sehyeon"

function playerMaker(name: string) : Player {
  return{
    name
  }
}