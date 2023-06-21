  /*SLIDE*/ 
  var counter = 1;
  setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 3){
      counter = 1;
    }
  }, 6000);



  /*BUTTON*/
  function IrPaginaCardapio(event) {
    event.preventDefault();
    window.location.href = "../Tela Cardápio/index.html";
  }