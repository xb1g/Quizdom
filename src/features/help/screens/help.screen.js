import { View } from "react-native";
import React from "react";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";

export function HelpScreen() {
  return (
    <SafeTop>
      <Text
        variant="labelTitle"
        style={{
          fontSize: 40,
          color: "white",
        }}
      >
        License Agreement
      </Text>
      <Text variant="bodyInverse">
        {`This software is a work developed by
by Bunyasit Fang, Panas Damrongsiri, and Thanawas Sirilertsathit. from Bangkok Christian College under the provision of Nattee Thusklin under "learning tracker with quizzes, map, schedule, and community", which has been supported by the National Science and
Technology Development Agency (NSTDA), in order to encourage pupils and
students to learn and practice their skills in developing software software. Therefore, the
intellectual property of this software shall belong to the developer and the
developer gives NSTDA a permission to distribute this software as an “as is” and
nonnon-modified software for a temporary and non non-exclusive use without
remuneration to anyone for his or her own purpose or academic purpose, which
are not commercial purposes purposes. In this connection, NSTDA shall not be responsible
to the user for taking care, maintaining, training or developing the efficiency of this
software. Moreover, NSTDA shall not be liable for any error, software efficiency and
damages in connection with or arising out of the use of the software software.” `}
      </Text>
    </SafeTop>
  );
}
