import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Leaf, Heart, Users, Calendar } from "lucide-react-native";

const COLORS = {
  primary: "#6c412f",
  secondary: "#e6ccb2",
  background: "#f2e8df",
  white: "#ffffff",
  text: "#2d1b14",
  textLight: "#8b5a42",
};

const { width, height } = Dimensions.get("window");

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <Leaf size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.appTitle}>Dietician App</Text>
        <Text style={styles.subtitle}>Ayurvedic Health & Wellness</Text>
      </View>

      {/* Features Section - 2x2 Grid */}
      <View style={styles.featuresSection}>
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Heart size={24} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Holistic Care</Text>
            <Text style={styles.featureDescription}>
              Traditional Ayurvedic wisdom
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Users size={24} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Patient Management</Text>
            <Text style={styles.featureDescription}>
              Complete EHR system
            </Text>
          </View>
        </View>

        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Leaf size={24} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Diet Planning</Text>
            <Text style={styles.featureDescription}>
              Customized nutrition plans
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Calendar size={24} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Appointments</Text>
            <Text style={styles.featureDescription}>
              Schedule & track visits
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.welcomeText}>
          Welcome to your comprehensive Ayurvedic practice management system
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/login" as any)}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/signup" as any)}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternDot, { top: "10%", left: "15%" }]} />
        <View style={[styles.patternDot, { top: "25%", right: "20%" }]} />
        <View style={[styles.patternDot, { top: "45%", left: "10%" }]} />
        <View style={[styles.patternDot, { top: "65%", right: "15%" }]} />
        <View style={[styles.patternDot, { bottom: "20%", left: "25%" }]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
  featuresSection: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  featureItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 8,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 16,
  },
  bottomSection: {
    alignItems: "center",
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  patternDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    opacity: 0.3,
  },
});