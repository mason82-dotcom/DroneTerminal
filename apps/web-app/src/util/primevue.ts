export type FormSubmitEvent = {
    originalEvent:	Event
    values:	Record<string, any>
    states:	Record<string, {
        value?: any
        touched: boolean
        dirty: boolean
        pristine: boolean
        valid: boolean
        invalid: boolean
        error: string | null
        errors: any[]
    }>
    valid: boolean
    errors:	any[]
}
