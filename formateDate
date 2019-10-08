        //格式化后日期为：yyyy-MM-dd HH:mm:ss
       
        function formdate(sDate) {
            let date = new Date(sDate);
            let seperator1 = "--";
            let month = date.getMonth() + 1;
            var strDate = date.getDate();
            //月
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            //日
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            //格式化后日期为：yyyy-MM-dd HH:mm:ss
            return date.getFullYear() + seperator1 + month + seperator1 + strDate;
        }
