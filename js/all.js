const url = 'https://vue3-course-api.hexschool.io';

const logIn = document.querySelector(".logIn");


logIn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const user = {
    username,
    password
  }
  axios.post(`${url}/admin/signin`,user)
  .then(res=>{
    window.location = "product_page.html";
    // console.log("執行then",res);
    if(res.data.success === true){
      const token = res.data.token;
      const expired = res.data.expired;
      document.cookie = `weekTwoToken=${token}; expires=${new Date(expired)}`;
    }
  })
  .catch(err=>{
    console.log("執行catch",err);
  })
});
