/*--------------------------------------------------------------
Time Ago
--------------------------------------------------------------*/
/*jsHelpers.timeAgo("2011-12-17T09:24:17Z",'ar')*/
    timeAgo(myvar,template_lang='en',custom_template=false){
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
        if(custom_template) template = custom_template;
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

















