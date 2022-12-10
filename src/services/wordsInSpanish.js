import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseUrl = "https://api.ensespañol.com/"

//const baseUrl = "http://127.0.0.1:8080"



export const wordsInSpanish = createApi({
    reducerPath: 'wordsInSpanish',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        wordsInSpanishFromArray: builder.query({
            query: (words)=> ({
                url: "/words/spanish",
                method: "PUT",
                body: words,
                headers: {
                    "Content-Type" : "application/json"
                }
            }), 
            
        }),
        categoriesFromArray: builder.query({
            query: (words)=> ({
                url: "/labels/",
                method: "PUT",
                body: words,
                headers: {
                    "Content-Type" : "application/json"
                }
            }), 
            
        }),
        categoriesForLabel: builder.query({
            query: (label) => ({
                    url: `/label/${label}`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        postCategoriesForLabel: builder.mutation({
            query: (props) => ({
                    url: `/label/${props.labelid}`,
                    method: "POST",
                    body: props.categories,
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        approveCategoryForLabels: builder.mutation({
            query: (props) => ({
                    url: `/category/${props.approve}/`,
                    method: "POST",
                    body: props.message,
                    headers: {
                        "Content-Type" : "application/json",
                        "Address": props.address,
                        "Signature": props.signature,
                    }
                }),
        }),
        poulateCategories: builder.mutation({
            query: (props) => ({
                    url: `/category/populate/${props.category}`,
                    method: "POST",
                    body: props.message,
                    headers: {
                        "Content-Type" : "application/json",
                        "Address": props.address,
                        "Signature": props.signature,
                    }
                }),
        }),
        deleteCategory: builder.mutation({
            query: (props) => ({
                    url: `/category/delete/${props.category}`,
                    method: "POST",
                    body: props.message,
                    headers: {
                        "Content-Type" : "application/json",
                        "Address": props.address,
                        "Signature": props.signature,
                    }
                }),
        }),
        getCategory: builder.query({
            query: (props) => ({
                    url: `/category/${props.categoryID}`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        getCategories: builder.query({
            query: () => ({
                    url: `/category`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        getCategoriesTickets: builder.query({
            query: () => ({
                    url: `/categories-ticket`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        getPendingCategories: builder.query({
            query: () => ({
                    url: `/category/pending/`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        filterWords: builder.mutation({
            query: (props) => ({
                    url: `/filter/words?length=${props.length}&contains=${props.contains}&category=${props.category}&start=${props.start}&end=${props.end}&lang=${props.lang}`,
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }),
        }),
        filterDomains: builder.mutation({
            query: (props) => ({
                    url: `/filter/domains?length=${props.length}&contains=${props.contains}&nocontains=${props.nocontains}&start=${props.start}&end=${props.end}&special=${props.special}&emojis=${props.emojis}`,
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
    usePostCategoriesForLabelMutation,
    useApproveCategoryForLabelsMutation,
    useGetCategoriesQuery,
    useGetPendingCategoriesQuery,
    useFilterWordsMutation,
    useFilterDomainsMutation,
    useCategoriesFromArrayQuery,
    usePoulateCategoriesMutation,
    useGetCategoryQuery,
    useDeleteCategoryMutation,
    useGetCategoriesTicketsQuery,
} = wordsInSpanish;