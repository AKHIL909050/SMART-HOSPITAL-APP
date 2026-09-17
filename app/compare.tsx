import { Ionicons } from "@expo/vector-icons";
import {
    router,
    useLocalSearchParams,
} from "expo-router";
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

export default function CompareScreen() {
    const params = useLocalSearchParams();
    
    const initialTreatment =
      typeof params.search === "string"
        ? params.search
        : "";
    
    const initialSelectedHospitals = (() => {
      if (typeof params.selectedHospitals !== "string") {
        return [];
      }
  
      try {
        const parsed = JSON.parse(params.selectedHospitals);
    
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.log("COMPARE HOSPITAL PARSE ERROR:", error);
        return [];
      }
    })();
    
    const [selectedHospitalList, setSelectedHospitalList] =
      useState<any[]>(initialSelectedHospitals);
    
    const [treatment, setTreatment] =
      useState(initialTreatment);
    
    const selectTreatment = (value: string) => {
      setTreatment(value);
    };
    
    const addHospital = () => {
      if (!treatment.trim()) {
        Alert.alert(
          "Select Treatment",
          "Please select or enter a treatment first."
        );
        return;
      }
  
      if (selectedHospitalList.length >= 5) {
        Alert.alert(
          "Maximum Reached",
          "You can compare up to 5 hospitals."
        );
        return;
      }
  
      router.push({
        pathname: "/result",
        params: {
          search: treatment.trim(),
          compareMode: "true",
          selectedHospitals: JSON.stringify(
            selectedHospitalList
          ),
        },
      });
    };
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#173B3A"
            />
          </Pressable>

          <Text style={styles.title}>
            Compare Hospitals
          </Text>
        </View>

        {/* INTRO */}
        <View style={styles.introBox}>
          <View style={styles.introIcon}>
            <Ionicons
              name="git-compare-outline"
              size={28}
              color="#8B57B5"
            />
          </View>

          <View style={styles.introText}>
            <Text style={styles.introTitle}>
              Compare hospitals
            </Text>

            <Text style={styles.introSubtitle}>
              Select a treatment and add hospitals
              to compare their details.
            </Text>
          </View>
        </View>

        {/* TREATMENT */}
        <Text style={styles.sectionTitle}>
          Select Treatment
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="medical-outline"
            size={21}
            color="#6D8589"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter treatment"
            placeholderTextColor="#8A9B9E"
            value={treatment}
            onChangeText={setTreatment}
            autoCapitalize="words"
          />

          {treatment.length > 0 && (
            <Pressable
              onPress={() => setTreatment("")}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#8A9B9E"
              />
            </Pressable>
          )}
        </View>

        {/* POPULAR TREATMENTS */}
        <Text style={styles.smallTitle}>
          Popular Treatments
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.treatmentRow}
        >
          <Pressable
            style={[
              styles.treatmentChip,
              treatment === "Cardiology" &&
                styles.selectedChip,
            ]}
            onPress={() =>
              selectTreatment("Cardiology")
            }
          >
            <Ionicons
              name="heart-outline"
              size={17}
              color={
                treatment === "Cardiology"
                  ? "#FFFFFF"
                  : "#8B57B5"
              }
            />

            <Text
              style={[
                styles.chipText,
                treatment === "Cardiology" &&
                  styles.selectedChipText,
              ]}
            >
              Cardiology
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.treatmentChip,
              treatment === "Orthopedics" &&
                styles.selectedChip,
            ]}
            onPress={() =>
              selectTreatment("Orthopedics")
            }
          >
            <Ionicons
              name="body-outline"
              size={17}
              color={
                treatment === "Orthopedics"
                  ? "#FFFFFF"
                  : "#8B57B5"
              }
            />

            <Text
              style={[
                styles.chipText,
                treatment === "Orthopedics" &&
                  styles.selectedChipText,
              ]}
            >
              Orthopedics
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.treatmentChip,
              treatment === "Neurology" &&
                styles.selectedChip,
            ]}
            onPress={() =>
              selectTreatment("Neurology")
            }
          >
            <Ionicons
              name="fitness-outline"
              size={17}
              color={
                treatment === "Neurology"
                  ? "#FFFFFF"
                  : "#8B57B5"
              }
            />

            <Text
              style={[
                styles.chipText,
                treatment === "Neurology" &&
                  styles.selectedChipText,
              ]}
            >
              Neurology
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.treatmentChip,
              treatment === "Oncology" &&
                styles.selectedChip,
            ]}
            onPress={() =>
              selectTreatment("Oncology")
            }
          >
            <Ionicons
              name="pulse-outline"
              size={17}
              color={
                treatment === "Oncology"
                  ? "#FFFFFF"
                  : "#8B57B5"
              }
            />

            <Text
              style={[
                styles.chipText,
                treatment === "Oncology" &&
                  styles.selectedChipText,
              ]}
            >
              Oncology
            </Text>
          </Pressable>
        </ScrollView>

        {/* HOSPITALS */}
        <Text style={styles.sectionTitle}>
          Hospitals to Compare
        </Text>

        <View style={styles.emptyHospitalBox}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="business-outline"
              size={30}
              color="#8B57B5"
            />
          </View>

          <Text style={styles.emptyTitle}>
            No hospitals added yet
          </Text>

          <Text style={styles.emptyText}>
            Add hospitals one by one from the
            treatment results.
          </Text>
        </View>

        {/* ADD HOSPITAL */}
        <Pressable
          style={[
            styles.addButton,
            !treatment.trim() &&
              styles.disabledButton,
          ]}
          onPress={addHospital}
        >
          <Ionicons
            name="add"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.addButtonText}>
            Add Hospital
          </Text>
        </Pressable>

        {/* INFO */}
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#8B57B5"
          />

          <Text style={styles.infoText}>
            Add at least 2 hospitals to compare.
            You can compare up to 5 hospitals.
          </Text>
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
    paddingTop: 52,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#173B3A",
  },

  introBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4EFF9",
    borderRadius: 17,
    padding: 16,
    marginBottom: 28,
  },

  introIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  introText: {
    flex: 1,
  },

  introTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3D3150",
    marginBottom: 4,
  },

  introSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6F6578",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#173B3A",
    marginBottom: 10,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#718387",
    marginTop: 18,
    marginBottom: 10,
  },

  inputContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DDE7E5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#173B3A",
  },

  treatmentRow: {
    paddingBottom: 25,
  },

  treatmentChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCCFE8",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 9,
  },

  selectedChip: {
    backgroundColor: "#8B57B5",
    borderColor: "#8B57B5",
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#70459A",
    marginLeft: 6,
  },

  selectedChipText: {
    color: "#FFFFFF",
  },

  emptyHospitalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E2EBE9",
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F4EFF9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#344F4E",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 13,
    color: "#718387",
    textAlign: "center",
    lineHeight: 19,
  },

  addButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#8B57B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.45,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4EFF9",
    borderRadius: 13,
    padding: 13,
    marginTop: 18,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#6F6578",
    marginLeft: 9,
  },
});