var activeNode, context, canvas, cellSize;
class Game {
	//tree, field

	constructor() {
		canvas = document.getElementById("game");
		    canvas.width  = 320;
		    canvas.height = 320;
		cellSize = canvas.width / 4;
		context = canvas.getContext("2d");
		
		this.field = new gameObj();
	    this.field.setCellView(function(x, y) {
	    	context.fillStyle = "#9ACD32";
	    	context.fillRect(x+1, y+1, cellSize-2, cellSize-2);
	    });
	    this.field.setNumView(function() {
	    	context.font = "bold "+(cellSize/2)+"px Sans";
	    	context.textAlign = "center";
	    	context.textBaseline = "middle";
	    	context.fillStyle = "#000";
	    });
		this.newGame();

		function event(x, y) {
			if (e.field.move(x, y)) {
				activeNode = activeNode.add(e.field.getNull());
				e.redraw();
				GameWin();
			}
		}

		canvas.onclick = function(e) {
			var x = Math.trunc((e.pageX - canvas.offsetLeft) / cellSize);
			var y = Math.trunc((e.pageY - canvas.offsetTop)  / cellSize);
			event(x, y);
		};

		function GameWin() {
			if (e.field.victory()) {
				alert("Победа!");
				e.newGame();
			}
		}
	}

	newGame() {
		this.field.mix(350);
		this.tree = new Node(this.field.getNull()); // создание Дерева с начальным значением
		activeNode = this.tree; // указываем активную ноду
		this.redraw();
	}

	redraw() {
		context.fillRect(0, 0, canvas.width, canvas.height);
		this.field.draw(context, cellSize);
		drawTree(this.tree, activeNode);
	}

	moveNode(index) {
		var path;
		if (index == -1) {
			if (activeNode.parent == null)
				return;
			path = activeNode.path(activeNode.parent);
			
		} else {
			path = activeNode.path(nodes[index]);
		}

		for (var i = 0; i < path.dist; i++) { //подъем по дереву
			activeNode = activeNode.parent;
			var x = activeNode.data.x;
			var y = activeNode.data.y;
			this.field.move(x, y);
		}
		for (var i = 0; i < path.arr.length; i++) { //подъем по дереву
			activeNode = activeNode.children[path.arr[i]];
			var x = activeNode.data.x;
			var y = activeNode.data.y;
			this.field.move(x, y);
		}
		this.redraw();
	}
}

class gameObj {
	cellView = null;
	numView = null;
	
	arr = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
	Null = {"x": 3, "y": 3};
	
	getRandomBool = () => Math.random() >= .5

	getNull = function() {
		return this.Null;		
	};
	
	move = function(x, y) {
		var nullX = this.Null.x;
		var nullY = this.Null.y;

		var deltaX, deltaY, dist;
		if ((x == nullX) == (y == nullY)) {
			return false;
		} else if (x == nullX) {
			dist = Math.abs(y - nullY);
			deltaX = 0;
			deltaY = y < nullY ? -1 : 1;
		} else if (y == nullY) {			
			dist = Math.abs(x - nullX);
			deltaX = x < nullX ? -1 : 1;
			deltaY = 0;
		}
		
		while (dist--) {
			this.arr[nullY][nullX] = this.arr[nullY + deltaY][nullX + deltaX];
			nullY += deltaY;
			nullX += deltaX;
		}
		this.arr[y][x] = 0;
		this.Null = {"x": x, "y": y};
		return true;
	};
	
	victory = function() {
		var e = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (this.arr[i][j] != e[i][j]) { // (4 * i + j + 1) % 16
					return false;
				}
			}
		}
		return true;
	};
	
	mix = function(stepCount) {
		var x, y;
		while(stepCount--) {
			x = this.Null.x;
			y = this.Null.y;

			if (this.getRandomBool()) {
				x = this.getRandomBool() ? x + 1 : x - 1;
			} else {
				y = this.getRandomBool() ? y + 1 : y - 1;
			}

			if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
				this.move(x, y);
			}
		}
	};
	
	setCellView = function(func) {
		this.cellView = func;
	};
	
	setNumView = function(func) {
		this.numView = func;
	};
	
	draw = function(context, size) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (this.arr[i][j] === 0) {
					continue;
				}
				if (this.cellView !== null) {
					this.cellView(j * size, i * size);
				}
				if (this.numView !== null) {
					this.numView();
					context.fillText(this.arr[i][j], j * size + size / 2, i * size + size / 2);
				}
			}
		}
	};
}