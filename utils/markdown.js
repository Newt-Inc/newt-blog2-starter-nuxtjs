import MarkdownIt from 'markdown-it'
import plainText from 'markdown-it-plain-text'

const md = new MarkdownIt({
  html: true,
  breaks: true,
})
md.use(plainText)

export const toPlainText = (markdown) => {
  md.render(markdown)
  return md.plainText
}