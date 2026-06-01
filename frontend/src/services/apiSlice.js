import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),
  tagTypes: ["Events", "Reservations"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body
      })
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      })
    }),
    getEvents: builder.query({
      query: ({ search = "", category = "" } = {}) => {
        const params = new URLSearchParams();

        if (search) {
          params.set("search", search);
        }

        if (category && category !== "All") {
          params.set("category", category);
        }

        const queryString = params.toString();
        return `/events${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((event) => ({ type: "Events", id: event._id })),
              { type: "Events", id: "LIST" }
            ]
          : [{ type: "Events", id: "LIST" }]
    }),
    getEvent: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Events", id }]
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }]
    }),
    updateEvent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Events", id },
        { type: "Events", id: "LIST" },
        { type: "Reservations", id: "MY" }
      ]
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [
        { type: "Events", id: "LIST" },
        { type: "Reservations", id: "MY" }
      ]
    }),
    reserveEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}/reserve`,
        method: "POST"
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Events", id },
        { type: "Events", id: "LIST" },
        { type: "Reservations", id: "MY" }
      ]
    }),
    cancelReservation: builder.mutation({
      query: (id) => ({
        url: `/events/${id}/cancel`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Events", id },
        { type: "Events", id: "LIST" },
        { type: "Reservations", id: "MY" }
      ]
    }),
    getMyReservations: builder.query({
      query: () => "/reservations/my",
      providesTags: [{ type: "Reservations", id: "MY" }]
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useReserveEventMutation,
  useCancelReservationMutation,
  useGetMyReservationsQuery
} = apiSlice;
