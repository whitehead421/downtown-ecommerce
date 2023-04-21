var sqlConfig = require("./dbconfig");
const sql = require("mssql");

const getProducts = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);

    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 30;
    console.log(req.query);
    console.log(JSON.parse(req.query.price));

    startIndex = (page - 1) * limit;

    console.log("startIndex and limit: ", startIndex, limit);

    var query =
      `WITH L1 AS (SELECT
        ADI = qk.asorti,
        renk,
      qk.GRUP,
      qk.SFIYAT,
      qk.TANIMI,
      detay,
        beden = TRIM(beden),
        SUM(kalan) AS kalan
      FROM [costguid_dtown].[costguid_dtown1].[Q_Kalan_liste] qk
      GROUP BY
        qk.ADI,
        qk.renk,
    qk.asorti,
      qk.GRUP,
        qk.beden,
        detay,
        qk.TANIMI,
      qk.SFIYAT),


    L2 AS (SELECT  ADI,
      TANIMI,
      GRUP,
      L1.SFIYAT,
        renk,
        json = '{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(beden, 'json'), '":', kalan), ',') + '}'
      FROM L1
      GROUP BY
        ADI,
      GRUP,
      L1.SFIYAT,
      TANIMI,
        renk)

    SELECT	ROW_NUMBER() OVER (ORDER BY GRUP) ROWNUM,
        ADI,
      SFIYAT,
      TANIMI,
      CATEGORY = GRUP,
        STOCK = JSON_QUERY('{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(renk, 'json'), '":', json), ',') + '}')
      FROM L2 qk WHERE ADI NOT LIKE '%SALE TSHIR%' AND SFIYAT >= ${
        JSON.parse(req.query.price).min
      } AND SFIYAT <= ${JSON.parse(req.query.price).max} ` +
      (req.query.cat !== ""
        ? `AND (` +
          req.query.cat
            .split(",")
            .map((cat) => `GRUP LIKE '${cat}%'`)
            .join(" OR ") +
          `)`
        : "") +
      (req.query.color !== ""
        ? ` AND (` +
          req.query.color
            .split(",")
            .map((color) => `renk LIKE '${color}%'`)
            .join(" OR ") +
          `)`
        : "") +
      (req.query.brand !== ""
        ? ` AND (` +
          req.query.brand
            .split(",")
            .map((brand) => `TANIMI LIKE '${brand}%'`)
            .join(" OR ") +
          `)`
        : "") +
      `
GROUP BY
        ADI, GRUP, SFIYAT, TANIMI
        ORDER BY ROWNUM
    OFFSET ${startIndex} ROWS
    FETCH NEXT ${limit} ROWS ONLY
    FOR JSON PATH;`;
    let products = await pool
      .request()
      .query(query)
      .then((result) => {
        if (
          result.recordsets[0][0][
            "JSON_F52E2B61-18A1-11d1-B105-00805F49916B"
          ] === ""
        ) {
          res.json([]);
        } else {
          res.json(
            JSON.parse(
              result.recordsets[0][0][
                "JSON_F52E2B61-18A1-11d1-B105-00805F49916B"
              ]
            )
          );
        }
      });
  } catch (err) {
    console.log(err);
    // res.status(500).send(err); //TODO BURAYA BIR KONTROL LAZIM
  }
};

const getSingleProduct = async (req, res, id) => {
  let pool = await sql.connect(sqlConfig);
  // split id from space
  let productName = id;
  // idArray first element ADI second element SFIYAT
  try {
    let product = await pool
      .request()
      .query(
        `WITH L1 AS (SELECT
          ADI = qk.asorti,
          renk,
        qk.GRUP,
        qk.SFIYAT,
        qk.TANIMI,
        detay,
          beden = TRIM(beden),
          SUM(kalan) AS kalan
        FROM [costguid_dtown].[costguid_dtown1].[Q_Kalan_liste] qk
        GROUP BY
          qk.ADI,
          qk.renk,
		  qk.asorti,
        qk.GRUP,
          qk.beden,
          detay,
          qk.TANIMI,
        qk.SFIYAT),


      L2 AS (SELECT  ADI,
        TANIMI,
        GRUP,
        L1.SFIYAT,
          renk,
          json = '{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(beden, 'json'), '":', kalan), ',') + '}'
        FROM L1
        GROUP BY
          ADI,
        GRUP,
        L1.SFIYAT,
        TANIMI,
          renk)

      SELECT	ROW_NUMBER() OVER (ORDER BY GRUP) ROWNUM,
          ADI,
        SFIYAT,
        TANIMI,
        CATEGORY = GRUP,
          STOCK = JSON_QUERY('{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(renk, 'json'), '":', json), ',') + '}')
        FROM L2 qk WHERE ADI LIKE '%${productName}%'
        GROUP BY
          ADI, GRUP, SFIYAT, TANIMI
          FOR JSON PATH;
    `
      )
      .then((result) => {
        res.json(result.recordsets[0]);
      });
  } catch (err) {
    console.log(err);
  }
};

const getSizeTable = async (req, res, id) => {
  let pool = await sql.connect(sqlConfig);
  let productName = id;
  try {
    let sizeTable = await pool
      .request()
      .query(
        `WITH L1 AS (SELECT
          ADI = qk.asorti,
          renk,
        qk.GRUP,
        qk.SFIYAT,
        qk.TANIMI,
        detay,
          beden = TRIM(beden),
          SUM(kalan) AS kalan
        FROM [costguid_dtown].[costguid_dtown1].[Q_Kalan_liste] qk
        GROUP BY
          qk.ADI,
          qk.renk,
		  qk.asorti,
        qk.GRUP,
          qk.beden,
          detay,
          qk.TANIMI,
        qk.SFIYAT),

      L2 AS (SELECT  ADI,
        TANIMI,
        GRUP,
        L1.SFIYAT,
          renk,
          json = '{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(beden, 'json'), '":"', detay, '"'), ',') + '}'
        FROM L1
        GROUP BY
          ADI,
        GRUP,
        L1.SFIYAT,
        TANIMI,
          renk)

      SELECT
          OLCU_TABLO = JSON_QUERY('{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(renk, 'json'), '":', json), ',') + '}')
        FROM L2 qk WHERE ADI LIKE '%${productName}%'
  GROUP BY
          ADI, GRUP, SFIYAT, TANIMI
          ORDER BY ADI
          FOR JSON PATH;`
      )
      .then((result) => {
        raw_result = JSON.parse(
          result.recordsets[0][0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )[0].OLCU_TABLO;
        const target = {};
        for (const [key, value] of Object.entries(raw_result)) {
          Object.assign(target, value);
        }
        res.json(target);
      });
  } catch (err) {
    console.log(err);
  }
};

const getMaxPage = async (req, res) => {
  let pool = await sql.connect(sqlConfig);

  var query =
    `WITH L1 AS (SELECT
      ADI = qk.asorti,
      renk,
    qk.GRUP,
    qk.SFIYAT,
    qk.TANIMI,
    detay,
      beden = TRIM(beden),
      SUM(kalan) AS kalan
    FROM [costguid_dtown].[costguid_dtown1].[Q_Kalan_liste] qk
    GROUP BY
      qk.ADI,
      qk.renk,
  qk.asorti,
    qk.GRUP,
      qk.beden,
      detay,
      qk.TANIMI,
    qk.SFIYAT),


    L2 AS (SELECT  ADI,
      TANIMI,
      GRUP,
      L1.SFIYAT,
        renk,
        json = '{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(beden, 'json'), '":', kalan), ',') + '}'
      FROM L1
      GROUP BY
        ADI,
      GRUP,
      L1.SFIYAT,
      TANIMI,
        renk)

    SELECT	ROW_NUMBER() OVER (ORDER BY GRUP) ROWNUM,
        ADI,
      SFIYAT,
      TANIMI,
      CATEGORY = GRUP,
        STOCK = JSON_QUERY('{' + STRING_AGG(CONCAT('"', STRING_ESCAPE(renk, 'json'), '":', json), ',') + '}')
      FROM L2 qk WHERE ADI NOT LIKE '%SALE TSHIR%'  AND SFIYAT >= ${
        JSON.parse(req.query.price).min
      } AND SFIYAT <= ${JSON.parse(req.query.price).max} ` +
    (req.query.cat !== ""
      ? `AND (` +
        req.query.cat
          .split(",")
          .map((cat) => `GRUP LIKE '${cat}%'`)
          .join(" OR ") +
        `)`
      : "") +
    (req.query.color !== ""
      ? ` AND (` +
        req.query.color
          .split(",")
          .map((color) => `renk LIKE '${color}%'`)
          .join(" OR ") +
        `)`
      : "") +
    (req.query.brand !== ""
      ? ` AND (` +
        req.query.brand
          .split(",")
          .map((brand) => `TANIMI LIKE '${brand}%'`)
          .join(" OR ") +
        `)`
      : "") +
    `
GROUP BY
        ADI, GRUP, SFIYAT, TANIMI
        ORDER BY ROWNUM
    FOR JSON PATH;`;
  try {
    let product = await pool
      .request()
      .query(query)

      .then((result) => {
        if (
          result.recordsets[0][0][
            "JSON_F52E2B61-18A1-11d1-B105-00805F49916B"
          ] === ""
        ) {
          res.json(0);
        } else {
          res.json(
            JSON.parse(
              result.recordsets[0][0][
                "JSON_F52E2B61-18A1-11d1-B105-00805F49916B"
              ]
            ).length
          );
        }
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProducts: getProducts,
  getSingleProduct: getSingleProduct,
  getMaxPage: getMaxPage,
  getSizeTable: getSizeTable,
};
