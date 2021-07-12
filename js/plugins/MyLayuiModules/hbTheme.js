// 更换主题皮肤
layui.define(function (exports) {
  var $ = layui.jquery;
  var hb_theme = {
    init: function () {
      var themeClass = this.getData("themeClass") || "index-black-theme";
      this.skin(themeClass);
      this.setTheme();
    },
    setTheme: function () {
      var that = this;
      $(".theme-change").click(function () {
        var className = $(this).attr("skin") || "index-black-theme";
        that.skin(className);
      });
    },
    skin: function (themeClass) {
      var className = "layui-layout-body ";
      $("body").attr("class", className + themeClass);
      this.setData("themeClass", themeClass);
    },
    setData: function (key, val) {
      if (window.localStorage) {
        var localDb = window.localStorage;
        localDb[key] = val;
      } else {
        alert("当前浏览器不支持localStorage存储");
      }
    },
    getData: function (key) {
      if (window.localStorage) {
        var localDb = window.localStorage;
        return localDb[key];
      } else {
        alert("当前浏览器不支持localStorage存储");
      }
    },
  };

  exports("hbTheme", hb_theme);
});
