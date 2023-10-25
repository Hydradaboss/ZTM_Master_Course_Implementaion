export const getPag = (query) => {
    const page = Math.abs(query.page) || 1
    const limit = Math.abs(query.limit) || 10;
    const skip  = (page - 1) * limit
    return{
        limit,
        skip
    }
}