/* ============
 * Model
 * ============
 *
 * The base model.
 *
 * Model are used to map the data
 * and help in avoiding code repetition
 * For instance,
 * if we need to get user full name by joining first and last name
 * or if we want to manipulate user dates
 * we can write a function
 */
import moment from 'moment'
import _ from 'lodash'

class Model {
  dateFields = [
    'createdAt',
    'updatedAt',
    'deletedAt'
  ]

  constructor (props) {
    this.initialize(props || {})
  }

  minutes = () => {
    return 5
  }

  initialize(props) {
    this.id = props.id && Number(props.id) || null
    _.map(props, (value, property) => {
      if (this.dateFields.indexOf(property) !== -1) {
        this[property] = value && moment(value) || null
      } else {
        this[property] = value
      }
    })
  }

  toJson () {
    const props = Object.assign({}, this)

    _.forOwn(props, (value, key) => {
      if (value instanceof moment) {
        props[key] = value.format('YYYY-MM-DD HH:mm:ss')
      }
    })
    return props
  }

  serverDate (date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date instanceof moment ? date.format(format) : date
  }

  shouldLoad (type = false) {
    const field = type ? type + 'Loaded' : 'loaded'
    const loaded = this[field]
    if (!loaded) {
      return true
    }
    let duration = moment.duration(moment().diff(loaded))
    let minutes = duration.asMinutes()
    return minutes > this.minutes
  }
}

export default Model
