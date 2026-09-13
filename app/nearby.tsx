import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function NearbyScreen() {
  const { treatment } = useLocalSearchParams<{
    treatment?: string;
  }>();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="#173B42"
            />
          </Pressable>

          <Text style={styles.title}>
            Nearby Hospitals
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* MAP PLACEHOLDER */}
        <View style={styles.map}>
          <Ionicons
            name="location"
            size={42}
            color="#267D73"
          />

          <Text style={styles.mapText}>
            Map View
          </Text>

          <Text style={styles.mapSubText}>
            Hospitals near your location
          </Text>
        </View>

        {/* SELECTED TREATMENT */}
        {treatment && (
          <View style={styles.treatmentBox}>
            <Text style={styles.treatmentLabel}>
              Treatment
            </Text>

            <Text style={styles.treatment}>
              {treatment}
            </Text>
          </View>
        )}

        {/* HOSPITAL CARD */}
        <Pressable style={styles.card}>
          <View style={styles.hospitalImage}>
            <Ionicons
              name="business"
              size={35}
              color="#267D73"
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.hospitalName}>
              Sunrise Multi Specialty Hospital
            </Text>

            <Text style={styles.rating}>
              ⭐ 4.5
            </Text>

            <Text style={styles.distance}>
              📍 2.3 km • 8 min
            </Text>

            <View style={styles.tags}>
              <Text style={styles.tag}>
                Private
              </Text>

              <Text style={styles.qualityTag}>
                Good Quality
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#829497"
          />
        </Pressable>

        {/* SECOND HOSPITAL */}
        <Pressable style={styles.card}>
          <View style={styles.hospitalImage}>
            <Ionicons
              name="business"
              size={35}
              color="#267D73"
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.hospitalName}>
              City Care Hospital
            </Text>

            <Text style={styles.rating}>
              ⭐ 4.2
            </Text>

            <Text style={styles.distance}>
              📍 4.8 km • 12 min
            </Text>

            <View style={styles.tags}>
              <Text style={styles.tag}>
                Private
              </Text>

              <Text style={styles.moderateTag}>
                Moderate Quality
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#829497"
          />
        </Pressable>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173B42",
  },

  map: {
    height: 270,
    backgroundColor: "#E6F0EC",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  mapText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "700",
    color: "#267D73",
  },

  mapSubText: {
    marginTop: 5,
    fontSize: 11,
    color: "#718387",
  },

  treatmentBox: {
    backgroundColor: "#E4F6EF",
    padding: 14,
    borderRadius: 13,
    marginBottom: 12,
  },

  treatmentLabel: {
    fontSize: 10,
    color: "#718387",
  },

  treatment: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "700",
    color: "#267D73",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1EBE9",
  },

  hospitalImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  cardContent: {
    flex: 1,
  },

  hospitalName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#30484C",
    marginBottom: 5,
  },

  rating: {
    fontSize: 11,
    color: "#D29520",
    marginBottom: 3,
  },

  distance: {
    fontSize: 10,
    color: "#718387",
  },

  tags: {
    flexDirection: "row",
    marginTop: 7,
    gap: 5,
  },

  tag: {
    fontSize: 9,
    backgroundColor: "#EAF0F2",
    color: "#496067",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },

  qualityTag: {
    fontSize: 9,
    backgroundColor: "#DFF3E8",
    color: "#267D73",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },

  moderateTag: {
    fontSize: 9,
    backgroundColor: "#FFF0D9",
    color: "#A16D18",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },
});