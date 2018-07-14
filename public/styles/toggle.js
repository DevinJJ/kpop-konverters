
var bingoSquares = document.getElementsByClassName("bingoItem");
var selectedSquares = [];

selectedSquares[24] = false;


for (var i = 0; i < bingoSquares.length; i++){
    
        (function (_i) {
            
            bingoSquares[_i].addEventListener('click', function(){
                
                console.log(_i);
                document.getElementsByClassName("bingoItem")[_i].classList.toggle("selected");
                if ((null == selectedSquares[_i]) || (selectedSquares[_i] == false))
                {
                    selectedSquares[_i] = true;
                }
                else if (selectedSquares[_i] == true)
                {
                    selectedSquares[_i] = false;
                }
                
            });
        })(i);
}

