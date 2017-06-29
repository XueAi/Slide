window.onload = function () {
	var slide = document.getElementById('slide');
	var slideFocus = document.getElementById('slideFocus');
	var imgLis = slide.getElementsByTagName('li');
	var imgWidth = imgLis[0].offsetWidth; // 需设置幻灯片宽度值相等
	var count = 0; // 位移计数：count*imgWidth
	var trans; // 过度效果定时器 
	var focusHtml = ''; 

	// alert(trans);
	// 根据幻灯片数量插入幻灯片焦点
	(function (){
		var spanArr = [];
		var hh = 0;
		for (var i = 0; i < imgLis.length; i += 1) {
			var span = '<span name="' + i + '">' + (i+1) +'</span>\n';
			focusHtml += span;
		}
		slideFocus.innerHTML = focusHtml;
		spanArr = slideFocus.getElementsByTagName('span');
		for (var j = 0; j < spanArr.length; j +=1){
			if (spanArr[j].addEventListener) {                    //所有主流浏览器，除了 IE 8 及更早 IE版本
			    spanArr[j].addEventListener("mouseover", function (){
			    	clearInterval(trans);
			    	count = this.getAttribute('name');
			    	transFun(count);
			    	// alert(this.getAttribute('name'));
			    	// alert(4);
			    });
			} else if (spanArr[j].attachEvent) {                  // IE 8 及更早 IE 版本
			    spanArr[j].attachEvent("onMouseover", function (){
			    	clearInterval(trans);
			    	count = this.getAttribute('name');
			    	transFun(count);
			    	// alert(4);
			    });
			}
		}
	}());
	

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
			transFun(count);
		}, 2000);
	}

	// 幻灯片过度效果计时器函数
	function transFun(count){
		trans = setInterval(function (){
				transition(slide.style.left, -count * imgWidth);
			}, 1); 
	}

	// 幻灯片过度效果函数
	function transition(nowLeftPx, aimLeft){
		// 出去单位获得其值 
		var nowLeft = parseInt(nowLeftPx);
		// 判断是否是最后一张幻灯片，否则位移方向不同 
		if (nowLeft < aimLeft) {
			if (aimLeft - nowLeft < 10) {
				slide.style.left = (nowLeft + (aimLeft - nowLeft)) + 'px';
			}else {
				slide.style.left = (nowLeft + 10) + 'px';
			}
		}else if (nowLeft > aimLeft){
			if (nowLeft - aimLeft < 10) {
				slide.style.left = (nowLeft - (nowLeft - aimLeft)) + 'px';
			}else {
				slide.style.left = (nowLeft - 10) + 'px';
			}
		}else {
			// slide.style.left = aimLeft + 'px';
			clearInterval(trans); //过度效果到位后，停止效果函数并启动幻灯片播放函数
			sliding();
		}
	}


}