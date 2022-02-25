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
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Gurpreet Chandok",
    image: "https://i.postimg.cc/xdshNpdt/Gurpreet.jpg",
    email: "gurpreet@castlemorelaw.com",
    position: "Lawyer @ Sabio Law",
    phone: "647-555-9955"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Shireen Kapoor",
    image: "https://i.postimg.cc/hPrrGzv0/1628111154045.jpg",
    email: "shireen@ace-law.ca",
    position: "Partner @ Ace Law",
    phone: "647-555-9955"

  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d32",
    title: "Ajay Malhotra",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQHYKt88jp-L4g/profile-displayphoto-shrink_800_800/0/1600283110094?e=1651104000&v=beta&t=Wc-eGKFuEWnww9axqCIR70yw1xA8ucb53RDAsgqcRQg",
    email: "ajay@tacenda.ca",
    position: "CEO @ CSC",
    phone: "647-555-9955"

  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Rekha Samuel",
    image: "https://i.postimg.cc/NMBFLM51/1585010197285.jpg",
    email: "rekha@canmerge.net",
    position: "RCIC @ CanMerge",
    phone: "647-555-9955"

  },

  {
    id: "58694a0f-3da1-471f-bd46-145571e29d72",
    title: "Kanwar Sierah  ",
    image:"https://media-exp1.licdn.com/dms/image/C4E03AQHKRAfNhfL95Q/profile-displayphoto-shrink_800_800/0/1610659209134?e=1651104000&v=beta&t=zrT7iz7Iu1tI4YjmjeGFvApB6fofeW2lokKxhrZ3kE8",
    email: "ksierah@gmail.com",
    position: "RCIC @ Sierah",
    phone: "647-555-9955"

  },
];

const Agents = () => {
  const [flippedAgentIds, setFlippedAgentIds] = useState<string[]>([])
  const renderItem = ({ item }) => (
    flippedAgentIds.includes(item.id) ? 
      <Item
      id={item.id}
      title={item.title}
      email={item.email}
      image={item.image}
      position={item.position} /> : <FlippedAgent
                                      id={item.id}
                                      title={item.title}
                                      phone={item.phone}
                                      email={item.email}
                                      image={item.image}
                                      position={item.position}/>
  );

  const onToggleAgentFlip = (agentId: string) : void => {
    const flipped = flippedAgentIds.includes(agentId)

    if (flipped) {
      // show back (flip) 
      setFlippedAgentIds([...flippedAgentIds].filter(id => id !== agentId))
    } else {
      // show front 
      setFlippedAgentIds([...flippedAgentIds, agentId])
    }
  }

  const Item = ({ id, title, image, email, position }) => (
    
    <TouchableOpacity onPress={() => onToggleAgentFlip(id)}>
      <View>
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.position}>{position}</Text>
          <Image style={styles.avatar} source={{ uri: image }} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const FlippedAgent = ({ id, title, image, email, position, phone }) => (
    
    <TouchableOpacity onPress={() => onToggleAgentFlip(id)}>
      <View>
        <View style={styles.item}>
          <Text style={styles.title2}>{title}</Text>
          <Text style={styles.email2}>{email}</Text>
          <Text style={styles.phone}>{phone}</Text>
          <View/>
          <View style = {styles.icons}>
          <Icon name= "person-circle-outline"  size={18} color="#808080" />
          <Icon name= "mail"  size={16} color="#1982FC" />
          <Icon name= "logo-whatsapp"  size={16} color="#25D366" />

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
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#ECEBF4",
    height: 75,
    width: 300,
    borderRadius: 16,
    padding: 4,
    marginHorizontal: 23,
    marginBottom: 9,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
  item1: {
    backgroundColor: "#EFF5F8",
    padding: 10,
    borderRadius: 18,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    marginLeft: 26,
    marginBottom: -30,
    marginTop: 15,
    fontWeight: "700",
    color: "#000000",
  },
  title2: {
    fontSize: 15,
    marginLeft: 35,
    marginBottom: -30,
    marginTop: 7,
    fontWeight: "700",
    color: "#000000",
  },
  title1: {
    fontSize: 20,
    lineHeight: 20,
    marginLeft: 35,
    marginBottom: -30,
    marginTop: 15,
    fontWeight: "800",
    color: "#000000",
  },
  position: {
    fontSize: 15,
    lineHeight: 78,
    marginLeft: 26,
    fontWeight: "400",
    color: "#000000",
  },
  email2: {
    fontSize: 13,
    lineHeight: 80,
    marginLeft: 35,
    fontWeight: "400",
    color: "#000000",
  },
  phone: {
    fontSize: 13,
    marginLeft: 36,
    marginTop: -16,
    fontWeight: "400",
    color: "#000000",
  },
  avatar: {
    width: 26,
    height: 65,
    borderRadius: 40,
    zIndex: 2,
    marginBottom: 15,
    marginTop: "1.8%",
    marginLeft: "73%",
    position: "absolute",
  },
  icons: {
    marginTop: -54,
    marginLeft: 8,
  },
  mail:{
    marginLeft: 100,
  }
});

export default Agents;
