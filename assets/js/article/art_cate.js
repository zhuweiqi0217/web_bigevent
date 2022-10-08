$(function () {
  let layer = layui.layer
  let form = layui.form
  initArtCateList()

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success(res) {
        // console.log(res)
        if(res.status !== 0) return layer.msg(res.message)
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加类别按钮绑定点击事件
  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  // 通过代理的形式,为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    // console.log(e)
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $('#form-add').serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        initArtCateList()
        // 根据索引关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  // 通过代理的形式, 为 btn-edit 按钮绑定点击事件
  let indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    // console.log('ok')
    // 弹出一个修改文字分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    let id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success(res) {
        // console.log(res)
        if (res.status !== 0) return layer.msg(res.message)
        // layer.msg(res.message)
        form.val('form-edit', res.data)
      }
    })
  })

  // 通过代理的形式,为 form-edit 表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    // console.log(e)
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        initArtCateList()
        // 根据索引关闭对应的弹出层
        layer.close(indexEdit)
      }
    })
  })

  // 为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-del', function () {
    const result = confirm('您确认要删除吗? ')
    let id = $(this).attr('data-id')
    if (result) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success(res) {
          if (res.status !== 0) return layer.msg(res.message)
          layer.msg(res.message)
          initArtCateList()
        }
      })
    }
  })
})