interface props {
    text: any
}

// const Converter = ({ text }: props) => {
//     const showdown = require("showdown");
//     const converter = new showdown.Converter();
//     converter.makeHtml(text)
// }

const commonmark = require("commonmark")

const Converter = ({ text }: props) => {
    const parser = new commonmark.Parser()
    const writer = new commonmark.HtmlRenderer()
    const parsed = parser.parse(text)
    const converted = writer.render(parsed)
    return converted
}

export { Converter }