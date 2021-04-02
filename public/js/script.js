function checkform(){
    let form1=document.getElementById("myForm1")

    if(form1.Fname.value){
        if(form1.Fname.value.length<3 ){
        document.getElementById("warning_Fname").innerHTML="The Names Entered Must Be Atleast 3 Characters";
        form1.Fname.focus();
        return false
    }
}
    if(form1.Lname.value){
        if(form1.Lname.value.length<3){
        document.getElementById("warning_Lname").innerHTML="The Names Entered Must Be Atleast 3 Characters";
        form1.Lname.focus();
        return false;
    }
}

//     if(form1.number.value){
//         if(form1.number.value.length!==11 || form1.number.value.length[0]!=0 && form1.number.value.length[1]!=1){
//         document.getElementById("warning_number").innerHTML="Please Enter Valid Number Consisting Of 11 Numbers";
//         form1.number.focus();
//         return false;
//     }
// }
return true;
}




function checkform_password(){
    let form2 = document.getElementById('myForm2');
    if(form2.newPassword.value != form2.confirmNewPassword.value)
    {
        document.getElementById("warning_password").innerHTML="Password And Confirm Password Must Be The Same";
        form1.password.focus();
        return false;
    }

    if(form2.newPassword.value<3){
    document.getElementById("warning_password").innerHTML="New Password Must Be Longer Than 3 Characters"
    form1.newPassword.focus();
    return false;    
    }

 return true;   

}