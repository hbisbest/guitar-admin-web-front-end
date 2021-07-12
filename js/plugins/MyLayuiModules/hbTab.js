// 自定义Tab
layui.define(["element"], function (exports) {
  var element = layui.element;
  var $ = layui.jquery;
  var hb_tab = {
    init: function () {
      $(".hb-tab-add").click(function () {
        var navItem = $(this);
        var page_url = navItem.attr("data-href");
        var title = navItem.html();
        var lay_id = navItem.attr("tab-layid");
        if (lay_id) {
          // 导航项对应的Tab已存在
          hb_tab.changeTab(lay_id);
        } else {
          // 导航项对应的Tab不存在
          var id = navItem.attr("data-id");
          navItem.attr("tab-layid", id);
          navItem.attr("id", "nav-tab-id-" + id);
          var lay_id = navItem.attr("tab-layid");
          hb_tab.addTab(title, page_url, lay_id);
        }
        // 为什么要调用这个方法？
        hb_tab.winResize();
      });
    },
    addTab: function (title, pageUrl, layId) {
      // 不知已存在的Tab调用这个方法会怎样
      element.tabAdd("index-tab-filter", {
        title: title,
        content: "<iframe class='index-iframe' src='" + pageUrl + "'></iframe>",
        id: layId,
      });
      hb_tab.changeTab(layId);
    },
    delTab: function (layId) {
      // 删除指定的Tab
      element.tabDelete("index-tab-filter", layId);
      // 删除对应导航项的tab-layid属性
      var item = $("#nav-tab-id-" + layId);
      if (item) {
        item.removeAttr("tab-layid");
      }
    },
    changeTab: function (layId) {
      // 切换到指定的Tab
      element.tabChange("index-tab-filter", layId);
    },
    winResize: function () {
      // 监听浏览器窗口改变事件
      $(window)
        .on("resize", function () {
          var bodyHeight = $(".layui-body").height();
          // 这是为何？
          $(".layui-tab-content iframe").height(bodyHeight - 116);
        })
        .resize();
    },
  };

  exports("hbTab", hb_tab);
});
