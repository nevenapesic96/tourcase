function prikazi(showhide,element){
    
      if(element=="register"){
    
    if(showhide == "show"){
        document.getElementById("registerBox").style.visibility="visible";
    }else if(showhide == "hide"){
        document.getElementById("registerBox").style.visibility="hidden"; 
    }
    
      }else{
        if(showhide == "show"){
        document.getElementById("loginBox").style.visibility="visible";
    }else if(showhide == "hide"){
        document.getElementById("loginBox").style.visibility="hidden"; 
    }
      }
    };
    