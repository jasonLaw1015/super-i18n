/*!
 * jQuery super-i18n Plugin v1.0.0
 * https://github.com/jasonLaw1015/super-i18n
 *
 */

(function ($) {
  $.fn.extend({
    i18n: function (options) {
      var defaults = {
        lang: '',
        defaultLang: '',
        filePath: '/i18n/',
        filePrefix: 'i18n_',
        fileSuffix: '',
        forever: true,
        version: "1.0.0",
        callback: function () {},
      };

      function getCookie(name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
          var arr1 = arr[i].split('=');
          if (arr1[0] == name) {
            return arr1[1];
          }
        }
        return '';
      }

      function setCookie(name, value, myDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + myDay);
        document.cookie = name + '=' + value + '; expires=' + oDate;
      }

      var options = $.extend(defaults, options);

      if (
        getCookie('i18n_lang') != '' &&
        getCookie('i18n_lang') != 'undefined' &&
        getCookie('i18n_lang') != null
      ) {
        defaults.defaultLang = getCookie('i18n_lang');
      } else if (options.lang == '' && defaults.defaultLang == '') {
        throw 'defaultLang must not be null !';
      }

      if (options.lang != null && options.lang != '') {
        if (options.forever) {
          setCookie('i18n_lang', options.lang);
        } else {
          $.removeCookie('i18n_lang');
        }
      } else {
        options.lang = defaults.defaultLang;
      }

      var i = this;
      $.getJSON(
        options.filePath +
          options.filePrefix +
          options.lang +
          options.fileSuffix +
          '.json&='+
          options.version,
        function (data) {
          var i18nLang = {};
          if (data != null) {
            i18nLang = data;
          }
          //在js中使用 $.i18nGet(key)来翻译
          $.i18nGet = function (key) {
            if (i18nLang != {}) {
              if (i18nLang.hasOwnProperty(key)) return i18nLang[key];
            } else throw new Error('Call i18n(option) first');
          };

          $(i).each(function (i) {
            var _this = this;
            function translateVal() {
              if ($(_this).val() != null && $(_this).val() != '') {
                $(_this).val(i18nLang[$(_this).attr('i18n')]);
              }
            }
            function translateHtml() {
              if ($(_this).html() != null && $(_this).html() != '') {
                $(_this).html(i18nLang[$(_this).attr('i18n')]);
              }
            }

            function translateAttr(attrStr) {
              if (
                $(_this).attr(attrStr) != null &&
                $(_this).attr(attrStr) != ''
              ) {
                $(_this).attr(attrStr, i18nLang[$(_this).attr('i18n')]);
              }
            }

            // value,html,placeholder,title,...
            var i18nOnly = $(this).attr('i18n-only');
            //存在只更新一个值的
            if (i18nOnly) {
              // ['value', 'html','placeholder','title',...]
              var i18nOnlyArr = i18nOnly.split(',');

              i18nOnlyArr.map(only => {
                if (only == 'value') {
                  translateVal();
                } else if (only == 'html') {
                  translateHtml();
                } else {
                  //更新属性
                  translateAttr(only);
                }
              });
            } else {
              //正常有值的话，只会更新这三个值
              translateVal();
              translateHtml();
              translateAttr('placeholder');
            }
          });
          options.callback();
        },
      );
    },
  });
})(jQuery);
