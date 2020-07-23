/**
 * 评论请求模块
 */

import request from '@/utils/request'

/**
 *  获取文章列表
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

/**
 * 评论回复点赞
 */

export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}
/**
 * 取消回复点赞
 */
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: ` /app/v1_0/comment/likings/${commentId}`
  })
}

/**
 *  发布评论
 */

export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
