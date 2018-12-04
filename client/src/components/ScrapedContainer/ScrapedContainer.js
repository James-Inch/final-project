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
                // Then, we load that into cheerio and save it to $ for a shorthand selector
                const $ = cheerio.load(response.data);

                let results = [];
                // Now, we grab every h2 within an article tag, and do the following:
                $("h4.post-title").each(function (i, element) {
                    // Save an empty result object

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
                       <li>{result.title}</li>
                       ))};
                    </ul>
                </section>
            )
        }
    }

export default ScrapedContainer;