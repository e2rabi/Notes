class BaseComponant extends HTMLElement{
    root ;
    constructor(){
        super();
        this.root=this.attachShadow({mode: "open"}); 
   }
    css(style){
        const styles = document.createElement("style");
        if(style.toString().includes("{")){
            styles.textContent = style ;
            this.root.appendChild(styles);
        }else{
            const loadCss = async ()=>{
                const request =  await  fetch(`./componant/${style}.css`);
                const css =  await request.text() ;
                styles.textContent = css ;
                this.root.appendChild(styles);
            }
            loadCss();
        }
   }
}
export default BaseComponant;