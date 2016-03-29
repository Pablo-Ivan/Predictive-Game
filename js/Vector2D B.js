function Vector2D(x,y){
    this.x=x;
    this.y=y;
}
Vector2D.prototype.longitud=function(){
    return (Math.sqrt(this.x*this.x+this.y*this.y));
};
Vector2D.prototype.escalar=function(e){
    return (new Vector2D(this.x*e,this.y*e));
};
Vector2D.prototype.sumar=function(v){
    return (new Vector2D(this.x+v.x,this.y+v.y));
};
Vector2D.prototype.normalizar=function(){
    var vec;
    var lon=this.longitud();
    if (lon!=0)
    {
        vec=this.escalar(1/lon);
    }
    else
    {
        vec=new Vector2D(0,0);
    }
    return vec;
};
Vector2D.prototype.rotar=function(angulo){
    var radianes=angulo*Math.PI/180;
    var x=this.x*Math.cos(radianes)-this.y*Math.sin(radianes);
    var y=this.x*Math.sin(radianes)+this.y*Math.cos(radianes);
    x=Math.round(x*100);
    if (x!=0)
    {
        x/=100;
    }
    y=Math.round(y*100);
    if (y!=0)
    {
        y/=100;
    }
    return new Vector2D(x,y);
};

Vector2D.prototype.getAngulo=function(){
	return Math.atan2(this.y,this.x)*180/Math.PI;
};
Vector2D.prototype.getAnguloRelativo=function(){
	var angulo = this.getAngulo();
	if (angulo>=180) angulo-=180;
    if (angulo>90) angulo=180-angulo;
    if (angulo<=-180) angulo+=180;
    if (angulo<-90) angulo=-180-angulo;
	return angulo;
};
Vector2D.prototype.clonar=function(){
	return new Vector2D(this.x,this.y);
};
