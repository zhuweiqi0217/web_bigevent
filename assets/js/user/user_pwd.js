$(function () {
  let form = layui.form
  let layer = layui.layer

  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) return '新旧密码不能一样!'
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) return '两次输入密码不一样'
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // DOM原生方法重置表单
        $('.layui-form')[0].reset()
        // 也可以通过调用重置按钮来实现
        // $('#btnReset').click()       // 通过调用 type="reset" 按钮
      }
    })
  })
})