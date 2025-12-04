const validate = (isemail,ispassword)=>{
    const email= /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test();
    const password = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/.test();


if(!isemail){
    return "email is not valid";
}
if(!ispassword){
    return "password is not valid";
}
return null;
}
export default validate