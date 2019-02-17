import React, { Component } from "react";
import cheerio from "cheerio";
import axios from "axios";
import "./ScrapedContainer.css";

class ScrapedContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        axios.get("http://www.thrashermagazine.com/")
            .then(response => {
                const $ = cheerio.load(response.data);
                let results = [];

                $("h4.post-title").each(function (i, element) {

                    let title = $(this).children("a").text();
                    let link = $(this).children("a").attr("href");

                    results.push({
                        title: title,
                        link: link
                    });
                });
                
                console.log(results);
                this.setState({
                    results
                })
            })
    }

    render() {

        return this.state.results.length === 0 ? <div>Loading...</div> :
            (
                <section className="content">
                    <ul>
                       {this.state.results.map((result, index) => (
                       <li>{result.title} <br /> <hr /> </li>
                       ))}
                    </ul>
                </section>
            )
        }
    }

export default ScrapedContainer;