export const isInvalidForm = async (formRef: Ref<FormInst | undefined>) => {
  try {
    await formRef.value?.validate()
    return false
  } catch (reason) {
    const errorsList = reason as FormValidationError[]
    errorsList.forEach(errors => errors.forEach(({ message }) => $message.error(message!)))
    return true
  }
}
