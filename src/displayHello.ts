
export const hellos = ["Hello", "Bonjour", "你好", "Hola", "สวัสดี", "Cześć", "Здравствуйте", "こんにちは", "Xin chào", "안녕하세요", "Сәлеметсіз бе", "مرحبًا"]
const displayHello = () => {
  return hellos[Math.floor(Math.random() * hellos.length)]
}

export default displayHello