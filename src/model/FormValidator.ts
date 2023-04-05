import { Validator } from "fluentvalidation-ts"

class FormValidator<ValuesType, ErrorsType> {
    isSubmitting: boolean = false
    submissionAttempted: boolean = false
    submit: () => Promise<void>
    
    constructor(
        /** A JSON object of type {fieldName1: <string>"", fieldName2: <string>"", ...} */
        public values: ValuesType,
        /** A JSON object of type {fieldName1: <string | undefined>"", fieldName2: <string | undefined>"", ...} */
        public errors: ErrorsType,
        submissionHandler: () => Promise<void>,
        private validator: Validator<ValuesType>,
    ){
        this.submit = async () => {
            this.submissionAttempted = true
            this.isSubmitting = true
            this.updateErrors(false)
            if(Object.keys(this.errors as object).length === 0){
                await submissionHandler()
            }
            this.isSubmitting = false
        }
    }

    async updateErrors(requireSubmission: boolean){
        if(requireSubmission && !this.submissionAttempted){
            return
        }
        this.errors = this.validator.validate(this.values) as typeof this.errors
    }
}

export {
    FormValidator
}