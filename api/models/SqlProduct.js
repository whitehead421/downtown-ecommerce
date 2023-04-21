class Product {
  constructor(
    RowNum,
    StokKodu,
    ADI,
    AFIYAT,
    GRUP,
    department,
    kalan,
    renk,
    beden
  ) {
    this.RowNum = RowNum;
    this.StokKodu = StokKodu;
    this.ADI = ADI;
    this.AFIYAT = AFIYAT;
    this.GRUP = GRUP;
    this.department = department;
    this.kalan = kalan;
    this.renk = renk;
    this.beden = beden;
  }
}

module.exports = Product;
