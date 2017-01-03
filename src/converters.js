view_json($obj, $return=false){
    if($return) return JSON.stringify($obj,false,2);
    else console.log(JSON.stringify($obj,false,2));
},
view_csv($obj, $return=false){
    if($return) return $obj.replace(/,/ig,' , ');
    else console.log($obj.replace(/,/ig,' , '));
},