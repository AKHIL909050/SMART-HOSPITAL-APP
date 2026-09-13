import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

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

export default function ExploreScreen() {
  const { search } =
    useLocalSearchParams<{ search?: string }>();

  const [searchText, setSearchText] =
    useState(search ?? "");

  const openTreatmentSelection = () => {
    router.push("/treatment");
  };

  const applyFilters = () => {
    if (!searchText.trim()) {
      router.push("/treatment");
      return;
    }
  
    router.push({
      pathname: "/treatment",
      params: {
        search: searchText.trim(),
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
            Search Hospitals
          </Text>

          <View style={{ width: 38 }} />
        </View>

        {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#6D8589"
        />
      
        <TextInput
          style={styles.searchInput}
          placeholder="Search for treatment (e.g. Cardiology)"
          placeholderTextColor="#87999C"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={openTreatmentSelection}
        />
      
        <Pressable
          onPress={openTreatmentSelection}
          style={styles.searchButton}
        >
          <Ionicons
            name="arrow-forward"
            size={19}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

        {/* FILTER HEADER */}
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>
            Filter by
          </Text>

          <Pressable>
            <Text style={styles.resetText}>
              Reset
            </Text>
          </Pressable>
        </View>

        {/* FILTERS */}
        <View style={styles.filterContainer}>
          {filters.map((filter, index) => (
            <Pressable
              key={filter.title}
              style={styles.filterCard}
              onPress={() => {
                console.log("Selected filter:", filter.title);
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
                {filter.icon === "hospital-building" ||
                filter.icon === "shield-check" ||
                filter.icon === "map-marker-distance" ? (
                  <MaterialCommunityIcons
                    name={filter.icon as any}
                    size={21}
                    color={filter.color}
                  />
                ) : (
                  <Ionicons
                    name={filter.icon as any}
                    size={21}
                    color={filter.color}
                  />
                )}
              </View>

              <View style={styles.filterTextContainer}>
                <Text style={styles.filterName}>
                  {filter.title}
                </Text>

                <Text style={styles.filterSubtitle}>
                  {filter.subtitle}
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

        {/* APPLY BUTTON */}
        <Pressable
          style={styles.applyButton}
          onPress={applyFilters}
        >
          <Text style={styles.applyButtonText}>
            Apply Filters
          </Text>
        </Pressable>

        {/* POPULAR SEARCHES */}
        <View style={styles.popularSection}>
          <Text style={styles.popularTitle}>
            Popular Treatments
          </Text>

          <View style={styles.treatmentGrid}>
            <Pressable
              style={styles.treatmentChip}
              onPress={openTreatmentSelection}
            >
              <View
                style={[
                  styles.chipIcon,
                  { backgroundColor: "#FBE7E7" },
                ]}
              >
                <Ionicons
                  name="heart"
                  size={17}
                  color="#D95757"
                />
              </View>

              <Text style={styles.chipText}>
                Cardiology
              </Text>
            </Pressable>

            <Pressable
              style={styles.treatmentChip}
              onPress={openTreatmentSelection}
            >
              <View
                style={[
                  styles.chipIcon,
                  { backgroundColor: "#E4F2F5" },
                ]}
              >
                <MaterialCommunityIcons
                  name="bone"
                  size={18}
                  color="#4294A6"
                />
              </View>

              <Text style={styles.chipText}>
                Orthopedics
              </Text>
            </Pressable>

            <Pressable
              style={styles.treatmentChip}
              onPress={openTreatmentSelection}
            >
              <View
                style={[
                  styles.chipIcon,
                  { backgroundColor: "#F0E7F6" },
                ]}
              >
                <MaterialCommunityIcons
                  name="brain"
                  size={18}
                  color="#8554B4"
                />
              </View>

              <Text style={styles.chipText}>
                Neurology
              </Text>
            </Pressable>

            <Pressable
              style={styles.treatmentChip}
              onPress={openTreatmentSelection}
            >
              <View
                style={[
                  styles.chipIcon,
                  { backgroundColor: "#E0F2F2" },
                ]}
              >
                <Ionicons
                  name="pulse"
                  size={18}
                  color="#3D9BA0"
                />
              </View>

              <Text style={styles.chipText}>
                Oncology
              </Text>
            </Pressable>
          </View>
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

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173B42",
  },

  /* SEARCH */

  searchBar: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE8E6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 24,

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
    fontSize: 13,
    color: "#263F43",
    marginLeft: 9,
  },

  /* FILTER HEADER */

  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  filterTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#203F44",
  },

  resetText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#267D73",
  },

  /* FILTER CARDS */

  filterContainer: {
    gap: 10,
  },

  filterCard: {
    minHeight: 68,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2EBE9",

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

  filterIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  filterTextContainer: {
    flex: 1,
  },

  filterName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#30484C",
    marginBottom: 4,
  },

  filterSubtitle: {
    fontSize: 10,
    color: "#809093",
  },

  /* APPLY */

  applyButton: {
    height: 49,
    backgroundColor: "#267D73",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  /* POPULAR */

  popularSection: {
    marginTop: 28,
  },

  popularTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#203F44",
    marginBottom: 13,
  },

  treatmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  treatmentChip: {
    width: "48%",
    minHeight: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E4ECEA",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
  },

  chipIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  searchButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#267D73",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#40585C",
  },
});