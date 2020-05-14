import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookDetailsQuery } from "../queries/queries";

class BookDetails extends Component {
	displayBookDetails() {
		const { book, loading, error } = this.props.data;
		if (loading) return <p>Loading book details...</p>;
		if (this.props.bookId && error) return <p>Error: {error.message}</p>;
		if (book) {
			return (
				<div>
					<h2>{book.name}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by this author:</p>
					<ul className="other-books">
						{book.author.books.map((book) => (
							<li key={book.id}>{book.name}</li>
						))}
					</ul>
				</div>
			);
		} else {
			return <p>No book selected.</p>;
		}
	}

	render() {
		return <div id="book-details">{this.displayBookDetails()}</div>;
	}
}

export default graphql(getBookDetailsQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.bookId,
			},
		};
	},
})(BookDetails);
