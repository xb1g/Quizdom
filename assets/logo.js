import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from "react-native-svg";

export const Logo = (props) => (
  <Svg
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    width={240}
    height={240}
    {...props}
  >
    <Path
      d="M71-442v872l229 108 229-108v-872H71Z"
      style={{
        fill: "url(#a)",
      }}
      transform="matrix(1.13974 0 0 .47449 -41.921 259.724)"
    />
    <Path
      d="M71-442v872l229 108 229-108v-872H71Z"
      style={{
        fill: "url(#b)",
      }}
      transform="matrix(.87783 0 0 .58061 36.652 256.631)"
    />
    <Path
      d="M183.559 302.939c.016-.112.03-.22.042-.324a2.62 2.62 0 0 0 .018-.3c0-.376-.07-.708-.21-.996a1.98 1.98 0 0 0-.588-.72 2.606 2.606 0 0 0-.912-.432 4.536 4.536 0 0 0-1.182-.144h-1.584c-.424 0-.842.094-1.254.282a4.37 4.37 0 0 0-1.998 1.854 3.73 3.73 0 0 0-.48 1.848c0 .472.092.86.276 1.164.184.304.43.546.738.726.308.18.666.306 1.074.378a7.38 7.38 0 0 0 1.284.108h1.08l.204.336h2.4l-.588-1.14a5.34 5.34 0 0 0 1.116-1.248c.304-.472.492-.936.564-1.392Zm-5.304.396.648 1.428h-.156a.757.757 0 0 1-.408-.12 1.241 1.241 0 0 1-.336-.312 1.614 1.614 0 0 1-.228-.426 1.33 1.33 0 0 1-.084-.45v-.072c0-.048.004-.076.012-.084a.979.979 0 0 1 .06-.222c.032-.084.068-.174.108-.27.072-.136.17-.274.294-.414.124-.14.258-.266.402-.378.144-.112.29-.202.438-.27a.997.997 0 0 1 .414-.102h.828c.216 0 .394.036.534.108.14.072.252.166.336.282.084.116.142.244.174.384s.048.282.048.426v.144a.351.351 0 0 1-.012.12.745.745 0 0 0-.024.108l-.048.12a.99.99 0 0 1-.132.264.68.68 0 0 1-.054.108 1.16 1.16 0 0 0-.054.096l-.24-.468h-2.52Z"
      style={{
        fill: "url(#c)",
        fillRule: "nonzero",
      }}
      transform="translate(-6725.05 -11616.5) scale(39.1336)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 467 -409.743 0 300 71)"
      >
        <Stop
          offset={0}
          style={{
            stopColor: "#00ffe5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={1}
          style={{
            stopColor: "#008ad5",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 -583.83 571.902 0 300 497.395)"
      >
        <Stop
          offset={0}
          style={{
            stopColor: "#22004d",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={0.46}
          style={{
            stopColor: "#25008c",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={1}
          style={{
            stopColor: "#26009d",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <RadialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-8.3844 10.6024 -8.7516 -10.1576 182.027 298.234)"
      >
        <Stop
          offset={0}
          style={{
            stopColor: "#6aff5f",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={0.19}
          style={{
            stopColor: "#bfffba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={0.46}
          style={{
            stopColor: "#5fe9ff",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={0.7}
          style={{
            stopColor: "#ff67f2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={0.86}
          style={{
            stopColor: "#f850d6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset={1}
          style={{
            stopColor: "#e10072",
            stopOpacity: 1,
          }}
        />
      </RadialGradient>
    </Defs>
  </Svg>
);
