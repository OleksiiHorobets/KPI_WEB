function unloadElementsToRes(){
    if(!localStorage.getItem("element"+0)){
        document.querySelector("#accordion__container").innerHTML = '';
        document.querySelectorAll(".element").forEach(element =>controlAccordion(element));
        return;
    }
    
    let title_font_size = localStorage.getItem("title_font_size");
    let content_font_size = localStorage.getItem("content_font_size");
    
    let  text_color= localStorage.getItem("text_color");
    let element_color = localStorage.getItem("element_color");
    
    let appearance_anim = localStorage.getItem("appearance_anim");
    let content_anim =localStorage.getItem("content_anim");


    let index = 0;
    let el = localStorage.getItem("element" + index);
    let add_html = ``;

    let childrenList = [];

    while(el){
        let parsed = JSON.parse(el);
        let newChild = document.createElement("div");

        newChild.innerHTML =  ` 
            <div class="element">
                <div class="accordion__title">
                    <h3>
                        ${parsed.title}
                    </h3>
                    <button><i class="fas fa-plus-circle"></i></button>
                </div>
                <div class="accordion__content hideText">
                    <p>
                        ${parsed.content}
                    </p>
                </div>
            </div>`


        newChild.querySelector(".accordion__title h3").style.fontSize = title_font_size;
        newChild.querySelector(".accordion__title h3").style.color = text_color;
        newChild.querySelector(".accordion__content").style.fontSize = content_font_size;
        newChild.querySelector(".accordion__content").style.color = text_color;
       
        
        newChild.querySelector(".element").style.background = element_color;
        newChild.style.setProperty('animation', 'animate ' + appearance_anim );
        newChild.querySelector(".accordion__content").style.setProperty('animation', 'animate ' + content_anim );
        
        

        childrenList.push(newChild);
        index++;
        el = localStorage.getItem("element"+index);
    }
    let container = document.getElementById("accordion__container");

    childrenList.forEach(el=>{
        container.appendChild(el);
    })
    
    

    document.querySelectorAll(".element").forEach(element =>controlAccordion(element));
    

} 


 window.addEventListener("load",unloadElementsToRes);