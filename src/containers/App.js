import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
// import { robots } from '../robots';
import './App.css';
import Scroll from '../components/Scroll';

import { setSearchFields, requestRobots } from '../actions';

const mapStateToProps = state => {
    // return { searchFields: state.searchRobots.searchFields };
    return {
        searchFields: state.SearchRobots.searchFields,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchFields(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    };
}

class App extends Component {

    /* constructor() {
        super();
        this.state = {
            robots: [],
        }
    } */

    componentDidMount() {
        this.props.onRequestRobots();
    }

    /*     onSearchChange = (event) => {
            this.setState({ searchFields: event.target.value })
        }
     */
    render() {
        const { searchFields, onSearchChange, robots, isPending } = this.props; // Redux*
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchFields.toLowerCase());
        });
        return isPending ?
            <h1> Loading .. </h1>
            :
            (
                <div className="tc">
                    <h1 className="f1" > RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
