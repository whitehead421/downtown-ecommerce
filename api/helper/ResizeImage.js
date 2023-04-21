const sharp = require("sharp");
const path = require("path");
const { uuid } = require("uuidv4");
const sizeOf = require("image-size");

class Resize {
  constructor(folder, imagename) {
    this.folder = folder;
    this.imagename = imagename;
  }
  async save(buffer) {
    const fileDimensions = sizeOf(buffer);
    const filename = Resize.filename(this.imagename);
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .rotate(
        fileDimensions.orientation === 6
          ? 90
          : fileDimensions.orientation === 3
          ? 180
          : fileDimensions.orientation === 8
          ? 270
          : 0
      )
      .resize(800, 800, {
        fit: sharp.fit.contain,
        withoutEnlargement: true,
        background: "#fff",
      })
      .toFile(filepath);

    return filename;
  }
  static filename(filename) {
    return `${uuid()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
module.exports = Resize;
