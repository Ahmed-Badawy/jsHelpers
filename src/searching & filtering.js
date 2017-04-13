
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
    },


    wc_words(str){
        str = str.replace(/_|-/ig,' ');
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    },