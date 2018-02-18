import reactStringReplace from "react-string-replace";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/styles";

let getPosition = (string, subString, index) => {
   return string.split(subString, index).join(subString).length;
}

function processStringToJSX(str) {
  let newStr = reactStringReplace(str, /\[img(.*?)\]/g, (match, i) => {
    let imgSrc = "http://i.imgur.com" +
    "/" + match.replace("img", "").replace(/\'/g, "").replace("]", "").replace("[", "",).replace('src=', " ").replace('', "").replace(/ /g, "");
    return (
      <div key={"processed: " + match + i} className="blog-image">
        <div style={{
          background: "url(" + imgSrc + ")",
          backgroundSize: "cover"
        }}></div>
      </div>
    )
  });
  newStr = reactStringReplace(newStr, "[br]", (match, i) => (<br key={"processed: " + match + i}/>));
  newStr = reactStringReplace(newStr, /\[pre\]([\s\S]*?)\[\/pre]/g, (match, i) => {
    let matchElement = match.replace(/\\n/g, `
`);
    return <SyntaxHighlighter language="javascript" style={docco} key={"processed: " + match + i}>{matchElement}</SyntaxHighlighter>
  });
  newStr = reactStringReplace(newStr, /\[\s*a[^\]]*\]([^\]]*)\[\s*\/\s*a\s*\]/g, (match, i) => {
    let href = match.substring(match.indexOf(`href="`) + 6, getPosition(match, `"`, 2));
    return <a key={match + i} target="_blank" href={href}>{match.substring(getPosition(match, `"`, 2) + 1, match.length)}</a>
  });
  return (
    <span>{newStr}</span>
  );
}

export default processStringToJSX;
