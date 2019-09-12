import { REQUEST } from "../modules/web/store/action-types";

/**
 * @property {string}  type The REQUEST type used for calling the saga.
 * @property {string}  typeAction The request's type.
 * @property {string}  method The method of the request (get, post, etc.).
 * @property {string}  path The path of the request.
 * @property {object}  data The data passed to the request.
 * @property {string}  successAction The action type dispatched on success.
 * @property {string}  errorAction The action type dispatched on error.
 * @property {array} additionalSuccessActions Additional actions to be fired on success
 * @property {Function}  successCallback A callback called on success.
 * @property {Function}  errorCallback A callback called on error.
 * @property {boolean} showSuccessNotification Show notification message on success?
 * @property {boolean} showErrorNotification Show notification message on error?
 */
class AsyncRequest {
  constructor(props) {
    if (props === undefined) {
      props = {};
    }

    this.type = REQUEST;
    this.action = props.action || "";
    this.method = props.method || "get";
    this.path = props.path || "";
    this.data = props.data || {};
    this.successAction = props.successAction || `${this.action}_SUCCESS`;
    this.additionalSuccessActions = props.additionalSuccessActions || [];
    this.errorAction = props.errorAction || `${this.action}_ERROR`;
    this.successCallback = props.onSuccess || null;
    this.errorCallback = props.onError || null;
    this.normalize = props.normalize || null;
    this.responseField = props.responseField || "data";
    this.showSuccessNotification =
      props.showSuccessNotification !== undefined
        ? props.showSuccessNotification
        : true;
    this.showErrorNotification =
      props.showErrorNotification !== undefined
        ? props.showErrorNotification
        : true;
  }

  addAdditionalSuccessAction(action) {
    this.additionalSuccessActions.push(action);
  }

  toSimpleObject() {
    return {
      type: this.type,
      action: this.action,
      method: this.method,
      path: this.path,
      data: this.data,
      normalize: this.normalize,
      responseField: this.responseField,
      successAction: this.successAction,
      errorAction: this.errorAction,
      successCallback: this.successCallback,
      errorCallback: this.errorCallback,
      showSuccessNotification: this.showSuccessNotification,
      showErrorNotification: this.showErrorNotification,
      additionalSuccessActions: this.additionalSuccessActions
    };
  }

  /**
   * @param {string} action
   * @param {string} path
   * @param {string} method
   * @param {object} data
   * @param {Function} onSuccess
   * @param {Function} onError
   * @param {boolean} showSuccessNotification
   * @param {boolean} showErrorNotification
   * @param {?string} successAction
   * @param {?string} errorAction
   */
  static createRequest(
    action,
    path,
    method = "get",
    data = {},
    onSuccess = null,
    onError = null,
    showSuccessNotification = true,
    showErrorNotification = true,
    successAction = null,
    errorAction = null
  ) {
    return new AsyncRequest({
      action,
      path,
      method,
      data,
      successCallback: onSuccess,
      errorCallback: onError,
      showSuccessNotification,
      showErrorNotification,
      successAction,
      errorAction
    });
  }

  /**
   * @param {string} action
   * @param {string} path
   * @param {string} method
   * @param {object} data
   * @param {Function} onSuccess
   * @param {Function} onError
   * @param {boolean} showSuccessNotification
   * @param {boolean} showErrorNotification
   * @param {?string} successAction
   * @param {?string} errorAction
   */
  static createSimpleRequest(
    action,
    path,
    method = "get",
    data = {},
    onSuccess = null,
    onError = null,
    showSuccessNotification = true,
    showErrorNotification = true,
    successAction = null,
    errorAction = null
  ) {
    const request = AsyncRequest.createRequest(
      action,
      path,
      method,
      data,
      onSuccess,
      onError,
      showSuccessNotification,
      showErrorNotification,
      successAction,
      errorAction
    );
    return request.toSimpleObject();
  }

  /**
   *
   * @param action
   * @param props
   * @returns {{type, action, method, path, data, successAction, errorAction, successCallback, errorCallback, showSuccessNotification, showErrorNotification}}
   */
  static createSimpleRequestFromObject(action, props) {
    const request = new AsyncRequest({ ...props, action });
    return request.toSimpleObject();
  }
}

export default AsyncRequest;
