import React, { useState, useMemo } from "react";
import gql from "graphql-tag";
import { useForm, Input } from "../../hooks/useForm.jsx";
import layout from "../../css/layout.css";

const CREATE_EVENT = gql`
  mutation() {
    createTalk(
      data: {
        speaker: { connect: { id: $speakerId } }
        activity: {
          create: {
            title: "Espruino"
            description: "Javascript in the real world"
            length: 30
            type: TALK
          }
        }
      }
    ) {
      activity {
        id
      }
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
    <div className={layout.container}>
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
    </div>
  );
};

export default Form;
