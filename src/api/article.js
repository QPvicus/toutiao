/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 *
 */

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 根据id 获取文章
 */

export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏文章
 */

export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

/**
 * 不喜欢文章
 */

export const addDisLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消不喜欢文章
 */
export const deleteDislike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}

/**
 * 获取指定用户文章
 */
export const getArticleByUser = (userId, params) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}

/**
 *  获取用户文章
 */
export const getUserArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/articles',
    params
  })
}

/**
 *  获取用户收藏
 */
export const getArticleCollect = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/article/collections',
    params
  })
}

/**
 *  获取用户历史
 */
export const getArticleHistories = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/histories',
    params
  })
}
