let DEV = true;
if(!DEV){
 console.log = function(){}
 console.error = function(){}
}


let jsHelpers = {
    in_array(needle,stack){
        let value = stack.indexOf(needle);
        return (value==-1) ? false : true;
    },

    in_adv_array(needle,stack,attribute){
        stack = stack.slice();
        for(key in stack){
            // console.log(stack[key],needle[attribute]); 
            if(stack[key][attribute] == needle[attribute]) return true 
        }
        return false;
    },

    array_uniq(array) {
      return array.filter(function (value, index, self) { 
        return self.indexOf(value) == index;
      });
    },

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


    fuzzysearch(pattern,str,flags){
        pattern = pattern.split("").reduce(function(a,b){ return a+".*"+b; });
        return (new RegExp(pattern,flags)).test(str);
    },


    stringify_filter(new_array, text, according, eq_filter){
        new_array = new_array;
        if(text.trim()=="") new_array = new_array.slice();
        else if(according=="all") new_array = new_array.filter(item=>fuzzysearch(text,JSON.stringify(item)));
        else{ 
                if(eq_filter) new_array = new_array.filter(item=>(text==item[according]));
                else new_array = new_array.filter(item=>fuzzysearch(text,JSON.stringify(item[according])));
        }
        return new_array;
    },

    sorting_filter(new_array,sort_by,sort_according){
        new_arra = new_array.sort((a,b)=>{ return (b[sort_by]<a[sort_by]) ? 1 : -1 });
        new_array = (sort_according=='asc') ? new_array : new_array.reverse();
        return new_array;
    },    

    advanced_frontend_pagi(new_array,pagi_limit,pagi_offset){
        this.pages_count = Math.ceil(new_array.length / pagi_limit);
        console.log(new_array.length, pagi_limit, pagi_offset, this.pages_count);
        new_array = new_array.slice(pagi_offset,pagi_offset + pagi_limit);
        return new_array; 
    }  


}








