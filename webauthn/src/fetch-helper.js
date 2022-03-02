module.exports = {

  async get(url) {
    const result = await fetch(url);
    if ( result.ok )
      return await result.json();
    else
      throw result;
  },

  async put(url, data) {
    return await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

}
