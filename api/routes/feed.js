import express from 'express'
import bodyParser from 'body-parser'

import { insertFeed, updateFeed, deleteFeed, deleteFeedImage,
  getFeedList, getPubFeedList, getBeerFeedList } from '../modules/feed'
import { imageUpload } from '../middleware/image'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))


router.route('/').get(async (req, res, next) => {
  const results = await getFeedList(req)

  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
}).post(imageUpload, async (req, res, next) => {
  const results = await insertFeed(req)
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})


router.get('/pub/:pub_id', async (req, res, next) => {
  const results = await getPubFeedList(req.params.pub_id)

  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})


router.get('/beer/:beer_id', async (req, res, next) => {
  const results = await getBeerFeedList(req.params.beer_id)

  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})


router.route('/:feed_id').put(imageUpload, async (req, res, next) => {
  const results = await updateFeed(req)
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
}).delete(async (req, res, next) => {
  const results = await deleteFeed(req.params.feed_id)
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})


router.delete('/image/:feedImage_id', async (req, res, next) => {
  const results = await deleteFeedImage(req.params.feedImage_id)
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})

export default router
