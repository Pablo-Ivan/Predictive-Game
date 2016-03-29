var Direccion = { QUIETO:0, ARRIBA: 1, ABAJO:2 };
function Controles(){    
    this.ARRIBA=false;
    this.ABAJO=false;
    this.W=false;
    this.S=false;

    var self=this;
    document.body.onkeydown=function(e){
        switch(e.keyCode)
        {
            case 38: //Arriba
                e.preventDefault();
                self.ARRIBA=true;
                break;
            case 40: //Abajo
                e.preventDefault();
                self.ABAJO=true;
                break;
            case 87: //W
                e.preventDefault();
                self.W=true;
                break;
            case 83: //S
                e.preventDefault();
                self.S=true;
                break;
            
        }
    };
    document.body.onkeyup=function(e){
        switch(e.keyCode)
        {
            case 38: //Arriba
                e.preventDefault();
                self.ARRIBA=false;
                break;
            case 40: //Abajo
                e.preventDefault();
                self.ABAJO=false;
                break;
            case 87: //W
                e.preventDefault();
                self.W=false;
                break;
            case 83: //S
                e.preventDefault();
                self.S=false;
                break;
            
        }
    };
}
