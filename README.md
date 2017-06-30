# Slide
+ 纯手工打造，欢迎交流 
## JS版使用方法
+ 
<pre><code>
<script src="./js/slide.js"></script>
<script>
		/*
		*启动轮播图，请在DOM onload后启动。请注意参数类型
		*	第一个参数（String） 为轮播图外盒子的id，这里是ul节点
		*	第二个参数（String） 为焦点的插入节点位置
		*	第三个参数（Number） 为幻灯片播放速度（间隔），单位：毫秒，默认值：2000
		*	第四个参数（Number） 为幻灯片过度效果速度，单位：px/毫秒，默认值：10
		 */
		window.onload = function (){
			runSlide('slide', 'slideFocus', 2000, 10);
		}
</script>
</code></pre>
+ html节点及css样式可参考并进行部分修改
