var newTree;
var nodes = [];

function DFS(currentNode) {
    var padding = currentNode.children.length ? '0' : '8';
    nodes.push(currentNode);
	if (activeNode.data == currentNode.data) {
        newTree += '<li style="padding: 0px ' + padding + 'px;"><span class="tf-nc"><input class="btn-node-active" ' +
                   'type="button" onclick="alert(&quot;Активное состояние&quot;);"/></span>';
    }else {
        newTree += '<li style="padding: 0px ' + padding + 'px;"><span class="tf-nc"><input class="btn-node" ' +
                   'type="button" id="' + (nodes.length - 1) + '" onclick="e.moveNode(this.id);"/></span>';
    }

    if (currentNode.children.length)
    	newTree += '<ul style="margin-bottom: 0px;">';
    for (var i = 0; i < currentNode.children.length; i++) {
        DFS(currentNode.children[i]);
    }
    if (currentNode.children.length)
    	newTree += '</ul>';
    newTree += '</li>';
}

function drawTree(tree, actvNode) {
    newTree = '<div class="tf-tree tf-custom"><ul style=" margin-bottom: 10px; display: flex; ' +
              'align-content: center; justify-content: center;">';
    nodes.length = 0;
    DFS(tree);
    newTree += '</ul></div>';

    document.getElementById("tree").innerHTML = newTree;
}