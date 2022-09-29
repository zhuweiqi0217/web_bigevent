$(function () {
  let form = layui.form
  let layer = layui.layer

  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function(value){
      if(value === $('[name=oldPwd]').val()) return '新旧密码不能一样!'
    },
    rePwd: function(value){
      if(value !== $('[name=newPwd]').val()) return '两次输入密码不一样'
    }
  })
})