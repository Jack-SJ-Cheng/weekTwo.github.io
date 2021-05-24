const token = document.cookie.replace(/(?:(?:^|.*;\s*)weekTwoToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
const url = 'https://vue3-course-api.hexschool.io';
function verification(){
    axios.defaults.headers.common['Authorization'] = token;
    axios.post(`${url}/api/user/check`)
    .then(res=>{
        if(res.data.success == false){
            const reLogIn = document.querySelector('.verification');
            reLogIn.innerHTML = "請返回上一頁重新登入";
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
verification();