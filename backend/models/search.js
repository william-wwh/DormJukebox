const { search_suggest } = require('../NeteaseCloudMusicApi/main')

exports.getSearchSuggest = async (keywords) => {
    const result = await search_suggest({
        keywords: keywords
    })
    return result
    // console.log(result.body.result)
}
