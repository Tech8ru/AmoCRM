import ResponseErrorHandler from './ResponseErrorHandler'

class EntityResponseErrorHandler extends ResponseErrorHandler {
  getErrorsData() {
    return this._response._embedded && this._response._embedded.errors
  }

  hasErrors() {
    const errors = this.getErrorsData()
    return Boolean(errors)
  }

  getFirstError() {
    const errors = this.getErrorsData()
    const errorsNamespace = Object.keys(errors)[0]
    const errorsList = errors[errorsNamespace]

    if (Array.isArray(errorsList)) {
      const [firstError] = errorsList
      const { message, code } = firstError

      return new Error(`${errorsNamespace} failed with code ${code}: ${message}`, code)
    }

    const firstErrorKey = Object.keys(errorsList)[0]
    const message = errorsList[firstErrorKey]

    return new Error(`${errorsNamespace} failed for key ${firstErrorKey}: ${message}`)
  }
}

export default EntityResponseErrorHandler
