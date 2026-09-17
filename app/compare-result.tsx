import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function CompareResultScreen() {
  const { selectedHospitals } = useLocalSearchParams<{
    selectedHospitals?: string;
  }>();

  let hospitals: any[] = [];

  try {
    hospitals = selectedHospitals
      ? JSON.parse(selectedHospitals)
      : [];
  } catch {
    hospitals = [];
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={23} color="#263638" />
        </Pressable>

        <Text style={styles.headerTitle}>Compare Hospitals</Text>

        <View style={{ width: 23 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.treatmentRow}>
          <Text style={styles.treatmentText}>
            Treatment: <Text style={styles.bold}>Cardiology</Text>
          </Text>

          <Text style={styles.change}>Change</Text>
        </View>

        <View style={styles.card}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {hospitals.map((hospital, index) => (
              <View
                key={
                  hospital.hospital_id ??
                  hospital.id ??
                  index
                }
                style={styles.hospitalColumn}
              >
                <View style={styles.imagePlaceholder}>
                  <Ionicons
                    name="business-outline"
                    size={35}
                    color="#267D73"
                  />
                </View>

                <Text
                  style={styles.hospitalName}
                  numberOfLines={2}
                >
                  {hospital.hospital_name ?? "Hospital"}
                </Text>

                <Text style={styles.rating}>
                  ⭐ {hospital.patient_rating ?? "—"}
                </Text>
              </View>
            ))}
          </ScrollView>

          <ComparisonRow
            label="Cost (Approx.)"
            hospitals={hospitals}
            value={(h) => h.tariff_range ?? "—"}
          />

          <ComparisonRow
            label="Distance"
            hospitals={hospitals}
            value={(h) =>
              h.distance != null
                ? `${Number(h.distance).toFixed(1)} km`
                : "—"
            }
          />

          <ComparisonRow
            label="Hospital Type"
            hospitals={hospitals}
            value={(h) => h.hospital_type ?? "—"}
          />

          <ComparisonRow
            label="Accreditation"
            hospitals={hospitals}
            value={(h) => h.accreditation ?? "—"}
          />

          <ComparisonRow
            label="Patient Rating"
            hospitals={hospitals}
            value={(h) => h.patient_rating ?? "—"}
          />
        </View>

        <View style={styles.recommendation}>
          <View style={styles.bulb}>
            <Ionicons
              name="bulb-outline"
              size={22}
              color="#E9A91A"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.recommendationTitle}>
              Key Recommendation
            </Text>

            <Text style={styles.recommendationText}>
              {hospitals.length > 0
                ? `${hospitals[0].hospital_name ?? "Selected hospital"} is recommended based on quality, cost and distance.`
                : "Select hospitals to see a recommendation."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ComparisonRow({
  label,
  hospitals,
  value,
}: {
  label: string;
  hospitals: any[];
  value: (hospital: any) => string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.labelCell}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {hospitals.map((hospital, index) => (
        <View style={styles.valueCell} key={index}>
          <Text style={styles.value}>
            {value(hospital)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4FAF9",
  },

  header: {
    height: 62,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5ECEA",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#263638",
  },

  treatmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 13,
  },

  treatmentText: {
    fontSize: 12,
    color: "#536467",
  },

  bold: {
    fontWeight: "700",
    color: "#263638",
  },

  change: {
    fontSize: 12,
    fontWeight: "600",
    color: "#267D73",
  },

  card: {
    marginHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },

  hospitalColumn: {
    width: 105,
    alignItems: "center",
    marginHorizontal: 5,
  },

  imagePlaceholder: {
    width: 82,
    height: 62,
    borderRadius: 7,
    backgroundColor: "#E8F2F0",
    alignItems: "center",
    justifyContent: "center",
  },

  hospitalName: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
    color: "#263638",
    height: 28,
  },

  rating: {
    fontSize: 10,
    marginTop: 2,
    color: "#4B5557",
  },

  row: {
    flexDirection: "row",
    minHeight: 39,
    borderTopWidth: 1,
    borderTopColor: "#E8EEEC",
    alignItems: "center",
  },

  labelCell: {
    width: 100,
    paddingLeft: 5,
  },

  label: {
    fontSize: 9,
    color: "#687679",
  },

  valueCell: {
    width: 110,
    alignItems: "center",
  },

  value: {
    fontSize: 9,
    color: "#263638",
    textAlign: "center",
  },

  recommendation: {
    margin: 14,
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#EEF7F5",
    borderWidth: 1,
    borderColor: "#D8EAE6",
    flexDirection: "row",
    gap: 10,
  },

  bulb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF7DD",
    alignItems: "center",
    justifyContent: "center",
  },

  recommendationTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#425355",
  },

  recommendationText: {
    marginTop: 3,
    fontSize: 9,
    lineHeight: 14,
    color: "#6B7779",
  },
});