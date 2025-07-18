export default interface TextEditorInterface {
  title: string
  name: string
  value: string
  onChange: (content: string) => void
  error?: string
}