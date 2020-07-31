import React from "react";
import { useState } from "react";
import AutoSuggest from "react-autosuggest";
import { people } from "../data/people";
import { callbackify } from "util";

const lowerCasedCompanies = people.map(({ first, last }) => {
  return first.toLowerCase().concat(" ", last.toLowerCase());
});

export default function CDSIDSuggestion(props: {
  callback: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  function getSuggestions(value: string): string[] {
    return lowerCasedCompanies.filter((language) =>
      language.startsWith(value.trim().toLowerCase())
    );
  }
  return (
    <div>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          setValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestionValue }) => {
          console.log("Selected: " + suggestionValue);
          props.callback(suggestionValue);
        }}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <span>{suggestion}</span>}
        inputProps={{
          placeholder: "Type 'c'",
          value: value,
          onChange: (_, { newValue, method }) => {
            setValue(newValue);
          },
        }}
        highlightFirstSuggestion={true}
      />
    </div>
  );
}
