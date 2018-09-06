---
title: meta属性
date: 2018-08-03 08:47:04
tags:
---

# 1. 基本概念

**DPI**：测量空间点密度的单位，每英寸能打印上的墨滴数量。
**PPI**：将DPI的概念应用到计算机屏幕上，表示一英寸屏幕上显示的像素点的数量。讨论屏幕时PPI=DPI。
**屏幕分辨率**：屏幕上显示的像素数量（27寸显示器，分辨率为2560*1440px）。

- **原始分辨率/物理分辨率**： 宽度 X PPI * 高度 X PPI。
- **显示器分辨率**：桌面设定的分辨率。若将分辨率减小，显示在PPI相同的屏幕上，系统会自动拉伸所有元素来填补空隙，界面变大。因为不能有半个像素点，使得周围的像素点的颜色只有一部分，变产生了模糊。

**视网膜显示屏（Retina）**：PPI非常高的设备，人的视网膜无法在屏幕上分辨出像素点。1标准像素=4 Retina像素。
**物理像素(physical pixel)**：显示屏是由一个个物理像素点组成的，通过控制每个像素点的颜色，使屏幕显示出不同的图像。物理像素点固定不变（pt），是显示器上的最小物理显示单元。
**设备独立像素**(dip)：与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念，包括了CSS像素。
**设备像素比**(dpr)： 1个CSS像素占用多少设备像素。在x/y方向上：dpr=pp/dip 。  1px=dpr^2 * 1dp。
**DP**：安卓设备下的设计和显示基本单位。1DP = （PPI/160）PX 。

| 密度       | ldpi    | mdpi    | hdpi    | xhdpi    | xxhdpi    |
| ---------- | ------- | ------- | ------- | -------- | --------- |
| 密度值     | 120     | 160     | 240     | 320      | 480       |
| 代表分辨率 | 240*320 | 320*480 | 480*800 | 720*1280 | 1080*1920 |
| PX         | 0.75    | 1       | 1.5     | 2        | 3         |

**PT**： 苹果设备下的设计和显示基本单位。1PT = iphone3（163PPI）下 1PX 代表的尺寸。

- 注意PT还有另一个意思，指印刷行业中的点：1PT=(DPI/72)PX。

**SP**: 安卓开发用的字体大小单位。当文字尺寸是“正常”时1sp=1dp，而当文字尺寸是“大”或“超大”时，1sp>1dp。

# 2. viewport

viewport指移动设备的屏幕上能用来显示我们的网页的那块区域，但不是浏览器可视区域。一般来讲，移动设备上的viewport都要大于浏览器的可视区域。移动设备上的浏览器会把默认的viewport设置为980px或1024px，这样会造成浏览器出现横向滚动条。 
css像素 不等于 物理像素。而是根据设备像素和像素比确认的：1px=dpr^2 * 1dp。分辨率越大，css中1px代表的物理像素就会越多。当用户缩放屏幕时也会引起css像素变化。 DPR可通过window.devicePixelRatio 获取。
分类：

- layout viewport：如果把移动设备上浏览器的可视区域设为viewport的话，某些网站就会因为viewport太窄而显示错乱，所以这些浏览器就决定默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。ppk把这个浏览器默认的viewport叫做 layout viewport*。*这个layout viewport的宽度可以通过document.documentElement.clientWidth 来获取。 
- visual viewport：浏览器的可视区域的大小，可以铜通过window.innerWidth来获取。 
- ideal viewport : 完美适配移动设备的viewport，它的宽度等于移动设备的屏幕宽度。

## 2.1 `<meta>`

移动设备默认的viewport是layout viewport，可通过meta标签转换成ideal viewport。

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

| 属性                                  | 作用                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| width                                 | 设置layout viewport的宽度，为一个正整数，或字符串"width-device" |
| initial-scale                         | 设置页面的初始缩放值，为一个数字，可以带小数                 |
| minimum-scale                         | 允许用户的最小缩放值，为一个数字，可以带小数                 |
| maximum-scale                         | 允许用户的最大缩放值，为一个数字，可以带小数                 |
| height                                | 设置layout viewport的高度，很少使用                          |
| user-scalable                         | 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许 |
| target-densitydpi（安卓设备私有属性） | 值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个 |

以下都能实现viewport=ideal viewport：

- width = device-width: ipad和iphone横屏和竖屏时viewport都是竖屏的ideal viewport。
- initial-scale=1 ：IE横屏和竖屏时viewport都是竖屏的ideal viewport。
- 两种都写就没有问题了。
- 当两个有冲突时，选最大的值。