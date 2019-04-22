const data = {
    ALA: 'Alamo',
    AVI: 'Avis',
    BUD: 'Budget',
    DOL: 'Dollar',
    ENT: 'Enterprise',
    EUR: 'Europcar',
    HER: 'Hertz',
    IBE: 'Iberia',
    THR: 'Thrifty',
};

const buildOptions = (providers) => {
    let set = [];

    for (let code in providers) {
        set.push({
            label: providers[code],
            value: code,
        });
    };

    return set;
};

export const carHireProviders = data;
export const carHireProvidersOptions = [{label:'None',value:''}].concat(buildOptions(data));
export const carHireProvidersSet = [''].concat(Object.keys(data));