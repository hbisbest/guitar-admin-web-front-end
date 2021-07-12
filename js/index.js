$(function () {
  // 隐藏左侧菜单
  $(".nav-hidden").click(function () {
    $(".layui-layout-admin").toggleClass("showMenu");
    var showFlag = $(".layui-layout-admin").hasClass("showMenu");
    if (showFlag) {
      // 隐藏左侧菜单状态
      $("#showSide").removeClass("layui-icon-shrink-right");
      $("#showSide").addClass("layui-icon-spread-left");
    } else {
      // 未隐藏左侧菜单状态
      $("#showSide").removeClass("layui-icon-spread-left");
      $("#showSide").addClass("layui-icon-shrink-right");
    }
  });

  // 搜索框获得焦点
  $("#searchInput").focus(function () {
    var inputSearch = $(this);
    //var placeholder = inputSearch.attr("placeholder");
    var txt = inputSearch.val();
    if (txt == "") {
      inputSearch.attr("placeholder", "");
    }
  });

  // 搜索框失去焦点
  $("#searchInput").blur(function () {
    var inputSearch = $(this);
    var txt = inputSearch.val();
    if (txt == "") {
      inputSearch.attr("placeholder", "请输入搜索内容");
    }
  });

  // 点击搜索
  $("#searchIcon").click(function () {
    var txt = $("#searchInput").val();
    if (txt == "") {
      // todo:换成layui的弹层
      alert("搜索内容为空，无法进行搜索");
    } else {
      // todo:搜索功能
      alert(txt);
    }
  });

  // 回车触发搜索功能（当文本框没焦点时就算按回车也不会触发这个事件）
  $("#searchInput").keyup(function (event) {
    // 是否回车
    if (event.keyCode == "13") {
      var txt = $("#searchInput").val();
      if (txt == "") {
        // todo:换成layui的弹层
        alert("搜索内容为空，无法进行搜索");
      } else {
        // todo:搜索功能
        alert(txt);
      }
    }
  });
});
