class FormikHelper {
  static isDisabled (props) {
    return props.isSubmitting || !props.isValid
  }
}

export default FormikHelper