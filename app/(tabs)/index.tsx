
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  Users, 
  FileText, 
  Activity,
  Stethoscope,
  Leaf,
  TrendingUp,
  Clock
} from 'lucide-react-native';
import { getData } from '@/utils/storage';

const COLORS = {
  primary: '#6c412f',
  secondary: '#e6ccb2',
  background: '#f2e8df',
  white: '#ffffff',
  text: '#2d1b14',
  textLight: '#8b5a42',
};

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const loadUser = async () => {
      const user = await getData('currentUser');
      if (user?.name) {
        setUserName(user.name);
      }
    };
    loadUser();
  }, []);

  const navigationCards = [
    {
      title: 'Appointments',
      subtitle: 'Today: 5 scheduled',
      icon: Calendar,
      color: '#4f46e5',
      route: '/appointments',
    },
    {
      title: 'Patients',
      subtitle: '142 active patients',
      icon: Users,
      color: '#059669',
      route: '/patients',
    },
    {
      title: 'Diet Plans',
      subtitle: 'Ayurvedic nutrition',
      icon: Leaf,
      color: '#dc2626',
      route: '/diet-plans',
    },
    {
      title: 'Reports',
      subtitle: 'Patient progress',
      icon: FileText,
      color: '#7c2d12',
      route: '/reports',
    },
    {
      title: 'Consultations',
      subtitle: 'Video & voice calls',
      icon: Stethoscope,
      color: '#1d4ed8',
      route: '/consultations',
    },
    {
      title: 'Analytics',
      subtitle: 'Practice insights',
      icon: TrendingUp,
      color: '#9333ea',
      route: '/analytics',
    },
  ];

  const quickStats = [
    { label: 'Today\'s Appointments', value: '8', icon: Clock, color: '#059669' },
    { label: 'Active Patients', value: '142', icon: Users, color: '#4f46e5' },
    { label: 'Pending Reports', value: '3', icon: Activity, color: '#dc2626' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste{userName ? `, ${userName}` : ''}</Text>
            <Text style={styles.subtitle}>Your Ayurvedic practice awaits</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Navigation Cards */}
        <View style={styles.cardsContainer}>
          {navigationCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navigationCard}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <card.icon size={24} color={card.color} />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>New appointment booked by Priya Singh</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Diet plan updated for Raj Kumar</Text>
                <Text style={styles.activityTime}>15 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Lab report received for Maya Patel</Text>
                <Text style={styles.activityTime}>1 hour ago</Text>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  navigationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  recentActivity: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary + '40',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});