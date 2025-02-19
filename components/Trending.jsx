import { useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Animatable from 'react-native-animatable';

import { icons } from '../constants';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  // const player = useVideoPlayer(
  //   'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //   (player) => {
  //     // player.play();
  //   }
  // );

  // TODO: Fix video player
  return (
    <Animatable.View
      className="mr-5 "
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text>Playing</Text>
      ) : (
        // <VideoView
        //   className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        //   style={{
        //     width: 182,
        //     height: 252,
        //     borderRadius: 35,
        //     marginTop: 12,
        //   }}
        //   player={player}
        //   contentFit="cover"
        //   allowsFullscreen
        // />
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          ></ImageBackground>

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

// TODO: Fix flickering animations
// TODO: Fix scroll offset
const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;
