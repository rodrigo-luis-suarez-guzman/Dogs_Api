import React, { Component } from 'react';
import Select from './Select';
import './App.css';

class App extends Component {
  state= {
    breedsList: null,
    selectedBreed: null,
    error: false
  }
  componentDidMount() {
    this.fetchAllBreeds();
  }
  fetchAllBreeds = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (response.ok) {
        const data = await response.json();
        this.setState({
          breedsList: Object.keys(data.message)
        })
      } else {
          this.setState({
              error: true
          })
          alert('Sorry, can not display the data')
      }
    } catch (e) {
      this.setState ({
        error: true
      })
      alert('Sorry, can not display the data')
    }
  }
    selectHandler = (breed) => {
      this.setState({
        selectedBreed: breed
      })
    }
    render( ) {
      //console.log(this.state.selectedBreed);
      return (
          <div className="App">
            <div className='container pt-5'>
              <div className='row'>
                  <div className='col-12'>
                    <h2 className="text-center text-white mb-4">Dogs API</h2>
                    <Select breedsList={this.state.breedsList} onSelect={this.selectHandler} isError={this.state.error}/>
                    <div className="d-flex flex-wrap gap-2" id='filters'>
                        <button type="button" className="btn btn-primary">
                          <span className='me-2'>{this.state.selectedBreed}</span>
                          <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                  </div>
                </div>  
            </div>
            <div className="container">     
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-4 py-5">
                  <div className="col">
                    <div className="card card-cover overflow-hidden text-white bg-dark rounded-4 shadow-lg" style={{ backgroundImage: `url("")` }}>
                      <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h2 className="pt-5 mt-auto mb-4 display-6 lh-1 fw-bold">{this.state.selectedBreed}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      );
  }
}

export default App;