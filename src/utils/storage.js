/**
 *  本地存储封装模块
 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 判断data 是否为JSON格式
  try {
    return JSON.parse(data)
  } catch (err) {
    // 不是JSON直接返回即可
    return data
  }
}

export const setItem = (name, value) => {
  //如果value是对象，先基于JSON处理在存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
