import React from 'react';

const Select = (props) => {
    
    const handleChange = (event) => {
        props.onSelect(event.target.value);
        let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
        getDoggo(url);
    }

    const cardImg = document.querySelector('.card');
    
    const getDoggo = url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(data => {
            cardImg.style.backgroundImage = `url('${data.message}')`;
          });
      };

    const getLoadingView = () => {
        return <div className="loading">Loading...</div>
    }
    const getErrorView = () => {
        return alert('Sorry, can not display the data')
    }
    const getSelectView = () => {
        return (
            <select className='form-select' onChange={handleChange}>
                {props.breedsList.map((breed, index) => {
                    return(
                        <option value={breed} key={index}>{breed}</option>
                    );
                })}
            </select>
        );
    }
    return(
        <div className="form-floating mx-auto mb-3 mb-md-5">
        {props.breedsList ? getSelectView() : getLoadingView()}
        {props.isError ? getErrorView() : null}
        <label for="floatingSelect">Seleccione una raza</label>
        </div>
    );
}

export default Select;