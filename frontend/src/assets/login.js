function getHeight(){
// console.log(window.innerHeight+'px')
    const container = document.getElementById("myDIV");
    if(container){
      // console.log("suh")
      container.style.height=window.innerHeight+'px';
    }
}
getHeight();
  