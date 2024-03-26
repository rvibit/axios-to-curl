# axios-to-curl
Axios interceptor to convert axios request to curl command.

## Usage
Copy the file into your project then create axios instance and apply interceptors 
```javascript
//create axios instance

const http = axios.create({
  baseURL: '',
  headers: {},
});

//apply interceptors
http.interceptors.request.use(axiosToCurl);
```
## Note
Axios interceptors are applied in reverse order so if you have multiple interceptors then this must be the first interceptor so it can get all the modifications which are done by other interceptors.
