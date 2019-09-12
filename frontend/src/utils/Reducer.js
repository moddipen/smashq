export default class Reducer {
  /**
   * @param state
   * @param parentId
   * @param field
   * @param itemId
   * @returns {*}
   */
  static addItem (state, parentId, field, itemId) {
    return Reducer.addItems(state, parentId, field, [itemId])
  }

  /**
   * @param state
   * @param parentId
   * @param field
   * @param itemIds
   * @returns {*}
   */
  static addItems (state, parentId, field, itemIds) {
    let item = state[parentId]
    if (!item) {
      return state
    }
    const items = item[field] instanceof Array ? [...item[field], ...itemIds] : itemIds
    const itemObject = {
      [parentId]: {...item, [field]: items}
    }
    return Object.assign({}, state, itemObject)
  }

  /**
   * 
   * @param {*} state 
   * @param {*} data 
   * @param {*} entityName 
   * @param {*} loaded 
   */
  static addNormalized(state, data, entityName, loaded = false) {
    if (loaded) {
      _.map(data.entities[entityName], entity => {
        if (typeof loaded === 'string' || loaded instanceof String) {
          entity[loaded] = moment()
        } else {
          entity.loaded = moment()
        }
      })
    }
    return _.assign({}, state, data.entities[entityName])
  }

  /**
   * 
   * @param {*} state 
   * @param {*} payload 
   */
  static remove (state, payload) {
    if (payload.ids) {
      return _.omit(state, payload.ids)
    } else if (payload.id) {
      return _.omit(state, payload.id)
    }
    return state
  }

  /**
   * 
   * @param {*} state 
   * @param {*} parentId 
   * @param {*} field 
   * @param {*} itemId 
   */
  static removeItem (state, parentId, field, itemId) {
    return Reducer.removeItems(state, parentId, field, [parseInt(itemId)])
  }
    
  /**
   * 
   * @param {*} state 
   * @param {*} parentId 
   * @param {*} field 
   * @param {*} itemIds 
   */
  static removeItems (state, parentId, field, itemIds) {
    let item = state[parentId]
    if (!item) {
      return state
    }
    const items = _.filter(item[field], itemId => {
      return itemIds.indexOf(itemId) === -1
    })
    const itemObject = {
      [parentId]: {...item, [field]: items}
    }
    return Object.assign({}, state, itemObject)
  }
}