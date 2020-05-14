import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import {
	getBooksQuery,
	removeBookMutation,
	removeAuthorMutation,
	getAdminAuthorsQuery,
} from "../queries/queries";

export class AdminPage extends Component {
	bookDeleteHandler = (id) => {
		this.props.removeBookMutation({
			variables: { id },
			refetchQueries: [{ query: getAdminAuthorsQuery }],
		});
	};

	authorDeleteHandler = (author) => {
		if (
			!window.confirm(
				`Are you sure you want to delete ${author.name} and all books by this author?`
			)
		) {
			return;
		}
		//1. delete all author's books:
		author.books.forEach((book) => this.bookDeleteHandler(book.id));
		//2. delete author by id:
		this.props.removeAuthorMutation({
			variables: {
				id: author.id,
			},
			refetchQueries: [{ query: getAdminAuthorsQuery }],
		});
	};

	displayAuthors = () => {
		const { authors, error, loading } = this.props.getAdminAuthorsQuery;
		if (loading) return <p>loading authors...</p>;
		if (error) return <p>Error: {error.message}</p>;
		if (authors) {
			return (
				<ul className="authors-list container">
					{authors.map((author) => (
						<div className="row author" key={author.id}>
							<div className="col-6">
								<p>{author.name}</p>
								<p
									className="delete-author-btn"
									onClick={() =>
										this.authorDeleteHandler(author)
									}
								>
									delete author
								</p>
							</div>
							<div className="col-6">
								<ul>
									{author.books.map((book) => (
										<li key={book.id}>
											{book.name}{" "}
											<i
												className="fa fa-trash"
												aria-hidden="true"
												onClick={() =>
													this.bookDeleteHandler(
														book.id
													)
												}
											></i>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</ul>
			);
		}
	};

	render() {
		return (
			<div id="admin">
				<h2>Admin Page.</h2>
				{this.displayAuthors()}
			</div>
		);
	}
}

export default compose(
	graphql(getAdminAuthorsQuery, { name: "getAdminAuthorsQuery" }),
	graphql(getBooksQuery, { name: "getBooksQuery" }),
	graphql(removeBookMutation, { name: "removeBookMutation" }),
	graphql(removeAuthorMutation, { name: "removeAuthorMutation" })
)(AdminPage);
