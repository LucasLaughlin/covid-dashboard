import axios from 'axios';

const Http = {};
Http.http = null;
Http.requestCount = 0;

/* Configure http requests */
Http.set = () => {
  Http.setHttp();
};

Http.setHttp = () => {
  Http.http = axios.create({
    baseUrl: process.env.REACT_APP_API,
  });
  Http.setInterceptors(Http.http);
};

Http.setInterceptors = (http) => {
  http.interceptors.request.use((config) => {
    Http.requestCount += 1;
    return config;
  }, (error) => Promise.reject(error));

  http.interceptors.response.use((response) => {
    Http.requestCount -= 1;
    return response;
  }, (error) => {
    Http.requestCount -= 1;
    Promise.reject(error);
  });
  return http;
};

Http.get = () => Http.http;

const User = {};
User.getCovidMentions = async () => (await Http.get().get(`${process.env.REACT_APP_API}/1/covid/mentions/`)).data;

export default User;

export { Http };
