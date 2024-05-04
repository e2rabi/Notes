const $ = (selector) => document.querySelectorAll(selector);
const Router = {
    init: ()=>{
        // prevent default click behavior for all link
        $('a.nav-link').forEach(element => {
            element.addEventListener('click',event=>{
                event.preventDefault();
                const url1 = element.href ; // return the full url
                const url= element.getAttribute('href') ; // return the path resource
                Router.go(url)
            })
        });
        // Event handler for URL changes
        window.addEventListener("popstate",event=>{
            Router.go(event.state.route,false) // route already pushed in the history
        })
        // Check the initial URL
        Router.go(location.pathname)
    },
    go : (route,addToHistory=true)=>{
       console.log(`Going to ${route}`);
       // push the route to the browser history
       if(addToHistory){
        history.pushState({route},null,route)
       }
       let pageElement = null;
       switch(route){ // todo  loop on array of routes
         case  "/notes":
            pageElement = document.createElement("app-cards")
         break ;
         case  "/trash":
          pageElement = document.createElement("app-trash-cards")
         break ;
         case  "/test2":
            pageElement = document.createElement("color-picker")
            const el = document.createElement("h4");
            el.textContent="This is light dom";
            el.classList.add("test");
            pageElement.appendChild(el);
         break ;    
       }
       const root =  document.querySelector("main");
       // document.querySelector("main").innerHTML="" // dirty clean
       if(root.children.length>0){
         root.children[0].remove(); // clean way remove event listner 
       }
       if(pageElement != null){
         root.appendChild(pageElement)
         window.scrollX=0 ;
         window.scrollY=0;
       }else{
         // client side not found page
       }
    }
};

export default Router ;