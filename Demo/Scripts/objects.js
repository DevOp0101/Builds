var light = function(_position,_radius,_angleSpread, _color, _type){
        this.color = _color;
        this.radius = _radius;
        this.angleSpread = _angleSpread;
        this.position = _position;
        this.angle = Math.random()*180;
        this.type = _type;
    };

var object = function(_position,_width,_height,_type){
        this.position = _position;
        this.width = _width;
        this.height = _height;
        this.type = _type;
        this.visible = false;
    };

var renderObject = function(_position,_width,_height,_type){
    this.position = _position;
    this.width = _width;
    this.height = _height;
    this.type = _type;
}