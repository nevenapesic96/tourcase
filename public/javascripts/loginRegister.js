function prikazi(element){
    

      if(element=="register"){
        element = document.getElementById("registerBox");
        var showhide= window.getComputedStyle(element).getPropertyValue('visibility');

        if(showhide == "hidden"){
            document.getElementById("registerBox").style.visibility="visible";
        }else if(showhide == "visible"){
            document.getElementById("registerBox").style.visibility="hidden"; 
        }
    
      }else{
        element = document.getElementById("loginBox");
        var showhide=window.getComputedStyle(element).getPropertyValue('visibility');

        if(showhide == "hidden"){
        document.getElementById("loginBox").style.visibility="visible";
        }else if(showhide == "visible"){
            document.getElementById("loginBox").style.visibility="hidden"; 
        }
      }
    };
   
    