window.onload = function () {
	var slide = document.getElementById('slide');
	var imgLis = slide.getElementsByTagName('li');
	var imgWidth = imgLis[0].offsetWidth; // 需设置幻灯片宽度值相等
	var count = 0; // 位移计数：count*imgWidth
	var trans;

	// 所有幻灯片宽度值应相等，否则需要条件循环叠加求值，然后设置下面slide宽度
	// 给slide(ul)设置正好包裹全部li的宽度值
	slide.style.width = imgWidth * imgLis.length + 'px';
	// 添加初始行内样式值，避免第一张幻灯片参数undefined
	slide.style.left = 0;

	sliding();
	// 幻灯片播放函数
	function sliding(){
		setTimeout(function (){
			count += 1;
			if (count >= imgLis.length) {
				count = 0;
			}

			// 启动幻灯片过度效果函数。如不需要，可去除并直接设置left值；或修改interval间隔值（1）为0 
			trans = setInterval(function (){
				transition(slide.style.left, （-count * imgWidth）+‘px’);
			}, 1); 
		}, 2000);
	}

	// 幻灯片过度效果函数
	function transition(nowLeftPx, aimLeft){
		// 出去单位获得其值 
		var nowLeft = parseInt(nowLeftPx);
		// 判断是否是最后一张幻灯片，否则位移方向不同 
		if (aimLeft === 0) {
			if (nowLeft < aimLeft) {
				slide.style.left = (nowLeft + 10) + 'px';
			}else {
				slide.style.left = aimLeft + 'px';
				clearInterval(trans); //过度效果到位后，停止效果函数并启动幻灯片播放函数
				sliding();
			}
		}else {
			if (nowLeft > aimLeft) {
				slide.style.left = (nowLeft - 10) + 'px';
			}else {
				slide.style.left = aimLeft + 'px';
				clearInterval(trans);
				sliding();
			}
		}
	}
}