class PatternMap {
	constructor(pattern, options) {
		const { 
			width, 
			height,
			groupType
		} = options;

		this.groupType = groupType;
		this.width = width;
		this.height = height;

		this.pattern = pattern;
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.isDrawing = false;
		this.prevCursorPosition = {};

		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		document.body.onmouseup = this.mouseUpHandler.bind(this);

		// this.drawGrid();
	}

	drawGrid() {
		let dashes = 32; 
		let dashY = this.height/dashes;
		let dashX = this.width/dashes;

		for (let i = 1; i <= this.width/this.pattern.width; i++) {
			for (let j = 0; j < dashes - 1; j++) {
				if(j % 2 == 1) continue;

				this.ctx.beginPath();
				this.ctx.moveTo(this.pattern.width * i, dashY * j);
				this.ctx.lineTo(this.pattern.width * i, dashY * (j + 1));
				this.ctx.stroke();
			}
		}

		for (let i = 1; i <= this.height/this.pattern.height; i++) {
			for (let j = 0; j < dashes - 1; j++) {
				if(j % 2 == 1) continue;

				this.ctx.beginPath();
				this.ctx.moveTo(dashX * j, this.pattern.height * i);
				this.ctx.lineTo(dashX * (j + 1), this.pattern.height * i);
				this.ctx.stroke();
			}
		}
	}

	mouseDownHandler({ layerX, layerY }) {
		this.isDrawing = true;
		this.prevCursorPosition = { layerX, layerY };
	}

	mouseUpHandler(e) {
		this.isDrawing = false;
	}

	drawLine(x1, y1, x2, y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}

	mouseMoveHandler({ layerX, layerY }) {
		const {
			width,
			height
		} = this.pattern;
		const prevPos = this.prevCursorPosition;

		if (this.isDrawing) {
			for (let i = -1; i <= this.width/width; i++) {
				for (let j = -1; j <= this.height/height; j++) {
					switch (this.groupType) {
						case 'p1':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							break;
						case 'pg':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								width/2 + prevPos.layerX + i * width, 
								height - prevPos.layerY + j * height,
								width/2 + layerX + i * width, 
								height - layerY + j * height);
							break;
						case 'pm':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								width/2 + (width - prevPos.layerX + i * width), 
								prevPos.layerY + j * height,
								width/2 + (width - layerX + i * width), 
								layerY + j * height);
							break;
						case 'cm':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								width/4 + (width - prevPos.layerX + i * width), 
								prevPos.layerY + j * height,
								width/4 + (width - layerX + i * width), 
								layerY + j * height);
							this.drawLine(
								width/2 + prevPos.layerX + i * width, 
								height/2 + prevPos.layerY + j * height,
								width/2 + layerX + i * width, 
								height/2 + layerY + j * height);
							this.drawLine(
								width*3/4 + (width - prevPos.layerX + i * width), 
								height/2 + prevPos.layerY + j * height,
								width*3/4 + (width - layerX + i * width), 
								height/2 + layerY + j * height);
							break;
						case 'p2':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								-prevPos.layerX + i * width, 
								-prevPos.layerY + j * height,
								-layerX + i * width, 
								-layerY + j * height);
							break;
						case 'pgg':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								width/4 + (width - prevPos.layerX + i * width), 
								prevPos.layerY + j * height,
								width/4 + (width - layerX + i * width), 
								layerY + j * height);
							this.drawLine(
								prevPos.layerX + i * width, 
								height/4 + (height - prevPos.layerY + j * height),
								layerX + i * width, 
								height/4 + (height - layerY + j * height));
							this.drawLine(
								width/4 + (width - prevPos.layerX + i * width), 
								height/4 + (height - prevPos.layerY + j * height),
								width/4 + (width - layerX + i * width), 
								height/4 + (height - layerY + j * height));
							break;
						case 'pmm':
							this.drawLine(
								prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								-prevPos.layerX + i * width, 
								-prevPos.layerY + j * height,
								-layerX + i * width, 
								-layerY + j * height);
							this.drawLine(
								width - prevPos.layerX + i * width, 
								prevPos.layerY + j * height,
								width - layerX + i * width, 
								layerY + j * height);
							this.drawLine(
								prevPos.layerX + i * width, 
								height - prevPos.layerY + j * height,
								layerX + i * width, 
								height - layerY + j * height);
							break;
					}
				}
			}

			this.prevCursorPosition = { layerX, layerY };
			// this.ctx.fillRect(layerX, layerY, 1, 1);
			// console.log(e);
		}
	}
}

class Grid {
	constructor(width, height, incline = 0, angle = 0) {
		this.width = width;
		this.height = height;
		this.incline = incline;
		this.angle = angle;
	}
}

class Equilateral extends Grid {
	constructor(width, height) {
		super(width, height);

		this.incline = Math.asin(height/Math.hypot(height, width/2));
	}
}

class Rhombus extends Equilateral {
	constructor(width, height) {
		super();

		this.angle = this.incline;
	}
}

class Pattern {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		new Equilateral(width, height)
	}
}