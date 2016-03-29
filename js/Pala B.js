/**********************************/
/* Juan Gabriel Rodríguez Carrión */
/*    jlabstudio.com       2013   */
/**********************************/

function Pala(x,mundoAlto){
    this.mundoAlto=mundoAlto;
    this.ancho=20;
    this.alto=80;

    this.pos=new Vector2D(x,mundoAlto/2);

    this.velocidad=200;
}
Pala.prototype.mover=function(delta,direccion){
    var distancia=Math.round(delta*this.velocidad);
    switch(direccion)
    {
        case Direccion.ARRIBA:
            this.pos.y-=distancia;
            this.pos.y=Math.max(this.alto/2,this.pos.y);
            break;
        case Direccion.ABAJO:
            this.pos.y+=distancia;
            this.pos.y=Math.min(this.mundoAlto-this.alto/2,this.pos.y);
            break;
    }
};
Pala.prototype.dibujar=function(contexto){
    contexto.fillStyle="white";
    contexto.fillRect(this.pos.x-this.ancho/2,this.pos.y-this.alto/2,this.ancho,this.alto);
};
