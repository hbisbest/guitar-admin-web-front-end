// 右键Tab操作多Tab功能组件
layui.define(["element", "layer"], function (exports) {
  var $ = layui.jquery;
  var element = layui.element;
  var layer = layui.layer;
  var rightClickTabHtml =
    "<div class='hb-right-tab-menu none'><table class='layui-tab dblclick-tab'>" +
    "<tr class='hb-tab-refresh'><td><i class='layui-icon layui-icon-refresh'></i>刷新当前页面</td></tr>" +
    "<tr class='hb-tab-close'><td><i class='layui-icon layui-icon-close-fill'></i>关闭当前页面</td></tr>" +
    "<tr class='hb-tab-close-other'><td><i class='layui-icon layui-icon-close'></i>关闭其他页面</td></tr>" +
    "<tr class='hb-tab-close-all'><td><i class='layui-icon layui-icon-close'></i>关闭所有页面</td></tr>";
  var hb_rightClickTab = {
    // 初始化
    init: function (isClose) {
      this.contextMenu(".index-tab .layui-tab-title li");
      this.mouseDown(".index-tab .layui-tab-title li", this.rightClickTab);
      this.setFirstTabClose(isClose);
      this.closeTipsForClickBody();
      this.refreshInTips();
      this.closeCurrentPageInTips();
      this.closeOtherPagesInTips();
      this.closeAllPagesInTips();
    },
    // 阻止右键事件默认的功能（一个默认的上下文菜单）
    contextMenu: function (selector) {
      $(document).on("contextmenu", selector, function () {
        return false;
      });
    },
    // 右键点击事件（点击不抬起就会触发）
    mouseDown: function (selector, callBack) {
      $(document).on("mousedown", selector, function (e) {
        // 判断点击的是否右键
        if (e.which == 3) {
          // apply这个方法是什么意思，表示调用callBack参数这个方法吗？其中传入的this代表哪个，document还是element？第二个参数又代表什么？
          console.log("callBack.apply方法的this：", this);
          callBack.apply(this, null);
        }
      });
    },
    // 右键显示选项卡
    rightClickTab: function () {
      // 判断右键的Tab是否首页选项卡
      // 这个this是不是指mouseDown方法的element参数？
      console.log("rightClickTab方法中$(this).index()的this：", this);
      if ($(this).index() > 0) {
        // 获得当前处于显示状态的Tab的lay-id
        var openLayId = $(".index-tab .layui-this").attr("lay-id");
        // 获得右键的Tab的lay-id
        var selLayId = $(this).attr("lay-id");
        // 判断右键的Tab是不是当前处于显示状态的Tab，如果不是则需要切换至右键的Tab，使其处于当前显示状态
        if (openLayId != selLayId) {
          element.tabChange("index-tab-filter", selLayId);
        }
        // 显示操作多Tab的上下文菜单
        layer.tips(rightClickTabHtml, $(this), {
          tips: [1, "#009f95"],
          time: false,
        });
      }
    },
    // 设置第一个Tab能否关闭
    setFirstTabClose: function (isClose = false) {
      // 默认不能关闭
      if (!isClose) {
        $(".index-tab .tab-home").find("i.layui-tab-close").hide();
      }
    },
    // 点击页面关闭tips
    closeTipsForClickBody: function () {
      // 是不是不需要这个body？
      $(document).on("click", "body", function () {
        layer.closeAll("tips");
      });
    },
    // tips中“刷新当前页面”
    refreshInTips: function () {
      $(document).on("click", ".hb-tab-refresh", function () {
        // 获得页面主体
        var iframe = $(".layui-tab-content .layui-show iframe");
        // 刷新当前页
        iframe.attr("src", iframe.attr("src"));
      });
    },
    // tips中“关闭当前页面”
    closeCurrentPageInTips: function () {
      var _this = this;
      $(document).on("click", ".hb-tab-close", function () {
        var lay_id = $(".index-tab .layui-this").attr("lay-id");
        element.tabDelete("index-tab-filter", lay_id);
        _this.delNavItemToTab(lay_id);
      });
    },
    // tips中“关闭其他页面”
    closeOtherPagesInTips: function () {
      var _this = this;
      $(document).on("click", ".hb-tab-close-other", function () {
        var lay_id = $(".index-tab .layui-this").attr("lay-id");
        var tabs = $(".index-tab .layui-tab-title li");
        tabs.each(function () {
          var layId = $(this).attr("lay-id");
          if (layId != lay_id && layId != 0) {
            element.tabDelete("index-tab-filter", layId);
            _this.delNavItemToTab(layId);
          }
        });

        // 或者这样写
        // $(".index-tab .layui-this").siblings("li").each(function(index, item) {
        //     // 判断不是首页Tab的进行删除
        //     if($(item).index() > 0) {
        //         var layId = $(item).attr("lay-id");
        //         element.tabDelete('index-tab-filter', layId);
        //         _this.delNavItemToTab(layId);
        //     }
        // });
      });
    },
    // tips中“关闭所有页面”
    closeAllPagesInTips: function () {
      var _this = this;
      $(document).on("click", ".hb-tab-close-all", function () {
        var tabs = $(".index-tab .layui-tab-title > li");
        tabs.each(function () {
          var layId = $(this).attr("lay-id");
          if (layId != 0) {
            element.tabDelete("index-tab-filter", layId);
            _this.delNavItemToTab(layId);
          }
        });

        // 或者这样写
        // $(".index-tab .layui-tab-title > li").each(function(index, item) {
        //     // 判断不是首页Tab的进行删除
        //     if($(item).index() > 0) {
        //         var layId = $(item).attr("lay-id");
        //         element.tabDelete('index-tab-filter', layId);
        //         _this.delNavItemToTab(layId);
        //     }
        // });
      });
    },
    // 关闭选项卡时关联删除左侧菜单项上的tab-layid属性
    delNavItemToTab: function (id) {
      $("#nav-tab-id-" + id).removeAttr("tab-layid");
    },
  };

  exports("hbRightClickTab", hb_rightClickTab);
});
