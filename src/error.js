export default class{

    constructor($errors) {
        this.$errors = $errors;
    }


    has(id){
        return this.$errors.hasOwnProperty(id);
    }

    get(id){
        if(this.has(id)) return this.$errors[id];
    }

    first(id){
        if(this.has(id) && Array.isArray(this.$errors[id])) return this.$errors[id][0];
    }

    all(){
        return this.$errors;
    }


}