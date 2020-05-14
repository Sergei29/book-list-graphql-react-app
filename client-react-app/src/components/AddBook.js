import React, { Component } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from "../queries/queries";

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			genre: "",
			authorId: "",
		};
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.submitFormHandler = this.submitFormHandler.bind(this);
		this.resetFieldsHandler = this.resetFieldsHandler.bind(this);
	}

	displayAuthors() {
		const { loading, authors } = this.props.getAuthorsQuery;
		if (loading) return <option>loading authors...</option>;
		if (authors) {
			return authors.map((author) => (
				<option value={author.id} key={author.id}>
					{author.name}
				</option>
			));
		}
	}

	inputChangeHandler(event) {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	}

	resetFieldsHandler() {
		this.setState({ name: "", genre: "", authorId: "" });
	}

	submitFormHandler(event) {
		event.preventDefault();
		const { name, genre, authorId } = this.state;
		//make mutation:
		this.props
			.addBookMutation({
				variables: {
					name,
					genre,
					authorId,
				},
				refetchQueries: [{ query: getBooksQuery }],
			})
			.then((response) => {
				this.resetFieldsHandler();
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<form id="add-book" onSubmit={this.submitFormHandler}>
				<div className="field">
					<label>Book name:</label>
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.inputChangeHandler}
					/>
				</div>

				<div className="field">
					<label>Genre:</label>
					<input
						type="text"
						name="genre"
						value={this.state.genre}
						onChange={this.inputChangeHandler}
					/>
				</div>

				<div className="field">
					<label>Author:</label>
					<select
						name="authorId"
						onChange={this.inputChangeHandler}
						value={this.state.authorId}
					>
						<option value="">Select author</option>
						{this.displayAuthors()}
					</select>
				</div>

				<button type="submit">+</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
