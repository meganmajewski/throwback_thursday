import React from "react";
import { useState } from "react";
import AutoSuggest from "react-autosuggest";
import { people } from "../data/people";
import "../styles/autosuggest.scss";

interface Suggestion {
  name: string;
  cdsid: string;
}

const peopleFirstAndLastName: Suggestion[] = people.map(
  ({ first, last, cdsid }) => {
    return { name: first.toLowerCase().concat(" ", last.toLowerCase()), cdsid };
  }
);

export default function CDSIDSuggestion(props: {
  callback: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  function getSuggestions(value: string): Suggestion[] {
    return peopleFirstAndLastName.filter(({ name }) =>
      name.startsWith(value.trim().toLowerCase())
    );
  }
  return (
    <>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          setValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(e, suggestionValue) => {
          props.callback(suggestionValue.suggestion.cdsid);
        }}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{
          className: "vote-input",
          placeholder: "Start typing a name",
          value: value,
          onChange: (_, { newValue }) => {
            setValue(newValue);
          },
        }}
        highlightFirstSuggestion={true}
      />
    </>
  );
}
