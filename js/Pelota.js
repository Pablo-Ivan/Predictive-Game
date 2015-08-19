/**********************************/
/*       Pablo Iván G. Soto       */
/*             2015               */
/**********************************/
function Pelota(mundoAncho, mundoAlto, pong) {
  this.mundoAncho = mundoAncho;
  this.mundoAlto = mundoAlto;
  this.posIni = new Vector2D(mundoAncho / 2, mundoAlto / 2);
  this.pos;
  this.pong = pong;
  this.lado = 15;
  this.velocidad = 300;
  this.velocidadIni = 300;
  this.incrementoVelocidad = 10;
  this.maxAngulo = 60;
  this.velocidad = this.velocidadIni;
  this.vector;
  this.sacar( - 1);
}
Pelota.prototype.incrementarVelocidad = function () {
  this.velocidad += this.incrementoVelocidad;
  this.vector = this.vector.normalizar().escalar(this.velocidad);
};
Pelota.prototype.sacar = function (direccion) {
  this.pos = this.posIni.clonar();
  this.velocidad = this.velocidadIni;
  this.vector = new Vector2D(direccion, 0.1).normalizar().escalar(this.velocidad);
};
Pelota.prototype.mover = function (delta) {
  var mitad = this.lado / 2;
  this.pos = this.pos.sumar(this.vector.escalar(delta));
  if (this.pos.x - mitad < 0)
  {
    this.pong.puntuaciones[1]++;
    SONIDOS.gol.play();
    this.sacar(1);
  }
  if (this.pos.y - mitad < 0)
  {
    this.pos.y = mitad;
    this.vector.y *= - 1;
    SONIDOS.plop.play();
  }
  if (this.pos.x + mitad > this.mundoAncho)
  {
    this.pong.puntuaciones[0]++;
    SONIDOS.gol.play();
    this.sacar( - 1);
  }
  if (this.pos.y + mitad > this.mundoAlto)
  {
    this.pos.y = this.mundoAlto - mitad;
    this.vector.y *= - 1;
    SONIDOS.plop.play();
  }
  var vector;
  if (this.vector.x < 0 && this.colisiona(this.pong.palas[0]))
  {
    this.vector.x *= - 1;
    this.incrementarVelocidad();
    vector = this.vector.clonar();
    this.vector = this.vector.rotar(this.pos.y - this.pong.palas[0].pos.y);
    SONIDOS.beep.play();
  } 
  else if (this.vector.x > 0 && this.colisiona(this.pong.palas[1]))
  {
    this.vector.x *= - 1;
    this.incrementarVelocidad();
    vector = this.vector.clonar();
    this.vector = this.vector.rotar(this.pong.palas[1].pos.y - this.pos.y);
    SONIDOS.beep.play();
  }
  var angulo = this.vector.getAnguloRelativo();
  if (angulo > this.maxAngulo || angulo < - this.maxAngulo)
  {
    this.vector = vector;
  }
};
Pelota.prototype.dibujar = function (contexto) {
  contexto.fillStyle = 'white';
  contexto.fillRect(this.pos.x - this.lado / 2, this.pos.y - this.lado / 2, this.lado, this.lado);
};
Pelota.prototype.colisiona = function (pala) {
  var mitad = this.lado / 2;
  if (this.pos.x + mitad < pala.pos.x - pala.ancho / 2) return false;
  if (this.pos.y + mitad < pala.pos.y - pala.alto / 2) return false;
  if (this.pos.x - mitad > pala.pos.x + pala.ancho / 2) return false;
  if (this.pos.y - mitad > pala.pos.y + pala.alto / 2) return false;
  return true;
};
