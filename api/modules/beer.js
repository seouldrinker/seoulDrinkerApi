import Beer from '../models/beer'

function _filteredBeerList (name) {
  let beerList = Beer.find({is_ok: 1})
  if (name) {
    beerList = Beer.find({is_ok: 1, $or: [
      {
        eng_name: {
          $regex: '.*' + name + '.*',
          $options: 'i'
        }
      }, {
        kor_name: {
          $regex: '.*' + name + '.*',
          $options: 'i'
        }
      }
    ]})
  }
  return beerList
}

export function getBeerList (name) {
  return _filteredBeerList(name).sort({crt_dt: -1})
    .exec((err, beerList) => {
    if (err) {
      return null
    }
    return beerList
  })
}

export function getBeerDetail (id) {
  if (id.length !== 24) {
    return null
  }

  return Beer.findOne({is_ok: 1, _id: id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, beer) => {
    if (err) {
      return null
    }
    return beer
  })
}