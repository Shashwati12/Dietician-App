import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  FileText, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Smartphone
} from 'lucide-react-native';

const COLORS = {
  primary: '#6c412f',
  secondary: '#e6ccb2',
  background: '#f2e8df',
  white: '#ffffff',
  text: '#2d1b14',
  textLight: '#8b5a42',
};

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', action: 'navigate' },
        { icon: Shield, label: 'Privacy & Security', action: 'navigate' },
        { icon: Bell, label: 'Notifications', action: 'toggle', value: notificationsEnabled, onChange: setNotificationsEnabled },
      ],
    },
    {
      title: 'Practice',
      items: [
        { icon: FileText, label: 'Practice Details', action: 'navigate' },
        { icon: Settings, label: 'App Preferences', action: 'navigate' },
        { icon: Globe, label: 'Language', action: 'navigate', subtitle: 'English' },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { icon: Moon, label: 'Dark Mode', action: 'toggle', value: darkModeEnabled, onChange: setDarkModeEnabled },
        { icon: Smartphone, label: 'Display Settings', action: 'navigate' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', action: 'navigate' },
        { icon: FileText, label: 'Terms & Conditions', action: 'navigate' },
        { icon: Shield, label: 'Privacy Policy', action: 'navigate' },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity key={item.label} style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>
            <item.icon size={20} color={COLORS.primary} />
          </View>
          <View style={styles.settingText}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          {item.action === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onChange}
              trackColor={{ false: COLORS.secondary, true: COLORS.primary + '40' }}
              thumbColor={item.value ? COLORS.primary : COLORS.white}
            />
          ) : (
            <ChevronRight size={20} color={COLORS.textLight} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Doctor Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>DS</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.doctorName}>Dr. Arun Sharma</Text>
            <Text style={styles.specialization}>Ayurvedic Practitioner</Text>
            <Text style={styles.experience}>15 years experience</Text>
            <Text style={styles.location}>Mumbai, Maharashtra</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Settings size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Practice Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>142</Text>
            <Text style={styles.statLabel}>Total Patients</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
        </View>

        {/* Settings Sections */}
        {profileSections.map((section) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Dietician App v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for Ayurvedic Practice</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: 20,
    marginTop: 0,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  experience: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: 20,
    marginTop: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  settingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary + '40',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  settingSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dc2626' + '40',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 10,
    color: COLORS.textLight,
  },
});