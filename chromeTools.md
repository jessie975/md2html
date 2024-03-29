---
title: chrome开发者工具调试小技巧
---

## Chrome Developer Tools调试小技巧

### 元素模块：Elements

* 调试元素伪类状态: :hov
* 查看元素的最终状态: Computed
* 元素的事件监听查看: Event Listeners
* 调试css的值: 按住alt每次加减0.1，按住shift每次加减10

### 日志模块：Console

#### keys（console）的常用方法

* console.log()

```js
let greet = 'hello'
let name = 'jessie'
console.log(greet, name)
console.log({greet, name})
```

* console.info('提示性信息')
* console.error('错误信息')
* console.warn('警示信息')
* 打印自定义样式信息

```js
console.log('%chello%cworld', 'color:red','color:green');
```

* 统计函数执行次数：console.count()

```js
let fun = function() {
  console.count('fun被执行的次数');
}
```

* console.time('a') && console.timeEnd('a') && console.timeLog('a')

```js
console.time('a');
let a = 1;
console.timeLog('a');
let b = 2;
console.timeLog('a');
let c = 3;
console.timeEnd('a');
```

* 打印对象信息:console.table();

```js
let content = [
    {'short': 'Js', 'long': 'Javascript'},
    {'short': 'CSS', 'long': 'Cascading Style Sheets'},
    {'short': 'HTML', 'long': 'HyperText Markup Language'},
];
console.table(content);
```

* 打印信息组：console.group() && console.groupEnd()

```js
console.group('a');
console.info('信息1');
console.info('信息2');
console.groupEnd('a');
console.group('b')
console.info('信息3');
console.info('信息4');
console.groupEnd('b');
```

* console.dir(): 将DOM结点以JavaScript对象的形式输出到控制台

```js
console.dir(document.getElementsByTagName('div')[0])
```

#### $家族

* `$0`
    在Elements 面板中，$0 是当前我们选中的 html 节点的引用, 同样$1~$4代表依次向前寻找当前选中dom的上一次选中
* `$` 和 `$$`
    如果你没有在 App 中定义过 $ 变量 (例如 jQuery )的话，它在 console 中就是document.querySelector 的别名
    而$$不仅执行 document.QuerySelectorAll 并且它返回的是：一个节点的 数组 ，而不是一个 Node list
* `$_`
    对上一次执行结果的引用

### 资源模块：Sources

* 添加条件断点: 只有符合条件时，才会触发断点
* watch: 监听指定变量的值的变化
* call Stack: 查看断点的调用栈
* 编辑源文件并同步到本地文件：FileSystem

### 请求模块：Network

#### DOMContentLoaded事件 和 Load事件的区别

结合DOM文档加载的加载步骤，DOMContentLoaded事件/Load事件触发时机如下

* 解析HTML结构。
* 加载外部脚本和样式表文件。
* 解析并执行脚本代码。// 部分脚本会阻塞页面的加载
* DOM树构建完成。//DOMContentLoaded 事件:页面文档完全加载并解析完毕之后
* 加载图片等外部文件。
* 页面加载完毕。//load 事件:所有资源加载完成后

#### 查看资源请求的上/下游

按时shift键，鼠标hover在请求上，可以查看请求的上游和下游
绿色请求表示谁触发了hover请求
红色请求表示hover请求触发了什么请求

#### 筛选请求

* `domain`：筛选出指定域名的请求，不仅支持自动补全，还支持*匹配。
* `has-response-header`：筛选出包含指定响应头的请求。
* `is`：通过is:running找出WebSocket请求。
* `larger-than`：筛选出请求大于指定字节大小的请求，其中1000表示1k。
* `method`：筛选出指定HTTP方法的请求，比如GET请求、POST请求等。
* `mime-type`：筛选出指定文件类型的请求。
* `scheme`：筛选出指定协议的请求，比如scheme:http、scheme:https。
* `set-cookie-domain`：筛选出指定cookie域名属性的包含Set-Cookie的请求。
* `set-cookie-name`：筛选出指定cookie名称属性的包含Set-Cookie的请求。
* `set-cookie-value`：筛选出指定cookie值属性的包含Set-Cookie的请求。
* `status-code`：筛选出指定HTTP状态码的请求。

### 性能分析模块：Performance

谷歌性能测试地址: [https://googlechrome.github.io/devtools-samples/jank/](https://googlechrome.github.io/devtools-samples/jank/)

![性能面板](https://tva1.sinaimg.cn/large/006y8mN6ly1g7po44sb31j31z40p6wqc.jpg)

#### 区域1：控制面板

`Screenshots` 截图: 默认勾选，每一帧都会截图。
`Memory` 内存消耗记录：勾选后可以看到各种内存消耗曲线

#### 区域2：概览面板

##### 1、Fps: 页面每秒帧数

Fps = 60 性能极佳
Fps < 24 会让用户感觉到卡顿，因为人眼的识别主要是24帧

红色：意味着帧数已经下降到影响用户体验的程度，chrome已经帮你标注了，这块有问题
绿色：其实就是Fps指数，所有绿色柱体高度越高，性能越好

##### 2、CPU: 处理各个任务花费的时间

* `Scripting` 脚本
* `Rendering` 渲染
* `Painting` 绘制
* `Loading` 加载
* `ldle` 闲置

##### 3、NET: 各个请求花费时间

可以将屏幕逐帧录制下来，帮助观察页面的状态
主要用处: 可以帮助分析首屏渲染速度

#### 区域3：线程面板

##### 1、Frames：帧线程

##### 2、Main：主线程

一个长条一个事件，颜色和区域4中代表的事件类型一致

#### 区域4：统计面板

统计面板选择因点击选择不同的目标统计的内容不同

* `Summary` : 统计图
    展示各个事件阶段耗费的时间
* `Bottom-Up` : 排序
    可以看到各个事件消耗时间排序
    `self-time`: 除去子事件这个事件本身消耗的时间
    `total-time`: 这个事件从开始到结束消耗的时间（包含子事件）
* `Call Tree` : 调用栈
    Main选择一个事件，可以看到整个事件的调用栈（从最顶层到最底层，而不是只有当前事件）
* `Event Log` : 事件日志
    `start time`: 指事件在多少毫秒开始触发的，右边有事件描述信息

#### 开启性能监控

[chrome://flags/#enable-devtools-experiments](chrome://flags/#enable-devtools-experiments)

### More Tools

* 监控页面的重绘：Rendering -> Paint flashing
* 监控并统计没有使用的脚本：Coverage -> 标红部分
* 模拟终端：User-Agent
* 阻止某些资源的加载：Request blocking -> 匹配正则

### 参考链接

* [https://juejin.im/post/5cd15712e51d453a393af4c5](https://juejin.im/post/5cd15712e51d453a393af4c5)
* [https://juejin.im/entry/57e3a6c7a0bb9f0058275df0](https://juejin.im/entry/57e3a6c7a0bb9f0058275df0)
* [http://www.bubuko.com/infodetail-2139139.html](http://www.bubuko.com/infodetail-2139139.html)
* [https://www.cnblogs.com/hellotyc/p/7111518.html](https://www.cnblogs.com/hellotyc/p/7111518.html)
* [https://juejin.im/entry/579edf5fc4c971005adf47fe](https://juejin.im/entry/579edf5fc4c971005adf47fe)
* [https://umaar.com/dev-tips/](https://umaar.com/dev-tips/)
