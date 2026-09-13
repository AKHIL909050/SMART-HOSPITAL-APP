import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const treatments = [
  {
    name: "Cardiology",
    description: "Heart related treatments",
    icon: "heart",
    type: "ionicons",
    color: "#D95757",
    background: "#FBE7E7",
  },
  {
    name: "Orthopedics",
    description: "Bone and joint care",
    icon: "bone",
    type: "material",
    color: "#4294A6",
    background: "#E4F2F5",
  },
  {
    name: "Neurology",
    description: "Brain and nervous system",
    icon: "brain",
    type: "material",
    color: "#8554B4",
    background: "#F0E7F6",
  },
  {
    name: "Oncology",
    description: "Cancer treatment",
    icon: "dna",
    type: "material",
    color: "#9B55A9",
    background: "#F3E8F5",
  },
  {
    name: "Urology",
    description: "Kidney and urinary system",
    icon: "water-outline",
    type: "ionicons",
    color: "#4775C9",
    background: "#E7EEFB",
  },
  {
    name: "Gastroenterology",
    description: "Digestive system",
    icon: "food-apple-outline",
    type: "material",
    color: "#3C9B87",
    background: "#E3F4EF",
  },
  {
    name: "General Surgery",
    description: "Surgical treatment",
    icon: "medical-bag",
    type: "material",
    color: "#D65A4A",
    background: "#FBE8E5",
  },
];

export default function TreatmentScreen() {

  const [searchText, setSearchText] = useState("");

  const filteredTreatments = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return treatments;
    }

    return treatments.filter(
      (treatment) =>
        treatment.name.toLowerCase().includes(query) ||
        treatment.description.toLowerCase().includes(query)
    );
  }, [searchText]);

  const selectTreatment = (treatment: string) => {
    // For now we move to nearby hospitals.
    // Later we will pass the selected treatment
    // to the recommendation system.
    router.push({
      pathname: "/nearby",
      params: {
        treatment,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color="#173B42"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Select Treatment
          </Text>

          <View style={{ width: 38 }} />
        </View>

        {/* SEARCH */}

        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#718387"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search treatment..."
            placeholderTextColor="#8A9B9E"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* TREATMENTS */}

        <View style={styles.list}>
          {filteredTreatments.map((treatment) => (
            <Pressable
              key={treatment.name}
              style={styles.treatmentCard}
              onPress={() =>
                selectTreatment(treatment.name)
              }
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      treatment.background,
                  },
                ]}
              >
                {treatment.type === "material" ? (
                  <MaterialCommunityIcons
                    name={treatment.icon as any}
                    size={23}
                    color={treatment.color}
                  />
                ) : (
                  <Ionicons
                    name={treatment.icon as any}
                    size={23}
                    color={treatment.color}
                  />
                )}
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.treatmentName}>
                  {treatment.name}
                </Text>

                <Text style={styles.description}>
                  {treatment.description}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#829497"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FBFA",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 55,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173B42",
  },

  searchBar: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE8E6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 13,
    color: "#263F43",
  },

  list: {
    gap: 10,
  },

  treatmentCard: {
    minHeight: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1EBE9",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 13,

    shadowColor: "#000",
    shadowOpacity: 0.025,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 1,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  treatmentName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#30484C",
    marginBottom: 4,
  },

  description: {
    fontSize: 10,
    color: "#7A8D90",
  },
});