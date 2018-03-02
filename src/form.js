import Error from './error';

export default class {

    constructor(fields, $http) {
        this.$fields = fields;
        this.$http = $http;
        this.$errors = new Error({});
        this.$busy = false;
    }


    post(uri, options) {
        return this.request('post', uri, options);
    }

    patch(uri, options) {
        return this.request('patch', uri, options);
    }

    put(uri, options) {
        return this.request('put', uri, options);
    }

    setBusy(status) {
        this.$busy = status;
    }

    setError(errors) {
        this.$errors = new Error(errors);
    }

    setFields(fields) {
        this.$fields = fields;
    }

    request(method, uri, options) {
        this.setError({});
        let vm = this;

        return new Promise(function (resolve, reject) {
            vm.setBusy(true);
            axios[method](uri, vm.$fields, options).then((response) => {
                resolve(response);
            }).catch((error) => {
                if (typeof error.response.data.errors === "object")
                    vm.setError(error.response.data.errors);
                else
                    vm.setError(error.response.data);

                reject(error);

            }).then(() => {
                vm.setBusy(false);
            });

        });
    }

}
