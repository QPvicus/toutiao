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
