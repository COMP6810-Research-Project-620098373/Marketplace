export interface FetchItemsQueryParams{
    mode?: "private" | "public", 
    filter?: string, 
    offset?: number,
    userAge?: number,
}