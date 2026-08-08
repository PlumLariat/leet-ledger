// The backend gives 10 results per page. Hit the previous and next endpoints
// offered to get to the next page.
export default interface Paginated<T> {
    // number of results across all pages
    count: number;
    // the string url of the next page of results, if it exists
    next: string | null;
    // the string url of the previous page of results, if it exists
    previous: string | null;

    results: T[];
}