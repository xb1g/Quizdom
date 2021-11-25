import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";
// import { Row } from "../../../components/utility/row.component";
import styled from "styled-components/native";

const Row = styled.View`
  flex-direction: row;
  /* background-color: #6b3d00; */
  /* justify-content: center; */
  /* justify-items: stretch; */
  align-items: flex-end;
  align-items: center;
  align-content: center;
  margin: 2px;
`;

const NumberInput = styled(TextInput)`
  color: white;
  width: 30px;
  align-self: flex-end;
  background-color: rgba(75, 75, 75, 0.5);
  border-radius: 5px;
`;

const End = styled.View`
  /* align-self: flex-end; */
  position: absolute;
  right: 0;
`;

export const UserItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 15,
          margin: 10,
        }}
      >
        <Ionicons name={icon} size={25} color="#ffa2d5" />
        <Text style={{ color: "white", paddingLeft: 30, fontSize: 15 }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const BigUserItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 150,
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Ionicons name={icon} size={50} color="#ffa2d5" />
        <Text style={{ color: "white", fontSize: 15 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// export const ColorPicker = ({ color, userInfo }) => {
//   const [r, setR] = useState(r);
//   const [g, setG] = useState(g);
//   const [b, setB] = useState(b);

//   return (
//     <View
//       style={{
//         width: 110,
//         position: "absolute",
//         zIndex: 0,
//         top: 40,
//         right: 20,
//         borderRadius: 10,
//         padding: 10,
//         backgroundColor: "rgba(30, 20, 40, 1)",
//       }}
//     >
//       <View
//         style={{
//           width: 35,
//           // width: 100,
//           height: 35,
//           borderRadius: 50,
//           backgroundColor: `rgb(${r}, ${g}, ${b})`,
//         }}
//       />
//       <View style={{}}>
//         <Text style={{ color: "white" }}>#</Text>
//         <Row>
//           <Text style={{ color: "white" }}>Red</Text>
//           <End>
//             <NumberInput
//               placeholder={r}
//               value={r}
//               keyboardType="numeric"
//               onChangeText={(text) => setR(text.replace(/[^0-9]/g, ""))}
//             />
//           </End>
//         </Row>
//         <Row>
//           <Text style={{ color: "white" }}>Green</Text>
//           <End>
//             <NumberInput
//               keyboardType="numeric"
//               value={g}
//               onChangeText={(text) => setG(text.replace(/[^0-9]/g, ""))}
//             />
//           </End>
//         </Row>
//         <Row>
//           <Text style={{ color: "white" }}>Blue</Text>
//           <End>
//             <NumberInput
//               keyboardType="numeric"
//               value={b}
//               onChangeText={(text) => setB(text.replace(/[^0-9]/g, ""))}
//             />
//           </End>
//         </Row>
//       </View>
//     </View>
//   );
// };
