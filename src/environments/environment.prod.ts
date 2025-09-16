export const environment = {
  production: false,
  baseUrl:"http://localhost:50003",
  keycloakConfig: {
    url: 'https://41.230.10.163:50002',
    realm: 'azureAD',
    clientId: 'angular',
    redirectUri: 'http://localhost:4200'
  }
};
