function isEqual(obj1, obj2) {
	return obj1.x == obj2.x && obj1.y == obj2.y;
}

class Node {
	constructor(data) {
	    this.data = data;
	    this.parent = null;
	    this.children = [];
	}	
}

Node.prototype.add = function(data) {
	for (var i = 0; i < this.children.length; i++) {
		if (isEqual(this.children[i].data, data)) {
			return this.children[i]; 
		}
	}

    var child = new Node(data); 
    this.children.push(child);
    child.parent = this;
    return child;
};

Node.prototype.findChild = function() {
	var parent = this.parent;
	for (var i = 0; i < parent.children.length; i++) {
		if (this == parent.children[i])
			return i;
	}
};

Node.prototype.path = function(nodeTo) {
	var nodeFrom = this;
	var pathFrom = [], pathTo = [];
	
	while (nodeFrom != e.tree) { // путь к первой ноде
		pathFrom.push(nodeFrom.findChild());
		nodeFrom = nodeFrom.parent;
	}
	pathFrom = pathFrom.reverse();

	while (nodeTo != e.tree) { // путь ко второй ноде
		pathTo.push(nodeTo.findChild());
		nodeTo = nodeTo.parent;
	}
	pathTo = pathTo.reverse();

	var i = 0; // восстановление маршрута
	while (pathFrom[i] == pathTo[i]) {
		i++;
	}
	var dist = pathFrom.length - i;
    return {dist: dist, arr: pathTo.slice(i)};
};