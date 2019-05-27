

function axiosGET(URL,params,successFun,failFun){
if (!params){
    params={};
}
var headers={};
if (localStorage.getItem("usertoken")!=='') {
    headers={
        'Authorization': "JWT " + localStorage.getItem("usertoken")
    };
}
    this.$axios.get(URL,{
        headers: headers,
        params:params
    }) // 获取首页的现在地
        .then(res => {
            if(res.status&&res.status==401){
                //去登录页面
                if(('去登录')){
                    window.location.href='';
                }
                return;
            }
          if(successFun){
              successFun(res);
          }
        })
        .catch(error => {
           if (failFun){
               failFun(error);
           }
        })

}