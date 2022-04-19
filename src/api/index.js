class Api {
  constructor() {
    this.base = 'http://localhost:3000/rest/';
  }

  rest = async (method, options) => {
    return await fetch(this.base + method, options);
  };

}

export default Api;
