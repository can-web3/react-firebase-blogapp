export interface BlogInterface {
  id: string
  image: string
  title: string
  createdAt: { toDate: () => Date }
}
