import { Platform, StyleSheet } from "react-native";

export const shadow = StyleSheet.create({
  shadow1: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 5,
  },
  shadow2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  shadow3: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 4,
      },
      android: {
        //elevation:100,
        textShadowColor: 'rgba(0, 0, 0, 0.30)',
        textShadowRadius: 8,
        textShadowOffset: {
          width: 2,
          height: 2,
        },
      }
    })
  },
  glow0: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,
  },
  glow1: {
    shadowColor: "#ff7979",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },
  glow2: {
    shadowColor: "#79fff8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4.84,
  },
  glow3: {
    shadowColor: "#ffd374",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.84,
  },
});
