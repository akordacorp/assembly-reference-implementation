(function(exports) {

  if (typeof(fetch) === 'undefined') {
    fetch = require('node-fetch');
  }

  function authenticate(appUrl, authFormFields = {}) {
    const data = new URLSearchParams();
    Object.keys(authFormFields).forEach((key) => {
      data.append(key, authFormFields[key]);
    });

    return new Promise((resolve, reject) => {
      const authEndpoint = `${appUrl}/api/login/authorize`;
      fetch(authEndpoint, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
      }).then((response) => {
        response.json().then(resolve);
      }).catch(reject);
    });
  }

  exports.authenticate = authenticate;

})(typeof(exports) === 'undefined' ? this['AKORDA'] = {} : exports);