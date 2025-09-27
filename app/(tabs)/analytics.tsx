import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Activity,
  DollarSign,
  FileText,
  Clock,
  Star
} from 'lucide-react-native';

const COLORS = {
  primary: '#6c412f',
  secondary: '#e6ccb2',
  background: '#f2e8df',
  white: '#ffffff',
  text: '#2d1b14',
  textLight: '#8b5a42',
};

const { width } = Dimensions.get('window');

export default function Analytics() {
  const metrics = [
    {
      title: 'Total Patients',
      value: '142',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: '#059669',
    },
    {
      title: 'Monthly Revenue',
      value: '₹45,280',
      change: '+8.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: '#4f46e5',
    },
    {
      title: 'Appointments',
      value: '89',
      change: '+5.2%',
      changeType: 'positive',
      icon: Calendar,
      color: '#dc2626',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Star,
      color: '#f59e0b',
    },
  ];

  const constitutionData = [
    { type: 'Vata', count: 45, percentage: 32, color: '#8b5cf6' },
    { type: 'Pitta', count: 52, percentage: 37, color: '#f59e0b' },
    { type: 'Kapha', count: 31, percentage: 22, color: '#10b981' },
    { type: 'Mixed', count: 14, percentage: 9, color: '#6b7280' },
  ];

  const treatmentEffectiveness = [
    { treatment: 'Panchakarma', effectiveness: 92, patients: 28 },
    { treatment: 'Dietary Changes', effectiveness: 87, patients: 65 },
    { treatment: 'Herbal Medicine', effectiveness: 89, patients: 42 },
    { treatment: 'Yoga Therapy', effectiveness: 94, patients: 35 },
    { treatment: 'Meditation', effectiveness: 91, patients: 38 },
  ];

  const recentInsights = [
    {
      title: 'Pitta Constitution Trend',
      description: 'Increase in Pitta patients during summer months',
      impact: 'High',
      color: '#f59e0b',
    },
    {
      title: 'Treatment Success',
      description: 'Panchakarma showing 92% effectiveness rate',
      impact: 'High',
      color: '#10b981',
    },
    {
      title: 'Patient Retention',
      description: 'Follow-up appointments increased by 15%',
      impact: 'Medium',
      color: '#4f46e5',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <TouchableOpacity style={styles.exportButton}>
            <FileText size={20} color={COLORS.primary} />
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <metric.icon size={20} color={metric.color} />
                </View>
                <View style={[styles.changeIndicator, 
                  metric.changeType === 'positive' ? styles.positiveChange : styles.negativeChange
                ]}>
                  <Text style={[styles.changeText, 
                    { color: metric.changeType === 'positive' ? '#10b981' : '#dc2626' }
                  ]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
          ))}
        </View>

        {/* Patient Constitution Distribution */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Patient Constitution Distribution</Text>
          <View style={styles.constitutionChart}>
            {constitutionData.map((item, index) => (
              <View key={index} style={styles.constitutionItem}>
                <View style={styles.constitutionBar}>
                  <View 
                    style={[
                      styles.constitutionProgress, 
                      { 
                        backgroundColor: item.color,
                        width: `${item.percentage}%`
                      }
                    ]} 
                  />
                </View>
                <View style={styles.constitutionInfo}>
                  <Text style={styles.constitutionType}>{item.type}</Text>
                  <Text style={styles.constitutionCount}>{item.count} patients ({item.percentage}%)</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Treatment Effectiveness */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Treatment Effectiveness</Text>
          <View style={styles.treatmentList}>
            {treatmentEffectiveness.map((treatment, index) => (
              <View key={index} style={styles.treatmentItem}>
                <View style={styles.treatmentInfo}>
                  <Text style={styles.treatmentName}>{treatment.treatment}</Text>
                  <Text style={styles.treatmentPatients}>{treatment.patients} patients</Text>
                </View>
                <View style={styles.treatmentEffectiveness}>
                  <View style={styles.effectivenessBar}>
                    <View 
                      style={[
                        styles.effectivenessProgress, 
                        { width: `${treatment.effectiveness}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.effectivenessText}>{treatment.effectiveness}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Insights */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Recent Insights</Text>
          <View style={styles.insightsList}>
            {recentInsights.map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <View style={[styles.insightIndicator, { backgroundColor: insight.color }]} />
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightDescription}>{insight.description}</Text>
                  <View style={[styles.impactBadge, { backgroundColor: insight.color + '20' }]}>
                    <Text style={[styles.impactText, { color: insight.color }]}>{insight.impact} Impact</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Overview */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Monthly Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <Activity size={24} color={COLORS.primary} />
              <Text style={styles.overviewValue}>8.5</Text>
              <Text style={styles.overviewLabel}>Avg Daily Patients</Text>
            </View>
            <View style={styles.overviewItem}>
              <Clock size={24} color={COLORS.primary} />
              <Text style={styles.overviewValue}>45m</Text>
              <Text style={styles.overviewLabel}>Avg Consultation</Text>
            </View>
            <View style={styles.overviewItem}>
              <TrendingUp size={24} color={COLORS.primary} />
              <Text style={styles.overviewValue}>92%</Text>
              <Text style={styles.overviewLabel}>Patient Satisfaction</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  exportText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  metricCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  positiveChange: {
    backgroundColor: '#10b981' + '20',
  },
  negativeChange: {
    backgroundColor: '#dc2626' + '20',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  sectionCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  constitutionChart: {
    gap: 16,
  },
  constitutionItem: {
    gap: 8,
  },
  constitutionBar: {
    height: 8,
    backgroundColor: COLORS.secondary + '40',
    borderRadius: 4,
    overflow: 'hidden',
  },
  constitutionProgress: {
    height: '100%',
    borderRadius: 4,
  },
  constitutionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  constitutionType: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  constitutionCount: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  treatmentList: {
    gap: 16,
  },
  treatmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  treatmentPatients: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  treatmentEffectiveness: {
    alignItems: 'flex-end',
    width: 100,
  },
  effectivenessBar: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.secondary + '40',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  effectivenessProgress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  effectivenessText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  insightsList: {
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: 8,
  },
  overviewLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});