import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router, usePathname } from 'expo-router';

import { icons } from '../constants';

const SearchInput = ({ initialQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(initialQuery || '');

  const pathname = usePathname();

  return (
    <View
      className={`flex flex-row items-center w-full h-16 px-4 border-2 bg-black-100 rounded-2xl ${
        isFocused ? 'border-secondary' : 'border-black-200'
      } gap-x-4`}
    >
      <TextInput
        className="flex-1 text-base text-white font-pregular mt-0.5"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database'
            );
          }

          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
