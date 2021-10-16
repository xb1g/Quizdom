import React from "react";
import Carousel from "react-native-snap-carousel";

export const MapCardList = () => {
  return (
    //carousel
    <>
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </>
  );
};
