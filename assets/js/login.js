$(function () {
  // 点击"去注册账号"的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击"去登录"的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从 layui 中获取 form 对象
  let form = layui.form
  let layer = layui.layer
  // 通过 form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 的校验规则
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
    ],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致!'
      }
    }
  })
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1.先阻止表单的默认提交行为
    e.preventDefault()
    // 2.发起post请求
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data,
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 模拟人的点击行为
        $('#link_login').click()
      }
    })
  })
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    // 阻止表单的默认提交行为
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/login',
      // 快速获取表单中的数据
      data:$(this).serialize(),
      success(res){
        if(res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // console.log(res.token)
        // 将登陆成功得到的 token 字符串,保存到 localStorage 中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        // location.href = 'index.html'
      }
    })
  })
})