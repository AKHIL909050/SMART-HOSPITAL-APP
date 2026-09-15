import { Stack, useLocalSearchParams } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  // =====================================================
  // BASIC INFORMATION
  // =====================================================

  const name =
    params.name?.toString() || "Unknown Hospital";

  const address =
    params.address?.toString() || "Address not available";

  const district =
    params.district?.toString() || "Not available";

  const pincode =
    params.pincode?.toString() || "Not available";

  const hospitalType =
    params.hospital_type?.toString() || "Not available";

  const careType =
    params.care_type?.toString() || "Not available";

  // =====================================================
  // HOSPITAL DATA
  // =====================================================

  const specialties =
    params.specialties?.toString() || "Not available";

  const facilities =
    params.facilities?.toString() || "Not available";

  const accreditation =
    params.accreditation?.toString() || "Not available";

  const establishedYear =
    params.established_year?.toString() || "Not available";

  const doctorsCount =
    params.doctors_count?.toString() || "Not available";

  const specialistsCount =
    params.specialists_count?.toString() || "Not available";

  const totalBeds =
    params.total_beds?.toString() || "Not available";

  const emergencyServices =
    params.emergency_services?.toString() || "Not available";

  const telephone =
    params.telephone?.toString() || "Not available";

  const emergencyNumber =
    params.emergency_number?.toString() || "Not available";

  const website =
    params.website?.toString() || "Not available";

  const ayush =
    params.ayush?.toString() || "Not available";

  const formatList = (text: string) => {
    return text
      .split(/\\n|,/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };
  // =====================================================
  // OPEN WEBSITE
  // =====================================================

  const openWebsite = async () => {
    if (
      !website ||
      website === "Not available"
    ) {
      return;
    }

    let url = website.trim();

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = `https://${url}`;
    }

    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(
        "Could not open hospital website",
        error
      );
    }
  };

  // =====================================================
  // CALL HOSPITAL
  // =====================================================

  const callHospital = async () => {
    if (
      !telephone ||
      telephone === "Not available"
    ) {
      return;
    }

    try {
      await Linking.openURL(
        `tel:${telephone}`
      );
    } catch (error) {
      console.log(
        "Could not call hospital",
        error
      );
    }
  };

  // =====================================================
  // CALL EMERGENCY
  // =====================================================

  const callEmergency = async () => {
    if (
      !emergencyNumber ||
      emergencyNumber === "Not available"
    ) {
      return;
    }

    try {
      await Linking.openURL(
        `tel:${emergencyNumber}`
      );
    } catch (error) {
      console.log(
        "Could not call emergency number",
        error
      );
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <>
      <Stack.Screen
        options={{
          title: "Hospital Details",
        }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <View style={styles.hospitalIconBox}>
            <Text style={styles.hospitalIcon}>
              🏥
            </Text>
          </View>

          <Text style={styles.title}>
            {name}
          </Text>

          <Text style={styles.location}>
            📍 {district}
          </Text>
        </View>

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📋 Hospital Information
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              📍 Address
            </Text>

            <Text style={styles.value}>
              {address}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🏙️ District
            </Text>

            <Text style={styles.value}>
              {district}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              📮 Pincode
            </Text>

            <Text style={styles.value}>
              {pincode}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🏥 Hospital Type
            </Text>

            <Text style={styles.value}>
              {hospitalType}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🩺 Care Type
            </Text>

            <Text style={styles.value}>
              {careType}
            </Text>
          </View>
        </View>

        {/* =================================================
            MEDICAL SERVICES
        ================================================= */}

    {/* MEDICAL SERVICES */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        🩺 Medical Specialties
      </Text>

      {formatList(specialties).map((item, index) => (
        <View style={styles.listItem} key={index}>
          <Text style={styles.bullet}>•</Text>
      
          <Text style={styles.listText}>
            {item}
          </Text>
        </View>
      ))}
    </View>

        {/* =================================================
            FACILITIES
        ================================================= */}

    {/* FACILITIES */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        🏢 Facilities
      </Text>

      {formatList(facilities).map((item, index) => (
        <View style={styles.listItem} key={index}>
          <Text style={styles.bullet}>•</Text>
      
          <Text style={styles.listText}>
            {item}
          </Text>
        </View>
      ))}
    </View>

        {/* =================================================
            HOSPITAL DETAILS
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📊 Hospital Details
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🏅 Accreditation
            </Text>

            <Text style={styles.value}>
              {accreditation}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              📅 Established
            </Text>

            <Text style={styles.value}>
              {establishedYear}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              👨‍⚕️ Doctors
            </Text>

            <Text style={styles.value}>
              {doctorsCount}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              👨‍⚕️ Specialists
            </Text>

            <Text style={styles.value}>
              {specialistsCount}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🛏️ Total Beds
            </Text>

            <Text style={styles.value}>
              {totalBeds}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🚑 Emergency Services
            </Text>

            <Text style={styles.value}>
              {emergencyServices}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🌿 AYUSH
            </Text>

            <Text style={styles.value}>
              {ayush}
            </Text>
          </View>
        </View>

        {/* =================================================
            CONTACT
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📞 Contact Information
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              ☎️ Telephone
            </Text>

            <Text style={styles.value}>
              {telephone}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              🚨 Emergency Number
            </Text>

            <Text style={styles.value}>
              {emergencyNumber}
            </Text>
          </View>

          {telephone !== "Not available" && (
            <Pressable
              style={styles.actionButton}
              onPress={callHospital}
            >
              <Text style={styles.actionButtonText}>
                📞 Call Hospital
              </Text>
            </Pressable>
          )}

          {emergencyNumber !== "Not available" && (
            <Pressable
              style={styles.emergencyButton}
              onPress={callEmergency}
            >
              <Text style={styles.emergencyButtonText}>
                🚨 Call Emergency
              </Text>
            </Pressable>
          )}
        </View>

        {/* =================================================
            WEBSITE
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🌐 Hospital Website
          </Text>

          <Text style={styles.description}>
            {website}
          </Text>

          {website !== "Not available" && (
            <Pressable
              style={styles.actionButton}
              onPress={openWebsite}
            >
              <Text style={styles.actionButtonText}>
                🌐 Open Website
              </Text>
            </Pressable>
          )}
        </View>

        {/* =================================================
            DISTANCE
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📏 Distance
          </Text>

          <Text style={styles.comingSoon}>
            Distance calculation coming soon
          </Text>

          <Text style={styles.note}>
            We will add hospital coordinates and
            calculate the distance from your current
            location later.
          </Text>
        </View>

        {/* =================================================
            TREATMENT COST
        ================================================= */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            💰 Treatment Cost
          </Text>

          <Text style={styles.comingSoon}>
            Coming soon
          </Text>

          <Text style={styles.note}>
            Treatment pricing will be added using
            the hospital tariff information later.
          </Text>
        </View>

        {/* =================================================
            FUTURE FEATURES
        ================================================= */}

        <View style={styles.futureBox}>
          <Text style={styles.futureTitle}>
            🚀 Coming Soon
          </Text>

          <Text style={styles.futureText}>
            • Real-time traffic
          </Text>

          <Text style={styles.futureText}>
            • Estimated travel time
          </Text>

          <Text style={styles.futureText}>
            • Hospital reviews
          </Text>

          <Text style={styles.futureText}>
            • Advanced recommendation scoring
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#F8FBFA",
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  hospitalIconBox: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: "#EAF5F3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  hospitalIcon: {
    fontSize: 43,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#173B3A",
    textAlign: "center",
    marginBottom: 7,
  },

  location: {
    fontSize: 14,
    color: "#718387",
    textAlign: "center",
  },

  // ===================================================
  // CARDS
  // ===================================================

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2EBE9",
    borderRadius: 16,
    padding: 17,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173B3A",
    marginBottom: 14,
  },

  // ===================================================
  // INFORMATION
  // ===================================================

  infoRow: {
    marginBottom: 13,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  
  bullet: {
    fontSize: 16,
    color: "#267D73",
    marginRight: 8,
    lineHeight: 21,
  },
  
  listText: {
    flex: 1,
    fontSize: 14,
    color: "#30484C",
    lineHeight: 21,
  },

  label: {
    fontSize: 12,
    color: "#718387",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#30484C",
    lineHeight: 21,
  },

  description: {
    fontSize: 14,
    color: "#30484C",
    lineHeight: 22,
  },

  // ===================================================
  // BUTTONS
  // ===================================================

  actionButton: {
    backgroundColor: "#267D73",
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  emergencyButton: {
    backgroundColor: "#C0392B",
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 9,
  },

  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  // ===================================================
  // COMING SOON
  // ===================================================

  comingSoon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#267D73",
    marginBottom: 5,
  },

  note: {
    fontSize: 12,
    color: "#718387",
    lineHeight: 18,
  },

  // ===================================================
  // FUTURE FEATURES
  // ===================================================

  futureBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2EBE9",
    borderRadius: 16,
    padding: 17,
    marginTop: 3,
  },

  futureTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173B3A",
    marginBottom: 11,
  },

  futureText: {
    fontSize: 13,
    color: "#718387",
    marginBottom: 7,
  },
});