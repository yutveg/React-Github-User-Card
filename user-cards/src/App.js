import React from 'react'
import './App.css'
import axios from 'axios'

class App extends React.Component {
    state = {
        baseUser: {},
        followers: [],
        baseQuery: '',
        tempSearch: '',
    }

    getBaseUser = () => {
        if (this.state.baseQuery === '') {
            return axios.get('https://api.github.com/users/yutveg')
        }
    }

    getFollowers = () => {
        return axios.get('https://api.github.com/users/yutveg/followers')
    }

    componentDidMount() {
        axios
            .all([this.getBaseUser(), this.getFollowers()])

            .then(
                axios.spread((baseUserData, followerList) => {
                    console.log(baseUserData.data)
                    console.log(followerList.data)
                    this.setState({ baseUser: baseUserData.data })
                    this.setState({ followers: followerList.data })
                })
            )
            .catch(err => console.log(err))
    }

    componentDidUpdate(prevState) {
        if (prevState.baseQuery !== this.state.baseQuery) {
            axios
                .get(`https://api.github.com/users/${this.state.baseQuery}`)
                .then(res => {
                    console.log(res)
                    this.setState({ baseUser: res.data })
                })
                .catch(err => console.log(err))
        } else {
            console.log('nothing happened')
        }
    }

    handleChanges = e => {
        this.setState({ tempSearch: e.target.value })
        console.log(this.state.tempSearch)
    }

    handleSubmit() {
        this.setState({ baseQuery: this.state.tempSearch })
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="base-card">
                        <img
                            src={this.state.baseUser.avatar_url}
                            alt="user avatar"
                        />
                        <h1>{this.state.baseUser.login}</h1>
                        <h2>{this.state.baseUser.location}</h2>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={this.state.tempSearch}
                            placeholder="type username.."
                            onChange={this.handleChanges}
                        />
                        <button>Set User</button>
                    </form>
                </div>
                <h1 className="follower-header">Follower List:</h1>
                <div className="card-list">
                    {this.state.followers.map(user => (
                        <a
                            href={user.html_url}
                            className="user-card"
                            key={user.login}
                        >
                            <img src={user.avatar_url} alt="user avatar" />
                            <h1>{user.login}</h1>
                            <h2>{user.location}</h2>
                            <p>{user.bio}</p>
                            <p>{user.following}</p>
                            <p>{user.followers}</p>
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}

export default App
