const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPostsBySearchType, findPostsBySearchTechnology, findPostsBySearchDate, findPostsByAnswersQuantity } = require("../../repositories/posts.repository");

async function searchPostsBy( searchData ) {
    const { searchType, limit, startIndex, body, res } = searchData;
    const { value } = body;
    let posts = [];
    let invalidSearchType = false;
    try {
        switch( searchType ){
            case "title":
            case "content":
                    posts = await findPostsBySearchType( searchType, value, startIndex, limit );
            break;
            case "technology":
                    posts = await findPostsBySearchTechnology( value, startIndex, limit );
            break;
            case "date":
                    posts = await findPostsBySearchDate( value, startIndex, limit );
            break;
            case "numAnswers":
                    posts = await findPostsByAnswersQuantity( value, startIndex, limit );
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

async function search( req = request, res = response ) {
  try {
        // Pagination
        const { body, query } = req;
        const { searchBy } = req.body;
        const page = parseInt( query.page ) || 1;
        const limit = parseInt( query.limit ) || 10;
        const startIndex = ( page - 1 ) * limit;

        // Build the search object
        let searchData = {
            searchType: searchBy,
            limit,
            startIndex,
            body,
            res,
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
