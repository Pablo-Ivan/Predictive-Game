/**********************************/
/* Juan Gabriel Rodríguez Carrión */
/*    jlabstudio.com       2013   */
/**********************************/

function Pong(ia){
    this.controles = new Controles();
    this.ia=ia;

    this.canvas=document.getElementById("canvas");
    this.canvas.width=800;
    this.canvas.height=500;
    this.canvas.style.backgroundColor="black";

    this.contexto=this.canvas.getContext('2d');

    this.palas=[new Pala(30,this.canvas.height), new Pala(this.canvas.width-30,this.canvas.height)];
    this.pelota=new Pelota(this.canvas.width,this.canvas.height,this);

    this.puntuaciones=[0,0];

    this.tiempoTranscurrido=Date.now();
    this.loop();
}
Pong.prototype.dibujarMundo=function(){
    var trozos=31;
    var trozo = Math.round(this.canvas.height/trozos);
    var mitad=Math.round(this.canvas.width/2);

    this.contexto.lineWidth = 10;
    this.contexto.strokeStyle = "white";
    for (var i=0;i<trozos;i++)
    {
        if (i%2==1) continue;
        this.contexto.beginPath();
        this.contexto.moveTo(mitad,trozo*i);
        this.contexto.lineTo(mitad,trozo*(i+1));
        this.contexto.stroke();
    }

    //Puntuacion
    this.contexto.fillStyle="white";
    this.contexto.font = "bold 50px monospace";
    this.contexto.fillText((this.puntuaciones[0]<10?"0":"")+""+this.puntuaciones[0],this.canvas.width/2-80,40);
    this.contexto.fillText((this.puntuaciones[1]<10?"0":"")+""+this.puntuaciones[1],this.canvas.width/2+20,40);
}

Pong.prototype.loop=function(){
    var direccion1=Direccion.QUIETO;
    var direccion2=Direccion.QUIETO;

    var delta=(Date.now() - this.tiempoTranscurrido)/1000;
    this.tiempoTranscurrido=Date.now();

    //Movemos las entidades
    if (this.controles.W && !this.controles.S)
    {
        direccion1=Direccion.ARRIBA;
        
    }
    else if(!this.controles.W && this.controles.S)
    {
        direccion1=Direccion.ABAJO;
    }

    if (ia.checked)
    {
        if (this.pelota.pos.y-this.pelota.lado/2 <= this.palas[1].pos.y)
        {
            direccion2=Direccion.ARRIBA;
        }
        if (this.pelota.pos.y+this.pelota.lado/2 >= this.palas[1].pos.y)
        {
            direccion2=Direccion.ABAJO;
        }
    }
    else
    {
        if (this.controles.ARRIBA && !this.controles.ABAJO)
        {
            direccion2=Direccion.ARRIBA;
        }
        else if(!this.controles.ARRIBA && this.controles.ABAJO)
        {
            direccion2=Direccion.ABAJO;
        }
    }
    this.palas[0].mover(delta,direccion1);
    this.palas[1].mover(delta,direccion2);
    
    var quantum=Math.floor(delta/0.005);
    for (var i=0;i<quantum;i++)
    {
        this.pelota.mover(0.005);
    }
    quantum=delta-quantum*0.005;
    this.pelota.mover(quantum);

    //Dibjuamos las entidades
    this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.dibujarMundo();

    this.palas[0].dibujar(this.contexto);
    this.palas[1].dibujar(this.contexto);
    this.pelota.dibujar(this.contexto);

    var angulo=this.pelota.vector.getAnguloRelativo();

    log("Velocidad: " +this.pelota.velocidad + " // Angulo: " + angulo);

    var self=this;
    requestAnimationFrame(function(){ self.loop(); });
}