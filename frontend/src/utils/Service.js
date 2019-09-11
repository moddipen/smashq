import Http from './Http'
import Transformer from './Transformer'
import _ from 'lodash'

export default class Service {
  static requestAsync (url, method, params = {}) {
    const httpMethod = method === 'postForm' ? 'post' : method
    let data = {}
    if (method === 'postForm') {
      let formData = new FormData()
      _.map(params, (value, name) => {
        formData.append(name, value)
      })
      data = formData
    } else {
      data = Transformer.send(params)
    }
    return new Promise((resolve, reject) => {
      Http({
        method: httpMethod,
        url: url,
        data: data
      }).then(response => {
        const data = Transformer.fetch(response.data)
        if (data.success) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}