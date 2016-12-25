let DEV = true;
if(!DEV){
 console.log = function(){}
 console.error = function(){}
}




function in_array(needle,stack){
    let value = stack.indexOf(needle);
    return (value==-1) ? false : true;
}

function array_uniqu(array) {
  return array.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

function array_remove(elm,array){
    array = array.slice();
    var index = array.indexOf(elm);
    if(index > -1){array.splice(index, 1); }
    return array;
}

function fuzzysearch(pattern,str){
    pattern = pattern.split("").reduce(function(a,b){ return a+".*"+b; });
    return (new RegExp(pattern)).test(str);
}

function string_search_filter(array,text,attribute){
    array = array.slice();
    if(text==false || text==undefined || text.trim()=='') return array;
    else array.filter(item=>fuzzysearch(text,JSON.stringify(item[attribute])))
}

