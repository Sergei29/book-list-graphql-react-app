import React from "react";
import { Query } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

const BookListNew = () => (
  <Query query={getBooksQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      return (
        <div>
          <ul id="book-list-new">
            {data.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default BookListNew;
