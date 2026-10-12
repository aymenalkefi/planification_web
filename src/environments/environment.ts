export const environment = {
  live: false,
  local: false,
  test: false,
  production: false,
  buttonAzure: true,
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  keySite: '6LdUOj4aAAAAAOWdEO-3WzCklfbTqKfDFLvYyEVp',
  keycloakConfig: {
      url: 'https://41.230.10.163:50002',
      realm: 'AzureAD-Realm',
    clientId: 'azureAdClient',
    redirectUri: 'http://localhost:4200'
  },
 debugMode: true,
  baseUrl: 'http://localhost:50003/api'
};