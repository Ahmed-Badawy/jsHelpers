let DEV = true;
if(!DEV){
 console.log = function(){}
 console.error = function(){}
}

let textFile;
let jsHelpers = {


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
  
    dd(var1,label){
        if(label) console.log(`------------------label--------------------`);
        let var2 = JSON.parse(JSON.stringify(var1)); 
        console.log(var2);
        if(label) console.log(`-------------------------------------------`);
        return var2; 
    },
    clone_obj(obj){
        return JSON.parse(JSON.stringify(obj));
    },
    obj_equal(obj1,obj2){
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    uc_words(str){
        return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, $1=>$1.toUpperCase())
    },


    getParameterByName(name){
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },


//ask for permission to notify the user, then notify him
    notifyUser(msgHeader,msg,img='http://ahmed-badawy.com/cv/img/me.jpg',url='http://ahmed-badawy.com'){
        if(Notification.permission!='granted'){ //can be (denied/default/granted)
            Notification.requestPermission().then(function(permission){
                if(Notification.permission!='granted') alert('please allow notification for our website.')
            })
        }else{
            notify = new Notification(msgHeader,{
                body: msg,
                icon: img,
                tag: Math.floor((Math.random() * 100) + 1)
            });
            notify.onclick = function(){
                window.location = url;
            }
        }
    },


//create url to a text generated file
    makeTextFile(text,mime_type) {
        var data = new Blob([text], {type: mime_type});
// If we are replacing a previously generated file we need to manually revoke the object URL to avoid memory leaks :
        if (textFile) window.URL.revokeObjectURL(textFile);
        textFile = window.URL.createObjectURL(data);
        return textFile;
    },




    rand_int(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    rand_str(length=4){
        let output='';
        var S4 = function() {return (((1+Math.random())*0x10)|0).toString(16).substring(1); };
        for(let i=0;i<length;i++){ output+= S4() }
        return output;
    },


    json_to_str($json_obj){
        return JSON.stringify($json_obj);
    },
    str_to_json($json_string){
        return JSON.parse($json_string);
    },





  /*--------------------------------------------------------------
Time Ago
--------------------------------------------------------------*/
/*jsHelpers.timeAgo("2011-12-17T09:24:17Z",'ar')*/
    timeAgo(myvar,template_lang='en'){
        var templates_en = {
            prefix: "",
            suffix: " ago",
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "about %d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years"
        };
        var templates_ar = {
            prefix: "",
            suffix: " مضت",
            seconds: "اقل من دقيقة",
            minute: "منذ حوالى دقيقة",
            minutes: "%d دقيقة",
            hour: "منذ حوالى ساعة",
            hours: "حوالى %d ساعات",
            day: "منذ يوم",
            days: "%d يوما",
            month: "منذ حوالى شهر",
            months: "%d شهرا",
            year: "منذ سنة",
            years: "%d سنوات"
        };        
        if(template_lang=='en') templates = templates_en;
        if(template_lang=='ar') templates = templates_ar;
        var template = (t, n)=>templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
        var timer = function(time) {
            if (!time)
                return;
            time = time.replace(/\.\d+/, ""); // remove milliseconds
            time = time.replace(/-/, "/").replace(/-/, "/");
            time = time.replace(/T/, " ").replace(/Z/, " UTC");
            time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            time = new Date(time * 1000 || time);

            var now = new Date();
            var seconds = ((now.getTime() - time) * .001) >> 0;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            return templates.prefix + (
                    seconds < 45 && template('seconds', seconds) ||
                    seconds < 90 && template('minute', 1) ||
                    minutes < 45 && template('minutes', minutes) ||
                    minutes < 90 && template('hour', 1) ||
                    hours < 24 && template('hours', hours) ||
                    hours < 42 && template('day', 1) ||
                    days < 30 && template('days', days) ||
                    days < 45 && template('month', 1) ||
                    days < 365 && template('months', days / 30) ||
                    years < 1.5 && template('year', 1) ||
                    template('years', years)
                    ) + templates.suffix;
        };
        return timer(myvar);
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
    },
  


/*detect the pressed key*/
    keyStrokeName(evt){
        let output = [];

        // console.log('shift', evt.shiftKey);
        // console.log('ctrl', evt.ctrlKey);
        // console.log('alt', evt.altKey);        
        if(evt.shiftKey)  output.push('shift');
        if(evt.ctrlKey)   output.push('ctrl');
        if(evt.altKey)    output.push('alt');

        let unicode=evt.keyCode? evt.keyCode : evt.charCode;
        specialKeys = {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 188: ",", 190: ".",
            191: "/", 224: "meta"
        };
        shiftNums = {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
            ".": ">",  "/": "?",  "\\": "|"
        };
        if(specialKeys[unicode]) output.push(specialKeys[unicode]);
        else if(String.fromCharCode(unicode)) output.push( String.fromCharCode(unicode).toLowerCase() );
        output = this.array_uniq(output);
        return output.join('+');
    },


  
/*--------------------------------------------------------------
Selectors
--------------------------------------------------------------*/
    get(str, parent=document){
        if(/^\#/ig.test(str))return parent.getElementById(str.replace('#',''));
        else if(/^\./ig.test(str))return parent.getElementsByClassName(str.replace('.',''));
        else return parent.getElementsByTagName(str);
    },
    q(query){ //returns the first item that matches the query. EX: 
                    // document.querySelector("div.user-panel.main input[name=login]"); 
        return document.querySelector(query);
    },
/**********************************************************************/

  
/*********************************************************************
Mobile & Browser Detection
**********************************************************************/
    mobilecheck() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },

    mobileAndTabletcheck() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },

    detect_browser(){
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; 
        var isFirefox = typeof InstallTrigger !== 'undefined'; 
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification); 
        var isIE = /*@cc_on!@*/false || !!document.documentMode; 
        var isEdge = !isIE && !!window.StyleMedia; 
        var isChrome = !!window.chrome && !!window.chrome.webstore; 
        var isBlink = (isChrome || isOpera) && !!window.CSS; 

        if(isOpera) return "opera";
        else if(isFirefox) return "firefox";
        else if(isSafari) return "safari";
        else if(isIE) return "ie";
        else if(isEdge) return "edge";
        else if(isChrome) return "chrome";
        else if(isBlink) return "blink";
        return false;
    },
/**********************************************************************/

  
/*--------------------------------------------------------------
Selectors
--------------------------------------------------------------*/
    get(str, parent=document){
        if(/^\#/ig.test(str))return parent.getElementById(str.replace('#',''));
        else if(/^\./ig.test(str))return parent.getElementsByClassName(str.replace('.',''));
        else return parent.getElementsByTagName(str);
    },
    q(query){ //returns the first item that matches the query. EX: 
                    // document.querySelector("div.user-panel.main input[name=login]"); 
        return document.querySelector(query);
    },
/**********************************************************************/

  view_json($obj, $return=false){
    if($return) return JSON.stringify($obj,false,2);
    else console.log(JSON.stringify($obj,false,2));
},
view_csv($obj, $return=false){
    if($return) return $obj.replace(/,/ig,' , ');
    else console.log($obj.replace(/,/ig,' , '));
},
  
/*********************************************************************
Cookie Functions
**********************************************************************/
    set_cookie(cname, cvalue, exdays=false, path=false){ //by default it will expire if you close the browser
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires= (exdays) ? "expires="+d.toUTCString() : '';
        path= (path) ? ";path="+path : ''; //you can define path to attach a path to this specific url;
        document.cookie = cname + "=" + cvalue + ";" + expires + path;
    },

    get_cookie(cname) { //if cname=='all' get all
        var name = cname + "=";
        var ca = document.cookie.split(';');
        if(cname=='all'){
            let all_cookies = {};
            for(item of ca){
                let ar = item.split('=');
                if(ar[1]) all_cookies[ar[0].trim()] = ar[1];
            }
            return all_cookies;            
        }
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {c = c.substring(1); }
            if (c.indexOf(name) == 0) {return c.substring(name.length, c.length); }
        }
        return false;
    },


    delete_cookie(cname){ //if all: delete all cookies
        if(cname!='all') document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        else{
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) delete_cookie(cookies[i].split('=')[0].trim());
        }
    }
/**********************************************************************/







}








