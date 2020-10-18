import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

//components:
import BookDetails from "./BookDetails";
import AddBook from "./AddBook";

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
		this.onBookClicked = this.onBookClicked.bind(this);
	}
	onBookClicked(id) {
		this.setState({ selected: id });
	}

	displayBooks() {
		const { data } = this.props;
		if (data.loading) {
			return <p>Loading books...</p>;
		} else if (data.books) {
			return data.books.map((book) => (
				<li key={book.id} onClick={(e) => this.onBookClicked(book.id)}>
					{book.name}
				</li>
			));
		}
	}

	render() {
		return (
			<div id="main">
				<h1>My Reading List.</h1>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected} />
				<AddBook />
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
