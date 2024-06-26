export const filterData = (search, currentPage, rowsByPage, rows) => {

    if(search.length === 0)
     return rows?.slice(currentPage, (currentPage + rowsByPage));//pagination

    //filter data
    const filteredData = rows.filter( row => {
      const dataNames = Object.values(row);
      return (dataNames[1].toLocaleLowerCase().includes(search.toLocaleLowerCase()) || dataNames[2].includes(search.toLocaleLowerCase()) || dataNames[3].includes(search.toLocaleLowerCase()))
    })
    return ( filteredData.slice(currentPage, (currentPage + rowsByPage)))//pagination
  }

export  const onSearchChange = (text, {setCurrentPage, setSearch}) =>{
      setCurrentPage(0);
      setSearch(text);
  }

export const prevPage = (currentPage, rowsByPage, pageCounter, {setCurrentPage, setPageCounter}) => {
    if(currentPage != 0){
      setCurrentPage(currentPage - rowsByPage);
      setPageCounter(pageCounter - 1);
    }
  }

export const nextPage = (rows, currentPage, rowsByPage, pageCounter, { setCurrentPage, setPageCounter }) => {
    if(currentPage <= (rows.length/rowsByPage)){
      setCurrentPage(currentPage + rowsByPage);
      setPageCounter(pageCounter + 1);
    }
  }