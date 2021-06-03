// constructor
function Gauge (elem, options) {
	var options = options || {},
		canvas = document.createElement('canvas'),
		value = options.value || 0;
	
	this.options = options;
	
	console.log(options.radius);
	
	this.ctx = canvas.getContext("2d");
	this.width = options.width || 100;
	this.height = options.height || this.width;
	
	// readjust lineWidth based on radius
	if (options.radius) {
		this.lineWidth = (this.width / 2 - options.radius);
	} else {
		this.lineWidth = options.lineWidth || 25;
	}
	this.radius = (this.width - this.lineWidth) / 2;
	
	this.color = options.color || '#333';
	this.background = options.background || '#ccc';

	this.range = [0, 100];
	
	this.interpolate = linearInterpolate.bind(this, this.range, [Math.PI, 2*Math.PI]);
	
	canvas.width = this.width;
	canvas.height = this.height / 2;
	
	this.set( value );
		
	elem.appendChild( canvas );
}

// get/set methods
Gauge.prototype.get = function () {
	return this.value || 0;
};

Gauge.prototype.set = function (value) {
	var ctx = this.ctx,
		range = this.range,
		value = clamp(value, range[0], range[1]),
		drawArc = function () {
			ctx.beginPath();
			ctx.arc.apply(ctx, arguments);
			ctx.stroke();
			// bind all arguments except the end value
		}.bind(this, this.width / 2, this.height / 2, 
				this.radius,
				Math.PI);

	this.value = value;
	
	ctx.clearRect(0,0,this.width,this.height / 2);
	
	ctx.lineWidth = this.lineWidth;
	
	// background
	ctx.strokeStyle = this.background;
	drawArc( 2 * Math.PI );
	
	// foreground
	ctx.strokeStyle = this.color;
	drawArc( this.interpolate( value ) );
	
	// optional display value
	if (this.options.displayvalue && 
	   this.options.displayvalue !== 'false') {
		ctx.font = "bold " + this.lineWidth + "px Arial, sans-serif";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText(value, this.width / 2, 0);
	}
};

// create instances/handlers

var gauges = document.getElementsByClassName('gauge');

for (var i = 0, len = gauges.length; i < len; i++) {
	var elem = gauges[i],
		gauge = new Gauge(elem, elem.dataset),
		inputs = elem.getElementsByTagName('input');
	for (var j = 0, lenJ = inputs.length; j < lenJ; j++) {
		(function (_gauge) {
			inputs[j].addEventListener('input', function (e) {
				_gauge.set(this.value);
			});
		})(gauge);
	}
}

// helper functions

function linearInterpolate (from_range, to_range, val) {
    var minX = from_range[0],
        minY = to_range[0],
        rangeX = from_range[1] - from_range[0],
        rangeY = to_range[1] - to_range[0];

    return (val - minX) * rangeY / rangeX + minY;
}

function clamp (x, min, max) {
    if (x < min) {
		return min;
	}
	if (x > max) {
		return max;
	}
	return x;
}