import React, { Component } from "react";

import API from "../utils/API";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        API.getArticles()
            .then(res => res.json())
            .then(articles => {
                console.log(articles);
                this.setState(articles);
            });
    }

    render() {
        return this.state.articles.length === 0 ? <div>Loading...</div> :
            (
                <div className="Banner">
                    <section className="content">
                        <ul>
                            {this.state.articles.map((article, index) => (
                                <li>{article.title}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            )
    }
}

export default Banner;