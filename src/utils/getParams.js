export default function(query) {
    if(query) {
        const queryString = query.split("?")[1];
        if(queryString.length > 0) {
            const params = queryString.split("&");
            const paramsObj = {};
            params.forEach(param => {
                const paramArr = param.split("=");
                paramsObj[paramArr[0]] = paramArr[1];
            });

            return paramsObj;
        }else {
            return {};
        }
    }else {
        return {};
    }
}