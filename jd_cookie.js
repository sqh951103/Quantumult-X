const cookieName = '京东账号'
const cookieKey = 'cookie_jd'
const jdCookie = $request.headers['Cookie']

if (jdCookie) {
  if ($prefs.valueForKey(cookieKey) !== undefined) {
    if ($prefs.valueForKey(cookieKey) !== jdCookie) {
      var cookie = $prefs.setValueForKey(jdCookie, cookieKey)
      if (!cookie) {
        $notify("更新" + cookieName + "Cookie失败！", "", "")
      } else {
        $notify("更新" + cookieName + "Cookie成功！", "", "")
      }
    }
  } else {
    var cookie = $prefs.setValueForKey(jdCookie, cookieKey)
    if (!cookie) {
      $notify("首次写入" + cookieName + "Cookie失败！", "", "")
    } else {
      $notify("首次写入" + cookieName + "Cookie成功！", "", "")
    }
  }
}

$done({})