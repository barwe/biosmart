export {}
declare global {
  type NFile = import('naive-ui').UploadFileInfo
  type FormInst = import('naive-ui').FormInst
  type FormRules = import('naive-ui').FormRules
  type FormValidationError = import('naive-ui').FormValidationError
  type Z = import('naive-ui').MessageType
  type ThemeType = import('naive-ui').MessageType | 'primary' | undefined
}
