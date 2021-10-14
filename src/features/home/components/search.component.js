import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const SearchContainer = styled.View`
  margin: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  //   const { keyword, search } = React.useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const onChangeSearch = (query) => {
    setSearchKeyword(query);
  };

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchKeyword}
        // onSubmitEditing={() => search(searchKeyword)}
      />
    </SearchContainer>
  );
};
