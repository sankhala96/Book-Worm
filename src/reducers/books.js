import { createSelector } from 'reselect'

export default function books(state ={}, action ={}) {
    switch (action.type){
        default:
            return state;
    }
}

//Selector

export const bookSelector = state => state.books;

export const allBooksSelector = createSelector(bookSelector, bookHash =>
    Object.values(bookHash)
);