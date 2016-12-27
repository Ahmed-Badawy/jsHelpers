
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
