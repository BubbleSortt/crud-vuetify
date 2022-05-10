class Api {
  constructor() {
    this.base = 'http://localhost:3000/rest/';
  }

  rest = async (method, options) => {
    return await fetch(this.base + method, options);
  };

  query = async ({ query }) => {
    return await this.rest('query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
  }

}

export default Api;
