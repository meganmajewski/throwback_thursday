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
  getCurrentImage: async pool => {
    const client = await pool.connect();
    const result = await client.query(
      "select * from test_table, current_throwback where test_table.id = current_throwback.current_id order by current_throwback.id desc limit 1;"
    );
    client.release();
    return { results: result ? result.rows : null };
  }
};
