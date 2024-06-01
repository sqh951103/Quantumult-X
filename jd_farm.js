const cookieKey = 'cookie_jd'
const jdCookie = $prefs.valueForKey(cookieKey)

const url = 'https://api.m.jd.com/client.action'

const body = 'functionId=initForFarm&body=%7B%7D&appid=wh5&clientVersion=9.0.0'
const headers = {
  'Cookie': jdCookie,
  'Content-Type': 'application/x-www-form-urlencoded',
}

const request = {
  url: url,
  method: 'POST',
  headers: headers,
  body: body
}

$task.fetch(request).then(response => {
  const data = JSON.parse(response.body)
  if (data.code === '0') {
    console.log('初始化农场成功！')
    doTasks()
  } else {
    console.log('初始化农场失败：' + data.msg)
  }
}, reason => {
  console.log('初始化农场失败：' + reason.error)
})

function doTasks() {
  const tasks = [
    { functionId: 'signin', body: {} },
    { functionId: 'queryMaterial', body: {} },
    { functionId: 'waterGoodForFarm', body: {} },
    { functionId: 'signReward', body: {} }
  ]

  tasks.forEach(task => {
    const body = 'functionId=' + task.functionId + '&body=' + encodeURIComponent(JSON.stringify(task.body)) + '&appid=wh5&clientVersion=9.0.0'
    const request = {
      url: url,
      method: 'POST',
      headers: headers,
      body: body
    }

    $task.fetch(request).then(response => {
      const data = JSON.parse(response.body)
      if (data.code === '0') {
        console.log(task.functionId + '任务完成！')
      } else {
        console.log(task.functionId + '任务失败：' + data.msg)
      }
    }, reason => {
      console.log(task.functionId + '任务失败：' + reason.error)
    })
  })
}