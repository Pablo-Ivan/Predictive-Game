/**********************************/
/*       Pablo Iván G. Soto       */
/*             2015               */
/**********************************/
function Ia(pelota, pala, alto, jugador) {
  this.pelota = pelota;
  this.pala = pala;
  this.alto = alto;
  this.jugador = jugador;
  this.prediccion = null;
}
Ia.prototype.calcularRebotes = function () {
  if (this.prediccion != null) return;
  var tiempo = Math.abs((this.pala.pos.x - this.pelota.pos.x) / this.pelota.vector.x);
  var y = this.pelota.vector.y * tiempo + this.pelota.pos.y;
  var inferior = this.pelota.lado;
  var superior = this.alto - this.pelota.lado;
  while (y < inferior || y > superior)
  {
    if (y < inferior)
    {
      y = - y + inferior * 2;
    } 
    else
    {
      y = superior * 2 - y;
    }
  }
  this.prediccion = y;
}
Ia.prototype.direccion = function () {
  var ideal;
  if (this.jugador == 1 && this.pelota.vector.x > 0 || this.jugador == 2 && this.pelota.vector.x < 0)
  {
    ideal = this.alto / 2;
    this.prediccion = null;
  } 
  else
  {
    this.calcularRebotes();
    ideal = this.prediccion;
  }
  if (ideal - this.pelota.lado / 2 < this.pala.pos.y - this.pala.alto / 4)
  {
    return Direccion.ARRIBA;
  }
  if (ideal + this.pelota.lado / 2 > this.pala.pos.y + this.pala.alto / 4)
  {
    return Direccion.ABAJO;
  }
  return Direccion.QUIETO;
};
