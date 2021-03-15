# super-i18n
jquery 插件，用于i18n翻译网站各个语言

# jquery.super-i18n.js

---

一个基于jQuery的轻量级的超实用国际化(i18n)插件。

- 支持根据设置默认语言
- 支持切换语言
- 支持使用json文件存储翻译内容
- 支持翻译js中的文字内容
- 支持对标签配置需要翻译的对象；i18n-only="title,value"
 


可以根据用户自定义的不同语言版本的json文件，按需渲染网页上的语言，实现国际化。

## 安装

您可以到 https://github.com/jasonLaw1015/super-i18n.git 下载最新版本

在项目中先引入jQuery文件：
```JS
<script src="jquery.js"></script>
```
然后在jQuery之后引入jquery.super-i18n.js：
```JS
<script src="jquery.super-i18n.js"></script>
```

## 使用方法
> 注意！请在服务器端运行该程序。因为 XMLHttpRequest cannot load file:xxx.

首先在项目中新建 `i18n` 文件夹，在此文件夹下放置不同语言版本的 `i18n_xx.json` 语言文件。（您也可以自定义文件名的开头和结尾如BaiduCnLang.js，下面的示例中以i18n_为文件名开头）

在需要使用国际化功能的DOM结构处引入i18n属性（i18n中的value为语言文件中key，可自定义）：
```HTML
<div i18n="i18n.test">multi-language</div>
<div i18n="i18n.test2">internationalization</div>
```

接着只需在语言文件中增加内容。
例如中文版的语言文件命名为 `i18n_cn.json`，英文版的语言文件命名为 `i18n_en.json`：

`i18n_cn.json`：
```
{
    "i18n.test": "多语言",
    "i18n.test2": "国际化"
}
```

与之对应的翻译文件 `i18n_en.json`：
```
{
    "i18n.test": "multi-language",
    "i18n.test2": "internationalization"
}
```


最后在脚本中执行如下方法，初始化该插件。
```JS
$("[i18n]").i18n({
    defaultLang: "en",
    filePath: "/i18n/", //注意！要配置好语言文件的正确路径
    filePrefix: "i18n_",
    fileSuffix: "",
    forever: true,
    callback: function() {
    }
});
```

## 配置

#### defaultLang
```JS
defaultLang: defaultLang,
```
默认语言名称，插件会自动将 `filePrefix`+`defaultLang`+`fileSuffix` 拼接在一起作为语言文件文件名。

#### filePath
```JS
filePath: "/i18n/",
```
该参数指定了语言文件所在文件夹在项目中的位置。

#### filePrefix
```JS
filePrefix: "i18n_",
```
该参数指定了语言文件的命名的前缀。

#### fileSuffix
```JS
fileSuffix: "",
```
该参数指定了语言文件的命名的后缀。

#### callback
```javascript
callback:function(){
    //do something
}
```

## i18nOnly
默认会将HTML元素的placeholder、value、html一起进行翻译替换，如果您只需要替换其中一个，可以在HTML标签中声明 `i18nOnly` 属性;
`i18nOnly`接受字符串，需要多个时，请用英文都好隔开，如  `title,value`;

如 需要翻译标签里面的属性title 和标签里面的值，像这样写既可
```html
<li title="去添加购物车" i18n-only="title,value" i18n="index.addCart">
      我是购物车
</li>
```
```html
<input i18n="i18n.test" i18n-only="placeholder" placeholder="多语言"></input>
```
## js中使用
只需要在你需要的翻译的文字上用，$.i18nget(key)替换它即可
```js
  function emailCheck(val) {
      var emailStr = val;
      var emailPat = /^(.+)@(.+)$/;
      var matchArray = emailStr.match(emailPat);
      if (matchArray == null) {
        // layer.msg('电子邮件地址必须包括 ( @ 和 . )');
        alert($.i18nGet('login.emailCheckMsg'));
        return false;
      }
      return true;
    }
```
## 贡献者

- [jasonlaw1015][1]


  [1]: https://github.com/jasonLaw1015

## 参考插件
https://github.com/T-baby/jquery.i18n
