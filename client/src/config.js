const config = {
  production: {
    baseURL: 'https://virtual-vanguard-mmo-f84f119b0dd9.herokuapp.com',
  },
  development: {
    baseURL: 'http://localhost:8800',
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];