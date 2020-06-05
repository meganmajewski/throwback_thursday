module.exports = {
  uploadToDb: async (url, cdsid, pool) => {
    try {
      const client = await pool.connect();
      if (url) {
        client.query(
          "INSERT INTO test_table(url, cdsid, revealed) VALUES('" +
            url +
            "', '" +
            cdsid +
            "', false)"
        );
      }
    } catch (e) {
      throw "error uploading to postgres";
    }
  },
  allRevealedImages: async (pool) => {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM test_table WHERE revealed=true ORDER BY revealed, id ASC "
    );
    client.release();
    return { results: result ? result.rows : null };
  },
  getCurrentImage: async (pool) => {
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
  },
  topVotes: async (pool) => {
    const client = await pool.connect();
    const result = await client.query(
      "select vote, count(*) from votes group by 1 order by count desc"
    );
    client.release();
    return { results: result ? result.rows : null };
  },
};
