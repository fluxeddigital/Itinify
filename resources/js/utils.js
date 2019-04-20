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

const property = (value, options) => {
    value = value || '';

    if (! isNaN(value)) {
        value = value.toString();
    };

    if (! value || ! value.replace(/(<([^>]+)>)/ig, '').replace(/\r?\n|\r/g, '')) {
        value = '';
    };

    if (options) {
        let pass = false;

        for (let option of options) {
            if (value == option) {
                pass = true;
            };
        };

        if (! pass) {
            value = options[0];
        };
    };

    return value;
};

const formatter = (data, schema = null) => {
    for (let i in Object.entries(schema)) {
        if (schema[i].type == 'array') {
            for (let i2 in Object.entries(data[schema[i].name])) {
                if (schema[i].schema) {
                    data[schema[i].name][i2] = formatter(data[schema[i].name][i2], schema[i].schema);
                } else {
                    data[schema[i].name][i2] = property(data[schema[i].name][i2]);
                };
            };
        } else if (schema[i].type == 'object') {
            data[schema[i].name] = formatter(data[schema[i].name], schema[i].schema);
        } else if (schema[i].type == 'string') {
            let options = null;

            if (schema[i].options) {
                options = schema[i].options
            };

            data[schema[i].name] = property(data[schema[i].name], options);
        };
    };

    return data;
};

const stateBuilder = (schema) => {
    let state = {};

    for (let i in Object.entries(schema)) {
        if (schema[i].type == 'array') {
            state[schema[i].name] = [];
        } else if (schema[i].type == 'object') {
            state[schema[i].name] = stateBuilder(schema[i].schema);
        } else if (schema[i].type == 'string') {
            if (schema[i].options) {
                state[schema[i].name] = schema[i].options[0];
            } else {
                state[schema[i].name] = '';
            };
        };
    };

    return state;
};

export const get = makeRequestCreator();
export const format = formatter;
export const buildState = stateBuilder;