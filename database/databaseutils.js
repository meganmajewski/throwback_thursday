module.exports = {
  uploadToDb: async (url, cdsid, pool) => {
    try {
      const client = await pool.connect();
      console.log(url);
      if (url) {
        client.query(
          "INSERT INTO test_table(url, cdsid) VALUES('" +
            url +
            "', '" +
            cdsid +
            "')",
          err => {
            throw ("error uploading to db \n", err);
          }
        );
      }
    } catch (e) {
      throw ("error uploading to postgres.\n", e);
    }
  },
  allImages: async pool => {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM test_table ORDER BY revealed, id ASC"
    );
    client.release();
    return { results: result ? result.rows : null };
  },
  getCurrentImage: async pool => {
    const client = await pool.connect();
    const result = await client.query(
      "select * from test_table, current_throwback where test_table.id = current_throwback.current_id order by current_throwback.id desc limit 1;"
    );
    client.release();
    return { results: result ? result.rows : null };
  },
  vote: async (pool, body) => {
    const client = await pool.connect();
    //get current throwback id
    const result = await client.query(
      "SELECT current_id  FROM current_throwback order by id desc limit 1"
    );
    const current_id = result.rows[0].current_id;
    await client.query(
      "INSERT INTO votes(image_id, vote) values(" +
        current_id +
        ",'" +
        body +
        "')"
    );
    client.release();
  }
};
