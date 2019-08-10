import React, { Component } from 'react';
import { Loading } from './LoadingComponent';
import { Input, Button } from 'reactstrap';
import DisplayBooks from './DisplayBooks';
import sortJsonArray from 'sort-json-array';
import { baseUrl } from '../shared/baseUrl';
class BookAppBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            sorted: false,
            isLoading: false,
            error: null
        };
    }
    handleSort = () => {
        this.setState({
            sorted: true
        });
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => this.setState({ books: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {
        var filtereddata = this.state.books.filter((book) => {
            var myre = new RegExp('[a-zA-Z]');
            if (!myre.test(book.average_rating)) 
            {
                return book;
            }
        }
        )
        var sortedData = sortJsonArray(filtereddata, 'average_rating', 'des');
        if (this.state.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.state.error) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.state.error.message}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        // else
        return (
            <React.Fragment>
            <div className="container">
                <div className="row">
                    
                    <Input className="col-12" type="text" placeholder="Search Books" />
                
                    
                </div>
                <div className="row">
                    <Button className="col-12" outline onClick={this.handleSort} type="submit" color="secondary">
                        <span className="fa fa-sort fa-lg">
                        Sort based on Average ratings (High to Low)
                        </span>
                        </Button>
                    <br />
                </div>
            
              
               <div className="row">
               {
                    this.state.sorted ? (<DisplayBooks books={sortedData} />) : (<DisplayBooks books={this.state.books} />)
                }
                </div>
            </div>
            </React.Fragment>
        );
    }
}
export default BookAppBody;