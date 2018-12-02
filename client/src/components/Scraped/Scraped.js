import React, { Component } from "react";
import cheerio from "cheerio";
import axios from "axios";
import "./Scraped.css";

class Scraped extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        axios.get("http://www.thrashermagazine.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("h4.post-title").each(function (i, element) {
                // Save an empty result object
                const result = {};
                const resArray = [];
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");

                resArray.push(result);


                console.log(resArray);

            });
        })
            .then(result => {
                this.setState({
                    isLoaded: true,
                    items: result
                })
            });
    }

    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loding...</div>;
        }
        else {
            return (
                <section className="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet minus magnam pariatur odio provident dolorem, incidunt error, ex dolores quos aut accusamus commodi. Fuga voluptate earum exercitationem quam illo molestiae error? Animi qui ex vel quae labore voluptatum rerum totam exercitationem ut alias omnis, quisquam dolore neque ea quam quasi deleniti quo porro, blanditiis impedit temporibus repellendus odit commodi. Eius tempore itaque laborum autem quibusdam eum expedita corporis, placeat beatae neque molestias, fuga suscipit, fugiat vitae tempora rem minus mollitia. Modi sapiente temporibus soluta beatae architecto culpa numquam minus id, esse porro commodi molestiae labore dolor dolores vel, sit repudiandae?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet minus magnam pariatur odio provident dolorem, incidunt error, ex dolores quos aut accusamus commodi. Fuga voluptate earum exercitationem quam illo molestiae error? Animi qui ex vel quae labore voluptatum rerum totam exercitationem ut alias omnis, quisquam dolore neque ea quam quasi deleniti quo porro, blanditiis impedit temporibus repellendus odit commodi. Eius tempore itaque laborum autem quibusdam eum expedita corporis, placeat beatae neque molestias, fuga suscipit, fugiat vitae tempora rem minus mollitia. Modi sapiente temporibus soluta beatae architecto culpa numquam minus id, esse porro commodi molestiae labore dolor dolores vel, sit repudiandae?</p>
                    <p>{items}</p>
                </section>
            )
        }
    };
};

export default Scraped;