let getPosition = (string, subString, index) => {
   return string.split(subString, index).join(subString).length;
}

function removeTags(str) {
  //only handles img, br and pre tags
  str = str.replace(/\[img(.*?)\]/g, "").replace(/\[br\]/g, "").replace(/\[pre\](.*?)\[\/pre\]/g, "").replace(/\[a\]/g, "").replace(/\[\/a\]/g, "");
  while(true) {
    if(str.indexOf(`"`) !=  -1) {
      str = str.substring(0, str.indexOf("href=")) + str.substring(getPosition(str, `"`, 2) + 1, str.length);
    } else {
      break;
    }
  }
  return str;
}

export default removeTags;
