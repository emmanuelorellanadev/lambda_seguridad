import '../../../css/ui/headings.css'; //hadle p_h1, p_h2, p_h3
import { useEffect, useState, useContext, useReducer } from 'react';

import '../../../css/ui/table.css'
import { Input } from '../Input';
import { P_Head } from '../P_Head';
import { useGetBranch } from '../../branches/hooks/useGetBranch';
import { useGetUser } from '../../users/hooks/useGetUser';
import { GlobalContext } from'../../../context/GlobalContext.jsx';
import { initialPagination, paginationReducer } from '../pagination/reducer/paginationReducer';
import PaginationReducer from '../pagination/PaginationReducer.jsx';


export const Table_user = ({ columns, rows, editData, deleteData, ...props}) => {

  const { urlLambda } = useContext(GlobalContext);
  const [paginationData, paginationDispatch] = useReducer(paginationReducer , initialPagination)

  //WORK HERE!!!
  //Change the useState to useReducer to manage the state of the component
  //Create a reducer to manage the state of the component
  //Create an initial state for the reducer
  //check how to get better the prevPage and nextPage and include them in the pagination

  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(0);
  const [ search, setSearch ] = useState('');
  
  // const [ rowsByPage, setRowsByPage ] = useState( 10 );
  // const [ page, setPage ] = useState( 1 );
  // const [ prevPage, setPrevPage ] = useState('');
  // const [ nextPage, setNextPage ] = useState('');
  const [ onLoad, setOnLoad ] = useState(true);

  if(editData && !columns.includes("Editar") ){
      columns.push("Editar")
  }

  if(deleteData && !columns.includes("Eliminar") ){
    columns.push("Eliminar")
}

const selectBranch = (branchSelected) => {
  setBranch(branchSelected);
  if ( branchSelected != 0 ){
    const urlUsersByBranch = `${urlLambda}/usersByBranch/?id=${branchSelected}&q=${search}&limit=${paginationData.rowsByPage}&page=${paginationData.page}`;
    useGetUser(urlUsersByBranch, paginationDispatch);
  } else {
    setOnLoad(false)
  } 
}

  const searchUser = (query) => {
    setSearch(query);
    setPage(1);
    setOnLoad(false);
  }

  const getUsers = async() => {
    const urlUser = `${urlLambda}/user/?q=${search}&limit=${paginationData.rowsByPage}&page=${paginationData.page}`;
    await useGetUser(urlUser, paginationDispatch );
  }

  useEffect( () => {
    setOnLoad(true);
    const urlBranch = `${urlLambda}/branch/`;
    useGetBranch(urlBranch, {setBranches});
    if(branch != 0) {
      selectBranch(branch);
    }else{
      getUsers();
    }
  }, [onLoad, search]);

  return (
    <>
      <P_Head className="p_h1" text={'Listado de Usuarios'}/>
      <div className="table-controls">
        <div className="branch-filter">
            <label htmlFor="branch" className="branch-label">Sucursal:</label>
            <select
                className='form-control branch-select'
                name="branch"
                id="branch"
                value={branch}
                onChange={(e) => {setSearch(''); selectBranch(e.target.value)}}
            >
                <option value={0}>Todas</option>
                {branches.data?.map(b => (
                    <option key={b.id} value={b.id}>{b.branch_name}</option>
                ))}
            </select>
        </div>
        <Input
            lambdaClassInput="data_search"
            type="search"
            value={search}
            onChange={e => searchUser(e.target.value)}
            placeholder="Buscar usuario por nombre o rol"
            aria-label="Buscar usuario"
        />
      </div>
      <div className="table-responsive">
        <table className='table table-bordered table-hover table-striped user-table' {...props}>
          <thead className='text-center t_header'>
            <tr key={0}>  
              {
                columns.map( (column) => {
                  return (
                      <th key={column}>{column}</th>
                  )
                })
              }
              </tr>
          </thead>
          <tbody className='text-center align-baseline'>
            {
              // users.data?.map( ( user ) => {
              paginationData.data?.map( ( user ) => {
                if(editData && deleteData){
                    return (
                      <tr key={user.id}>
                        <th>{user.id}</th>
                        <td data-label="Usuario">{user.user_name}</td>
                        <th>{user.Role?.role_name}</th>
                        <th><input type='checkbox' checked={user.user_state} disabled/></th>
                        <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                        <th><button className='btn btn-outline-danger' onClick={ () => deleteData(user.id, user.user_name, setOnLoad) }><i className='bi bi-trash3-fill'></i></button></th>
                      </tr>
                    )
                }else if(editData){
                  return (
                      <tr key={user.id}>
                      <th>{user.id}</th>
                      <td data-label="Usuario">{user.user_name}</td>
                      <th>{user.role_name}</th>
                      <th><input type='checkbox' checked={user.user_state} disabled/></th>
                      <th><button className='btn btn-primary' type="button" onClick={ () => editData( user.id ) } >Editar</button></th>
                    </tr>
                  )
                }else{
                  return (
                      <tr key={user.id}>
                      <th>{user.id}</th>
                      <td data-label="Usuario">{user.user_name}</td>
                      <th>{user.role_name}</th>
                      <th><input type='checkbox' checked={user.user_state} disabled/></th>
                    </tr>
                  )
                }
                })
            }
          </tbody>
      </table>
    </div>
    {/* Pagination does not work when you go back and forth several times. The problem does not happen when a branch is selected. */}
    <PaginationReducer  data={paginationData} dispatch={paginationDispatch} onLoad={onLoad} setOnLoad={setOnLoad}/>

  </>
  )
}

export default Table_user