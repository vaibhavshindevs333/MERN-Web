import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  reducerPath: "api",
  tagTypes: [
    "Register",
    "Login",
    "User",
    "Logout",
    "Dashboard",
    "Team",
    "Invoices",
    "Contacts",
    "Bar",
    "Form",
    "Line",
    "Pie",
    "FAQ",
    "Geography",
    "Calendar",
  ],
  endpoints: (build) => ({
    getRegister: build.query({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
      providesTags: ["Register"],
    }),
    getLogin: build.query({
      query: (values) => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
       },
       body: values,
      }),
      providesTags: ["Login"],
    }),
    getUser: build.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getLogout: build.query({
      query: () => ('/users/logout'),
      providesTags: ["Logout"],
    }),
    getDashboard: build.query({
      query: () => "dashboard",
      providesTags: ["Dashboard"],
    }),
    getTeam: build.query({
      query: () => '/users/getAllUser',
      providesTags: ["Team"],
    }),
    getInvoices: build.query({
        query: () => "invoices",
        providesTags: ["Invoices"],
      }),
    getContacts: build.query({
      query: () => "contacts",
      providesTags: ["Contacts"],
    }),
    getForm: build.query({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      providesTags: ["Form"],
    }),
    getBar: build.query({
      query: () => "bar",
      providesTags: ["Bar"],
    }),
    getPie: build.query({
      query: () => "pie",
      providesTags: ["Pie"],
    }),
    getLine: build.query({
        query: () => "line",
        providesTags: ["Line"],
      }),
      getFAQ: build.query({
        query: () => "faq",
        providesTags: ["FAQ"],
      }),
      getCalendar: build.query({
        query: () => "calendar",
        providesTags: ["Calendar"],
      }),
      getGeography: build.query({
        query: () => "geography",
        providesTags: ["Geography"],
      }),
  }),
});

export const {
  useGetRegisterQuery,
  useGetLoginQuery,
  useGetUserQuery,
  useGetLogoutQuery,
  useGetDashboardQuery,
  useGetTeamQuery,
  useGetInvoicesQuery,
  useGetFormQuery,
  useGetContactsQuery,
  useGetCalendarQuery,
  useGetFAQQuery,
  useGetBarQuery,
  useGetPieQuery,
  useGetLineQuery,
  useGetGeographyQuery,
} = api;
