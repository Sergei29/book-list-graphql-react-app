import { gql } from "apollo-boost";

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

const getAdminAuthorsQuery = gql`
	{
		authors {
			name
			id
			books {
				name
				id
			}
		}
	}
`;

const getBookDetailsQuery = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;

const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const removeBookMutation = gql`
	mutation($id: ID!) {
		removeBook(id: $id) {
			id
			name
		}
	}
`;

const removeAuthorMutation = gql`
	mutation($id: ID!) {
		removeAuthor(id: $id) {
			name
			id
		}
	}
`;

export {
	getBooksQuery,
	getAuthorsQuery,
	getBookDetailsQuery,
	addBookMutation,
	removeBookMutation,
	removeAuthorMutation,
	getAdminAuthorsQuery,
};
