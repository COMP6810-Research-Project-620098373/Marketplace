import { ItemCategories } from "./ItemCategories"
import { Visibility } from "./Visibility"

export interface Item {
    title: string
    cost: number
    ipfsHash: string | null
    ethereumTransactionHash: string | null
    visibility: Visibility
    // ethereumAddress: string | null
    images: Array<string>
    contact: string
    category: ItemCategories
    description: string
    // isPublished: boolean
}