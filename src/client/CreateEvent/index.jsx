import React, { useState, useMemo } from "react";
import gql from "graphql-tag";
import { useForm, Input } from "../useForm.jsx";

const CREATE_EVENT = gql`
  mutation createEvent(
    $name: String!
    $timeStart: Int!
    $venue: VenueCreateOneInput!
  ) {
    createEvent(name: $name, timeStart: $timeStart, venue: $venue) {
      id
    }
  }
`;

const GET_EVENTS = gql`
  query getEvents($input: String!) {
    venues(where: { name_contains: $input }) {
      name
      address
      id
    }
  }
`;

const Form = ({}) => {
  const [FormContext, getForm] = useForm({
    name: "",
    address: ""
  });

  function submitForm(e) {
    e.preventDefault();
    console.log(getForm());
  }

  return (
    <form onSubmit={submitForm}>
      <FormContext>
        <Input
          name="name"
          placeholder="Name"
          validator={value => /^[\w ]+$/.test(value)}
        />
        <Input name="address" />
        <input type="submit" value="Test" />
      </FormContext>
    </form>
  );
};

export default Form;
