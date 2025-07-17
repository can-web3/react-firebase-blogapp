export interface CategoryInterface {
  id: string
  name: string
  createdAt: { toDate: () => Date }
}
