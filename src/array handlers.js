/*this will return clean the array from empty values:-*/
    clean_array(array){
        if(Array.isArray(array)){
            array = array.slice();
            array = array.filter(item=>!this.is_empty(item))
            return array;
        }
        return false;
    },


/*this will return true to:  0,false,undefined,NaN,{},[],''.trim()*/
    is_empty(myvar){
        if(myvar=='' || myvar==undefined || myvar==false ) return true;
        if(Array.isArray(myvar)){ return (myvar.length==0); } 
        else if(typeof myvar == 'object') return Object.keys(myvar).length == 0;
        else if(typeof myvar == 'string') return (myvar.trim()=='') ;
        else if(typeof myvar == 'number') return (myvar==0 || isNaN(parseFloat(myvar)));
        return false;
    },


    in_array(needle,stack){
        stack = stack.slice();
        let value = stack.indexOf(needle);
        return (value==-1) ? false : true;
    },

/*in_array for object arrays*/
    in_adv_array(needle,stack,attribute){
        stack = stack.slice();
        for(key in stack){
            /*console.log(stack[key],needle[attribute]); */
            if(stack[key][attribute] == needle[attribute]) return true 
        }
        return false;
    },

    array_uniq(array) {
      return array.filter(function (value, index, self) { 
        return self.indexOf(value) == index;
      });
    },

/*array_adv_uniq for object arrays*/
    array_adv_uniq(array,attribute) {
        let placeholder_array = [];
        return array.filter(function (value, index, self) {
            if( placeholder_array.indexOf(value[attribute])!=-1 ) return false;
            else { 
                placeholder_array.push(value[attribute]);
                return true;
            }
        });
    },



    array_list_adv(array, attribute, array_uniq=true) {
        let placeholder_array = [];
        placeholder_array = array.map(value=>value[attribute]);
        return (array_uniq) ? this.array_uniq(placeholder_array) : placeholder_array;
    },
    lists(array, attribute, array_uniq=true){ // other name for the array_list_adv()
        let placeholder_array = [];
        placeholder_array = array.map(value=>value[attribute]);
        return (array_uniq) ? this.array_uniq(placeholder_array) : placeholder_array;
    },




    get_where(array, attr, attr_value, first_result=false) {
        let placeholder_array = [];
        placeholder_array = array.slice().filter(item=>item[attr]==attr_value);
        if(placeholder_array.length==0) return false;
        return (first_result) ? placeholder_array : placeholder_array[0];
    },


    array_remove(elm,array){
        array = array.slice();
        var index = array.indexOf(elm);
        if(index > -1){array.splice(index, 1); }
        return array;
    },

    array_adv_remove(elm,attribute,array){
        array = array.slice();
        array = array.filter(item=>item[attribute]!=elm[attribute]);
        return array;
    },


    get_attrs(obj, array_of_attrs){
        var return_obj = {};
        for(key in obj){ if(this.in_array(key,array_of_attrs)) return_obj[key] = obj[key]; }
        return return_obj;
    },



