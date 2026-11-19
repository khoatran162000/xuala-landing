/** "Quà Tết" -> "quà Tết": viết thường chữ "Quà" khi đứng giữa câu, giữ hoa tên riêng. */
export const midSentence = (name: string) => name.replace(/^Quà /, "quà ");
