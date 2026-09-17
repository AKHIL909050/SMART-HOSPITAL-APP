import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const filters = [
  {
    title: "Location",
    subtitle: "Near me / Enter location",
    icon: "location",
    color: "#2875D4",
    background: "#E6F1FF",
  },
  {
    title: "Hospital Type",
    subtitle: "Government / Private / Both",
    icon: "hospital-building",
    color: "#267D73",
    background: "#E4F6EF",
  },
  {
    title: "Max Cost",
    subtitle: "Any range",
    icon: "cash-outline",
    color: "#C18A18",
    background: "#FFF3DF",
  },
  {
    title: "Quality / Accreditation",
    subtitle: "Any",
    icon: "shield-check",
    color: "#8554B4",
    background: "#F1E8F7",
  },
  {
    title: "Distance",
    subtitle: "Within 50 KM",
    icon: "map-marker-distance",
    color: "#26917D",
    background: "#E2F4EF",
  },
];

export default function SearchScreen() {
  const { search } = useLocalSearchParams();

const [searchText, setSearchText] = useState(
  typeof search === "string" ? search : ""
);

  /*
   * If another page sends a search value,
   * put that value into the search box.
   */
  /*
   * Send the treatment/service to the Result page.
   */
  const searchHospitals = (treatment?: string) => {
    const query = (treatment ?? searchText).trim();

    if (!query) {
      Alert.alert(
        "Search",
        "Please enter a treatment or hospital service."
      );
      return;
    }

    router.push({
      pathname: "/result",
      params: {
        search: query,
      },
    });
  };

  /*
   * Popular treatment buttons.
   */
  const selectTreatment = (treatment: string) => {
    setSearchText(treatment);
    searchHospitals(treatment);
  };

  /*
   * Clear the search box.
   */
  const resetSearch = () => {
    setSearchText("");
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              Search Hospitals
            </Text>

            <Text style={styles.headerSubtitle}>
              Find the right hospital for your treatment
            </Text>
          </View>
        </View>

        {/* SEARCH BAR */}

        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={21}
            color="#718387"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search for treatment (e.g. Cardiology)"
            placeholderTextColor="#87999C"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={() => searchHospitals()}
          />

          <Pressable
            style={styles.searchButton}
            onPress={() => searchHospitals()}
          >
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {/* FILTERS */}

        <Text style={styles.sectionTitle}>
          Search Filters
        </Text>

        {filters.map((filter) => (
          <Pressable
            key={filter.title}
            style={styles.filterCard}
            onPress={() => {
              Alert.alert(
                filter.title,
                "This filter will be connected to hospital search next."
              );
            }}
          >
            <View
              style={[
                styles.filterIcon,
                {
                  backgroundColor: filter.background,
                },
              ]}
            >
              {filter.icon === "location" && (
                <Ionicons
                  name="location"
                  size={23}
                  color={filter.color}
                />
              )}

              {filter.icon === "cash-outline" && (
                <Ionicons
                  name="cash-outline"
                  size={23}
                  color={filter.color}
                />
              )}

              {filter.icon !== "location" &&
                filter.icon !== "cash-outline" && (
                  <MaterialCommunityIcons
                    name={filter.icon as any}
                    size={23}
                    color={filter.color}
                  />
                )}
            </View>

            <View style={styles.filterText}>
              <Text style={styles.filterTitle}>
                {filter.title}
              </Text>

              <Text style={styles.filterSubtitle}>
                {filter.subtitle}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color="#9AA8AA"
            />
          </Pressable>
        ))}

        {/* POPULAR TREATMENTS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Popular Treatments
          </Text>
        </View>

        <View style={styles.treatmentGrid}>
          {/* CARDIOLOGY */}

          <Pressable
            style={styles.treatmentChip}
            onPress={() => selectTreatment("Cardiology")}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color="#267D73"
            />

            <Text style={styles.treatmentText}>
              Cardiology
            </Text>
          </Pressable>

          {/* ORTHOPEDICS */}

          <Pressable
            style={styles.treatmentChip}
            onPress={() => selectTreatment("Orthopedics")}
          >
            <MaterialCommunityIcons
              name="bone"
              size={20}
              color="#267D73"
            />

            <Text style={styles.treatmentText}>
              Orthopedics
            </Text>
          </Pressable>

          {/* NEUROLOGY */}

          <Pressable
            style={styles.treatmentChip}
            onPress={() => selectTreatment("Neurology")}
          >
            <MaterialCommunityIcons
              name="brain"
              size={20}
              color="#267D73"
            />

            <Text style={styles.treatmentText}>
              Neurology
            </Text>
          </Pressable>

          {/* ONCOLOGY */}

          <Pressable
            style={styles.treatmentChip}
            onPress={() => selectTreatment("Oncology")}
          >
            <MaterialCommunityIcons
              name="ribbon"
              size={20}
              color="#267D73"
            />

            <Text style={styles.treatmentText}>
              Oncology
            </Text>
          </Pressable>
        </View>

        {/* CLEAR SEARCH */}

        {searchText.trim().length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={resetSearch}
          >
            <Text style={styles.clearText}>
              Clear Search
            </Text>
          </Pressable>
        )}
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
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#173B42",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#718387",
    marginTop: 5,
  },

  searchBar: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2EBE9",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 6,
    marginBottom: 24,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#263F43",
    paddingHorizontal: 10,
  },

  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#267D73",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#203F44",
  },

  filterCard: {
    minHeight: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E4ECEA",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
  },

  filterIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  filterText: {
    flex: 1,
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#30484C",
  },

  filterSubtitle: {
    fontSize: 11,
    color: "#718387",
    marginTop: 3,
  },

  treatmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  treatmentChip: {
    width: "48%",
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1EBE9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  treatmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#30484C",
    marginLeft: 9,
  },

  clearButton: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  clearText: {
    color: "#718387",
    fontSize: 12,
    fontWeight: "600",
  },
});