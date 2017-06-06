(function() {
	var rootElement = document.getElementById('waterfull');
	rootElement.style.position = 'relative';

	var firstElement = rootElement.firstElementChild;
	firstElement.style.boxSizing = 'border-box';

	var rootWidth = rootElement.offsetWidth;//根元素宽度
		
	var itemWidth = firstElement.offsetWidth;//直接子元素宽度
		
	var columnNumber = Math.floor(rootWidth / itemWidth);//最大列数
	var marginLeft = 0;
	marginLeft = columnNumber-1 && (rootWidth-itemWidth*columnNumber) / (columnNumber-1);
	var heightArr = [];//列高数组

	//初始化列高数组
	for(var i = 0; i < columnNumber; i ++) {
		heightArr[i] = 0;
	}

	//遍历所有直接子元素节点
	for(var j = 0; j < rootElement.childElementCount; j ++) {
		rootElement.children[j].style.boxSizing = 'border-box'; //盒子模型为IE盒子模型

		var minIndex = getMinHeightIndex(heightArr, columnNumber);

	  setPosition(rootElement.children[j], heightArr[minIndex], minIndex * itemWidth + minIndex * marginLeft)
		
		heightArr[minIndex] += rootElement.children[j].offsetHeight;
	}

	//获取列高数组最小值下标
	function getMinHeightIndex(heightArr, columnNumber) {
		var minIndex = 0;

		for(var i = 1; i < columnNumber; i ++) {
			minIndex = heightArr[minIndex] <= heightArr[i] ? minIndex : i;
		}
		
		return minIndex;
	}

	//修改直接子元素绝对定位
	function setPosition(ele, top, left) {
		ele.style.position = 'absolute';
  	ele.style.top = top + 'px';
		ele.style.left = left + 'px';
	}
})()