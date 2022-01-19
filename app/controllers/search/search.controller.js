const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPostsBySearchType, findPostByTechnology, findPostsByDate, findPostsByAnswersQuantity } = require("../../repositories/posts.repository");

async function searchPostsBy( searchData ) {
        const {searchType,
            q,
            order,
            direction,
            limit,
            startIndex,
            res,
            technology,
        } = searchData;
            let posts = [];
    let invalidSearchType = false;
    try {
        switch( searchType ){
            case "title":
            case "content":
                    posts = await findPostsBySearchType( searchType, q, startIndex, limit, order, direction );
            break;
            case "technology":
                posts = await findPostByTechnology( q, technology, startIndex, limit, order, direction );
                break;
            case "date":
                let { from, to } = searchData;
                posts = await findPostsByDate( q, from, to, startIndex, limit, order, direction );
            break;
            case "numAnswers":
                    const { numAnswers } = searchData;
                    posts = await findPostsByAnswersQuantity( q, numAnswers, startIndex, limit, order, direction );
            break;
            default:
                invalidSearchType = true;
        }
    } catch (error) {
        createJsonError( error, res)
    }
    if( invalidSearchType ) throwJsonError( 500, "Invalid search type");
    return posts;
}

const queryParamsValidator = (query) => {
    let {searchBy, order, direction, q} = query;
    const validSearchBy = ["title", "content", "technology", "date", "numAnswers"];
    const validOrder = ["title", "postedAt", "views"];
    const validDirection = ["ASC", "DESC"];
    if( !q ) q = '';
    if( !searchBy || !validSearchBy.includes(searchBy)){
        searchBy = 'title';
    }
    if( !order || !validOrder.includes(order)){
        order = 'postedAt';
    }
    if( !direction || !validDirection.includes(direction.toUpperCase())){
        direction = 'DESC';
    }
    query = {
        ...query,
        searchBy,
        order,
        direction,
        q
    }
    return query;
}
async function search( req = request, res = response ) {
  try {
        // Pagination
        let { query } = req;
        query = queryParamsValidator(query);
        const { page: currentPage,
                limit: pageLimit,
                ...queryData
            } = query;
        const page = parseInt( currentPage ) || 1;
        const limit = parseInt( pageLimit ) || 10;
        const startIndex = ( page - 1 ) * limit;

        // Build the search object
        let searchData = {
            ...queryData,
            limit,
            startIndex,
            res,
            searchType : queryData.searchBy
        }
        let data = {};
        let results = {};
        const {
            posts,
            totalPosts,
        } = await searchPostsBy( searchData );

        data.totalPages = Math.ceil( totalPosts / limit );
        results = posts;

        if( startIndex ) {
            data.previous = {
                page: page - 1,
                limit,
            };
        }
        if( page < data.totalPages ) {
            data.next = {
                page: page + 1,
                limit,
            };
        }
        data.results = results;
        res.status( 200 ).json( data );
  } catch ( error ) {
    createJsonError( error, res );
  }
}

module.exports = { search };
