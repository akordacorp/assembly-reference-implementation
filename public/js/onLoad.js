window.addEventListener('load', () => {

  const useProxy = (AKORDA || {}).USE_PROXY !== 'false';

  const userInfo = {
    email: 'matt@akorda.com',
    firstName: 'Matt',
    lastName: 'Meiske'
  };

  const config = {
    userInfo,
    onAssemblyComplete: () => {
      alert('Assembly Done');
    }
  }

  if (useProxy) {
    AkordaAssembly(892, config);
  } else {

    const appUrl = AKORDA.AKORDA_APP_URL;
    const authFormFields = {
      client_id: AKORDA.AKORDA_CLIENT_ID,
      client_secret: AKORDA.AKORDA_CLIENT_SECRET
    };

    AKORDA.authenticate(appUrl, authFormFields).then(({ access_token : accessToken }) => {
      AkordaAssembly(892, {
        ...config,
        appUrl,
        accessToken
      });
    }).catch((e) => {
      console.error(e);
    });
  }
});