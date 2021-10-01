(function generateseatNumber(){
    
    for (i=0; i < 5 ; i++){
                var element = document.createElement("input");
                //Assign different attributes to the element. 
                element.setAttribute("type", button);
                element.setAttribute("value", i);
                element.setAttribute("name", i);
                //element.setAttribute("onclick", ); If you wish to add click event

                //Append the element in page (in span).  
               document.body.appendChild(element);
          }
  })