export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * HTML文字列をDOM Nodeに変換してreturnする
 * <template>ここにinnerHTMLでHTML文字列を入れる</template>
 * そこからtemplate.content.firstChildで子要素をDOM Nodeとして取り出す
 */
export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * タグ付きテンプレート関数 element`hogehoge${name}hogehoge...`
 * 第一引数にテンプレートリテラルが変数${}でぶつ切りにされてできた配列
 * 第二引数以降に変数たちが与えられる
 * つまりelement()の第二引数の...valuesは、可変長引数であり、変数たちを受け取る
 * なので、valuesは配列で、その値は[変数1, 変数2, ...]となる
 */

export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  return htmlToElement(htmlString);
}

export function render(bodyElement, containerElement) {
  containerElement.innerHTML = "";
  containerElement.appendChild(bodyElement);
}
