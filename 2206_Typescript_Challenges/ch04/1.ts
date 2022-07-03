type Words = {
  [k: string]: string
}

class Dict {
  private words: Words

  // 자동으로 초기화
  constructor() {
    this.words = {}
  }

  add(word: Words) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }

  def(term: string){
    return this.words[term]
  }

  static hello() {
    return "hello"
  }
}

class Word {
  constructor(
    public readonly term: string,
    public readonly def: string,
  ) {}
}

const kimchi = new Word("김치", "한국 음식")

// 350
// -고정 220
// --월세+관리비 50
// --카드비 10
// --적금(5청약+20정기+80토스+50청년)155
// --그외(멜론+이모티콘 등) 5

// 130
// -- 옷 50
// -- 탈색 20

// 60
