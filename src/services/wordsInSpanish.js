import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseUrl = "http://185.137.181.3:8000/"




export const wordsInSpanish = createApi({
    reducerPath: 'wordsInSpanish',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        wordsInSpanishFromArray: builder.query({
            query: (words)=> ({
                url: "/words",
                method: "PUT",
                body: words,
                headers: {
                    "Content-Type" : "application/json"
                }
            }), 
            
        }),
        categoriesForLabel: builder.query({
            query: (label) => ({
                    url: `/categories/${label}`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
          }),
    })
})

export const {
    useWordsInSpanishFromArrayQuery,
    useCategoriesForLabelQuery,
} = wordsInSpanish;