function axiosToCurl(reqConf: InternalAxiosRequestConfig) {
  let curlStr = 'curl';
  let slash = '\\';
  const flags = {
    request: '--request',
    url: '--url',
    header: '--header',
    data: '--data',
  };

  const addMethod = () => {
    curlStr += ` ${flags.request} ${reqConf.method?.toUpperCase()} ${slash} \n`;
    return curlStr;
  };
  const addUrl = () => {
    let query = '';
    if (reqConf.params) {
      Object.keys(reqConf.params).forEach((key, index) => {
        query +=
          index === 0
            ? `?${key}=${reqConf.params[key]}`
            : `&${key}=${reqConf.params[key]}`;
      });
    }
    curlStr += ` ${flags.url} ${reqConf.baseURL}${reqConf.url}${query} ${slash} \n`;
    return curlStr;
  };

  const addHeaders = () => {
    Object.keys(reqConf.headers).forEach(key => {
      curlStr += `${flags.header} '${key} : ${reqConf.headers[key]}' ${slash} \n`;
    });
    return curlStr;
  };

  const addData = () => {
    curlStr += ` ${flags.data} '${JSON.stringify(reqConf.data)}' ${slash} \n`;
    return curlStr;
  };

  const logCurl = () => {
    console.log(`=============== CURL for ${reqConf.url} ===============`);
    console.log();
    console.log(curlStr);
    console.log();
    return curlStr;
  };

  const pipe =
    (...fns: any[]) =>
    (x: any) =>
      fns.reduce((v, f) => f(v), x);

  pipe(addMethod, addUrl, addHeaders, addData, logCurl)(curlStr);
  return reqConf;
}


// Usage
// const http = axios.create({
//     baseURL: '',
//     headers: {},
//   });
// http.interceptors.request.use(axiosToCurl);
