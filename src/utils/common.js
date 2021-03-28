// 深克隆，该方法获得的克隆对象会忽略 function 和 undefined 的字段（对 date 类型的支持似乎也不友好）
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

// 将日期格式转换为 yyyy-MM-dd hh:mm:ss
export const dateFormat = (date) => {
    let yyyy = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let dd = date.getDate();
      dd = dd < 10 ? "0" + dd : dd;
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh;
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      let ss = date.getSeconds();
      ss = ss < 10 ? "0" + ss : ss;
      return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
}

/**
 * 对象数组过滤：返回数组中value值包含指定关键字的对象新数组
 * 如果未指定keyword则返回原数组
 */
export const objListFilter = (objList, keyword) => {
    if(keyword){
        // 遍历对象数组中的对象，将符合条件的对象组成一个新数组并返回
        return objList.filter(obj => {
            // 遍历对象中的value值，只要存在符合条件的value值则返回真
            return Object.values(obj).some(value => {
                // 对象中存在某一项的value值包含keyword则返回真
                return String(value).indexOf(keyword) > -1;
            })
        })
    }
    return objList;
}