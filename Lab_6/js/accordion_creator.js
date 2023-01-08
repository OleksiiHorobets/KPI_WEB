

const form = document.querySelector("#input_form");


let save_button = document.querySelector("#save_btn");

save_button.addEventListener("click", event=>{
    event.preventDefault();
    elements = document.querySelectorAll(".element");
    if(elements.length <=0) return;
    let font_size = form.querySelector("#font_size").value + "px";
    let title_font_size = form.querySelector("#title_font_size").value + "px";

    let color = form.querySelector("#text_color").value;
    let element_color = form.querySelector("#element_color").value;

    let title_anim = form.querySelector("#appearance_animation").value + "ms";
    let content_anim = form.querySelector("#content_animation").value + "ms";
    document.querySelector('.accordion__content').style.fontSize = font_size;

    document.querySelector('.accordion__title h3').style.fontSize = title_font_size;
    
    elements.forEach(element => {
        element.querySelector(".accordion__title h3").style.fontSize = title_font_size;
        element.querySelector(".accordion__content").style.fontSize = font_size;
        element.style.color = color;
        element.style.background = element_color;
        element.style.setProperty('animation', 'animate ' + title_anim);

        let children = document.querySelectorAll('.element .accordion__content');        
        children.forEach(ch=>{
            ch.style.setProperty('animation', 'animate ' + content_anim);
        });
    });
});

document.querySelector("#reset_btn").addEventListener('click', event=>{
    event.preventDefault(); 
    form.reset();
    save_button.click();
});

let add_button = document.querySelector('#add__el__btn');

add_button.addEventListener("click", event=>{
    console.log("add button invoked");
    let parent = event.target.parentElement.parentElement;
    if(!parent.querySelector("#element_adder")){
    let newEl =  document.createElement('div');

    newEl.innerHTML= `<div id="element_adder" style="display:flex; flex-direction: column; ">
    <label for="element">New element:</label><br>
    <Label for="element__title">Title</label><br>
    <input type="text" id="element__title" style="min-height=50px;"><br>
    <Label for="element__content">Content</label><br>
    <textarea rows="4" cols="40" name="comment" style="max-width: 100%"></textarea>
    <button id="save" style="border: 1px solid black; max-width: 200px; align-self:center; margin-top:20px;">Save</button>
    <button id="close" style="border: 1px solid black; max-width: 200px; align-self:center; margin-top:20px;">Close</button>
</div>`;
    parent.appendChild(newEl);
   
    parent.querySelector("#save").addEventListener("click", event=>{ 
        console.log("save invoked")   
        let parent = event.target.parentElement;   
        let title = parent.querySelector("#element__title").value;  
        let content = parent.querySelector("textarea").value;     
        if(title != "" && content != ""){
            let add_html = ` 
                <div class="element">
                    <div class="accordion__title">
                        <h3>
                            ${title}
                        </h3>
                        <button><i class="fas fa-plus-circle"></i></button>
                    </div>
                    <div class="accordion__content hideText">
                        <p>
                            ${content}
                        </p>
                    </div>
            </div>`
            let container =  document.querySelector("#accordion__container");
            
            container.innerHTML += add_html;
            elements = document.querySelectorAll('.element');

            elements.forEach(element =>controlAccordion(element));
            save_button.click();
        }
    });
    
    parent.querySelector("#close").addEventListener("click", (event)=>{
        console.log(event.target.parentElement.remove());
    });
}
});

let remove_el_btn = document.querySelector("#remove__el__btn");

remove_el_btn.addEventListener('click', (event)=>{
    let elements = document.querySelectorAll('.element');
    if(elements.length >0){
        elements[elements.length-1].remove();
    }
})


// console.log(JSON.parse(list[0]));

window.addEventListener("beforeunload", ()=>{
    localStorage.clear();
    elements = document.querySelectorAll('.element');
 
    if(elements.length > 0){
        localStorage.setItem("title_font_size", window.getComputedStyle(document.querySelector('.accordion__title h3')).fontSize);
        localStorage.setItem("content_font_size", window.getComputedStyle(document.querySelector('.accordion__content')).fontSize);
        localStorage.setItem("text_color", window.getComputedStyle(document.querySelector('.element')).color);
        localStorage.setItem("element_color", window.getComputedStyle(document.querySelector('.element')).backgroundColor);
        
        localStorage.setItem("appearance_anim", window.getComputedStyle(document.querySelector('.element')).animationDuration);
        localStorage.setItem("content_anim", window.getComputedStyle(document.querySelector('.accordion__content')).animationDuration);
        
        let list = [];
        
        for(let ind = 0; ind < elements.length; ind++){
            let title = elements[ind].querySelector(".accordion__title h3").innerText;
            let content = elements[ind].querySelector(".accordion__content").innerText;
            let json = JSON.stringify({ind, title, content});
            localStorage.setItem("element"+ind, json);
        }
    }
   
});


function unloadElements(){
    if(!localStorage.getItem("element"+0)){
        document.querySelector("#accordion__container").innerHTML = '';
    
        document.querySelectorAll(".element").forEach(element =>controlAccordion(element));
        save_button.click();
        return;
    }
    
    form.querySelector("#title_font_size").value = localStorage.getItem("title_font_size").slice(0, -2);
    form.querySelector("#font_size").value = localStorage.getItem("content_font_size").slice(0, -2);
    
    form.querySelector("#text_color").value = rgbToHex(localStorage.getItem("text_color"));
    form.querySelector("#element_color").value = rgbToHex(localStorage.getItem("element_color"));
    
    form.querySelector("#appearance_animation").value = parseFloat(localStorage.getItem("appearance_anim").slice(0,-1))*1000;
    form.querySelector("#content_animation").value = parseFloat(localStorage.getItem("content_anim").slice(0,-1))*1000;

    let index = 0;
    let container =  document.querySelector("#accordion__container");
    let el = localStorage.getItem("element"+index);
    let add_html = ``;
    while(el){
        let parsed = JSON.parse(el);

        add_html += ` 
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
        
        index++;
        el = localStorage.getItem("element"+index);
    }
    container.innerHTML = add_html;
    
    document.querySelectorAll(".element").forEach(element =>controlAccordion(element));
    save_button.click();

} 


function rgbToHex(rgb) {
    matcher = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if(matcher) {
        return '#' + componentToHex(parseInt(matcher[1])) +componentToHex(parseInt(matcher[2])) +componentToHex(parseInt(matcher[3]));
    }
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

window.addEventListener("load",unloadElements);

