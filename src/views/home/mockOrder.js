export function mockData() {
  var data = []
  for (var i = 1; i <= 80; i++) {
    data.push({
      date: `day${i}`,
      orderNume: randomNum(40, 60),
      returnNum: randomNum(1, 20)
    })
  }
  return data
}
function randomNum(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
