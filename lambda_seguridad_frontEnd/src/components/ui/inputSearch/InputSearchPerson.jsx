import "../../../css/ui/inputSearchPerson.css"
import { useSearchPerson } from '../../people/hooks/useSearchPerson';


export const InputSearchPerson = ({dispatch, data, ...props}) => {

  const searchPerson = async(q) => {
          const urlPerson = `http://localhost:8080/person/?q=${q}`
          const searchContainer = document.querySelector('.search-input-box');
  
          dispatch({ type: "UPDATE_QUERY", query: q});
          await useSearchPerson( urlPerson, dispatch );
  
          if(q){
              searchContainer.classList.add('active');
          }else{
              searchContainer.classList.remove('active')
          }
  
      }

      function selectPerson (personId) {
        const urlPerson = `http://localhost:8080/person/${personId}`

        useSearchPerson(urlPerson, dispatch);
        dispatch({type: 'UPDATE_QUERY', query: data.name});
        dispatch({type: 'UPDATE_PEOPLELIST', peopleList: []});

      }

      const cleanData = () => {
        dispatch({type: 'UPDATE_PEOPLELIST', peopleList: []});
        dispatch({type: 'UPDATE_QUERY', query: []});
      }

  return (
        <>
              <div className="inputSearchPerson_container">
                  <div className="search-input-box active">
                      <input  className={`form form-control ${dispatch}`} {...props} type='search' id='searchPerson' value={data.query} onChange= {(e) => {searchPerson(e.target.value)}}/>
                      <ul className='containerSuggestions'>
                        {data.peopleList?.map(person => {
                          return ( <li id={person.id} onClick={() => {selectPerson(person.id)}} key={person.id }>{person.person_names} {person.person_surnames}</li>)
                        })}
                      </ul>
                  </div>
                  <div className='buttonsSearch'>
                      <button type="button" className='btn btn-secondary' onClick={cleanData}>X</button>
                      <button type="button" className='btn btn-info'>Agregar</button>
                  </div>
              </div>
        </>
      ) 
  
}
