function checkform(){
    let form1 = document.getElementById('myForm');
    if(form1.newPassword.value != form1.confirmNewPassword.value)
    {
        document.getElementById("warning").innerHTML="Password And Confirm Password Must Be The Same";
        form1.password.focus();
        return false;
    }
    return true;
}