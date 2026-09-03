const unlockInit = `(function () {
  try {
    if (document.cookie.indexOf('ow_unlock=') !== -1) {
      document.documentElement.dataset.owUnlock = '1'
    }
  } catch (e) {}
})()`

export function UnlockScript() {
  return <script dangerouslySetInnerHTML={{ __html: unlockInit }} />
}
