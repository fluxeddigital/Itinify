const makeRequestCreator = () => {
    let call;
    let resources = {};

    return url => {
        if (call) {
            call.cancel();
        };

        call = axios.CancelToken.source();

        if (resources[url]) {
            return resources[url];
        };

        let res;

        res = axios.get(url, {
            cancelToken: call.token
        }).catch((err) => {
            return null;
        });

        resources[url] = res;

        return res;
    };
};

export const get = makeRequestCreator();