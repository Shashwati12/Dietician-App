import { COLORS } from '@/components/constants/colors';
import { Clock, Phone, Plus, User, Video, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type AppointmentType = 'video' | 'voice' | 'in-person';
type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  duration: string;
}

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Priya Singh',
    time: '09:00 AM',
    type: 'video',
    status: 'scheduled',
    duration: '30 min',
  },
  {
    id: '2',
    patientName: 'Raj Kumar',
    time: '10:30 AM',
    type: 'voice',
    status: 'scheduled',
    duration: '45 min',
  },
];

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] =
    useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    time: '',
    type: 'video' as AppointmentType,
  });

  const handleBookAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.time) return;

    const appointment: Appointment = {
      id: Date.now().toString(),
      patientName: newAppointment.patientName,
      time: newAppointment.time,
      type: newAppointment.type,
      status: 'scheduled',
      duration: '30 min',
    };

    setAppointments((prev) => [appointment, ...prev]);
    setNewAppointment({ patientName: '', time: '', type: 'video' });
    setShowBookingModal(false);
  };

  const getTypeIcon = (type: AppointmentType) => {
    switch (type) {
      case 'video':
        return Video;
      case 'voice':
        return Phone;
      default:
        return User;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#059669';
      case 'completed':
        return '#6b7280';
      case 'cancelled':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Appointments</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowBookingModal(true)}
          >
            <Plus size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Date Navigation */}
        <View style={styles.dateNavigation}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(7)].map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              const isSelected = index === 0;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                    {date.toLocaleDateString('en', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Today's Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Total Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>

        {/* Appointments List */}
        <View style={styles.appointmentsList}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          {appointments.map((appointment) => {
            const TypeIcon = getTypeIcon(appointment.type);
            return (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentTime}>
                  <Clock size={16} color={COLORS.textLight} />
                  <Text style={styles.timeText}>{appointment.time}</Text>
                </View>
                
                <View style={styles.appointmentDetails}>
                  <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>{appointment.patientName}</Text>
                    <View style={styles.appointmentMeta}>
                      <TypeIcon size={14} color={COLORS.textLight} />
                      <Text style={styles.typeText}>{appointment.type}</Text>
                      <Text style={styles.duration}>• {appointment.duration}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.appointmentActions}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                        {appointment.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Book Appointment Modal */}
        <Modal
          visible={showBookingModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowBookingModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Book Appointment</Text>
                <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                  <X size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Patient Name</Text>
                <TextInput
                  style={styles.formInput}
                  value={newAppointment.patientName}
                  onChangeText={(text) => setNewAppointment({ ...newAppointment, patientName: text })}
                  placeholder="Enter patient name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Time</Text>
                <TextInput
                  style={styles.formInput}
                  value={newAppointment.time}
                  onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
                  placeholder="e.g., 10:30 AM"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Consultation Type</Text>
                <View style={styles.typeSelector}>
                  {['video', 'voice', 'in-person'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeOption,
                        newAppointment.type === type && styles.selectedTypeOption,
                      ]}
                      onPress={() => setNewAppointment({ ...newAppointment, type: type as any })}
                    >
                      <Text
                        style={[
                          styles.typeOptionText,
                          newAppointment.type === type && styles.selectedTypeOptionText,
                        ]}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
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
  dateNavigation: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateCard: {
    width: 60,
    height: 80,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDateCard: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  selectedDateText: {
    color: COLORS.white,
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
  appointmentsList: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  appointmentCard: {
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
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 8,
    fontWeight: '500',
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  duration: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  appointmentActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
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
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    alignItems: 'center',
  },
  selectedTypeOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeOptionText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  selectedTypeOptionText: {
    color: COLORS.white,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});