import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { User, Search, Plus, X, Calendar, FileText, Activity } from 'lucide-react-native';

const COLORS = {
  primary: '#6c412f',
  secondary: '#e6ccb2',
  background: '#f2e8df',
  white: '#ffffff',
  text: '#2d1b14',
  textLight: '#8b5a42',
};

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  constitution: 'Vata' | 'Pitta' | 'Kapha' | 'Mixed';
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'inactive';
}

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Priya Singh',
      age: 34,
      gender: 'Female',
      constitution: 'Pitta',
      phone: '+91 9876543210',
      email: 'priya.singh@email.com',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-22',
      status: 'active',
    },
    {
      id: '2',
      name: 'Raj Kumar',
      age: 42,
      gender: 'Male',
      constitution: 'Vata',
      phone: '+91 9876543211',
      email: 'raj.kumar@email.com',
      lastVisit: '2024-01-10',
      status: 'active',
    },
    {
      id: '3',
      name: 'Maya Patel',
      age: 28,
      gender: 'Female',
      constitution: 'Kapha',
      phone: '+91 9876543212',
      email: 'maya.patel@email.com',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-20',
      status: 'active',
    },
    {
      id: '4',
      name: 'Arjun Sharma',
      age: 38,
      gender: 'Male',
      constitution: 'Mixed',
      phone: '+91 9876543213',
      email: 'arjun.sharma@email.com',
      lastVisit: '2023-12-20',
      status: 'inactive',
    },
  ];

  const getConstitutionColor = (constitution: string) => {
    switch (constitution) {
      case 'Vata':
        return '#8b5cf6';
      case 'Pitta':
        return '#f59e0b';
      case 'Kapha':
        return '#10b981';
      case 'Mixed':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.constitution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Patients</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search patients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>

        {/* Patient Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>142</Text>
            <Text style={styles.statLabel}>Total Patients</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>New This Month</Text>
          </View>
        </View>

        {/* Constitution Filter */}
        <View style={styles.constitutionFilter}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['All', 'Vata', 'Pitta', 'Kapha', 'Mixed'].map((constitution) => (
              <TouchableOpacity key={constitution} style={styles.filterChip}>
                <Text style={styles.filterChipText}>{constitution}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Patients List */}
        <View style={styles.patientsList}>
          {filteredPatients.map((patient) => (
            <TouchableOpacity
              key={patient.id}
              style={styles.patientCard}
              onPress={() => {
                setSelectedPatient(patient);
                setShowPatientModal(true);
              }}
            >
              <View style={styles.patientHeader}>
                <View style={styles.patientAvatar}>
                  <User size={24} color={COLORS.primary} />
                </View>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{patient.name}</Text>
                  <Text style={styles.patientDetails}>
                    {patient.age} years • {patient.gender}
                  </Text>
                </View>
                <View style={[styles.statusBadge, patient.status === 'active' ? styles.activeBadge : styles.inactiveBadge]}>
                  <Text style={[styles.statusText, patient.status === 'active' ? styles.activeText : styles.inactiveText]}>
                    {patient.status}
                  </Text>
                </View>
              </View>

              <View style={styles.patientMeta}>
                <View style={styles.constitutionBadge}>
                  <View style={[styles.constitutionDot, { backgroundColor: getConstitutionColor(patient.constitution) }]} />
                  <Text style={styles.constitutionText}>{patient.constitution}</Text>
                </View>
                <Text style={styles.lastVisitText}>
                  Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                </Text>
              </View>

              {patient.nextAppointment && (
                <View style={styles.nextAppointment}>
                  <Calendar size={14} color={COLORS.primary} />
                  <Text style={styles.nextAppointmentText}>
                    Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Patient Detail Modal */}
        <Modal
          visible={showPatientModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPatientModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedPatient && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedPatient.name}</Text>
                    <TouchableOpacity onPress={() => setShowPatientModal(false)}>
                      <X size={24} color={COLORS.text} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.patientDetailCard}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Age:</Text>
                      <Text style={styles.detailValue}>{selectedPatient.age} years</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Gender:</Text>
                      <Text style={styles.detailValue}>{selectedPatient.gender}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Constitution:</Text>
                      <View style={styles.constitutionBadge}>
                        <View style={[styles.constitutionDot, { backgroundColor: getConstitutionColor(selectedPatient.constitution) }]} />
                        <Text style={styles.detailValue}>{selectedPatient.constitution}</Text>
                      </View>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Phone:</Text>
                      <Text style={styles.detailValue}>{selectedPatient.phone}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Email:</Text>
                      <Text style={styles.detailValue}>{selectedPatient.email}</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Calendar size={20} color={COLORS.primary} />
                      <Text style={styles.actionButtonText}>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <FileText size={20} color={COLORS.primary} />
                      <Text style={styles.actionButtonText}>Records</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Activity size={20} color={COLORS.primary} />
                      <Text style={styles.actionButtonText}>Progress</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
  },
  constitutionFilter: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  filterChipText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  patientsList: {
    paddingHorizontal: 20,
  },
  patientCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#10b981' + '20',
  },
  inactiveBadge: {
    backgroundColor: '#6b7280' + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeText: {
    color: '#10b981',
  },
  inactiveText: {
    color: '#6b7280',
  },
  patientMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  constitutionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  constitutionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  constitutionText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  lastVisitText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  nextAppointment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary + '40',
  },
  nextAppointmentText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  patientDetailCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary + '40',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '500',
  },
});