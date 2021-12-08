module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-inline-import",
        {
          extensions: [".svg"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
