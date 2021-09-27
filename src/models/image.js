export class Image {

  constructor(title, url) {
    this.title = title;
    this.url = url;
  }

  static fromJSON(jsonString) {
    const jsonObj = JSON.parse(jsonString);
    return new Image(jsonObj.title, jsonObj.url);
  }

  asJSON() {
    return {
      title: this.title,
      url: this.url
    }
  }
  
  asJSONString() {
    return JSON.stringify(this.asJSON());
  }

}

export default Image;