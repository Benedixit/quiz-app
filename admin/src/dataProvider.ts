import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = 'http://localhost:8787';

const httpClient = fetchUtils.fetchJson;

const dataProvider = simpleRestProvider(apiUrl, httpClient);

export default dataProvider;