

const form = document.querySelector("#input_form");


let save_button = document.querySelector("#save_btn");

save_button.addEventListener("click", event=>{
    event.preventDefault();
    let font_size = form.querySelector("#font_size").value + "px";
    // let font_style;
    // if (form.querySelector("#italic_text").checked) font_style = "italic";
    // else font_style = "normal";
    let color = form.querySelector("#text_color").value;
    let element_color = form.querySelector("#element_color").value;
    
    // let pad_left = form.querySelector("#padding_left").value + "px";
    // let pad_right = form.querySelector("#padding_right").value + "px";
    // let text_align;
    // if (form.querySelector("#left_align").checked) text_align = "left";
    // else if (form.querySelector("#center_align").checked) text_align = "center";
    // else text_align = "right";

    let title_anim = form.querySelector("#appearance_animation").value + "ms";
    let content_anim = form.querySelector("#content_animation").value + "ms";


    elements.forEach(element => {
        element.style.fontSize = font_size;
        element.style.color = color;
        element.style.background = element_color;
        // element.style.setProperty('animation', anim_duration);
        
        element.style.setProperty('animation', 'animate ' + title_anim);

        let children = document.querySelectorAll('.element .accordion__content');        
        children.forEach(ch=>{
            ch.style.setProperty('animation', 'animate ' + content_anim);
        });
    } 
    );
    // for (let i of elements) {
    //     i.style.fontSize = font_size;
    //     i.style.fontStyle = font_style;
    //     i.style.color = color;
    //     i.style.setProperty("--first-glitch-color", fst_color);
    //     i.style.setProperty("--second-glitch-color", snd_color);
    //     i.style.setProperty("--padding-left", pad_left);
    //     i.style.setProperty("--padding-right", pad_right);
    //     i.style.textAlign = text_align;
    //     i.style.setProperty("--open-animation-duration", open_anim_duration);
    //     i.style.setProperty("--animation-duration", anim_duration);
    // }
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