let elements = document.querySelectorAll('.element');

function controlAccordion(element){
        let btn = element.querySelector('.accordion__title button');
        let icon = element.querySelector('.accordion__title button i');
        var accordion__content = element.lastElementChild;
        var accordion__contents = document.querySelectorAll('.element .accordion__content');
        
        btn.addEventListener('click', ()=>{
            accordion__contents.forEach(ans =>{
                let ansIcon = ans.parentElement.querySelector('button i');
                if(accordion__content !== ans){
                    ans.classList.add('hideText');
                    ansIcon.className = 'fas fa-plus-circle';
                }
            });
            
            accordion__content.classList.toggle('hideText');
            if(icon.className === 'fas fa-plus-circle'){
                icon.className = 'fas fa-minus-circle';
            }else{
                icon.className = 'fas fa-plus-circle';
            }
        });
    
}

elements.forEach(element =>controlAccordion(element));