import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d32",
    title: "Ajay Malhotra",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQHYKt88jp-L4g/profile-displayphoto-shrink_800_800/0/1600283110094?e=1651104000&v=beta&t=Wc-eGKFuEWnww9axqCIR70yw1xA8ucb53RDAsgqcRQg",
    email: "ajay@immigrate.ai",
    position: "RCIC @ Immigrate.ai",
    phone: "226-799-5000",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Gurpreet Chandok",
    image: "https://i.postimg.cc/xdshNpdt/Gurpreet.jpg",
    email: "gurpreet@castlemorelaw.com",
    position: "Lawyer @ Sabio Law",
    phone: "647-555-9955",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Shireen Kapoor",
    image: "https://i.postimg.cc/hPrrGzv0/1628111154045.jpg",
    email: "shireen@ace-law.ca",
    position: "Partner @ Ace Law",
    phone: "647-555-9955",
  },

  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Rekha Samuel",
    image: "https://i.postimg.cc/NMBFLM51/1585010197285.jpg",
    email: "rekha@canmerge.net",
    position: "RCIC @ CanMerge",
    phone: "647-555-9955",
  },

  {
    id: "58694a0f-3da1-471f-bd46-145571e29d72",
    title: "Kanwar Sierah  ",
    image:
      "https://media-exp1.licdn.com/dms/image/C4E03AQHKRAfNhfL95Q/profile-displayphoto-shrink_800_800/0/1610659209134?e=1651104000&v=beta&t=zrT7iz7Iu1tI4YjmjeGFvApB6fofeW2lokKxhrZ3kE8",
    email: "ksierah@gmail.com",
    position: "RCIC @ Sierah",
    phone: "647-555-9955",
  },
];

const Agents = () => {
  const [flippedAgentIds, setFlippedAgentIds] = useState<string[]>([]);
  const renderItem = ({ item }) =>
    !flippedAgentIds.includes(item.id) ? (
      <Item
        id={item.id}
        title={item.title}
        email={item.email}
        image={item.image}
        position={item.position}
      />
    ) : (
      <FlippedAgent
        id={item.id}
        title={item.title}
        phone={item.phone}
        email={item.email}
        image={item.image}
        position={item.position}
      />
    );

  const onToggleAgentFlip = (agentId: string): void => {
    const flipped = flippedAgentIds.includes(agentId);

    if (flipped) {
      // show back (flip)
      setFlippedAgentIds(ids => ids.filter((id) => id !== agentId));
    } else {
      // show front
      setFlippedAgentIds(ids => [...ids, agentId]);
    }
  };

  const Item = ({ id, title, image, email, position }) => (
    <TouchableOpacity onPress={() => onToggleAgentFlip(id)}>
      <View style={styles.frontContainer}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.position}>{position}</Text>
        <View
          style={{
            marginLeft: "75%",
            justifyContent: "center",
            alignContent: "center",
            position: "absolute",
          }}
        >
          <Avatar.Image source={{ uri: image }} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const FlippedAgent = ({ id, title, image, email, position, phone }) => (
    <TouchableOpacity onPress={() => onToggleAgentFlip(id)}>
      <View style={styles.backContainer}>
        <View style={{ justifyContent: "center", position: "absolute" }}>
          <Text style={styles.nameBack}>{title}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.phone}>{phone}</Text>
          <View />
          <View
            style={{
              justifyContent: "center",
              position: "absolute",
              marginLeft: "5%",
            }}
          >
            <Icon name="person-circle-outline" size={18} color="#808080" />
            <Icon name="mail" size={16} color="#1982FC" />
            <Icon name="logo-whatsapp" size={16} color="#25D366" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "ios" ? height * 0 : height * 0.06,
  },
  frontContainer: {
    justifyContent: "center",
    backgroundColor: "#EFF4F6",
    height: 80,
    width: width * 0.8,
    borderRadius: 16,
    padding: 4,
    marginBottom: height * 0.013,
  },
  backContainer: {
    justifyContent: "center",
    backgroundColor: "#EFF4F6",
    height: 80,
    width: width * 0.8,
    borderRadius: 16,
    padding: 4,
    marginBottom: height * 0.013,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: width * 0.02,
  },
  position: {
    fontSize: 15,
    marginLeft: width * 0.02,
  },
  nameBack: {
    fontSize: height * 0.018,
    fontWeight: "700",
    marginLeft: width * 0.1,
  },
  email: {
    fontSize: height * 0.018,
    fontWeight: "400",
    marginLeft: width * 0.1,
  },
  phone: {
    fontSize: height * 0.018,
    fontWeight: "400",
    marginLeft: width * 0.1,
  },
});

export default Agents;
