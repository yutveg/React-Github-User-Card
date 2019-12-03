import React from 'react'
import './App.css'
import axios from 'axios'

class App extends React.Component {
    state = {
        baseUser: {},
        followers: [],
    }

    getBaseUser = () => {
        return axios.get('https://api.github.com/users/yutveg')
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

    render() {
        return (
            <div className="container">
                <div className="base-card">
                    <img
                        src={this.state.baseUser.avatar_url}
                        alt="user avatar"
                    />
                    <h1>{this.state.baseUser.login}</h1>
                    <h2>{this.state.baseUser.location}</h2>
                </div>
                <h1 className="follower-header">Follower List:</h1>
                <div className="card-list">
                    {this.state.followers.map(user => (
                        <div className="user-card" key={user.login}>
                            <img src={user.avatar_url} alt="user avatar" />
                            <h1>{user.login}</h1>
                            <h2>{user.location}</h2>
                            <p>{user.bio}</p>
                            <p>{user.following}</p>
                            <p>{user.followers}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default App
