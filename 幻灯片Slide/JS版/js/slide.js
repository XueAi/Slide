
	function runSlide(slideID, slideFocusID, slideSpeed, transSpeed){
		var slide = document.getElementById(slideID);
		var slideFocus = document.getElementById(slideFocusID);
		var slideSpeed = slideSpeed || 2000;
		var transSpeed = transSpeed || 10;
		
		var imgLis = slide.getElementsByTagName('li');
		var imgWidth = imgLis[0].offsetWidth; // 需设置幻灯片宽度值相等
		var count = 0; // 位移计数：count*imgWidth
		var trans; // 过度效果定时器 
		var focusHtml = ''; 
	
		// 所有幻灯片宽度值应相等，否则需要条件循环叠加求值，然后设置下面slide宽度
		// 给slide(ul)设置正好包裹全部li的宽度值
		slide.style.width = imgWidth * imgLis.length + 'px';
		// 添加初始行内样式值，避免第一张幻灯片参数undefined
		slide.style.left = 0;

		// 启动幻灯片播放函数
		slidingFun();

		// 根据幻灯片数量插入幻灯片焦点
		(function (){
			var spanArr = [];
			// 创建插入的html代码，name用于下面的count值
			for (var i = 0; i < imgLis.length; i += 1) {
				var span = '<span name="' + i + '">' + (i+1) +'</span>\n';
				focusHtml += span;
			}
			slideFocus.innerHTML = focusHtml;
			// 给每个焦点（span）添加监听事件
			spanArr = slideFocus.getElementsByTagName('span');
			for (var j = 0; j < spanArr.length; j +=1){
				if (spanArr[j].addEventListener) {                    //所有主流浏览器，除了 IE 8 及更早 IE版本
				    spanArr[j].addEventListener("mouseover", function (){
				    	clearTimeout(sliding); // 取消延迟和计时函数，避免累计混杂
				    	clearInterval(trans);
				    	count = parseInt(this.getAttribute('name'));
				    	transFun(count);
				    });
				} else if (spanArr[j].attachEvent) {                  // IE 8 及更早 IE 版本
				    spanArr[j].attachEvent("onMouseover", function (){
				    	clearTimeout(sliding);
				    	clearInterval(trans);
				    	count = parseInt(this.getAttribute('name'));
				    	transFun(count);
				    });
				}
			}
		}());

		// 幻灯片播放函数
		function slidingFun(){
			sliding = setTimeout(function (){
				count += 1;
				if (count >= imgLis.length) {
					count = 0;
				}
				// 启动幻灯片过度效果函数。如不需要，可去除并直接设置left值；或修改interval间隔值（1）为0 
				transFun(count);
			}, slideSpeed);
		}

		// 幻灯片过度效果计时器函数
		function transFun(countParam){
			trans = setInterval(function (){
					transition(slide.style.left, -countParam * imgWidth);
				}, 1); 
		}

		// 幻灯片过度效果函数
		function transition(nowLeftPx, aimLeft){
			// 出去单位获得其值 
			var nowLeft = parseInt(nowLeftPx);
			// 判断是否是最后一张幻灯片，否则位移方向不同 
			if (nowLeft < aimLeft) {
				if (aimLeft - nowLeft < transSpeed) {
					slide.style.left = (nowLeft + (aimLeft - nowLeft)) + 'px';
				}else {
					slide.style.left = (nowLeft + transSpeed) + 'px';
				}
			}else if (nowLeft > aimLeft){
				if (nowLeft - aimLeft < transSpeed) {
					slide.style.left = (nowLeft - (nowLeft - aimLeft)) + 'px';
				}else {
					slide.style.left = (nowLeft - transSpeed) + 'px';
				}
			}else {
				// slide.style.left = aimLeft + 'px';
				clearInterval(trans); //过度效果到位后，停止效果函数并启动幻灯片播放函数
				slidingFun();
			}
		}
	}
