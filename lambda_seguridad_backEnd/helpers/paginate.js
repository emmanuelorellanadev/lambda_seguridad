const paginate = async (model, pageNumber, pageLimit, search = {}, include = {}, order = []) => {
    try {
        const limit = parseInt(pageLimit, 10) || 10;
        // const limit = parseInt(pageLimit, 10);
        const page = parseInt(pageNumber, 10) || 1;

        // create an options object
        let options = {};

        //check if limit was recibed
        if(pageLimit){
            options = {limit: limit, offset: getOffset(page, limit)}
        }

        // check if the search object is empty
        if (Object.keys(search).length) {
            options = {options, ...search};
        }

        //check if include was recibed
        if (include) {
            options = {options, ...include}
        }

        // check if the order array is empty
        // if (order && order.length) {
        //     options['order'] = order;
        // }

        // take in the model, take in the options
        let {count, rows} = await model.findAndCountAll(options);

        // check if the transform is a function and is not null
        // if (transform && typeof transform === 'function') {
        //    rows = transform(rows);
        // }

        return {
            prevPage: getPrevPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            limit: limit,
            data: rows
        }
    } catch (error) {
        console.log(error);
    }
}

const getOffset = (page, limit) => {
    return (page * limit) - limit;
}

const getNextPage = (page, limit, total) => {
    if ((total/limit) > page) {
        return page + 1;
    }
    return null
}

const getPrevPage = (page) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}

module.exports = {paginate}