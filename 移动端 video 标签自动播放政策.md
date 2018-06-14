Html.HiddenFor() 可能会有页面信息缓存，提交过表单之后还是提交之前的数据，无论有没有在 Controller 中进行修改

# 移动端 video 标签自动播放政策
---
[参考](https://webkit.org/blog/6784/new-video-policies-for-ios/)

*animated GIFs*
 动态图片的对宽带的消耗很大，

*We’ve found that GIFs can be up to twelve times as expensive in bandwidth and twice as expensive in energy use. GIFs*
消耗12倍的快带和2倍的性能
IOS9 播放之前需要用户的交互操作
*the `<video>` will enter fullscreen when starting playback.*
重播自动进入全屏

IOS10开始放宽 autoplay 政策

`<video autoplay> elements will now honor the autoplay attribute, for elements which meet the following conditions:`<br/>
`<video> elements will be allowed to autoplay without a user gesture if their source media contains no audio tracks.`<br/>
`<video muted> elements will also be allowed to autoplay without a user gesture.`
`If a <video> element gains an audio track or becomes un-muted without a user gesture, playback will pause.`<br/>
`<video autoplay> elements will only begin playing when visible on-screen such as when they are scrolled into the viewport, made visible through CSS, and inserted into the DOM.`<br/>
`<video autoplay> elements will pause if they become non-visible, such as by being scrolled out of the viewport.`<br/>
`<video> elements will now honor the play() method, for elements which meet the following conditions:`<br/>
`<video> elements will be allowed to play() without a user gesture if their source media contains no audio tracks, or if their muted property is set to true.`<br/>
`If a <video> element gains an audio track or becomes un-muted without a user gesture, playback will pause.`<br/>
`<video> elements will be allowed to play() when not visible on-screen or when out of the viewport.`<br/>
`video.play() will return a Promise, which will be rejected if any of these conditions are not met.`<br/>
`On iPhone, <video playsinline> elements will now be allowed to play inline, and will not automatically enter fullscreen mode when playback begins.`<br/>
`<video> elements without playsinline attributes will continue to require fullscreen mode for playback on iPhone.`<br/>
`When exiting fullscreen with a pinch gesture, <video> elements without playsinline will continue to play inline.`<br/>

`<video autoplay>` 符合以下条件时，会立刻执行 autoplay 属性:
`<video>` 资源数据不包含音轨，允许执行 autoplay。
`<video muted>` elements will also be allowed to autoplay without a user gesture.
`<video>` 如果增加音轨或者有声音没有用户互动，播放将会暂停。
`<video autoplay>` 在屏幕中可见或滑动到viewport中是才会自动开始播放。
`<video autoplay>` 不可见时将暂停播放。
`<video>` 符合以下条件时，将支持 play() 方法:
`<video>` 如果没有音轨或者 muted 属性设置为 true ，标签将支持 play() （不用用户互动）。
如果 `<video>` 标签包含音轨或者有声音，自动播放将会暂定。
`<video> elements will be allowed to play() when not visible on-screen or when out of the viewport.`
`video.play() will return a Promise, which will be rejected if any of these conditions are not met.`
在 iPhone 上 `<video playsinline>` 允许行内播放，不会自动进入全屏。
`<video>` 标签没有 playsinline 属性将继续在全屏模式下播放。
退出全屏 `<video>` 标签将继续在行内播放。

使用 video 代替 img 例子：

`<video autoplay loop muted playsinline>`
  `<source src="image.mp4">`
  `<source src="image.webm" onerror="fallback(parentNode)">`
  `<img src="image.gif">`
`</video>`

```javascript
function fallback(video)
{
  var img = video.querySelector('img');
  if (img)
    video.parentNode.replaceChild(img, video);
}
```


`On iOS 10, this provides the same user experience as using a GIF directly with graceful fallback to that GIF if none of the <video>‘s sources are supported. In fact, this code was used to show you that awesome GIF.`

`If your page design requires different behavior if inline playback is allowed vs. when fullscreen playback is required, use the -webkit-video-playable-inline media query to differentiate the two:`

```html
<div id="either-gif-or-video">
  <video src="image.mp4" autoplay loop muted playsinline></video>
  <img src="image.gif">
</div>
```

```css
#either-gif-or-video video { display: none; }
@media (-webkit-video-playable-inline) {
    #either-gif-or-video img { display: none; }
    #either-gif-or-video video { display: initial; }
}
```
`These new policies mean that more advanced uses of the <video> element are now possible, such as painting a playing <video> to a <canvas> without taking that <video> into fullscreen mode.`

```javascript
  var video;
  var canvas;

  function startPlayback()
  {
    if (!video) {
      video = document.createElement('video');
      video.src = 'image.mp4';
      video.loop = true;
      video.addEventListener('playing', paintVideo);
    }
    video.play();
  }

  function paintVideo()
  {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      document.body.appendChild(canvas);
    }
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    if (!video.paused)
      requestAnimationFrame(paintVideo);
  }
  ```

  ```html
<button onclick="startPlayback()">Start Playback</button> 
```

`The same technique can be used to render into a WebGL context. Note in this example that a user gesture–the click event–is required, as the <video> element is not in the DOM, and thus is not visible. The same would be true for a <video style="display:none"> or <video style="visibility:hidden">.`